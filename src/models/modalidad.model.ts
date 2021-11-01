import {Entity, model, property} from '@loopback/repository';

@model()
export class Modalidad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<Modalidad>) {
    super(data);
  }
}

export interface ModalidadRelations {
  // describe navigational properties here
}

export type ModalidadWithRelations = Modalidad & ModalidadRelations;
