const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
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
        paciente_id uuid DEFAULT uuid_generate_v4() not null,
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

  insereTabelaPacientes(paciente_id, nome, idade, triagem_id) {
    return this.insereTabela(paciente_id, nome, idade, triagem_id, 'pacientes');
  }

  async insereTabela(paciente_id, nome, idade, triagem_id, tabela) {
    const { rows } = await db.query(
      `INSERT INTO ${tabela} (paciente_id, nome, idade, triagem_id) VALUES ($1, $2, $3, $4)`,
      [paciente_id, nome, idade, triagem_id]);
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