//Declaración e inicialización de variables
let presupuesto = 0;
let restante = 0;
let listGastos = [];

//Función para agregar presupuesto.
function agregar() {
    const presupuestoInput = parseInt(document.getElementById('presupuesto').value);3

    //Validación del input de presupuesto debe ser mayor a 0 y no vacío
    if (presupuestoInput <= 0 || isNaN(presupuestoInput)) {
        alert('El presupuesto debe ser un número mayor que 0.');
        return;
    }
    presupuesto = presupuestoInput;
    restante = presupuesto;
    document.getElementById('presupuestoDiv').innerHTML = `Presupuesto: <strong> $${presupuesto}</strong>`;
    document.getElementById('restanteDiv').innerHTML = `Restante: <strong> $${restante}</strong>`;
    document.getElementById('presupuesto').value = ''; // Reiniciar el input de presupuesto
}

//Función para agregar los gastos en base a la cantidad del presupuesto.
function agregarCantidad() {
    const nombreGasto = document.getElementById('nombreGasto').value;
    const cantidadGasto = parseInt(document.getElementById('cantidadGasto').value);
    if (nombreGasto === '' || cantidadGasto <= 0 || isNaN(cantidadGasto)) {
        alert('Por favor, ingrese un nombre de gasto válido y una cantidad mayor que 0.');
        return;
    }
    if (cantidadGasto > restante) {
        alert('El gasto no puede ser mayor al presupuesto restante.');
        return;
    }
    const nuevoGasto = { nombre: nombreGasto, cantidad: cantidadGasto };
    listGastos.push(nuevoGasto);
    restante -= cantidadGasto;
    document.getElementById('restanteDiv').innerHTML = `Restante: <strong> $${restante}</strong>`;
    document.getElementById('nombreGasto').value = ''; // Reiniciar el input de nombre de gasto
    document.getElementById('cantidadGasto').value = ''; // Reiniciar el input de cantidad de gasto

    // Agregar nuevo gasto a la lista
    const listaGastos = document.getElementById('listaGastos');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.innerHTML = `<strong class="texto">${nombreGasto}</strong><span class="badge rounded-pill bg-secondary">$${cantidadGasto}</span>`;
    listaGastos.appendChild(li);
}
