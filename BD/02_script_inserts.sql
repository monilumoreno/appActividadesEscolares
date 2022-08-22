
/*==============================================================*/
/* Inserts tablas
/*==============================================================*/

INSERT INTO perfiles (idperfil, descripcionperfil) VALUES (1, 'Administrador');
INSERT INTO perfiles (idperfil, descripcionperfil) VALUES (2, 'Docente');
INSERT INTO perfiles (idperfil, descripcionperfil) VALUES (3, 'Acudiente');

INSERT INTO usuarios (idperfil, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo, usuario, clave)
VALUES (1, '1', '1010001001', 'Administrador 1', 'Adiminstrador 1', '3100010000', 'Calle 100 20-42', 'admin1@correo.com', 'admin1', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');
INSERT INTO usuarios (idperfil, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo, usuario, clave)
VALUES (2, '1', '1020100100', 'Docente 1', 'Docente 1', '3101001010', 'Carrera 56 70-88', 'docente1@correo.com', 'docente1', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');
INSERT INTO usuarios (idperfil, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo, usuario, clave)
VALUES (2, '1', '1030300300', 'Docente 2', 'Docente 2', '3102002020', 'Avenida 6 4-8', 'docente2@correo.com', 'docente2', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');
INSERT INTO usuarios (idperfil, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo, usuario, clave)
VALUES (2, '1', '1040400400', 'Docente 3', 'Docente 3', '3104004040', 'Carrera 93 6-83', 'docente3@correo.com', 'docente3', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');
INSERT INTO usuarios (idperfil, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo, usuario, clave)
VALUES (3, '1', '1050500500', 'Acudiente 1', 'Acudiente 1', '3105005050', 'Avenida 30 90-31', 'acudiente1@correo.com', 'acudiente1', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');
INSERT INTO usuarios (idperfil, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo, usuario, clave)
VALUES (3, '1', '1060600600', 'Acudiente 2', 'Acudiente 2', '3106006060', 'Carrera 73 38-31', 'acudiente2@correo.com', 'acudiente2', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');
INSERT INTO usuarios (idperfil, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo, usuario, clave)
VALUES (3, '1', '1070700700', 'Acudiente 3', 'Acudiente 3', '3107007070', 'Calle 5 32-71', 'acudiente3@correo.com', 'acudiente3', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');

INSERT INTO cursos (descripcioncurso) VALUES ('6-1');
INSERT INTO cursos (descripcioncurso) VALUES ('7-1');
INSERT INTO cursos (descripcioncurso) VALUES ('8-1');
INSERT INTO cursos (descripcioncurso) VALUES ('9-1');
INSERT INTO cursos (descripcioncurso) VALUES ('10-1');
INSERT INTO cursos (descripcioncurso) VALUES ('11-1');

INSERT INTO asignaturas (descripcionasignatura) VALUES ('Matemáticas');
INSERT INTO asignaturas (descripcionasignatura) VALUES ('Física');
INSERT INTO asignaturas (descripcionasignatura) VALUES ('Química');
INSERT INTO asignaturas (descripcionasignatura) VALUES ('Inglés');
INSERT INTO asignaturas (descripcionasignatura) VALUES ('Tecnología');
INSERT INTO asignaturas (descripcionasignatura) VALUES ('Ciencias Naturales');
INSERT INTO asignaturas (descripcionasignatura) VALUES ('Ciencias Sociales');
INSERT INTO asignaturas (descripcionasignatura) VALUES ('Español');
INSERT INTO asignaturas (descripcionasignatura) VALUES ('Artística');

INSERT INTO alumnos (idacudiente, idcurso, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo)
VALUES (5, 1, '0', '1100100100', 'Alumno 1', 'Alumno 1', '3201001010', 'Calle 25 89-36', 'alumno1@correo.com');
INSERT INTO alumnos (idacudiente, idcurso, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo)
VALUES (6, 1, '0', '1200200200', 'Alumno 2', 'Alumno 2', '3142002020', 'Carrera 56 93-68', 'alumno2correo.com');
INSERT INTO alumnos (idacudiente, idcurso, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo)
VALUES (7, 1, '0', '1300300300', 'Alumno 3', 'Alumno 3', '3003003030', 'Calle 25 89-36', 'alumno3@correo.com');
INSERT INTO alumnos (idacudiente, idcurso, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo)
VALUES (5, 2, '0', '1400400400', 'Alumno 4', 'Alumno 4', '3204004040', 'Carrera 82 9-36', 'alumno4@correo.com');
INSERT INTO alumnos (idacudiente, idcurso, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo)
VALUES (6, 2, '0', '1500500500', 'Alumno 5', 'Alumno 5', '3145005050', 'Avenida 37 38-32', 'alumno5correo.com');
INSERT INTO alumnos (idacudiente, idcurso, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo)
VALUES (7, 2, '0', '1500500500', 'Alumno 6', 'Alumno 6', '3006006060', 'Calle 93 6-29', 'alumno6@correo.com');
INSERT INTO alumnos (idacudiente, idcurso, tipodocumento, numerodocumento, nombres, apellidos, telefono, direccion, correo)
VALUES (7, 2, '0', '1600600600', 'Alumno 7', 'Alumno 7', '3007006060', 'Carrera 52 13-58', 'alumno7@correo.com');

