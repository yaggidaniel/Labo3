document.addEventListener('DOMContentLoaded', () => {
  class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
      this.id = id;
      this.modelo = modelo;
      this.anoFab = anoFab;
      this.velMax = velMax;
    }

    toString() {
      return `ID: ${this.id}, Modelo: ${this.modelo}, Año de fabricación: ${this.anoFab}, Velocidad máxima: ${this.velMax}`;
    }

    toJson() {
      return JSON.stringify(this);
    }
  }

  class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
      super(id, modelo, anoFab, velMax);

      if (typeof altMax !== 'number' || altMax <= 0) {
        throw new Error('La altitud máxima debe ser un número mayor a cero.');
      }

      if (typeof autonomia !== 'number' || autonomia <= 0) {
        throw new Error('La autonomía debe ser un número mayor a cero.');
      }

      this.altMax = altMax;
      this.autonomia = autonomia;
    }

    toString() {
      return `${super.toString()}, Altitud máxima: ${this.altMax}, Autonomía: ${this.autonomia}`;
    }

    toJson() {
      return JSON.stringify(this);
    }
  }

  class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
      super(id, modelo, anoFab, velMax);

      if (typeof cantPue !== 'number' || cantPue <= 0) {
        throw new Error('Las puertas deben ser un número mayor a cero.');
      }

      if (typeof cantRue !== 'number' || cantRue <= 0) {
        throw new Error('El número de ruedas no puede ser igual a cero');
      }

      this.cantPue = cantPue;
      this.cantRue = cantRue;
    }

    toString() {
      return `${super.toString()}, Puertas: ${this.cantPue}, Ruedas: ${this.cantRue}`;
    }

    toJson() {
      return JSON.stringify(this);
    }
  }

  const aereo = [];
  const terrestre = [];

  const data = [
    {
      "id": 14,
      "modelo": "Ferrari F100",
      "anoFab": 1998,
      "velMax": 400,
      "cantPue": 2,
      "cantRue": 4
    },
    {
      "id": 51,
      "modelo": "Dodge Viper",
      "anoFab": 1991,
      "velMax": 266,
      "cantPue": 2,
      "cantRue": 4
    },
    {
      "id": 67,
      "modelo": "Boeing CH-47 Chinook",
      "anoFab": 1962,
      "velMax": 302,
      "altMax": 6,
      "autonomia": 1200
    },
    {
      "id": 666,
      "modelo": "Aprilia RSV 1000 R",
      "anoFab": 2004,
      "velMax": 280,
      "cantPue": 0,
      "cantRue": 2
    },
    {
      "id": 872,
      "modelo": "Boeing 747-400",
      "anoFab": 1989,
      "velMax": 988,
      "altMax": 13,
      "autonomia": 13450
    },
    {
      "id": 742,
      "modelo": "Cessna CH-1 SkyhookR",
      "anoFab": 1953,
      "velMax": 174,
      "altMax": 3,
      "autonomia": 870
    }
  ];

  data.forEach((item) => {
    if ("cantPue" in item && item.cantPue > 0) {
      const vehiculoTerrestre = new Terrestre(item.id, item.modelo, item.anoFab, item.velMax, item.cantPue, item.cantRue);
      terrestre.push(vehiculoTerrestre);
    } else if ("altMax" in item && typeof item.altMax === 'number' && item.altMax > 0 && "autonomia" in item && typeof item.autonomia === 'number' && item.autonomia > 0) {
      const vehiculoAereo = new Aereo(item.id, item.modelo, item.anoFab, item.velMax, item.altMax, item.autonomia);
      aereo.push(vehiculoAereo);
    }
  });
  
  

  console.log(terrestre); // Contiene instancias de Terrestre
  console.log(aereo); // Contiene instancias de Aereo

  let itemEditado = null;

  const tablaData = document.getElementById('tablaData');
  const filtro = document.getElementById('filtro');
  const checks = document.getElementById('checks');
  const cabecera = document.getElementById('cabecera');
  const dataDiv = document.getElementsByClassName('data')[0];
  const formAereo = document.getElementById('aereo');
  const formTerrestre = document.getElementById('terrestre');
  const btnAgregar = document.getElementById('btnAgregar');

  const formularioAereo = document.getElementById('formularioAereo');
  const formularioTerrestre = document.getElementById('formularioTerrestre');
  const btnAddAereo = document.getElementById('btnAddAereo');
  const btnAddTerrestre = document.getElementById('btnAddTerrestre');
  const bntDeleteAereo = document.getElementById('bntDeleteAereo');
  const bntDeleteTerrestre = document.getElementById('bntDeleteTerrestre');
  const cancelarTerrestre = document.getElementById('cancelarTerrestre');
  const cancelarAereo = document.getElementById('cancelarAereo');

  
  const showAdd = (tipo) => {
    if (tipo === 'terrestre') {
      dataDiv.classList.add('hidden');
      formAereo.classList.add('hidden');
      formTerrestre.classList.remove('hidden');
    } else {
      dataDiv.classList.add('hidden');
      formTerrestre.classList.add('hidden');
      formAereo.classList.remove('hidden');
    }
  }

  const showData = () => {
    if (dataDiv) {
      dataDiv.classList.remove('hidden');
    }
    if (formAereo) {
      formAereo.classList.add('hidden');
    }
    if (formTerrestre) {
      formTerrestre.classList.add('hidden');
    }
  }

  if (btnAgregar) {
    btnAgregar.addEventListener('click', () => {
      if (filtro.value) {
        showAdd(filtro.value);
      }
    });
  }

  if (cancelarTerrestre) {
    cancelarTerrestre.addEventListener('click', () => {
      resetAfterForm(filtro.value);
    });
  }

  if (cancelarAereo) {
    cancelarAereo.addEventListener('click', () => {
      resetAfterForm(filtro.value);
    });
  }

  const setChecks = (tipo) => {
    if (checks) {
      if (tipo === 'aereo') {
        checks.innerHTML = `
          <label>Columnas a mostrar:</label>
          <input type="checkbox" id="chkId" checked> <label for="chkId">ID</label>
          <input type="checkbox" id="chkModelo" checked> <label for="chkModelo">Modelo</label>
          <input type="checkbox" id="chkAnoFab" checked> <label for="chkAnoFab">Año de fabricación</label>
          <input type="checkbox" id="chkVelMax" checked> <label for="chkVelMax">Vel. Max</label>
          <input type="checkbox" id="chkAltMax" checked> <label for="chkAltMax">Alt. Max</label>
          <input type="checkbox" id="chkAutonomia" checked> <label for="chkAutonomia">Autonomia</label>
        `;
      } else {
        checks.innerHTML = `
          <label>Columnas a mostrar:</label>
          <input type="checkbox" id="chkId" checked> <label for="chkId">ID</label>
          <input type="checkbox" id="chkModelo" checked> <label for="chkModelo">Modelo</label>
          <input type="checkbox" id="chkAnoFab" checked> <label for="chkAnoFab">Año de fabricación</label>
          <input type="checkbox" id="chkVelMax" checked> <label for="chkVelMax">Vel. Max</label>
          <input type="checkbox" id="chkCantRue" checked> <label for="chkCantRue">Ruedas</label>
          <input type="checkbox" id="chkCantPue" checked> <label for="chkCantPue">Puertas</label>
        `;
      }
    }

    const cbox = document.querySelectorAll('input[type=checkbox]');
    for (const element of cbox) {
      element.addEventListener("click", (e) => {
        resetTable();
        armarCabecera(filtro?.value);
        agregarFilas(filtro?.value);
      });
    }
  }

  const armarCabecera = (tipo) => {
    const cabecera = document.getElementById('cabecera');
    if (cabecera) {
      const chkId = document.getElementById('chkId');
      const chkModelo = document.getElementById('chkModelo');
      const chkAnoFab = document.getElementById('chkAnoFab');
      const chkVelMax = document.getElementById('chkVelMax');
      const chkAltMax = document.getElementById('chkAltMax');
      const chkAutonomia = document.getElementById('chkAutonomia');
      const chkCantRue = document.getElementById('chkCantRue');
      const chkCantPue = document.getElementById('chkCantPue');

      const crearCabecera = (titulo) => {
        const th = document.createElement('th');
        th.innerHTML = titulo;
        return th;
      }

      if (chkId) chkId.checked ? cabecera.append(crearCabecera('ID')) : null;
      if (chkModelo) chkModelo.checked ? cabecera.append(crearCabecera('Modelo')) : null;
      if (chkAnoFab) chkAnoFab.checked ? cabecera.append(crearCabecera('Año Fab')) : null;
      if (chkVelMax) chkVelMax.checked ? cabecera.append(crearCabecera('Vel. max')) : null;

      if (tipo === 'aereo') {
        if (chkAltMax) chkAltMax.checked ? cabecera.append(crearCabecera('Alt. Max')) : null;
        if (chkAutonomia) chkAutonomia.checked ? cabecera.append(crearCabecera('Autonomia')) : null;
      } else {
        if (chkCantRue) chkCantRue.checked ? cabecera.append(crearCabecera('Ruedas')) : null;
        if (chkCantPue) chkCantPue.checked ? cabecera.append(crearCabecera('Puertas')) : null;
      }
    }
  }

  const agregarFilas = (tipo) => {
    const tablaData = document.getElementById('tablaData');
    const chkId = document.getElementById('chkId').checked;
    const chkModelo = document.getElementById('chkModelo').checked;
    const chkAnoFab = document.getElementById('chkAnoFab').checked;
    const chkVelMax = document.getElementById('chkVelMax').checked;
    const chkAltMax = document.getElementById('chkAltMax')?.checked;
    const chkAutonomia = document.getElementById('chkAutonomia')?.checked;
    const chkCantRue = document.getElementById('chkCantRue')?.checked;
    const chkCantPue = document.getElementById('chkCantPue')?.checked;

    const source = tipo === 'aereo' ? aereo : terrestre;

    source.forEach(item => {
      const fila = document.createElement('tr');
      let data = '';
      if (chkId) data += `<td>${item.id}</td>`;
      if (chkModelo) data += `<td>${item.modelo}</td>`;
      if (chkAnoFab) data += `<td>${item.anoFab}</td>`;
      if (chkVelMax) data += `<td>${item.velMax}</td>`;
      if (chkAltMax && tipo === 'aereo') data += `<td>${item.altMax}</td>`;
      if (chkAutonomia && tipo === 'aereo') data += `<td>${item.autonomia}</td>`;
      if (chkCantRue && tipo === 'terrestre') data += `<td>${item.cantRue}</td>`;
      if (chkCantPue && tipo === 'terrestre') data += `<td>${item.cantPue}</td>`;

      fila.innerHTML = data;

      fila.addEventListener('click', () => {
        selectRow(item, tipo);
      });

      tablaData.appendChild(fila);
    });
  }


  const resetTable = () => {
    const tablaData = document.getElementById('tablaData');
    if (tablaData) {
      tablaData.innerHTML = '';
    }
    const cabecera = document.getElementById('cabecera');
    if (cabecera) {
      cabecera.innerHTML = ''; // Limpia la cabecera también
    }
  }


  const resetAfterForm = (tipo) => {
    resetTable();
    setChecks(tipo);
    armarCabecera(tipo);
    agregarFilas(tipo);
    showData();
    itemEditado = null;
  }

  const selectRow = (item, tipo) => {
    itemEditado = item;
    showAdd(tipo); 
    if (tipo === 'aereo') {
      formularioAereo.idAereo.value = item.id;
      formularioAereo.modeloAereo.value = item.modelo;
      formularioAereo.anoFabAereo.value = item.anoFab;
      formularioAereo.velMaxAereo.value = item.velMax;
      formularioAereo.altMaxAereo.value = item.altMax;
      formularioAereo.autonomiaAereo.value = item.autonomia;
    } else {
      formularioTerrestre.idTerrestre.value = item.id;
      formularioTerrestre.modeloTerrestre.value = item.modelo;
      formularioTerrestre.anoFabTerrestre.value = item.anoFab;
      formularioTerrestre.velMaxTerrestre.value = item.velMax;
      formularioTerrestre.cantRueTerrestre.value = item.cantRue;
      formularioTerrestre.cantPueTerrestre.value = item.cantPue;
    }
  }

  const actualizarFila = (tipo) => {
    if (tipo === 'aereo') {
      const index = aereo.findIndex(x => x.id === itemEditado.id);
      aereo[index].id = formularioAereo.idAereo.value;
      aereo[index].modelo = formularioAereo.modeloAereo.value;
      aereo[index].anoFab = formularioAereo.anoFabAereo.value;
      aereo[index].velMax = formularioAereo.velMaxAereo.value;
      aereo[index].altMax = formularioAereo.altMaxAereo.value;
      aereo[index].autonomia = formularioAereo.autonomiaAereo.value;
    } else {
      const index = terrestre.findIndex(x => x.id === itemEditado.id);
      terrestre[index].id = formularioTerrestre.idTerrestre.value;
      terrestre[index].modelo = formularioTerrestre.modeloTerrestre.value;
      terrestre[index].anoFab = formularioTerrestre.anoFabTerrestre.value;
      terrestre[index].velMax = formularioTerrestre.velMaxTerrestre.value;
      terrestre[index].cantRue = formularioTerrestre.cantRueTerrestre.value;
      terrestre[index].cantPue = formularioTerrestre.cantPueTerrestre.value;
    }
  }

  const agregarFila = (tipo) => {
    if (tipo === 'aereo') {
      const aereoNuevo = new Aereo(
        formularioAereo.idAereo.value,
        formularioAereo.modeloAereo.value,
        formularioAereo.anoFabAereo.value,
        formularioAereo.velMaxAereo.value,
        formularioAereo.altMaxAereo.value,
        formularioAereo.autonomiaAereo.value
      );
      aereo.push(aereoNuevo);
    } else {
      const terrestreNuevo = new Terrestre(
        formularioTerrestre.idTerrestre.value,
        formularioTerrestre.modeloTerrestre.value,
        formularioTerrestre.anoFabTerrestre.value,
        formularioTerrestre.velMaxTerrestre.value,
        formularioTerrestre.cantRueTerrestre.value,
        formularioTerrestre.cantPueTerrestre.value
      );
      terrestre.push(terrestreNuevo);
    }
  }

  if (btnAddAereo) {
    btnAddAereo.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Obtén los valores de los campos del formulario de vehículos aéreos
      const id = formularioAereo.idAereo.value;
      const modelo = formularioAereo.modeloAereo.value;
      const anoFab = formularioAereo.anoFabAereo.value;
      const velMax = formularioAereo.velMaxAereo.value;
      const altMax = formularioAereo.altMaxAereo.value;
      const autonomia = formularioAereo.autonomiaAereo.value;
  
      // Limpiar mensajes de error previos y quitar la clase 'error-input'
      document.getElementById('errorMensajeAereo').textContent = '';
  
      const inputId = formularioAereo.idAereo;
      const inputModelo = formularioAereo.modeloAereo;
      const inputAnoFab = formularioAereo.anoFabAereo;
      const inputVelMax = formularioAereo.velMaxAereo;
      const inputAltMax = formularioAereo.altMaxAereo;
      const inputAutonomia = formularioAereo.autonomiaAereo;
  
      inputId.classList.remove('error-input');
      inputModelo.classList.remove('error-input');
      inputAnoFab.classList.remove('error-input');
      inputVelMax.classList.remove('error-input');
      inputAltMax.classList.remove('error-input');
      inputAutonomia.classList.remove('error-input');
  
      // Comprobar campos vacíos y mostrar mensajes de error
      if (!id) {
        document.getElementById('errorMensajeAereo').textContent += 'El ID es obligatorio. ';
        inputId.classList.add('error-input');
      }
  
      if (!modelo) {
        document.getElementById('errorMensajeAereo').textContent += 'El modelo es obligatorio. ';
        inputModelo.classList.add('error-input');
      }
  
      if (!anoFab || isNaN(anoFab) || anoFab <= 1885) {
        document.getElementById('errorMensajeAereo').textContent += 'El año de fabricación debe ser un número mayor a 1885. ';
        inputAnoFab.classList.add('error-input');
      }
  
      if (!velMax || isNaN(velMax) || velMax <= 0) {
        document.getElementById('errorMensajeAereo').textContent += 'La velocidad máxima debe ser un número positivo. ';
        inputVelMax.classList.add('error-input');
      }
  
      if (!altMax || isNaN(altMax) || altMax <= 0) {
        document.getElementById('errorMensajeAereo').textContent += 'La altitud máxima debe ser un número mayor a cero. ';
        inputAltMax.classList.add('error-input');
      }
  
      if (!autonomia || isNaN(autonomia) || autonomia <= 0) {
        document.getElementById('errorMensajeAereo').textContent += 'La autonomía debe ser un número mayor a cero. ';
        inputAutonomia.classList.add('error-input');
      }
  
      // Verificar si se han mostrado mensajes de error
      if (document.getElementById('errorMensajeAereo').textContent !== '') {
        // Al menos un mensaje de error se ha mostrado
        return;
      }
  
      // Resto del código para agregar el vehículo aéreo
      if (itemEditado) {
        // Actualiza el vehículo aéreo existente
        itemEditado.id = id;
        itemEditado.modelo = modelo;
        itemEditado.anoFab = anoFab;
        itemEditado.velMax = velMax;
        itemEditado.altMax = altMax;
        itemEditado.autonomia = autonomia;
      } else {
        // Crea un nuevo vehículo aéreo
        const nuevoAereo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
        aereo.push(nuevoAereo);
      }
  
      // Limpia los campos del formulario
      formularioAereo.reset();
  
      // Actualiza la tabla de datos de vehículos aéreos
      resetAfterForm('aereo');
    });
  }
  

  if (btnAddTerrestre) {
    btnAddTerrestre.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Obtén los valores de los campos del formulario de vehículos terrestres
      const id = formularioTerrestre.idTerrestre.value;
      const modelo = formularioTerrestre.modeloTerrestre.value;
      const anoFab = formularioTerrestre.anoFabTerrestre.value;
      const velMax = formularioTerrestre.velMaxTerrestre.value;
      const cantRue = formularioTerrestre.cantRueTerrestre.value;
      const cantPue = formularioTerrestre.cantPueTerrestre.value;
  
      // Limpiar mensajes de error previos y quitar la clase 'error-input'
      document.getElementById('errorMensajeTerrestre').textContent = '';
  
      const inputId = formularioTerrestre.idTerrestre;
      const inputModelo = formularioTerrestre.modeloTerrestre;
      const inputAnoFab = formularioTerrestre.anoFabTerrestre;
      const inputVelMax = formularioTerrestre.velMaxTerrestre;
      const inputCantRue = formularioTerrestre.cantRueTerrestre;
      const inputCantPue = formularioTerrestre.cantPueTerrestre;
  
      inputId.classList.remove('error-input');
      inputModelo.classList.remove('error-input');
      inputAnoFab.classList.remove('error-input');
      inputVelMax.classList.remove('error-input');
      inputCantRue.classList.remove('error-input');
      inputCantPue.classList.remove('error-input');
  
      // Comprobar campos vacíos y mostrar mensajes de error
      if (!id) {
        document.getElementById('errorMensajeTerrestre').textContent += 'El ID es obligatorio. ';
        inputId.classList.add('error-input');
      }
  
      if (!modelo) {
        document.getElementById('errorMensajeTerrestre').textContent += 'El modelo es obligatorio. ';
        inputModelo.classList.add('error-input');
      }
  
      if (!anoFab || isNaN(anoFab) || anoFab <= 1885) {
        document.getElementById('errorMensajeTerrestre').textContent += 'El año de fabricación debe ser un número mayor a 1885. ';
        inputAnoFab.classList.add('error-input');
      }
  
      if (!velMax || isNaN(velMax) || velMax <= 0) {
        document.getElementById('errorMensajeTerrestre').textContent += 'La velocidad máxima debe ser un número positivo. ';
        inputVelMax.classList.add('error-input');
      }
  
      if (!cantRue || isNaN(cantRue) || cantRue <= 0) {
        document.getElementById('errorMensajeTerrestre').textContent += 'El número de ruedas debe ser un número mayor a cero. ';
        inputCantRue.classList.add('error-input');
      }
  
      // Validación para las puertas
      if (!cantPue || isNaN(cantPue) || cantPue <= 0) {
        document.getElementById('errorMensajeTerrestre').textContent += 'La cantidad de puertas debe ser un número mayor a cero.';
        inputCantPue.classList.add('error-input');
      } else {
        // Crear la instancia de Terrestre aquí
        const terrestreNuevo = new Terrestre(
          id,
          modelo,
          anoFab,
          velMax,
          cantRue,
          cantPue
        );
        terrestre.push(terrestreNuevo);
        // Resto del código para actualizar la tabla y limpiar el formulario
        resetAfterForm('terrestre');
      }
    });
  }
  

  if (bntDeleteAereo) {
    bntDeleteAereo.addEventListener('click', () => {
      if (itemEditado) {
        const index = aereo.findIndex(x => x.id === itemEditado.id);
        aereo.splice(index, 1);
        resetAfterForm('aereo');
      }
    });
  }

  if (bntDeleteTerrestre) {
    bntDeleteTerrestre.addEventListener('click', () => {
      if (itemEditado) {
        const index = terrestre.findIndex(x => x.id === itemEditado.id);
        terrestre.splice(index, 1);
        resetAfterForm('terrestre');
      }
    });
  }

  if (filtro) {
    filtro.addEventListener('change', () => {
      resetTable();
      setChecks(filtro.value);
      armarCabecera(filtro.value);
      agregarFilas(filtro.value);
    });
  }

  armarCabecera('aereo');
  agregarFilas('aereo');
  setChecks('aereo');
});
