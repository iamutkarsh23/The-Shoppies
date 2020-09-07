import { MovieModel } from "../../models-shared/movie-card";

export type MovieCardProps = {
  movie: MovieModel;
  nominateMovie: any;
  disableNominateButton: any;
};

export type MoviesListBoxProps = {
  moviesList: MovieModel[];
  nominateMovie: any;
  disableNominateButton: any;
  setMoviesList: any;
  searchQuery: string;
};
