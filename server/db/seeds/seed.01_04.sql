BEGIN;

TRUNCATE users RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, password)
VALUES -- user/password are the same
  ('user1', '$2a$05$LpPv8kQLYOxQxSuZZDwh5OtJSzCeJrMUorlb8li6A0pruYYwukLM6'),
  ('user2', '$2a$05$hhJ6TRwjQVde7zMNXVTeau.i3ubS/L02i36T2rlWyrO74Nzj9jPky');

INSERT INTO songs (
    song_title,
    composer,
    arranger,
    description,
    user_id
  )
VALUES
  (
    'Cool Song',
    'Bok',
    'Some guy',
    $got_quotes$It's a song!$got_quotes$,
    1
  ),
  (
    'Cooler Song',
    'Beatoven',
    'Some girl',
    $got_quotes$It's another song!$got_quotes$,
    1
  ),
  (
    'Meh Song',
    'Katy Perry',
    null,
    $got_quotes$It's a "song"!$got_quotes$,
    2
  );

INSERT INTO sets (set_name, description, user_id)
VALUES
  (
    'Set 1',
    $got_quotes$It's a set!$got_quotes$,
    1
  ),
  (
    'Set 2',
    $got_quotes$It's another set!$got_quotes$,
    1
  ),
  (
    'Set 3',
    $got_quotes$It's a "set"!$got_quotes$,
    2
  );

INSERT INTO songs_sets (set_id, song_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3);

COMMIT;