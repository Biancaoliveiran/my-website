
function calcular() {
  let fxInput = document.getElementById("fx").value;  //pega a expressão da função f(x) digitada pelo usuário.
  let x0 = parseFloat(document.getElementById("x0").value);  // ponto onde será calculada a derivada.
  let h = parseFloat(document.getElementById("h").value);  //(passo) usado para as diferenças finitas.

  let f = function(x) {
    try {
      return eval(fxInput); //Define a função f(x) usando eval, que avalia o texto digitado como código JavaS
    } catch {
      return NaN;  //Se ocorrer erro, a função retorna NaN (valor inválido).
    }
  };

  let f_x0 = f(x0);
  let f_xph = f(x0 + h);
  let f_xmh = f(x0 - h);    //Calcula os valores da função nos pontos

  let df_asc = (f_xph - f_x0) / h;
  let df_desc = (f_x0 - f_xmh) / h; // CALCULO DAS DERIVADAS
  let df_cent = (f_xph - f_xmh) / (2 * h);
  let d2f_cent = (f_xph - 2 * f_x0 + f_xmh) / (h * h);

  let saida = \`
    <strong>f(x):</strong> \${fxInput}<br>     //EXIBE OS RESULTADOS
    <strong>x0:</strong> \${x0} | <strong>h:</strong> \${h}<br><br>
    <strong>1ª derivada por diferença ASCENDENTE:</strong> \${df_asc.toFixed(6)}<br>    //6 CASAS DECIM
    <strong>1ª derivada por diferença DESCENDENTE:</strong> \${df_desc.toFixed(6)}<br>
    <strong>1ª derivada por diferença CENTRAL:</strong> \${df_cent.toFixed(6)}<br><br>
    <strong>2ª derivada por diferença CENTRAL:</strong> \${d2f_cent.toFixed(6)}
  \`;

  document.getElementById("resultado").innerHTML = saida;
}
