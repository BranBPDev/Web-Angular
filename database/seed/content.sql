-- ============================================================================
-- Datos iniciales de proyectos y experiencia laboral (tomados del currículum).
-- Solo inserta si la tabla está vacía, así que se puede lanzar sin duplicar datos.
-- ============================================================================

insert into projects (name, url, image, kind, position)
select * from (values
  ('eurostarshotels.com', 'https://eurostarshotels.com',                '/projects/eurostarshotels.jpg', 'web',  1),
  ('creiss.es',           'https://creiss.es',                          '/projects/creiss.jpg',          'web',  2),
  ('HermesApp',           'https://github.com/BranBPDev/HermesApp',     '/projects/hermesapp.jpg',       'repo', 3),
  ('Web-Angular',         'https://github.com/BranBPDev/Web-Angular',   '/projects/web-angular.jpg',     'repo', 4)
) as v(name, url, image, kind, position)
where not exists (select 1 from projects);

insert into experiences (title, role, location, description, start_date, end_date, date_precision, image, position)
select * from (values
  ('BIG Formación',
   'Full Stack Web Developer (Prácticas)',
   'Parque Tecnológico de Ourense',
   'Desarrollo y mantenimiento de aplicaciones web, tanto del front-end como del back-end. Participación activa en el diseño y la programación del sitio web de Creiss (creiss.es) en colaboración con el equipo técnico, con nuevas funcionalidades, pruebas de código y control de versiones.',
   date '2026-02-01', date '2026-06-01', 'month', '/experience/big-formacion.jpg', 1),

  ('Hotel Vilaseco',
   'Camarero',
   'Chantada, Lugo',
   'Servicio de sala y atención a huéspedes en un entorno hostelero dinámico. Gestión eficaz de pedidos, resolución de incidencias diarias, trabajo bajo presión y excelente trato al cliente, potenciando la comunicación y la adaptabilidad.',
   date '2022-01-01', date '2024-12-31', 'year', '/experience/hotel-vilaseco.jpg', 2),

  ('Bar Parada',
   'Camarero',
   'Chantada, Lugo',
   'Atención al cliente en un entorno dinámico y de cara al público. Gestión de pedidos, resolución rápida de incidencias, trabajo bajo presión y un trato cordial y cercano.',
   date '2021-01-01', date '2022-12-31', 'year', '/experience/bar-parada.jpg', 3),

  ('Hotusa',
   'Front-end Web Developer (Prácticas de Ciclo Dual)',
   'Chantada, Lugo',
   'Desarrollo y maquetación de interfaces web en el proyecto de la plataforma principal de Eurostars Hotels (eurostarshotels.com), junto al equipo de desarrollo. Optimización de la experiencia de usuario, resolución de incidencias de código y metodologías de trabajo en equipo en un entorno profesional real.',
   date '2020-01-01', date '2021-12-31', 'year', '/experience/hotusa.jpg', 4)
) as v(title, role, location, description, start_date, end_date, date_precision, image, position)
where not exists (select 1 from experiences);
