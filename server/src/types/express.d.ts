declare namespace Express {
  type NewUser = {
    id?: number | null;
    user_name: string;
    password: string;
  };

  type NewSong = {
    id?: number | null;
    song_title: string;
    composer: string;
    arranger: string;
    description: string;
    user_id?: number;
  };

  type NewSetList = {
    id?: number | null;
    set_name: string;
    description: string;
    user_id?: number;
  };

  type NewGig = {
    id?: number | null;
    venue: string;
    gig_date: string;
    start_time: string;
    end_time: string;
    user_id?: number;
  };

  type User = {
    id: number;
    user_name: string;
    password: string;
  };

  type Song = {
    id: number;
    song_title: string;
    composer: string;
    arranger: string;
    description: string;
    user_id: number;
  };

  type SetList = {
    id: number;
    set_name: string;
    description: string;
    user_id: number;
    songs: Song[];
  };

  type Gig = {
    id: number;
    venue: string;
    gig_date: string;
    start_time: string;
    end_time: string;
    user_id: number;
    sets: SetList[];
  };

  type SongSet = {
    song_id: number;
    set_id: number;
  };

  type SetGig = {
    set_id: number;
    gig_id: number;
  };

  /*
  |---------------------------------------------------
  | EXPRESS Custom/Extended Types
  |---------------------------------------------------
  */

  type ErrorName =
    | 'ValidationError'
    | 'UniqueViolationError';

  type ExtError = {
    name: ErrorName;
    status: number;
    message: string;
    stack: string;
    errors: string;
  };

  // interface Request {}

  interface Response {
    user: User;
    dbUser: User;
    loginUser: NewUser;
    newSong: NewSong;
    newSet: NewSetList;
    newGig: NewGig;
    songSet: SongSet;
    setGig: SetGig;
    song: Song;
    setList: SetList;
    gig: Gig;
  }
}
