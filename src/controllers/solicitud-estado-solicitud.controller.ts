import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  EstadoSolicitud,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudEstadoSolicitudController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/estado-solicitud', {
    responses: {
      '200': {
        description: 'EstadoSolicitud belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoSolicitud)},
          },
        },
      },
    },
  })
  async getEstadoSolicitud(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<EstadoSolicitud> {
    return this.solicitudRepository.solicitud_tiene_estadoSolicitud(id);
  }
}
