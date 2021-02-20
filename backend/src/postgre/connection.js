//const uuidV4 = require ('uuid');
const uuidV4 = require('uuid').v4;
const { Pool } = require('pg');
const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || "dev"; // Por default, é "dev".
ok(env === "prod" || env === "dev", 'A env é inválida! Deve ser "prod" ou "dev"');

const configPath = join(__dirname, '../config', `.env.${env}`);
config({
  path: configPath
});

const connectionString = process.env.DATABASEURL; 

const pool = new Pool({
  connectionString,
}); 

const db = pool.on('connect', () => {
  // console.error(err);
});

class Postgres {
  constructor() {
    this.criarBanco();
  }

  async criarBanco() {
    const dml = `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      create table if not exists pacientes(
        paciente_id uuid DEFAULT uuid_generate_v4() primary key not null,
        nome varchar(255) not Null,
        idade int not null,
        peso NUMERIC(5, 2) not null,
        altura NUMERIC(3, 2) not null,
        triagem_id uuid,
        tipo_classificacao_id uuid
      );
      CREATE TABLE IF NOT EXISTS respostas_triagem (
        triagem_id uuid DEFAULT uuid_generate_v4() primary key not null,
        json_respostas json not null
      );
      CREATE TABLE IF NOT EXISTS historico (
        historico_id uuid DEFAULT uuid_generate_v4() primary key not null,
        paciente_id uuid not null,
        nome varchar(255) not Null,
        nome_enfermeira varchar(255) not Null,
        nome_medico varchar(255) not Null,
        date timestamptz DEFAULT CURRENT_TIMESTAMP not null
      );
      CREATE TABLE IF NOT EXISTS tipo_classificacao (
        tipo_classificacao_id uuid DEFAULT uuid_generate_v4() primary key not null,
        descricao varchar(30) not null,
        codigo varchar(2) not null unique
      );
      INSERT INTO tipo_classificacao (tipo_classificacao_id, descricao, codigo) VALUES (uuid_generate_v4(), 'Sem Sintomas', 'C0') ON CONFLICT (codigo) DO NOTHING;
      INSERT INTO tipo_classificacao (tipo_classificacao_id, descricao, codigo) VALUES (uuid_generate_v4(), 'Risco Baixo', 'C1') ON CONFLICT (codigo) DO NOTHING;
      INSERT INTO tipo_classificacao (tipo_classificacao_id, descricao, codigo) VALUES (uuid_generate_v4(), 'Risco Moderado', 'C2') ON CONFLICT (codigo) DO NOTHING;
      INSERT INTO tipo_classificacao (tipo_classificacao_id, descricao, codigo) VALUES (uuid_generate_v4(), 'Risco Alto', 'C3') ON CONFLICT (codigo) DO NOTHING;`

      await db.query(dml);
  }
  
  inserirTabelaPacientes(nome, idade, peso, altura, triagem_id, tipo_classificacao_id) {
    return this.inserirTabelaPacientesAsync(uuidV4(), nome, idade, peso, altura, triagem_id, tipo_classificacao_id, 'pacientes');
  }

  async inserirTabelaPacientesAsync( paciente_id, nome, idade, peso, altura, triagem_id, tipo_classificacao_id, tabela ) {
    const { rows } = await db.query(
      `INSERT INTO ${tabela} (paciente_id, nome, idade, peso, altura, triagem_id, tipo_classificacao_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [paciente_id, nome, idade, peso, altura, triagem_id, tipo_classificacao_id]);
      await db.query("commit;");
    return rows;
  }

  inserirTabelaRespostas(triagem_id, json_respostas) {
    return this.inserirTabelaRespostasAsync(triagem_id, json_respostas, 'respostas_triagem');
  }

  async inserirTabelaRespostasAsync( triagem_id, json_respostas, tabela ) {
    const { rows } = await db.query(
      `INSERT INTO ${tabela} (triagem_id, json_respostas) VALUES ($1, $2)`,
      [triagem_id, json_respostas]);
      await db.query("commit;");
    return rows;
  }

  async recuperarPacientePorID(paciente_id) {
    const { rows } = await db.query(`select p.paciente_id,
                                     rt.json_respostas,
                                     tc.descricao as "classificacao",
                                     p.nome,
                                     p.idade,
                                     p.peso,
                                     p.altura
                                     from pacientes p
                                     join respostas_triagem rt on rt.triagem_id = p.triagem_id
                                     join tipo_classificacao tc on tc.tipo_classificacao_id = p.tipo_classificacao_id
                                     where p.paciente_id='${paciente_id}'`);
    return rows[0];
  }

  async recuperarPacienteIDPorNome(paciente_nome) {
    const { rows } = await db.query(`select p.paciente_id from pacientes p
                                     where p.nome='${paciente_nome}'`);
    return rows;
  }

  async recuperarTipoClassificacaoPorCodigo(codigo) {
    const { rows } = await db.query(`select tc.tipo_classificacao_id from tipo_classificacao tc
                                     where tc.codigo = '${codigo}'`);
    return rows;
  }

  async recuperarTipoClassificacaoPorID(tipo_classificacao_id) {
    const { rows } = await db.query(`select tc.descricao from tipo_classificacao tc
                                     where tc.tipo_classificacao_id = '${tipo_classificacao_id}'`);
    return rows;
  }
}
  /* async leTodos() {
    const { rows } = await db.query("SELECT TRANSACTION_ID, ORDER_ID, LOGISTIC_ID, PRICE FROM PENDENTES");
    return rows;
  }

  async procuraPorTransactionId(transaction_id) {
    return procuraPorTransactionIdGeneric(transaction_id, 'PENDENTES');
  }

  async procuraPorTransactionIdRealizados(transaction_id) {
    return procuraPorTransactionIdGeneric(transaction_id, 'REALIZADOS');
  }

  async procuraPorTransactionIdGeneric(transaction_id, tabela) {
    const { rows } = await db.query(`SELECT TRANSACTION_ID, NUMERO_COLETA FROM ${tabela} WHERE TRANSACTION_ID = $1`, [transaction_id]);
    return rows;
  }

  async deleta(transaction_id) {
    const { rows } = await db.query("DELETE FROM PENDENTES WHERE TRANSACTION_ID = $1", [transaction_id])
    await db.query("commit;");
    return rows
  }
} */

module.exports = new Postgres();