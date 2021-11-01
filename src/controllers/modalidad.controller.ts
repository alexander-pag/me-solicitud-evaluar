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
import {Modalidad} from '../models';
import {ModalidadRepository} from '../repositories';

export class ModalidadController {
  constructor(
    @repository(ModalidadRepository)
    public modalidadRepository : ModalidadRepository,
  ) {}

  @post('/modalidads')
  @response(200, {
    description: 'Modalidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Modalidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modalidad, {
            title: 'NewModalidad',
            exclude: ['id'],
          }),
        },
      },
    })
    modalidad: Omit<Modalidad, 'id'>,
  ): Promise<Modalidad> {
    return this.modalidadRepository.create(modalidad);
  }

  @get('/modalidads/count')
  @response(200, {
    description: 'Modalidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Modalidad) where?: Where<Modalidad>,
  ): Promise<Count> {
    return this.modalidadRepository.count(where);
  }

  @get('/modalidads')
  @response(200, {
    description: 'Array of Modalidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Modalidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Modalidad) filter?: Filter<Modalidad>,
  ): Promise<Modalidad[]> {
    return this.modalidadRepository.find(filter);
  }

  @patch('/modalidads')
  @response(200, {
    description: 'Modalidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modalidad, {partial: true}),
        },
      },
    })
    modalidad: Modalidad,
    @param.where(Modalidad) where?: Where<Modalidad>,
  ): Promise<Count> {
    return this.modalidadRepository.updateAll(modalidad, where);
  }

  @get('/modalidads/{id}')
  @response(200, {
    description: 'Modalidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Modalidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Modalidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Modalidad>
  ): Promise<Modalidad> {
    return this.modalidadRepository.findById(id, filter);
  }

  @patch('/modalidads/{id}')
  @response(204, {
    description: 'Modalidad PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modalidad, {partial: true}),
        },
      },
    })
    modalidad: Modalidad,
  ): Promise<void> {
    await this.modalidadRepository.updateById(id, modalidad);
  }

  @put('/modalidads/{id}')
  @response(204, {
    description: 'Modalidad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() modalidad: Modalidad,
  ): Promise<void> {
    await this.modalidadRepository.replaceById(id, modalidad);
  }

  @del('/modalidads/{id}')
  @response(204, {
    description: 'Modalidad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.modalidadRepository.deleteById(id);
  }
}
