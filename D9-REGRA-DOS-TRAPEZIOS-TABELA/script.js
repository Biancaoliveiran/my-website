function gerarTabela() {
  const k = parseInt(document.getElementById("numPontos").value);
  let html = '<table><tr><td>x</td>';
  for (let i = 0; i < k; i++) html += `<td><input type='number' step='any' id='x${i}'></td>`;
  html += '</tr><tr><td>f(x)</td>';
  for (let i = 0; i < k; i++) html += `<td><input type='number' step='any' id='y${i}'></td>`;
  html += '</tr></table>';
  document.getElementById("entrada").innerHTML = html;
}

function calcularIntegral() {
  const k = parseInt(document.getElementById("numPontos").value);
  const x = [], y = [];
  for (let i = 0; i < k; i++) {
    const xi = parseFloat(document.getElementById(`x${i}`).value);
    const yi = parseFloat(document.getElementById(`y${i}`).value);
    if (isNaN(xi) || isNaN(yi)) {
      alert("Preencha todos os valores!");
      return;
    }
    x.push(xi);
    y.push(yi);
  }

  let integral = 0;
  for (let i = 1; i < k; i++) {
    const h = x[i] - x[i - 1];
    integral += (h / 2) * (y[i - 1] + y[i]);
  }

  document.getElementById("saida").textContent = "Integral aproximada: " + integral.toFixed(6);
}