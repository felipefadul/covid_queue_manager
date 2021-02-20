const axios = require ('axios');
const AWS = require('aws-sdk');

const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || "dev"; // Por default, é "dev".
ok(env === "prod" || env === "dev", 'A env é inválida! Deve ser "prod" ou "dev"');

const configPath = join(__dirname, '../config', `.env.${env}`);
config({
  path: configPath
});

async function enviarMensagemFilaAWS(paciente_id, nome_fila) {
  
  const date_now = new Date();
  const date_formated = date_now.toISOString().slice(0,10);
  AWS.config.loadFromPath('../config/env.aws.json'); //VERIFICAR DEPOIS UMA MELHOR FORMA PARA PASSAR O ARQUIVO
  var sqs = new AWS.SQS ({apiVersion: date_formated});

  var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
   MessageAttributes: {},
   MessageBody: `paciente_id=${paciente_id}`,
   MessageDeduplicationId: `${paciente_id}`,  // Required for FIFO queues
   MessageGroupId: "1",  // Required for FIFO queues
   QueueUrl: `https://sqs.sa-east-1.amazonaws.com/613398238536/${nome_fila}.fifo`
 };
 sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
}

module.exports = async function inserirFilaAWS (paciente_id, classificacao) {

  try {
    if (classificacao === 'Risco Alto'){
      await enviarMensagemFilaAWS (paciente_id, 'grave');
    }
    else if (classificacao === 'Risco Moderado') {
      await enviarMensagemFilaAWS (paciente_id, 'moderado')
    }
    else if (classificacao === 'Risco Baixo') {
      await enviarMensagemFilaAWS (paciente_id, 'leve')
    }
    else {
      await enviarMensagemFilaAWS (paciente_id, 'sem_sintomas')
    }
    return 'ok';
  } catch (err) {
    console.log(err);
    return -1;
  }
}