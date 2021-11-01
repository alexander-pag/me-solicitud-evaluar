import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proponente,
  TipoVinculacion,
} from '../models';
import {ProponenteRepository} from '../repositories';

export class ProponenteTipoVinculacionController {
  constructor(
    @repository(ProponenteRepository)
    public proponenteRepository: ProponenteRepository,
  ) { }

  @get('/proponentes/{id}/tipo-vinculacion', {
    responses: {
      '200': {
        description: 'TipoVinculacion belonging to Proponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoVinculacion)},
          },
        },
      },
    },
  })
  async getTipoVinculacion(
    @param.path.number('id') id: typeof Proponente.prototype.id,
  ): Promise<TipoVinculacion> {
    return this.proponenteRepository.proponente_pertenece_a_tipoVinculacion(id);
  }
}
