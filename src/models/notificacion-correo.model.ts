import {Model, model, property} from '@loopback/repository';

@model()
export class NotificacionCorreo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  destinatario: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;


  constructor(data?: Partial<NotificacionCorreo>) {
    super(data);
  }
}

export interface NotificacionCorreoRelations {
  // describe navigational properties here
}

export type NotificacionCorreoWithRelations = NotificacionCorreo & NotificacionCorreoRelations;
