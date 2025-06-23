function calcular() {      //Lê os valores de entrada: a, b, n e a função como texto fstr
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const n = parseInt(document.getElementById("n").value);
  let fstr = document.getElementById("funcao").value.trim();  //fstr le a funcao

  // Verifica se a função é válida e segura
  let f;
  try {  //tenta executar um bloco de código que pode dar erro.
    // Se for apenas "x", interpreta como função identidade
    if (fstr === "x") fstr = "x";   //lendo a funcao 
    f = new Function("x", "return " + fstr);         //Usa new function("x", "return " + fstr) para criar uma função a partir do texto digitado.
    f((a + b) / 2); // testa    //avalia a funçao no ponto media 
  } catch {  //se dder erro o codigo catch interrompe e executa novamnete
    alert("Função inválida! Use sintaxe JS válida como x*x, Math.sin(x), math.exp(x) etc."); //exibe um alerta e interrompe o cálculo.
    return;
  }

  const h = (b - a) / n;    //Divide o intervalo [a, b] em n subintervalos com tamanho h.
  let integral = 0;
  for (let i = 0; i < n; i++) {
    const xi = a + i * h;
    const xi1 = xi + h;  //Para cada subintervalo calcula a área do trapézio:
    integral += (h / 2) * (f(xi) + f(xi1));//oma todas as áreas na variável integra
  }

  document.getElementById("saida").textContent = "Integral aproximada: " + integral.toFixed(6);   //mostra a integral com 6 casas decim
}
