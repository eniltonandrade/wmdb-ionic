import { MovieTmdb } from './movieTmdb.model';

export interface PersonTmdb {
  birthday: string;
  known_for_department: string;
  deathday: string;
  id: number;
  name: string;
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: string;
  also_known_as: string[];
  movie_credits: {
    cast: MovieTmdb[];
    crew: MovieTmdb[];
  };
  images: {
    profiles: string[];
  };
}
