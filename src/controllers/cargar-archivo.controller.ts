import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Configuracion} from '../llaves/config';
import {ProponenteRepository, SolicitudRepository} from '../repositories';

export class CargarArchivoController {
  constructor(
    @repository(ProponenteRepository)
    private proponenteRepository: ProponenteRepository,
    @repository(SolicitudRepository)
    private solicitudRepository: SolicitudRepository
  ) { }


  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarImagenProponente/{id_proponente}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen de un proponente.',
      },
    },
  })
  async cargarImagenDelProponente(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("id_proponente") id_proponente: number
  ): Promise<object | false> {
    const rutaImagenProponente = path.join(__dirname, Configuracion.carpetaImagenProponente);
    let res = await this.StoreFileToPath(rutaImagenProponente, Configuracion.nombreCampoImagenProponente, request, response, Configuracion.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let proponente = await this.proponenteRepository.findById(id_proponente)
        proponente.fotografia = nombre_archivo
        await this.proponenteRepository.save(proponente)
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarDocumentoPersona{id_solicitud}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de documentos de la persona.',
      },
    },
  })
  async DocumentosSolicitud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number("id_solicitud") id_solicitud: number
  ): Promise<object | false> {
    const rutaImagenProponente = path.join(__dirname, Configuracion.carpetaDocumentoSolicitud);
    let res = await this.StoreFileToPath(rutaImagenProponente, Configuracion.nombreCampoDocumentoSolicitud, request, response, Configuracion.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let solicitud = await this.solicitudRepository.findById(id_solicitud)
        solicitud.archivo = nombre_archivo
        await this.solicitudRepository.save(solicitud)
        return {filename: nombre_archivo};
      }
    }
    return res;
  }


  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        },
        limits: {
          fileSize: Configuracion.tamMaxImagenProducto
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}


