import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TipoVinculacion} from '../models';
import {TipoVinculacionRepository} from '../repositories';

export class TipoVinculacionController {
  constructor(
    @repository(TipoVinculacionRepository)
    public tipoVinculacionRepository : TipoVinculacionRepository,
  ) {}

  @post('/tipo-vinculacions')
  @response(200, {
    description: 'TipoVinculacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoVinculacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {
            title: 'NewTipoVinculacion',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoVinculacion: Omit<TipoVinculacion, 'id'>,
  ): Promise<TipoVinculacion> {
    return this.tipoVinculacionRepository.create(tipoVinculacion);
  }

  @get('/tipo-vinculacions/count')
  @response(200, {
    description: 'TipoVinculacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoVinculacion) where?: Where<TipoVinculacion>,
  ): Promise<Count> {
    return this.tipoVinculacionRepository.count(where);
  }

  @get('/tipo-vinculacions')
  @response(200, {
    description: 'Array of TipoVinculacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoVinculacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoVinculacion) filter?: Filter<TipoVinculacion>,
  ): Promise<TipoVinculacion[]> {
    return this.tipoVinculacionRepository.find(filter);
  }

  @patch('/tipo-vinculacions')
  @response(200, {
    description: 'TipoVinculacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {partial: true}),
        },
      },
    })
    tipoVinculacion: TipoVinculacion,
    @param.where(TipoVinculacion) where?: Where<TipoVinculacion>,
  ): Promise<Count> {
    return this.tipoVinculacionRepository.updateAll(tipoVinculacion, where);
  }

  @get('/tipo-vinculacions/{id}')
  @response(200, {
    description: 'TipoVinculacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoVinculacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoVinculacion, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoVinculacion>
  ): Promise<TipoVinculacion> {
    return this.tipoVinculacionRepository.findById(id, filter);
  }

  @patch('/tipo-vinculacions/{id}')
  @response(204, {
    description: 'TipoVinculacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVinculacion, {partial: true}),
        },
      },
    })
    tipoVinculacion: TipoVinculacion,
  ): Promise<void> {
    await this.tipoVinculacionRepository.updateById(id, tipoVinculacion);
  }

  @put('/tipo-vinculacions/{id}')
  @response(204, {
    description: 'TipoVinculacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoVinculacion: TipoVinculacion,
  ): Promise<void> {
    await this.tipoVinculacionRepository.replaceById(id, tipoVinculacion);
  }

  @del('/tipo-vinculacions/{id}')
  @response(204, {
    description: 'TipoVinculacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoVinculacionRepository.deleteById(id);
  }
}
