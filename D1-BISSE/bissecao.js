
function calcular() {
    const fstr = document.getElementById("func").value;  //LE A FUNCAO    Lê o texto da função (como "Math.pow(x,3)-20"), Pega o valor digitado"Math.pow(x,3)-20") e guarda em fstr
    const a = parseFloat(document.getElementById("a").value);     //Converte os valores de a, b  //Lê o valor do campo com id="a" (extremo inferior do intervalo)
    const b = parseFloat(document.getElementById("b").value);       //Faz a mesma coisa para o valor de b (extremo superior)
    const erro = parseFloat(document.getElementById("erro").value);    //Converte de texto para número com parseFloat, Lê o erro alvo, que é uma string  "0.0001"
    const max = parseInt(document.getElementById("max").value);    // número máximo de iterações.  le o numero de int
    const tabela = document.getElementById("tabela").getElementsByTagName("tbody")[0];
    tabela.innerHTML = "";

    const f = (x) => eval(fstr);  //rcia a função f(x) usando eval, que transforma o texto digitado (fstr) em código Js.

    if (f(a) * f(b) > 0) {
        alert("Erro: Escolha outro intervalo com f(a) * f(b) < 0");  //Se f(a)⋅f(b)>0, significa que não há raiz garantida no intervalo, então o algoritmo para.
        return;
    }

    let xa = [a], xb = [b], xm = [], ea = [], k = 0;  //incia as variaveis

    xm[0] = (xa[0] + xb[0]) / 2; // Bissecção    //Calcula o ponto médio da primeira iteração
    ea[0] = Math.abs(f(xm[0]));  //calcula oerro
    adicionarLinha(k, xa[0], xb[0], xm[0], ea[0]);  //Mostra a linha na tabela.

    while (ea[k] > erro && k < max - 1) {   //Continua enquanto o erro for maior que o desejado e inter nao passar do max
        if (f(xa[k]) * f(xm[k]) <= 0) {      //Se a raiz está entre xa e xm, o novo intervalo é [xa, xm];Caso contrário, é [xm, xb].
            xa[k + 1] = xa[k];
            xb[k + 1] = xm[k];
        } else {
            xa[k + 1] = xm[k];
            xb[k + 1] = xb[k];
        }

        k++;                                            //Incrementa k
        xm[k] = (xa[k] + xb[k]) / 2; //  Bissecção      //ponto medio clcx
        ea[k] = Math.abs(f(xm[k]));     //atualiza o errro
        adicionarLinha(k, xa[k], xb[k], xm[k], ea[k]);   //exibe na tabela
    }

    function adicionarLinha(i, x0, x1, x2, err) {      //Adiciona uma nova linha à tabelacom os valores da inter
        const row = tabela.insertRow();
        row.innerHTML = `<td>${i}</td><td>${x0.toFixed(10)}</td><td>${x1.toFixed(10)}</td><td>${x2.toFixed(10)}</td><td>${err.toExponential(5)}</td>`;//10 casas dec
    }
}
