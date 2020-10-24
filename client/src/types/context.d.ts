declare namespace Context {
  type Song = {
    id: number;
    song_title: string;
    composer: string;
    arranger: string;
    description: string;
  };

  type Set = {
    id: number;
    set_name: string;
    description: string;
    songs: Song[];
  };

  type Gig = {
    id: number;
    venue: string;
    gig_date: string;
    start_time: string;
    end_time: string;
    sets: Set[];
  };

  type createContextProps = {
    songs: Song[];
    sets: Set[];
    handleUserUpdate(): void;
  };
}
