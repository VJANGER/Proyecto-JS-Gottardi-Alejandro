function calcularCuota(monto, cuotas) {
  let tasa = "0.1";
  if (document.getElementById("moneda").value === "dolares") {
    tasa = "0.05";
  }
  let valorCuota = (monto * tasa * Math.pow(1 + tasa, cuotas)) / (Math.pow(1 + tasa, cuotas) - 1);
  return valorCuota.toFixed(2);
}

let ayudaCheckbox = document.getElementById("ayuda");
let monedaSelect = document.getElementById("moneda");

ayudaCheckbox.addEventListener("click", function() {
  if (this.checked) {
    monedaSelect.querySelector('option[value="dolares"]').disabled = true;
  } else {
    monedaSelect.querySelector('option[value="dolares"]').disabled = false;
  }
});

function verificarCreditoOtorgado() {
  let creditos = JSON.parse(localStorage.getItem("creditos")) || [];
  console.log(creditos)
  let nombre = document.getElementById("nombre").value;
  let dni = document.getElementById("dni").value;
  for (let i = 0; i < creditos.length; i++) {
    if (creditos[i].nombre === nombre && creditos[i].dni === dni) {
      let montoPrestado = creditos[i].monto;
      let plazoPrestado = creditos[i].cuotas;
      let valorCuota = calcularCuota(montoPrestado, plazoPrestado);
      let cuotasRestantes = plazoPrestado - creditos[i].cuotasPagadas;
      let mensaje =  "Usted ya tiene un crédito otorgado. Le quedan " + cuotasRestantes + " cuotas de $" + valorCuota + " cada una.";
      let resultadoDiv = document.getElementById("resultado");
      resultadoDiv.innerHTML = mensaje;
      return true;
    }
  }
  let monto = document.getElementById("monto").value;
  let cuotas = document.getElementById("cuotas").value;
  let moneda = document.getElementById("moneda").value;
  let ayuda = document.getElementById("ayuda").checked;
  let cuota = calcularCuota(monto, cuotas);
  let fecha = new Date();
  let nuevoCredito = {
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
  console.log(nuevoCredito)
  let mensaje = "Su crédito ha sido otorgado por un monto de $" + monto + " a un plazo de " + cuotas + " cuotas de $" + cuota + " cada una.";
  let resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = mensaje;
}
