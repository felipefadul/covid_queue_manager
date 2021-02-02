const db = require ('../../postgre/connection');

class CadastroController {
    constructor() { }
  
    async cadastroPaciente(req, res) {
      const { nome, idade } = req.body
      const pacient = { nome, idade, triagem_id: null };
  
      request = { ...request, pacient }
  
      try {
        // const { data } = await melhorEnvio.inserirFretesNoCarrinho(request);
        // await melhorEnvio.checkout(data.id);
        // await melhorEnvio.gerarEtiqueta(data.id);
        // melhorEnvio.imprimirEtiqueta(data.id);
  
        //const numero_coleta = Date.now()

        const { data } = await db.insereTabelaPacientes('Felipe Fadul', 7, null);
  
        return res.json({ data });
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
  
  module.exports = new CadastroController()