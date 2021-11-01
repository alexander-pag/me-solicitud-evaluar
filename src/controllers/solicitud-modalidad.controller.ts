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
  Modalidad,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudModalidadController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/modalidad', {
    responses: {
      '200': {
        description: 'Modalidad belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Modalidad)},
          },
        },
      },
    },
  })
  async getModalidad(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<Modalidad> {
    return this.solicitudRepository.solicitud_tiene_modalidad(id);
  }
}
