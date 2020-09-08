import React, { useState, useEffect } from "react";
import "./App.css";
import { SearchBox } from "./Components/SearchBox";
import { Grid } from "@material-ui/core";
import { MoviesListBox } from "./Components/MovieList";
import { MovieModel } from "./models-shared/movie-card";
import { NominationList } from "./Components/Nominations";
import { PageHeader } from "./Components/PageHeader/PageHeader";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Footer } from "./Components/Footer";

const App = () => {
  // console message
  console.log("Welcome to the console!");

  const cachedNominationsList = JSON.parse(
    localStorage.getItem("nominations")!
  );
  const initialNominationsList = cachedNominationsList
    ? cachedNominationsList
    : [];
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesList, setMoviesList] = useState<MovieModel[]>([]);
  const [nominationsList, setNominationsList] = useState<MovieModel[]>(
    initialNominationsList
  );

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

  // for storing the nominations in local storage
  useEffect(() => {
    localStorage.setItem("nominations", JSON.stringify(nominationsList));
  }, [nominationsList]);

  return (
    <div className="App">
      <PageHeader />
      {nominationsList?.length === 5 ? (
        <Alert
          severity="success"
          style={{ backgroundColor: "#2dce89", color: "black" }}
        >
          <AlertTitle style={{ display: "flex" }}>
            You have added 5 nominations!
          </AlertTitle>
          To edit, remove some of your nominations from the list on the right.
        </Alert>
      ) : (
        <></>
      )}
      <Grid container>
        <Grid
          container
          item
          md={8}
          xs={12}
          spacing={2}
          style={{ display: "block" }}
        >
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
        <Grid container item md={4} xs={12}>
          <NominationList
            moviesList={nominationsList}
            setNominationsList={setNominationsList}
          />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default App;
