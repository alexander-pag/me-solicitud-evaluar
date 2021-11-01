import {Model, model, property} from '@loopback/repository';

@model()
export class RespuestaJurado extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  respuesta: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;


  constructor(data?: Partial<RespuestaJurado>) {
    super(data);
  }
}

export interface RespuestaJuradoRelations {
  // describe navigational properties here
}

export type RespuestaJuradoWithRelations = RespuestaJurado & RespuestaJuradoRelations;
