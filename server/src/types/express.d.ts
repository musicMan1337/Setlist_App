declare namespace Express {
  export type NewUser = {
    id?: number | null;
    user_name: string;
    password: string;
  };

  export type NewSong = {
    id?: number | null;
    song_title: string;
    composer: string;
    arranger: string;
    description: string;
    user_id?: number;
  };

  export type NewSetList = {
    id?: number | null;
    set_name: string;
    description: string;
    user_id?: number;
  };

  export type NewGig = {
    id?: number | null;
    venue: string;
    gig_date: string;
    start_time: string;
    end_time: string;
    user_id?: number;
  };

  export type User = {
    id: number;
    user_name: string;
    password: string;
  };

  export type Song = {
    id: number;
    song_title: string;
    composer: string;
    arranger: string;
    description: string;
    user_id: number;
  };

  export type SetList = {
    id: number;
    set_name: string;
    description: string;
    user_id: number;
    songs: Song[];
  };

  export type Gig = {
    id: number;
    venue: string;
    gig_date: string;
    start_time: string;
    end_time: string;
    user_id: number;
    sets: SetList[];
  };

  export type SongSet = {
    song_id: number;
    set_id: number;
  };

  export type SetGig = {
    set_id: number;
    gig_id: number;
  };

  /*
  |---------------------------------------------------
  | EXPRESS Custom export Types
  |---------------------------------------------------
  */

  type ErrorName =
    | 'ValidationError'
    | 'UniqueViolationError'
    | 'UniqueViolationError';

  export type ExtError = {
    name: ErrorName;
    status: number;
    message: string;
    stack: string;
    errors: string;
  };

  // export interface Request {}

  export interface Response {
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
