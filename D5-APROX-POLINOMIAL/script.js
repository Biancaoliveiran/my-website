
function gerarTabela() {
  const n = parseInt(document.getElementById("numPontos").value);
  const entradaDiv = document.getElementById("entrada");
  let html = '<table><tr><td>x</td>';
  for (let i = 0; i < n; i++) html += `<td><input type='number' step='any' id='x${i}'></td>`;
  html += '</tr><tr><td>f(x)</td>';
  for (let i = 0; i < n; i++) html += `<td><input type='number' step='any' id='y${i}'></td>`;
  html += '</tr></table>';
  entradaDiv.innerHTML = html;
}

function calcularMMQ() {
  const n = parseInt(document.getElementById("numPontos").value);
  const grau = parseInt(document.getElementById("grau").value);
  const x = [], y = [];

  for (let i = 0; i < n; i++) {
    const xi = parseFloat(document.getElementById(`x${i}`).value);
    const yi = parseFloat(document.getElementById(`y${i}`).value);
    if (isNaN(xi) || isNaN(yi)) {
      alert("Preencha todos os valores!");
      return;
    }
    x.push(xi);
    y.push(yi);
  }

  const p = grau;
  const A = Array.from({ length: p + 1 }, () => Array(p + 1).fill(0));
  const B = Array(p + 1).fill(0);

  for (let l = 0; l <= p; l++) {
    for (let c = 0; c <= p; c++) {
      let soma = 0;
      for (let i = 0; i < n; i++) {
        soma += Math.pow(x[i], l + c);
      }
      A[l][c] = soma;
    }
    for (let i = 0; i < n; i++) {
      B[l] += y[i] * Math.pow(x[i], l);
    }
  }

  const coef = resolverSistemaLinear(A, B);

  let poly = "P(x) = ";
  for (let i = 0; i < coef.length; i++) {
    const sinal = coef[i] >= 0 ? (i === 0 ? "" : " + ") : " - ";
    poly += `${sinal}${Math.abs(coef[i]).toFixed(6)}${i > 0 ? "x" + (i > 1 ? "^" + i : "") : ""}`;
  }

  document.getElementById("saida").textContent = poly;
}

function resolverSistemaLinear(A, B) {
  const n = B.length;
  for (let k = 0; k < n; k++) {
    let max = Math.abs(A[k][k]);
    let maxRow = k;
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

  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let soma = B[i];
    for (let j = i + 1; j < n; j++) {
      soma -= A[i][j] * x[j];
    }
    x[i] = soma / A[i][i];
  }

  return x;
}
