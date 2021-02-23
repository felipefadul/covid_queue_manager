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

async function enviarMensagemFilaAWS(paciente_id, nome_fila, enfermeiro) {
  
  const date_now = new Date();
  const date_formated = date_now.toISOString().slice(0,10);
  AWS.config.loadFromPath('D:\\Documentos\\PI\\covid_queue_manager\\backend\\src\\config\\aws.json'); //VERIFICAR DEPOIS UMA MELHOR FORMA PARA PASSAR O ARQUIVO
  var sqs = new AWS.SQS ({apiVersion: date_formated});

  var params = {
    // Remove DelaySeconds parameter and value for FIFO queues
   MessageAttributes: {
    "Author": {
      DataType: "String",
      StringValue: `${enfermeiro}`
    }
  },
   MessageBody: `{"paciente_id":"${paciente_id}","nome_enfermeiro":"${enfermeiro}"}`,
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

module.exports = async function inserirFilaAWS (paciente_id, classificacao, enfermeiro) {

  try {
    if (classificacao === 'Risco Alto'){
      await enviarMensagemFilaAWS (paciente_id, 'grave', enfermeiro);
    }
    else if (classificacao === 'Risco Moderado') {
      await enviarMensagemFilaAWS (paciente_id, 'moderado', enfermeiro)
    }
    else if (classificacao === 'Risco Baixo') {
      await enviarMensagemFilaAWS (paciente_id, 'leve', enfermeiro)
    }
    else {
      await enviarMensagemFilaAWS (paciente_id, 'sem_sintomas', enfermeiro)
    }
    return 'ok';
  } catch (err) {
    console.log(err);
    return -1;
  }
}