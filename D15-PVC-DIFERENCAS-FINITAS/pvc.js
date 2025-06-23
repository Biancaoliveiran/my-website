
function calcular() {   // será chamada quando o usuário clicar em um botão
    const p = document.getElementById("px").value;
    const q = document.getElementById("qx").value;
    const w = document.getElementById("wx").value;    //Pega as expressões das funções p(x), q(x) e w(x) inseridas pelo usuário nos campos

    const x0 = parseFloat(document.getElementById("x0").value);  //Captura os limites x 0 x n, os valores de contorno y0yne o passo h.
    const xn = parseFloat(document.getElementById("xn").value);
    const y0 = parseFloat(document.getElementById("y0").value);
    const yn = parseFloat(document.getElementById("yn").value);
    const h = parseFloat(document.getElementById("h").value);

    const n = Math.round((xn - x0) / h);
    const x = [], a = [], b = [], c = [], d = [];  //Calcula o número de subintervalos n, e inicializa os vetores
    for (let i = 1; i < n; i++) {     //Substitui x por x[i] nas expressões.
        x[i] = x0 + i * h;
        const pi = eval(p.replace(/x/g, x[i]));
        const qi = eval(q.replace(/x/g, x[i]));
        const wi = eval(w.replace(/x/g, x[i]));
         //clcula ai bi ci e di p o sistema lin
        a[i] = 1 - (h * pi) / 2;
        b[i] = -2 + h * h * qi;
        c[i] = 1 + (h * pi) / 2;
        d[i] = -h * h * wi;
    }

    const A = [], D = [];    // Montagem da matriz tridiagonal A e vetor D
    for (let i = 1; i < n; i++) {
        A[i] = [];
        for (let j = 1; j < n; j++) {
            A[i][j] = 0;
        }
        A[i][i] = b[i];
        if (i > 1) A[i][i - 1] = a[i];
        if (i < n - 1) A[i][i + 1] = c[i];
    }

    D[1] = d[1] - a[1] * y0;    //Monta o vetor do lado direito D, aplicando as condições de contorno nos extremos.
    for (let i = 2; i < n - 1; i++) {
        D[i] = d[i];
    }
    D[n - 1] = d[n - 1] - c[n - 1] * yn;

   const yInterno = resolverSistema(A, D, n - 1);    // Resolução do sistema linear   . Chama a função que resolve o sistema A⋅y=D usando método LU.

const y = [];   // Montagem do vetor solução y ,Insere os valores de contorno y 0e yn, e preenche o vetor total de y com os resultados calculados.
y[0] = y0;
for (let i = 1; i < n; i++) {
    y[i] = yInterno[i];
}
y[n] = yn;

let saida = "<table><tr><th>i</th><th>x(i)</th><th>y(i)</th></tr>";   //Cria uma tabela com os pares xi yi
for (let i = 0; i <= n; i++) {
    const xi = (x0 + i * h).toFixed(4);
    const yi = y[i] ? y[i].toFixed(6) : "0.000000";
    saida += `<tr><td>${i}</td><td>${xi}</td><td>${yi}</td></tr>`;
}
saida += "</table>";
document.getElementById("resultado").innerHTML = saida;   //resulatdo

}

function resolverSistema(A, b, n) {    //Esta função resolve o sistema tridiagonal A⋅x=b.
    const x = Array(n + 1).fill(0);    //Inicializa vetores auxiliares usados na decomposição LU.
    const l = Array(n + 1).fill(0);
    const u = Array(n + 1).fill(0);
    const z = Array(n + 1).fill(0);

    l[1] = A[1][1];
    u[1] = A[1][2] / l[1];
    z[1] = b[1] / l[1];   
	//Inicia a decomposição com o primeiro elemento da matriz.

    for (let i = 2; i < n; i++) {
        l[i] = A[i][i] - A[i][i - 1] * u[i - 1];
        u[i] = A[i][i + 1] / l[i];
        z[i] = (b[i] - A[i][i - 1] * z[i - 1]) / l[i];
    }
//Executa a decomposição LU para o restante da matriz.
    l[n] = A[n][n] - A[n][n - 1] * u[n - 1];
    z[n] = (b[n] - A[n][n - 1] * z[n - 1]) / l[n];
    x[n] = z[n];
//Calcula o último valor de x por substituição direta.
    for (let i = n - 1; i >= 1; i--) {
        x[i] = z[i] - u[i] * x[i + 1];
    }

    return x;  //Retorna o vetor solução.  //Esse vetor x contém esses valores internos da solução numérica da equação diferencial. 
}
