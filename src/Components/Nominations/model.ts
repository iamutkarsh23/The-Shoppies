import { MovieModel } from "../../models-shared/movie-card";

export type NominationListProps = {
  moviesList: MovieModel[];
  setNominationsList: any;
};

export type NominatedMovieProps = {
  movie: MovieModel;
  removeNomination: any;
};
