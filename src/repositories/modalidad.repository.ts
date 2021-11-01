import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Modalidad, ModalidadRelations} from '../models';

export class ModalidadRepository extends DefaultCrudRepository<
  Modalidad,
  typeof Modalidad.prototype.id,
  ModalidadRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Modalidad, dataSource);
  }
}
