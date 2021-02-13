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
        triagem_id uuid
      );
      CREATE TABLE IF NOT EXISTS perguntas_triagem (
        pergunta_id uuid DEFAULT uuid_generate_v4() primary key not null,
        json_perguntas json not null
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
      );`;

      await db.query(dml);
  } 
  
  inserirTabelaPacientes(nome, idade, peso, altura, triagem_id) {
    return this.inserirTabelaPacientesAsync(uuidV4(), nome, idade, peso, altura, triagem_id, 'pacientes');
  }

  async inserirTabelaPacientesAsync( paciente_id, nome, idade, peso, altura, triagem_id, tabela ) {
    const { rows } = await db.query(
      `INSERT INTO ${tabela} (paciente_id, nome, idade, peso, altura, triagem_id) VALUES ($1, $2, $3, $4, $5, $6)`,
      [paciente_id, nome, idade, peso, altura, triagem_id]);
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
    const { rows } = await db.query(`SELECT * FROM PACIENTES`);
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