function resolverRK2() {
    const gx = document.getElementById("gx").value;
    const x0 = parseFloat(document.getElementById("x0").value);
    const y0 = parseFloat(document.getElementById("y0").value);
    const xn = parseFloat(document.getElementById("xn").value);
    const h = parseFloat(document.getElementById("h").value);

    const n = Math.round((xn - x0) / h);
    let vx = [], vy = [];

    vx[0] = x0;
    vy[0] = y0;

    // Define a função g(x, y) dinamicamente usando Function/eval()
    const g = new Function('x', 'y', `return ${gx};`);

    for (let i = 1; i <= n; i++) {
        const xi = vx[i - 1];
        const yi = vy[i - 1];

        const k1 = g(xi, yi);
        const k2 = g(xi + h, yi + h * k1);

        vy[i] = yi + (h / 2) * (k1 + k2);
        vx[i] = xi + h;
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
