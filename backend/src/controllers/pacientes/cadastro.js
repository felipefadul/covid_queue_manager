const db = require ('../../postgre/connection');
const classificarPaciente = require('../../utils/classificarPaciente');
const uuidV4 = require('uuid').v4;

class CadastroPaciente {
  constructor() { }
  
  async cadastrarPaciente(req, res) {
    
    const { nome, idade, peso, altura, json_respostas } = req.body;
    
    try {
        const triagem_id = uuidV4();
        const tipo_classificacao_id = await classificarPaciente(json_respostas);

        const dataPacientes = await db.inserirTabelaPacientes(nome, idade, peso, altura, triagem_id, tipo_classificacao_id);
        const dataRespostas = await db.inserirTabelaRespostas(triagem_id, json_respostas);

        const classificacao = await db.recuperarTipoClassificacaoPorID(tipo_classificacao_id);

        return res.status(200).json({ 
          classificacao
        });
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


      // try {
      //   const { data } = await melhorEnvio.inserirFretesNoCarrinho(request);
      //   await melhorEnvio.checkout(data.id);
      //   await melhorEnvio.gerarEtiqueta(data.id);
      //   melhorEnvio.imprimirEtiqueta(data.id);
  
      //   const numero_coleta = Date.now()
      //   db.insere(transaction_id, order_id, data.id, price, numero_coleta);
  
      //   return res.json({ numero_coleta });
      // } catch (err) {
      //   if (!err.response) {
      //     console.log(err);
      //     return res.status(500).json({ message: 'Deu água!' });
      //   }
  
      //   return res.status(400).json({
      //     message: err.response.data.message || err.response.data.error,
      //     errors: err.response.data.errors,
      //   });
      // }
  
    // rastrearOrdens(logisticIds) {
    //    return melhorEnvio.rastrearEnvio(logisticIds);
    // }
    }
  }
  
  module.exports = new CadastroPaciente()