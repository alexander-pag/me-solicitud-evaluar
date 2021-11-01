import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Facultad} from './facultad.model';

@model(/**{
  settings: {
    foreignKeys: {
      fk_departamente_id_facultad: {
        name: 'fk_departamente_id_facultad',
        entity: 'Facultad',
        entityKey: 'id',
        foreignKey: 'id_facultad',
      }
    },
  },
}*/)
export class Departamento extends Entity {
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

  @belongsTo(() => Facultad, {name: 'facultad'})
  id_facultad: number;

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
