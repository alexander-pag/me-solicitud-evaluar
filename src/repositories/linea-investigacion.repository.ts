import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {LineaInvestigacion, LineaInvestigacionRelations} from '../models';

export class LineaInvestigacionRepository extends DefaultCrudRepository<
  LineaInvestigacion,
  typeof LineaInvestigacion.prototype.id,
  LineaInvestigacionRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(LineaInvestigacion, dataSource);
  }
}
