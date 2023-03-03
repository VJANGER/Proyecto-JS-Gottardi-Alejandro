function calcularCuota(monto, cuotas) {
  var tasa = 0.02;
  if (document.getElementById("moneda").value === "dolares") {
    tasa = 0.03;
  }
  var valorCuota = (monto * tasa * Math.pow(1 + tasa, cuotas)) / (Math.pow(1 + tasa, cuotas) - 1);
  return valorCuota.toFixed(2);
}

var ayudaCheckbox = document.getElementById("ayuda");
var monedaSelect = document.getElementById("moneda");

ayudaCheckbox.addEventListener("click", function() {
  if (this.checked) {
    monedaSelect.querySelector('option[value="dolares"]').disabled = true;
  } else {
    monedaSelect.querySelector('option[value="dolares"]').disabled = false;
  }
});

function verificarCreditoOtorgado() {
  // Obtener el array guardado en localStorage
  var creditos = JSON.parse(localStorage.getItem("creditos")) || [];

  // Obtener los datos ingresados por el usuario
  var nombre = document.getElementById("nombre").value;
  var dni = document.getElementById("dni").value;

  // Comprobar si el cliente ya tiene un crédito otorgado
  for (var i = 0; i < creditos.length; i++) {
    if (creditos[i].nombre === nombre && creditos[i].dni === dni) {
      var montoPrestado = creditos[i].monto;
      var plazoPrestado = creditos[i].cuotas;
      var valorCuota = calcularCuota(montoPrestado, plazoPrestado);
      var cuotasRestantes = plazoPrestado - creditos[i].cuotasPagadas;
      var mensaje = "Usted ya tiene un crédito otorgado. Le quedan " + cuotasRestantes + " cuotas de $" + valorCuota + " cada una.";
      var resultadoDiv = document.getElementById("resultado");
      resultadoDiv.innerHTML = mensaje;
      return true;
    }
  }

  // Si no se encuentra un crédito otorgado, guardar los datos en el array
  var monto = document.getElementById("monto").value;
  var cuotas = document.getElementById("cuotas").value;
  var moneda = document.getElementById("moneda").value;
  var ayuda = document.getElementById("ayuda").checked;
  var cuota = calcularCuota(monto, cuotas);
  var fecha = new Date();
  var nuevoCredito = {
    "nombre": nombre,
    "dni": dni,
    "monto": monto,
    "cuotas": cuotas,
    "moneda": moneda,
    "ayuda": ayuda,
    "cuota": cuota,
    "fecha": fecha.toLocaleDateString(),
    "cuotasPagadas": 0
  };
  creditos.push(nuevoCredito);
  localStorage.setItem("creditos", JSON.stringify(creditos));

  // Mostrar el resultado del crédito en el DOM
  var mensaje = "Su crédito ha sido otorgado por un monto de $" + monto + " a un plazo de " + cuotas + " cuotas de $" + cuota + " cada una.";
  var resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = mensaje;
}
