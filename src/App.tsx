import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SearchBox } from "./Components/SearchBox";
import { Container, Typography, Grid, Paper } from "@material-ui/core";
import { MoviesListBox } from "./Components/MoviesListBox";
import { searchMovie } from "./api/movies";
import { MovieModel } from "./models/movie-card";
import { NominationList } from "./Components/NominationList";


const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesList, setMoviesList] = useState<MovieModel[]>([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [nominationsList, setNominationsList] = useState<MovieModel[]>([]);
  // initial value of page is zero due to pagination of material ui which starts with 0
  const [page, setPage] = useState(0);

  const onSearchMovie = async (value: any) => {
    setSearchQuery(value);
    setPage(0);
    console.log(searchQuery);
    const resp: any = await searchMovie(value, page + 1);
    setMoviesList(resp?.data?.Search);
    setTotalMovies(parseInt(resp?.data?.totalResults));
    console.log(resp);
  };

  const onNewPage = async (newPageNumber: number) => {
    setPage(newPageNumber);
    const resp: any = await searchMovie(searchQuery, newPageNumber + 1);
    setMoviesList(resp?.data?.Search);
    setTotalMovies(parseInt(resp?.data?.totalResults));
    console.log(resp);
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
              moviesList={moviesList}
              totalMovies={totalMovies}
              onNewPage={onNewPage}
              page={page}
            ></MoviesListBox>
          </Grid>
        </Grid>
        <Grid container item xs={4}>
          <NominationList moviesList={moviesList}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
