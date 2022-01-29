export interface WMDBPeople {
  MoviePerson: {
    MovieId: number;
    PersonId: number;
    character: string;
    order: number;
    role: number;
  };
  createdAt: Date;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
  tmdbId: number;
  updatedAt: Date;
}

export interface WMDBMovie {
  People: WMDBPeople[];
  UserMovies: { watchedAt: Date; MovieId: number; UserId: number };
  backdrop_path: string;
  createdAt: Date;
  id: number;
  imdbId: string;
  original_title: string;
  poster_path: string;
  release_date: Date;
  runtime: number;
  title: string;
  tmdbId: number;
  updatedAt: Date;
  vote_average: number;
}

export interface WMDBResponse {
  status: boolean;
  data: {
    count: number;
    movies: WMDBMovie[];
  };
}
