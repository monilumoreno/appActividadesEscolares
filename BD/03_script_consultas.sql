
/*==============================================================*/
/* Consultas
/*==============================================================*/

SELECT numerodocumento, nombres, apellidos, telefono, direccion, correo, usuario, clave, descripcionperfil, usuarios.estado
FROM usuarios, perfiles WHERE usuarios.idperfil = perfiles.idperfil;

SELECT * FROM alumnos, usuarios, cursos WHERE alumnos.idacudiente = usuarios.idusuario AND alumnos.idcurso = cursos.idcurso;
