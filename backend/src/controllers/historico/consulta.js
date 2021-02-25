const db = require ('../../postgre/connection');

async function test(v) { v.nome_paciente = await db.recuperarPacientePorID(v.paciente_id);}

class ConsultaHistorico {
    constructor() { }
  
    async recuperarHistorico(req, res) {
      const visibilidade = req.params.visibilidade;

      try {

        const historico = await db.recuperarHistorico();

        //pegando o ids dos pacientes e pegando seus nomes
        for (var key in historico) {
          historico[key].nome_paciente = (await db.recuperarPacientePorID(historico[key].paciente_id)).nome;
        }

        if (visibilidade === 'privado') 
          return res.status(200).json({ historico });

        //removento o campo paciente_id para a pagina publica do historico
        historico.forEach(function(v){ delete v.paciente_id });
        return res.status(200).json({ historico });
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
  
  module.exports = new ConsultaHistorico();