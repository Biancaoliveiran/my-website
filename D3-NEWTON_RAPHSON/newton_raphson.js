function newtonRaphson() {
    const f = new Function("x", "return " + document.getElementById("funcao").value);
    const df = new Function("x", "return " + document.getElementById("derivada").value);
    let x = parseFloat(document.getElementById("x0").value);
    const ea = parseFloat(document.getElementById("erro").value);
    const max_iter = parseInt(document.getElementById("max_iter").value);
    let resultado = "";
    let k = 0;
    let erro = Infinity;

    resultado += "ITERAÇÃO\tx (solução)\tCONVERGÊNCIA\n";
    resultado += `${k}\t${x}\t${Math.abs(f(x))}\n`;

    while (erro > ea && k < max_iter) {
        const x1 = x - f(x) / df(x);
        erro = Math.abs(f(x1));
        k++;
        resultado += `${k}\t${x1}\t${erro}\n`;
        x = x1;
    }

    document.getElementById("resultado").textContent = resultado;
}
