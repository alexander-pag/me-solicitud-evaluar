import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {InvitacionEvaluar, InvitacionEvaluarRelations, Solicitud, Jurado} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {JuradoRepository} from './jurado.repository';

export class InvitacionEvaluarRepository extends DefaultCrudRepository<
  InvitacionEvaluar,
  typeof InvitacionEvaluar.prototype.id,
  InvitacionEvaluarRelations
> {

  public readonly invitacion_tiene_solicitud: BelongsToAccessor<Solicitud, typeof InvitacionEvaluar.prototype.id>;

  public readonly invitacion_tiene_jurado: BelongsToAccessor<Jurado, typeof InvitacionEvaluar.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(InvitacionEvaluar, dataSource);
    this.invitacion_tiene_jurado = this.createBelongsToAccessorFor('invitacion_tiene_jurado', juradoRepositoryGetter,);
    this.registerInclusionResolver('invitacion_tiene_jurado', this.invitacion_tiene_jurado.inclusionResolver);
    this.invitacion_tiene_solicitud = this.createBelongsToAccessorFor('invitacion_tiene_solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('invitacion_tiene_solicitud', this.invitacion_tiene_solicitud.inclusionResolver);
  }
}
