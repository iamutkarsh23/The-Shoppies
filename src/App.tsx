import React, { useState } from "react";
import "./App.css";
import { SearchBox } from "./Components/SearchBox";
import { Grid } from "@material-ui/core";
import { MoviesListBox } from "./Components/MovieList";
import { MovieModel } from "./models-shared/movie-card";
import { NominationList } from "./Components/Nominations";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesList, setMoviesList] = useState<MovieModel[]>([]);
  const [nominationsList, setNominationsList] = useState<MovieModel[]>([]);

  const onSearchMovie = async (value: any) => {
    setSearchQuery(value);
  };

  const nominateMovie = (movie: MovieModel) => {
    const newNominatedMovies = nominationsList.concat(movie);
    setNominationsList(newNominatedMovies);
  };

  // nominations list should only contain 5 movies 
  // and should not be able to add same move again
  const disableNominateButton = (movieId: string) => {
    return (
      nominationsList.length === 5 ||
      nominationsList.findIndex(
        (movie: MovieModel) => movie.imdbID === movieId
      ) !== -1
    );
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={12}>
            <SearchBox onSearchMovie={onSearchMovie}></SearchBox>
          </Grid>
          <Grid item xs={12}>
            <MoviesListBox
              searchQuery={searchQuery}
              moviesList={moviesList}
              nominateMovie={nominateMovie}
              setMoviesList={setMoviesList}
              disableNominateButton={disableNominateButton}
            ></MoviesListBox>
          </Grid>
        </Grid>
        <Grid container item xs={4}>
          <NominationList
            moviesList={nominationsList}
            setNominationsList={setNominationsList}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
