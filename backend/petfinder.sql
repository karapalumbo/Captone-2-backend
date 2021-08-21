\echo 'Delete and recreate petfinder_backend db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE petfinder_backend;
CREATE DATABASE petfinder_backend;
\connect petfinder_backend

\i petfinder-schema.sql
\i petfinder-seed.sql

\echo 'Delete and recreate petfinder_backend_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE petfinder_backend_test;
CREATE DATABASE petfinder_backend_test;
\connect petfinder_backend_test

\i petfinder-schema.sql

