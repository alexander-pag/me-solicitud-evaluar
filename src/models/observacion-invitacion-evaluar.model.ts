import {Model, model, property} from '@loopback/repository';

@model()
export class ObservacionInvitacionEvaluar extends Model {
  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @property({
    type: 'date',
    required: true
  })
  fecha_respuesta: string;


  constructor(data?: Partial<ObservacionInvitacionEvaluar>) {
    super(data);
  }
}

export interface ObservacionInvitacionEvaluarRelations {
  // describe navigational properties here
}

export type ObservacionInvitacionEvaluarWithRelations = ObservacionInvitacionEvaluar & ObservacionInvitacionEvaluarRelations;
