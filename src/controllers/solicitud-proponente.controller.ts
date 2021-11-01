import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {Configuracion} from '../llaves/config';
import {
  NotificacionCorreo, Proponente, Solicitud,
  SolicitudProponente
} from '../models';
import {ProponenteRepository, SolicitudProponenteRepository, SolicitudRepository} from '../repositories';
import {EnlaceService, NotificacionesService} from '../services';

export class SolicitudProponenteController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
    @repository(ProponenteRepository) protected proponenteRepository: ProponenteRepository,
    @service(NotificacionesService) protected servicioNotificaciones: NotificacionesService,
    @service(EnlaceService) protected servicioEnlace: EnlaceService,
    @repository(SolicitudProponenteRepository) protected solicitudProponenteRepository: SolicitudProponenteRepository
  ) { }

  @get('/solicituds/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Proponente through SolicitudProponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proponente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proponente>,
  ): Promise<Proponente[]> {
    return this.solicitudRepository.proponentes(id).find(filter);
  }

  @post('/solicituds/{id}/proponentes', {
    responses: {
      '200': {
        description: 'create a Proponente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proponente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {
            title: 'NewProponenteInSolicitud',
            exclude: ['id'],
          }),
        },
      },
    }) proponente: Omit<Proponente, 'id'>,
  ): Promise<Proponente> {
    return this.solicitudRepository.proponentes(id).create(proponente);
  }

  @patch('/solicituds/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Solicitud.Proponente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proponente, {partial: true}),
        },
      },
    })
    proponente: Partial<Proponente>,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.solicitudRepository.proponentes(id).patch(proponente, where);
  }

  @del('/solicituds/{id}/proponentes', {
    responses: {
      '200': {
        description: 'Solicitud.Proponente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proponente)) where?: Where<Proponente>,
  ): Promise<Count> {
    return this.solicitudRepository.proponentes(id).delete(where);
  }

  //metodos adicionales

  @post('/solicitud-proponente', {
    responses: {
      '200': {
        description: 'create a Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudProponente)}},
      },
    },
  })
  async createUnUsuarioUnRol(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudProponente, {
            title: 'New',
            exclude: ['id'],
          })
        }
      }
    }) datos: Omit<SolicitudProponente, 'id'>,
    //proponente: Proponente
  ): Promise<SolicitudProponente | null> {
    let registro = await this.solicitudProponenteRepository.create(datos);
    let proponente = await this.proponenteRepository.findById(datos.id_proponente)
    let solicitud = await this.solicitudRepository.findById(datos.id_solicitud)
    let correo = new NotificacionCorreo()
    let enlace = this.servicioEnlace.GenerarEnlace()
    correo.destinatario = proponente.correo
    correo.asunto = Configuracion.asuntoSolicitudProponente
    correo.mensaje = `${Configuracion.saludo} <b> ${proponente.primerNombre} ${proponente.primerApellido} </b> : <br> ${Configuracion.mensaje1} "${solicitud.nombreTrabajo}" ${Configuracion.mensaje2} ${solicitud.fecha}
     ${Configuracion.mensaje3} "${solicitud.descripcion}" ${Configuracion.mensaje4} ${enlace}`


    this.servicioNotificaciones.EnviarCorreo(correo)
    return registro

  }


}
