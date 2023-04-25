// Obtener valores del formulario
function calcularInteresCompuesto() {
	let capitalInicial = parseFloat(document.getElementById("capitalInicial").value);
	let tasaInteres = parseFloat(document.getElementById("tasaInteres").value) / 100;
	let tiempoInversion = parseFloat(document.getElementById("tiempoInversion").value);
	let capitalMensual = parseFloat(document.getElementById("capitalMensual").value);
// Calcular interés compuesto
	let capitalFinal = capitalInicial;
	for (let i = 1; i <= tiempoInversion * 12; i++) {
		let interes = capitalFinal * (tasaInteres / 12);
		capitalFinal += interes;
		capitalFinal += capitalMensual;
	}
// Validar valores
	if (isNaN(capitalInicial) || isNaN(tasaInteres) || isNaN(tiempoInversion) || isNaN(capitalMensual)) {
		alert("Por favor ingrese valores numéricos para todos los campos.");
		return;
	}
	if (capitalInicial <= 0 || tasaInteres <= 0 || tiempoInversion <= 0 || capitalMensual < 0) {
		alert("Los valores ingresados deben ser mayores que cero.");
		return;
	}
// Mostrar resultado
	let resultadoDiv = document.getElementById("resultado");
	resultadoDiv.style.display = "block";
	resultadoDiv.innerHTML = "<h2>Resultado:</h2><p>Capital final: $" + capitalFinal.toFixed(2) + "</p>";
}

// Reiniciar formulario y resultado
function reiniciarSimulador() {
	document.getElementById("formulario").reset();
	document.getElementById("resultado").style.display = "none";
}

