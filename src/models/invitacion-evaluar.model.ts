import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Jurado} from './jurado.model';
import {Solicitud} from './solicitud.model';

@model()
export class InvitacionEvaluar extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_invitacion: string;

  @property({
    type: 'date',
  })
  fecha_respuesta?: string;

  @property({
    type: 'number',
    default: 1
  })
  estado_invitacion?: number;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @belongsTo(() => Solicitud, {name: 'invitacion_tiene_solicitud'})
  id_solicitud: number;

  @belongsTo(() => Jurado, {name: 'invitacion_tiene_jurado'})
  id_jurado: number;

  constructor(data?: Partial<InvitacionEvaluar>) {
    super(data);
  }
}

export interface InvitacionEvaluarRelations {
  // describe navigational properties here
}

export type InvitacionEvaluarWithRelations = InvitacionEvaluar & InvitacionEvaluarRelations;
