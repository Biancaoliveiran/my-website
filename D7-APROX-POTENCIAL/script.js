
function gerarTabela() {
  const n = parseInt(document.getElementById("numPontos").value);
  const entradaDiv = document.getElementById("entrada");
  let html = '<table><tr><td>x</td>';
  for (let i = 0; i < n; i++) html += `<td><input type='number' step='any' id='x${i}'></td>`;
  html += '</tr><tr><td>y</td>';
  for (let i = 0; i < n; i++) html += `<td><input type='number' step='any' id='y${i}'></td>`;
  html += '</tr></table>';
  entradaDiv.innerHTML = html;
}

function calcularPotencial() {
  const n = parseInt(document.getElementById("numPontos").value);
  const x = [], y = [];

  for (let i = 0; i < n; i++) {
    const xi = parseFloat(document.getElementById(`x${i}`).value);
    const yi = parseFloat(document.getElementById(`y${i}`).value);
    if (isNaN(xi) || isNaN(yi) || xi <= 0 || yi <= 0) {
      alert("Todos os valores de x e y devem ser positivos!");
      return;
    }
    x.push(Math.log(xi));
    y.push(Math.log(yi));
  }

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);

  const b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const lnA = (sumY - b * sumX) / n;
  const a = Math.exp(lnA);

  const resultado = `Função aproximadora potencial:\nf(x) = ${a.toFixed(6)} * x^${b.toFixed(6)}`;
  document.getElementById("saida").textContent = resultado;
}
