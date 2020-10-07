DROP TABLE IF EXISTS songs_sets;

CREATE TABLE songs_sets (
  set_id INTEGER REFERENCES sets(id) NOT NULL,
  song_id INTEGER REFERENCES songs(id) NOT NULL,
  PRIMARY KEY (set_id, song_id)
);