//function ou eval
function gerarTabela() {
  const n = parseInt(document.getElementById("numPontos").value);      //parceInt converte uma string em um numero imnteiro
  const entradaDiv = document.getElementById("entrada"); //coloca outros elementos como botões, inputs, textos,
  let html = '<table><tr><td>x</td>';
  for (let i = 0; i < n; i++) html += `<td><input type='number' step='any' id='x${i}'></td>`;
  html += '</tr><tr><td>f(x)</td>';
  for (let i = 0; i < n; i++) html += `<td><input type='number' step='any' id='y${i}'></td>`;
  html += '</tr></table>';   //fechando primeira linha da tabela.
  entradaDiv.innerHTML = html;
}

function calcularExponencial() {
  const n = parseInt(document.getElementById("numPontos").value);
  const x = [], y = [], yLog = [], yOriginal = [];  // entrando com os vetores , lendo

  for (let i = 0; i < n; i++) {
    const xi = parseFloat(document.getElementById(`x${i}`).value);
    const yi = parseFloat(document.getElementById(`y${i}`).value);
    if (isNaN(xi) || isNaN(yi) || yi <= 0) {    //verificar se os valores inseridos são válidos.
      alert("Todos os valores devem ser preenchidos e f(x) > 0 (logaritmo indefinido para 0 ou negativo).");  //verifica
      return;
    }
    x.push(xi);
    y.push(yi);
    yLog.push(Math.log(yi));  //funcao log , push elemnto
    yOriginal.push(yi);
  }

  const A = [
    [n, x.reduce((s, xi) => s + xi, 0)],
    [x.reduce((s, xi) => s + xi, 0), x.reduce((s, xi) => s + xi * xi, 0)]
  ];
  const B = [
    yLog.reduce((s, yi) => s + yi, 0),
    x.reduce((s, xi, i) => s + xi * yLog[i], 0)
  ];

  const coef = resolverSistemaLinear(A, B); //resolver sistema

  const a = Math.exp(coef[0]);
  const b = coef[1];

  const resultado = `f(x) = ${a.toFixed(6)} * e^(${b.toFixed(6)} * x)`;
  document.getElementById("saida").textContent = resultado;
}

function resolverSistemaLinear(A, B) {
  const n = B.length;  //tamanho
  for (let k = 0; k < n; k++) {
    let max = Math.abs(A[k][k]);
    let maxRow = k;    //linha de valor máximo
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(A[i][k]) > max) {
        max = Math.abs(A[i][k]);
        maxRow = i;
      }
    }
    [A[k], A[maxRow]] = [A[maxRow], A[k]];
    [B[k], B[maxRow]] = [B[maxRow], B[k]];

    for (let i = k + 1; i < n; i++) {
      const f = A[i][k] / A[k][k];
      for (let j = k; j < n; j++) {
        A[i][j] -= f * A[k][j];
      }
      B[i] -= f * B[k];
    }
  }

  const x = Array(n).fill(0);  //lista de elementosd array, e fill o valor , preecnhe todos os elemneytos A e B 
  for (let i = n - 1; i >= 0; i--) {
    let soma = B[i];
    for (let j = i + 1; j < n; j++) {
      soma -= A[i][j] * x[j];
    }
    x[i] = soma / A[i][i];
  }

  return x;
}
