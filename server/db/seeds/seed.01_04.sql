BEGIN;

TRUNCATE songs_sets;

TRUNCATE sets, songs, users RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, password)
VALUES
  ('John Smith', 'so_secret')
  ('Jane Williams', 'secretslug');

INSERT INTO songs (user_name, password)
VALUES
  ('John Smith', 'so_secret')
  ('Jane Williams', 'secretslug');

INSERT INTO sets (user_name, password)
VALUES
  ('John Smith', 'so_secret')
  ('Jane Williams', 'secretslug');

INSERT INTO songs_sets (user_name, password)
VALUES
  ('John Smith', 'so_secret')
  ('Jane Williams', 'secretslug');

COMMIT;