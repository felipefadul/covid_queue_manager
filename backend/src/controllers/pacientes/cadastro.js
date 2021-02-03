const db = require ('../../postgre/connection');

class CadastroPaciente {
    constructor() { }
  
    async cadastroPaciente(req, res) {

      const { nome, idade, peso, altura } = req.body;
      const pacient = { nome, idade, peso, altura, triagem_id: null };
    
      try {
        const { data } = await db.insereTabelaPacientes(nome, idade, peso, altura, null);
  
        return res.status(200).json({ data });
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