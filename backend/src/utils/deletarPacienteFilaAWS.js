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

async function deleteMessage(params) {
  const date_now = new Date();
  const date_formated = date_now.toISOString().slice(0,10);
  AWS.config.loadFromPath('D:\\Documentos\\PI\\covid_queue_manager\\backend\\src\\config\\aws.json'); //VERIFICAR DEPOIS UMA MELHOR FORMA PARA PASSAR O ARQUIVO
  var sqs = new AWS.SQS ({apiVersion: date_formated});
  const request = sqs.deleteMessage(params);
  return await request.promise();
 }

module.exports = async function deleterPacienteFilaAWS (mensagem, nome_fila) {
  try {
    var params = {
      QueueUrl: `https://sqs.sa-east-1.amazonaws.com/613398238536/${nome_fila}.fifo`,
      ReceiptHandle: mensagem.ReceiptHandle
    };
    const response = await deleteMessage (params);
    return response; 
  } catch (err) {
    console.log(err);
    return -1;
  }
}