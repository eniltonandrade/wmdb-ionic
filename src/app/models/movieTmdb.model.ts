import { GenreTmdb } from './genreTmdb.model';
import { CastsTmdb } from './castsTmdb.model';
import { CompanyTmdb } from './companyTmdb.model';

export interface MovieTmdb {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
  belongs_to_collection: number;
  budget: number;
  genres: GenreTmdb[];
  homepage: string;
  imdb_id: string;
  production_companies: CompanyTmdb[];
  production_countries: string[];
  revenue: number;
  runtime: number;
  spoken_languages: string[];
  status: string;
  tagline: string;
  casts: CastsTmdb;
  tmdbId: number;
  UserMovies: {
    MovieId: number;
    UserId: number;
    watchedAt: Date;
  };
}
