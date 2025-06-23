function gerarTabela() {     //cria uma tabela HTML para o usuário digitar os pontos.
  const n = parseInt(document.getElementById("numPontos").value);     //Pega o número de pontos n digitado pelo usuário.Gera uma tabela de entrada com: n caixas para x₀, x₁, ..., xₙ   ,,n caixas para f(x₀), f(x₁),
  const entradaDiv = document.getElementById("entrada");
  let html = '<table><tr><td>x</td>';
  for (let i = 0; i < n; i++) html += `<td><input type='number' step='any' id='x${i}'></td>`;
  html += '</tr><tr><td>f(x)</td>';
  for (let i = 0; i < n; i++) html += `<td><input type='number' step='any' id='y${i}'></td>`;  //Insere essa tabela no elemento  id
  html += '</tr></table>';
  entradaDiv.innerHTML = html;
}

function calcular() {     //calcula e exibe o polinômio de Newton.
  const n = parseInt(document.getElementById("numPontos").value);    //Lê o número de pontos.
  const x = [], y = [];   //x[] e y[] para armazenar os valores digitados.  , tipo arrays , elemntos , tipo caixa que guarda elemntos

  for (let i = 0; i < n; i++) {    //Lê os dados preenchidos    //Lê cada valor de entrada digitado.
    const xi = parseFloat(document.getElementById(`x${i}`).value);
    const yi = parseFloat(document.getElementById(`y${i}`).value);
    if (isNaN(xi) || isNaN(yi)) {        //Se algum estiver vazio ou errado, mostra alerta q esta abaixo
      alert("Preencha todos os valores!");
      return;
    }
    x.push(xi);  //push adicona o vetor x ao elemnto (array caixa)
    y.push(yi);
  }

  const coef = [...y];        // Calcula as diferenças divididas
  for (let j = 1; j < n; j++) {
    for (let i = n - 1; i >= j; i--) {
      coef[i] = (coef[i] - coef[i - 1]) / (x[i] - x[i - j]);   //ormula
    }
  }

  let poly = `P(x) = ${coef[0].toFixed(6)}`;   //Monta o polinômio interpolador
  for (let i = 1; i < n; i++) {
    let termo = `${coef[i] >= 0 ? "+" : ""}${coef[i].toFixed(6)}`;        //Começa com o primeiro termo f[x 0]
    for (let j = 0; j < i; j++) {
      termo += `(x - ${x[j].toFixed(6)})`;
    }
    poly += ` ${termo}`;   //poliy ela guarda o polinômio que o programa está construindo usando interpolação de Newton., polinome final


  }

  document.getElementById("saida").textContent = poly;//Exibe na tela
}
