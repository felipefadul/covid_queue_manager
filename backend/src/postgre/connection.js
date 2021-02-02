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
    this.criaBanco();
  }

  async criaBanco() {
    const dml = `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      create table if not exists pacientes(
        pacient_id uuid DEFAULT uuid_generate_v4() not null,
        nome varchar(255) not Null,
        idade int not null,
        triagem_id uuid, 
        primary key (paciente_id)
      );
      CREATE TABLE IF NOT EXISTS perguntas_triagem (
        pergunta_id uuid DEFAULT uuid_generate_v4() not null,
        pergunta varchar(255) not null,
        primary key (pergunta_id)
      );`;

      await db.query(dml);
  }

  insereTabelaPacientes(nome, idade, triagem_id) {
    return this.insereTabela(uuidV4(), nome, idade, triagem_id, 'pacientes');
  }

  async insereTabela( pacient_id, nome, idade, triagem_id, tabela ) {
    const { rows } = await db.query(
      `INSERT INTO ${tabela} (pacient_id, nome, idade, triagem_id) VALUES ($1, $2, $3, $4)`,
      [pacient_id, nome, idade, triagem_id]);
      await db.query("commit;");
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