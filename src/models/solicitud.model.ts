import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Proponente} from './proponente.model';
import {SolicitudProponente} from './solicitud-proponente.model';
import {EstadoSolicitud} from './estado-solicitud.model';
import {TipoSolicitud} from './tipo-solicitud.model';
import {Modalidad} from './modalidad.model';
import {LineaInvestigacion} from './linea-investigacion.model';

@model()
export class Solicitud extends Entity {
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
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreTrabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  archivo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Proponente, {through: {model: () => SolicitudProponente, keyFrom: 'id_solicitud', keyTo: 'id_proponente'}})
  proponentes: Proponente[];

  @belongsTo(() => EstadoSolicitud, {name: 'solicitud_tiene_estadoSolicitud'})
  id_estadoSolicitud: number;

  @belongsTo(() => TipoSolicitud, {name: 'solicitud_tiene_tipoSolicitud'})
  id_tipoSolicitud: number;

  @belongsTo(() => Modalidad, {name: 'solicitud_tiene_modalidad'})
  id_modalidad: number;

  @belongsTo(() => LineaInvestigacion, {name: 'solicitud_tiene_lineaInvestigacion'})
  id_lineaInvestigacion: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
