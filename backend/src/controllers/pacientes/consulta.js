const db = require ('../../postgre/connection');
const uuidV4 = require('uuid').v4;

class ConsultaPaciente {
    constructor() { }
  
    async recuperarPaciente(req, res) {
    
      try {

        const paciente = await db.recuperarPacientePorID('17d8206b-5b11-451f-ba92-30faf1974206');

        console.log('PACIENTES! ', paciente);

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