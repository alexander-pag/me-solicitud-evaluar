import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Proponente, SolicitudProponente, EstadoSolicitud, TipoSolicitud, Modalidad, LineaInvestigacion} from '../models';
import {SolicitudProponenteRepository} from './solicitud-proponente.repository';
import {ProponenteRepository} from './proponente.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';
import {TipoSolicitudRepository} from './tipo-solicitud.repository';
import {ModalidadRepository} from './modalidad.repository';
import {LineaInvestigacionRepository} from './linea-investigacion.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly proponentes: HasManyThroughRepositoryFactory<Proponente, typeof Proponente.prototype.id,
          SolicitudProponente,
          typeof Solicitud.prototype.id
        >;

  public readonly solicitud_tiene_estadoSolicitud: BelongsToAccessor<EstadoSolicitud, typeof Solicitud.prototype.id>;

  public readonly solicitud_tiene_tipoSolicitud: BelongsToAccessor<TipoSolicitud, typeof Solicitud.prototype.id>;

  public readonly solicitud_tiene_modalidad: BelongsToAccessor<Modalidad, typeof Solicitud.prototype.id>;

  public readonly solicitud_tiene_lineaInvestigacion: BelongsToAccessor<LineaInvestigacion, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudProponenteRepository') protected solicitudProponenteRepositoryGetter: Getter<SolicitudProponenteRepository>, @repository.getter('ProponenteRepository') protected proponenteRepositoryGetter: Getter<ProponenteRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>, @repository.getter('TipoSolicitudRepository') protected tipoSolicitudRepositoryGetter: Getter<TipoSolicitudRepository>, @repository.getter('ModalidadRepository') protected modalidadRepositoryGetter: Getter<ModalidadRepository>, @repository.getter('LineaInvestigacionRepository') protected lineaInvestigacionRepositoryGetter: Getter<LineaInvestigacionRepository>,
  ) {
    super(Solicitud, dataSource);
    this.solicitud_tiene_lineaInvestigacion = this.createBelongsToAccessorFor('solicitud_tiene_lineaInvestigacion', lineaInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('solicitud_tiene_lineaInvestigacion', this.solicitud_tiene_lineaInvestigacion.inclusionResolver);
    this.solicitud_tiene_modalidad = this.createBelongsToAccessorFor('solicitud_tiene_modalidad', modalidadRepositoryGetter,);
    this.registerInclusionResolver('solicitud_tiene_modalidad', this.solicitud_tiene_modalidad.inclusionResolver);
    this.solicitud_tiene_tipoSolicitud = this.createBelongsToAccessorFor('solicitud_tiene_tipoSolicitud', tipoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud_tiene_tipoSolicitud', this.solicitud_tiene_tipoSolicitud.inclusionResolver);
    this.solicitud_tiene_estadoSolicitud = this.createBelongsToAccessorFor('solicitud_tiene_estadoSolicitud', estadoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud_tiene_estadoSolicitud', this.solicitud_tiene_estadoSolicitud.inclusionResolver);
    this.proponentes = this.createHasManyThroughRepositoryFactoryFor('proponentes', proponenteRepositoryGetter, solicitudProponenteRepositoryGetter,);
    this.registerInclusionResolver('proponentes', this.proponentes.inclusionResolver);
  }
}
