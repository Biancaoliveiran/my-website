function resolverEuler() {
    const g = document.getElementById("gx").value;
    const x0 = parseFloat(document.getElementById("x0").value);
    const y0 = parseFloat(document.getElementById("y0").value);
    const xn = parseFloat(document.getElementById("xn").value);
    const h = parseFloat(document.getElementById("h").value);

    const n = Math.round((xn - x0) / h);
    let vx = [];
    let vy = [];

    vx[0] = x0;
    vy[0] = y0;

    for (let i = 1; i <= n; i++) {
        const x = vx[i - 1];
        const y = vy[i - 1];
        const vg = eval(g);
        vy[i] = y + vg * h;
        vx[i] = x + h;
    }

    const tabela = document.getElementById("resultado");
    tabela.innerHTML = `
        <tr>
            <th>i</th>
            <th>x(i)</th>
            <th>y(i)</th>
        </tr>
    `;
    for (let i = 0; i <= n; i++) {
        const linha = tabela.insertRow();
        linha.insertCell(0).innerText = i;
        linha.insertCell(1).innerText = vx[i].toFixed(6);
        linha.insertCell(2).innerText = vy[i].toFixed(6);
    }
}
