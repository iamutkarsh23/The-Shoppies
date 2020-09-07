export type MovieCardProps = {
  movie: MovieModel;
  nominateMovie: any;
  disableNominateButton: any;
};

export type MovieModel = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
};
