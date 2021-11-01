export namespace Configuracion {
  export const saludo = "Hola "
  export const asuntoSolicitudProponente = "Se ha registrado tu Solicitud"
  export const mensaje1 = "La solicitud "
  export const mensaje2 = ", con fecha de "
  export const mensaje3 = ", descrita como "
  export const mensaje4 = "ha sido registrada en la plataforma de evaluación de la universidad de caldas, dentro de poco será calificada por nuestros jurados"
  export const hashNotificacion = "dXUyW6uvq6"
  export const urlCorreo = "http://localhost:5000/correo"
  export const urlSms = "http://localhost:5000/enviar-texto"
  export const destinoArg = "destino"
  export const asuntoArg = "asunto"
  export const mensajeArg = "mensaje"
  export const hashArg = "hash"
  export const correoAdministrador = "alexandersimon713@gmail.com"
  export const respuestaJurado = "Respuesta de jurado a solicitud"
  export const arg_nombre = "nombre"
  export const arg_id_persona = "id"
  export const arg_documento = "documento"
  export const rol_admin = "6170b7456a13372518bf8112"
  export const url_validar_Token = "http://localhost:5001/validar-token"
  export const arg_token = "token"
  export const carpetaImagenProponente = "../../archivos/imagenProponente"
  export const nombreCampoImagenProponente = "file"
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG']
  export const carpetaDocumentoSolicitud = "../../archivos/documentoSolicitud"
  export const nombreCampoDocumentoSolicitud = "file"
  export const extensionesPermitidasDOC = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX']
  export const tamMaxImagenProducto = 1980 * 1980
  export const urlMsUsuario = "http://localhost:3002/crear-usuario"
  export const urlBuscarUsuario = `http://localhost:3002/buscar-usuario?filter={"where":"id_rol":6170b7456a13372518bf8112},
  "include":[{"relation":"usuario"}]`

  export const argNombre = "nombre"
  export const argApellido = "apellido"
  export const argDocumento = "documento"
  export const argCorreo = "correo"
  export const argFechaNacimiento = "fechaNacimiento"
  export const argCelular = "celular"
}
