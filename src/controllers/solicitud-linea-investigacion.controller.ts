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
  LineaInvestigacion,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudLineaInvestigacionController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/linea-investigacion', {
    responses: {
      '200': {
        description: 'LineaInvestigacion belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LineaInvestigacion)},
          },
        },
      },
    },
  })
  async getLineaInvestigacion(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<LineaInvestigacion> {
    return this.solicitudRepository.solicitud_tiene_lineaInvestigacion(id);
  }
}
