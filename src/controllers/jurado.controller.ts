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
import {Jurado} from '../models';
import {JuradoRepository} from '../repositories';

export class JuradoController {
  constructor(
    @repository(JuradoRepository)
    public juradoRepository : JuradoRepository,
  ) {}

  @post('/jurados')
  @response(200, {
    description: 'Jurado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jurado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {
            title: 'NewJurado',
            exclude: ['id'],
          }),
        },
      },
    })
    jurado: Omit<Jurado, 'id'>,
  ): Promise<Jurado> {
    return this.juradoRepository.create(jurado);
  }

  @get('/jurados/count')
  @response(200, {
    description: 'Jurado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jurado) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.juradoRepository.count(where);
  }

  @get('/jurados')
  @response(200, {
    description: 'Array of Jurado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jurado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jurado) filter?: Filter<Jurado>,
  ): Promise<Jurado[]> {
    return this.juradoRepository.find(filter);
  }

  @patch('/jurados')
  @response(200, {
    description: 'Jurado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Jurado,
    @param.where(Jurado) where?: Where<Jurado>,
  ): Promise<Count> {
    return this.juradoRepository.updateAll(jurado, where);
  }

  @get('/jurados/{id}')
  @response(200, {
    description: 'Jurado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jurado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Jurado, {exclude: 'where'}) filter?: FilterExcludingWhere<Jurado>
  ): Promise<Jurado> {
    return this.juradoRepository.findById(id, filter);
  }

  @patch('/jurados/{id}')
  @response(204, {
    description: 'Jurado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jurado, {partial: true}),
        },
      },
    })
    jurado: Jurado,
  ): Promise<void> {
    await this.juradoRepository.updateById(id, jurado);
  }

  @put('/jurados/{id}')
  @response(204, {
    description: 'Jurado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() jurado: Jurado,
  ): Promise<void> {
    await this.juradoRepository.replaceById(id, jurado);
  }

  @del('/jurados/{id}')
  @response(204, {
    description: 'Jurado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradoRepository.deleteById(id);
  }
}
