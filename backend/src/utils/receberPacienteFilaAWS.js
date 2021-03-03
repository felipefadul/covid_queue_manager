const AWS = require('aws-sdk');
const { join } = require('path');

const configAWSPath = join(__dirname, '../config', `.env.aws.json`);

async function receiveMessage(params) {
  try {
    const date_now = new Date();
    const date_formated = date_now.toISOString().slice(0,10);
    AWS.config.loadFromPath(configAWSPath);
    var sqs = new AWS.SQS ({apiVersion: date_formated});
    const request = sqs.receiveMessage(params);

    return await request.promise();
  } catch (err) {
    console.log(err);
    return -1;
  }
}

module.exports = async function receberPacienteFilaAWS (nome_fila) {
  try {
    var params = {
      AttributeNames: [
         "SentTimestamp"
      ],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: [
         "All"
      ],
      QueueUrl: `https://sqs.sa-east-1.amazonaws.com/613398238536/${nome_fila}.fifo`,
      VisibilityTimeout: 2,
      WaitTimeSeconds: 0
    };
    const paciente_fila = await receiveMessage(params);
    if(typeof paciente_fila.Messages === "undefined")
      return -1;
      
    return paciente_fila.Messages[0];
  } catch (err) {
    console.log(err);
    return -1;
  }
}