const AWS = require('aws-sdk');
const { join } = require('path');

const configAWSPath = join(__dirname, '../config', `.env.aws.json`);

async function deleteMessage(params) {
  const date_now = new Date();
  const date_formated = date_now.toISOString().slice(0,10);
  AWS.config.loadFromPath(configAWSPath);
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