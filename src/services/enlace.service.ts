import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const createHash = require('hash-generator');

@injectable({scope: BindingScope.TRANSIENT})
export class EnlaceService {
  constructor(/* Add @inject to inject parameters */) { }

  GenerarEnlace() {
    let hashLength = 15;
    let hash = createHash(hashLength);
    let enlace = `<a href="http//:localhost:3000${hash}">Confirmar</a>`
    console.log(enlace);

    return enlace
  }
}
