const db = require ('../../postgre/connection');

class ConsultaPaciente {
    constructor() { }
  
    async recuperarPaciente(req, res) {
      const paciente_id = req.params.paciente_id;

      try {

        const paciente = await db.recuperarPacientePorID(paciente_id);

        return res.status(200).json({ paciente });
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
  
  module.exports = new ConsultaPaciente();