// Valores ingresados por el usuario
function calcularInteresCompuesto() {
    let capital = parseFloat(document.getElementById("capital").value);
    let tasa = parseFloat(document.getElementById("tasa").value);
    let tiempo = parseInt(document.getElementById("tiempo").value);
// Verificar que los valores ingresados sean válidos
    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo)) {
        alert("Por favor, ingrese valores numéricos válidos.");
        return;
    }
    let monto = calcularMontoTotal(capital, tasa, tiempo);
    let interes = calcularInteresTotal(monto, capital);
    document.getElementById("resultado-monto").innerHTML = "Monto total: $" + monto.toFixed(2);
    document.getElementById("resultado-interes").innerHTML = "Interés total: $" + interes.toFixed(2);
}

// Calcular el interés compuesto
function calcularMontoTotal(capital, tasa, tiempo) {
    return capital * Math.pow(1 + (tasa / 100), tiempo);
}

function calcularInteresTotal(monto, capital) {
    return monto - capital;
}

function reiniciarSimulador() {
    document.getElementById("capital").value = "";
    document.getElementById("tasa").value = "";
    document.getElementById("tiempo").value = "";
    document.getElementById("resultado-monto").innerHTML = "";
    document.getElementById("resultado-interes").innerHTML = "";
}