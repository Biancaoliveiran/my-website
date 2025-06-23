function falsaPosicao() {     //Lê os dados da interface
    const f = new Function("x", "return " + document.getElementById("funcao").value);//Converte os campos de a, b, ea, max_iter para números
    let xa = [parseFloat(document.getElementById("a").value)];      //Transforma o texto digitado em uma função f(x)
    let xb = [parseFloat(document.getElementById("b").value)];
    const ea = parseFloat(document.getElementById("ea").value);
    const max_iter = parseInt(document.getElementById("max_iter").value);
    let xm = [];
    let En = [];
    let k = 0;  //Armazena os valores em vetores

    const tbody = document.querySelector("#tabela tbody");   //Limpa a tabela anterior
    tbody.innerHTML = "";

    if (f(xa[0]) * f(xb[0]) > 0) {      // Verifica se há raiz no intervalo
        const row = tbody.insertRow();
        row.innerHTML = `<td colspan="5">Erro: Escolha outro intervalo com f(a)*f(b) &lt; 0</td>`;   //Se f(a)⋅f(b)>0, não há mudança de sinal = a função não garante raiz=exibe erro.
        return;
    }

    xm[0] = (xb[0]*f(xa[0]) - xa[0]*f(xb[0])) / (f(xa[0]) - f(xb[0]));   //Calcula o ponto de interseção da reta que liga (a, f(a)) a (b, f(b)) com o eixo x.
    En[0] = Math.abs(f(xm[0]));     //Salva o erro como∣f(xm)∣
    adicionarLinha(k, xa[0], xb[0], xm[0], En[0]);//mostra a linha na tabel

    while (En[k] > ea && k < max_iter - 1) {     //Enquanto o erro for maior que o desejado, o código:
        k++;
        if (f(xa[k - 1]) * f(xm[k - 1]) <= 0) {
            xa[k] = xa[k - 1];
            xb[k] = xm[k - 1];
        } else {
            xa[k] = xm[k - 1];
            xb[k] = xb[k - 1];
        }

        xm[k] = (xb[k]*f(xa[k]) - xa[k]*f(xb[k])) / (f(xa[k]) - f(xb[k]));   //calcua um novo xm , atualiza xa xb 
        En[k] = Math.abs(f(xm[k]));     //um novo erro
        adicionarLinha(k, xa[k], xb[k], xm[k], En[k]);  //mostra tudo na atbela
    }

    function adicionarLinha(i, a, b, m, err) {   // insere linhas na tabela:
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${i}</td>
            <td>${a.toFixed(10)}</td>
            <td>${b.toFixed(10)}</td>
            <td>${m.toFixed(10)}</td>
            <td>${err.toExponential(5)}</td>
        `;
    }
}
