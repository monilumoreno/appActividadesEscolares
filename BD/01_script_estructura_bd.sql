/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     09/02/2022 04:08:07 p.m.                     */
/*==============================================================*/


/*==============================================================*/
/* User: root                                                   */
/*==============================================================*/
/*create user root identified by 'misiontic2022.';

/*==============================================================*/
/* User: user_1                                                 */
/*==============================================================*/
/*create user user_1;

/*==============================================================*/
/* Table: perfiles                                              */
/*==============================================================*/

create table perfiles
(
   idperfil             int not null,
   descripcionperfil    varchar(20) not null,
   estado               char(1) not null default 'A'  comment 'A  Activo
                                                               I  Inactivo',
   primary key (idperfil)
);


/*==============================================================*/
/* Table: usuarios                                              */
/*==============================================================*/

create table usuarios
(
   idusuario            int not null auto_increment,
   idperfil             int not null,
   tipodocumento        char(1) not null  comment '2  Cédula de ciudadanía
                                               3  Cédula de extranjería
                                               4  Pasaporte
                                               5  PEP',
   numerodocumento      varchar(20) not null,
   nombres              varchar(50) not null,
   apellidos            varchar(50) not null,
   telefono             varchar(15) not null,
   direccion            varchar(100) not null,
   correo               varchar(100) not null,
   usuario              varchar(100) not null,
   clave                varchar(500) not null,
   estado               char(1) not null default 'A'  comment 'A  Activo
                                                               I  Inactivo',
   primary key (idusuario)
);


/*==============================================================*/
/* Table: cursos                                                */
/*==============================================================*/

create table cursos
(
   idcurso              int not null auto_increment,
   descripcioncurso     varchar(20) not null,
   estado               char(1) not null default 'A'  comment 'A  Activo
                                                               I  Inactivo',
   primary key (idcurso)
);


/*==============================================================*/
/* Table: asignaturas                                           */
/*==============================================================*/

create table asignaturas
(
   idasignatura         int not null auto_increment,
   descripcionasignatura varchar(100) not null,
   estado               char(1) not null default 'A'  comment 'A  Activo
                                                               I  Inactivo',
   primary key (idasignatura)
);


/*==============================================================*/
/* Table: alumnos                                               */
/*==============================================================*/

create table alumnos
(
   idalumno             int not null auto_increment,
   idacudiente          int not null,
   idcurso              int not null,
   tipodocumento        char(1) null  comment '0  Tarjeta de identidad
                                               1  Cédula de ciudadanía
                                               2  Cédula de extranjería
                                               3  Pasaporte
                                               4  PEP',
   numerodocumento      varchar(20) not null,
   nombres              varchar(50) not null,
   apellidos            varchar(50) not null,
   telefono             varchar(15) not null,
   direccion            varchar(100) not null,
   correo               varchar(100) not null,
   estado               char(1) not null default 'A'  comment 'A Activo
                                                               I Inactivo',
   primary key (idalumno)
);


/*==============================================================*/
/* Table: tareas                                                */
/*==============================================================*/

create table tareas
(
   idtarea              int not null auto_increment,
   idcurso              int not null,
   idasignatura         int not null,
   iddocente            int not null,
   descripciontarea     text not null,
   fechacreacion        date not null default (current_date),
   fechaentrega         date not null,
   estado               char(1) not null default 'A'  comment 'A  Activo
                                                               I  Inactivo',
   primary key (idtarea)
);

/*==============================================================*/
/* Table: reltareasalumnos                                      */
/*==============================================================*/

create table reltareasalumnos
(
   idreltareasalumnos   int not null auto_increment,
   idalumno             int not null,
   idtarea              int not null,
   descripcion          varchar(10) not null default 'Pendiente'  comment 'Entregada
                                                                           Pendiente
                                                                           Calificada',
   calificacion         float not null default 0,
   observaciones        text null,
   fechacalificacion    date null,
   estado               char(1) not null default 'A'  comment 'A  Activo
                                                               I  Inactivo',
   primary key (idreltareasalumnos)
);

/*==============================================================*/
/* Foreign keys
/*==============================================================*/

alter table usuarios add constraint fk_usuarios_ref_perfiles foreign key (idperfil)
      references perfiles (idperfil) on delete restrict on update cascade;

alter table alumnos add constraint fk_alumnos_ref_usuarios foreign key (idacudiente)
      references usuarios (idusuario) on delete restrict on update cascade;

alter table alumnos add constraint fk_alumnos_ref_cursos foreign key (idcurso)
      references cursos (idcurso) on delete restrict on update cascade;

alter table tareas add constraint fk_tareas_ref_cursos foreign key (idcurso)
      references cursos (idcurso) on delete restrict on update cascade;

alter table tareas add constraint fk_tareas_ref_asignaturas foreign key (idasignatura)
      references asignaturas (idasignatura) on delete restrict on update cascade;

alter table tareas add constraint fk_tareas_ref_usuarios foreign key (iddocente)
      references usuarios (idusuario) on delete restrict on update cascade;

alter table reltareasalumnos add constraint fk_reltareasalumnos_ref_alumnos foreign key (idalumno)
      references alumnos (idalumno) on delete restrict on update cascade;

alter table reltareasalumnos add constraint fk_reltareasalumnos_ref_tareas foreign key (idtarea)
      references tareas (idtarea) on delete restrict on update cascade;

/*==============================================================*/
/* Índices
/*==============================================================*/

create index fk_usuarios_ref_perfiles_idx on usuarios (idperfil);
create index fk_alumnos_ref_usuarios_idx on alumnos (idacudiente);
create index fk_alumnos_ref_cursos_idx on alumnos (idcurso);
create index fk_tareas_ref_cursos_idx on tareas (idcurso);
create index fk_tareas_ref_asignaturas_idx on tareas (idasignatura);
create index fk_tareas_ref_usuarios_idx on tareas (iddocente);
create index fk_reltareasalumnos_ref_alumnos_idx on reltareasalumnos (idalumno);
create index fk_reltareasalumnos_ref_tareas_idx on reltareasalumnos (idtarea);
