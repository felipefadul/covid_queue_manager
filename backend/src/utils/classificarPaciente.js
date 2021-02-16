const db = require ('../postgre/connection');

const CODIDO_SEM_SINTOMAS_RELACIONADOS = 'C0';
const CODIDO_RISCO_BAIXO               = 'C1';
const CODIDO_RISCO_MODERADO            = 'C2';
const CODIDO_RISCO_ALTO                = 'C3';

const PONTUACAO_SINTOMAS               = [ 5, 1, 1, 4, 1, 10, 4, 2, 5, 5, 3, 2 ];
const PONTUACAO_FATOR_RISCO            = 5;

module.exports = async function classificarPaciente(json_respostas) {

  try {
    const sintomas = json_respostas.sintomas;
    const fatoresRisco = json_respostas.fatoresRisco;
    let pontuacaoSintomasTotal = 0;
    let pontuacaoFatoresRiscoTotal = 0;
    let pontuacaoFinal = 0;
    let indice = 0;
    let codigoClassificacao;
    
    for (let sintoma in sintomas)
    {
      if (sintomas[sintoma])
        pontuacaoSintomasTotal += PONTUACAO_SINTOMAS[indice];
      
      indice ++;
    }

    indice = 0;
    for (let fatorRisco in fatoresRisco)
    {
      if (fatoresRisco[fatorRisco])
        pontuacaoFatoresRiscoTotal += PONTUACAO_FATOR_RISCO;
      
      indice ++;
    }
    
    if (pontuacaoSintomasTotal === 0)
      pontuacaoFinal = 0;
    else if (pontuacaoFatoresRiscoTotal < 15)
      pontuacaoFinal = pontuacaoSintomasTotal + pontuacaoFatoresRiscoTotal;
    else
      pontuacaoFinal = pontuacaoSintomasTotal + 15;

    if (pontuacaoFinal === 0)
      codigoClassificacao = CODIDO_SEM_SINTOMAS_RELACIONADOS;
    else if (pontuacaoFinal < 10)
      codigoClassificacao = CODIDO_RISCO_BAIXO;
    else if (pontuacaoFinal < 20)
      codigoClassificacao = CODIDO_RISCO_MODERADO;
    else
      codigoClassificacao = CODIDO_RISCO_ALTO;

    const { ...row } = await db.recuperarTipoClassificacaoPorCodigo(codigoClassificacao);

    return row[0].tipo_classificacao_id;
  } catch (err) {
    console.log(err);
    return -1;
  }
}


