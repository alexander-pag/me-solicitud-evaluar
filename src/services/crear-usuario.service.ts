import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Configuracion} from '../llaves/config';
import {Jurado} from '../models';
const fetch = require('node-fetch')

@injectable({scope: BindingScope.TRANSIENT})
export class CrearUsuarioService {
  constructor(/* Add @inject to inject parameters */) { }

  async CrearUsuario(datos: Jurado) {
    const body = {
      nombre: datos.nombre, apellido: datos.apellido, celular: datos.telefono,
      correo: datos.correo, documento: datos.documento, fechaNacimiento: datos.fechaNacimiento
    };

    const response = await fetch(`${Configuracion.urlMsUsuario}`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    });
    //const data = await response.json();

    //console.log(data);
  }

  async BuscarUsuarios() {
    const response = await fetch(`${Configuracion.urlBuscarUsuario}`)
    const data = await response.json();

    console.log(data);
  }

}
