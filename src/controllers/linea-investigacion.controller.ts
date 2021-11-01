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
import {LineaInvestigacion} from '../models';
import {LineaInvestigacionRepository} from '../repositories';

export class LineaInvestigacionController {
  constructor(
    @repository(LineaInvestigacionRepository)
    public lineaInvestigacionRepository : LineaInvestigacionRepository,
  ) {}

  @post('/linea-investigacions')
  @response(200, {
    description: 'LineaInvestigacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(LineaInvestigacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {
            title: 'NewLineaInvestigacion',
            exclude: ['id'],
          }),
        },
      },
    })
    lineaInvestigacion: Omit<LineaInvestigacion, 'id'>,
  ): Promise<LineaInvestigacion> {
    return this.lineaInvestigacionRepository.create(lineaInvestigacion);
  }

  @get('/linea-investigacions/count')
  @response(200, {
    description: 'LineaInvestigacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LineaInvestigacion) where?: Where<LineaInvestigacion>,
  ): Promise<Count> {
    return this.lineaInvestigacionRepository.count(where);
  }

  @get('/linea-investigacions')
  @response(200, {
    description: 'Array of LineaInvestigacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LineaInvestigacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LineaInvestigacion) filter?: Filter<LineaInvestigacion>,
  ): Promise<LineaInvestigacion[]> {
    return this.lineaInvestigacionRepository.find(filter);
  }

  @patch('/linea-investigacions')
  @response(200, {
    description: 'LineaInvestigacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {partial: true}),
        },
      },
    })
    lineaInvestigacion: LineaInvestigacion,
    @param.where(LineaInvestigacion) where?: Where<LineaInvestigacion>,
  ): Promise<Count> {
    return this.lineaInvestigacionRepository.updateAll(lineaInvestigacion, where);
  }

  @get('/linea-investigacions/{id}')
  @response(200, {
    description: 'LineaInvestigacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LineaInvestigacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LineaInvestigacion, {exclude: 'where'}) filter?: FilterExcludingWhere<LineaInvestigacion>
  ): Promise<LineaInvestigacion> {
    return this.lineaInvestigacionRepository.findById(id, filter);
  }

  @patch('/linea-investigacions/{id}')
  @response(204, {
    description: 'LineaInvestigacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LineaInvestigacion, {partial: true}),
        },
      },
    })
    lineaInvestigacion: LineaInvestigacion,
  ): Promise<void> {
    await this.lineaInvestigacionRepository.updateById(id, lineaInvestigacion);
  }

  @put('/linea-investigacions/{id}')
  @response(204, {
    description: 'LineaInvestigacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lineaInvestigacion: LineaInvestigacion,
  ): Promise<void> {
    await this.lineaInvestigacionRepository.replaceById(id, lineaInvestigacion);
  }

  @del('/linea-investigacions/{id}')
  @response(204, {
    description: 'LineaInvestigacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lineaInvestigacionRepository.deleteById(id);
  }
}
