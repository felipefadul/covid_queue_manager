const db = require ('../../postgre/connection');
const receberPacienteFilaAWS = require('../../utils/receberPacienteFilaAWS');
const deletarPacienteFilaAWS = require('../../utils/deletarPacienteFilaAWS');

const CODIGO_SEM_SINTOMAS             = 'C0';
const CODIGO_RISCO_LEVE               = 'C1';
const CODIGO_RISCO_MODERADO           = 'C2';
const CODIGO_RISCO_ALTO               = 'C3';

async function handleQueueCall (data, nome_medico, sala_medico, codigo_classificacao, nome_fila)
{
  const corpo_mensagem = JSON.parse(data.Body);
  const paciente_id = corpo_mensagem.paciente_id;
  const nome_enfermeiro = corpo_mensagem.nome_enfermeiro;
  const tipo_classificacao_id = await db.recuperarTipoClassificacaoPorCodigo(codigo_classificacao);
  await db.inserirTabelaHistorico(paciente_id, nome_enfermeiro, nome_medico, sala_medico, tipo_classificacao_id[0].tipo_classificacao_id);
  await deletarPacienteFilaAWS (data, nome_fila);

  return paciente_id;
}

class GerenciadorFila {
  constructor() { }

  async chamarPaciente(req, res) {
    const { nome_medico, sala_medico } = req.body;

    try {
      let data = await receberPacienteFilaAWS('grave');
      const tipo_classificacao_id_grave = await db.recuperarTipoClassificacaoPorCodigo(CODIGO_RISCO_ALTO);
      const contagem_grave = await db.recuperarContagemHistoricoGrave(tipo_classificacao_id_grave[0].tipo_classificacao_id);
      let contagem = await db.recuperarContagemHistorico();
      contagem = contagem - contagem_grave;

      if (data != -1)
      {
        var paciente_id = await handleQueueCall (data, nome_medico, sala_medico, CODIGO_RISCO_ALTO, 'grave');
      }
      else {
        const data_moderado = await receberPacienteFilaAWS('moderado');
        const data_leve = await receberPacienteFilaAWS('leve');
        const data_sem_sintomas = await receberPacienteFilaAWS('sem_sintomas');

        if (((contagem % 12 === 0) && (data_sem_sintomas != -1)) || ((data_leve === -1) && (data_moderado === -1)) ) {
          paciente_id = await handleQueueCall (data_sem_sintomas, nome_medico, sala_medico, CODIGO_SEM_SINTOMAS, 'sem_sintomas');
        }
        else if (((contagem % 3 === 0) && (data_leve != -1)) || data_moderado === -1) {
          paciente_id = await handleQueueCall (data_leve, nome_medico, sala_medico, CODIGO_RISCO_LEVE, 'leve');
        }
        else if (data_moderado != -1) {
          paciente_id = await handleQueueCall (data_moderado, nome_medico, sala_medico, CODIGO_RISCO_MODERADO, 'moderado');
        }
      }
      
      return res.status(200).json({ paciente_id });
    } catch (err) {
      if (!err.response) {
        console.log(err);
        return res.status(500).json({ message: 'Deu água!' });
      }

      return res.status(400).json({
        message: err.response.data.message || err.response.data.error,
        errors: err.response.data.errors,
      });
    }
  }
}

module.exports = new GerenciadorFila();