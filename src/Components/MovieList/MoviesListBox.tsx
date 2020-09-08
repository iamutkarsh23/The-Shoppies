import React, { useState, useEffect, useRef } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import {
  Card,
  Grid,
  TableContainer,
  Table,
  TablePagination,
  Typography,
} from "@material-ui/core";
import { MovieCard } from "./MovieCard";
import { MovieModel } from "../../models-shared/movie-card";
import { searchMovieBySearchQuery } from "../../api/movies";
import { MoviesListBoxProps } from "./model";
import { MoonLoader } from "react-spinners";
import { AxiosResponse } from "axios";
import { HTTP_STATUS_OK } from "../../constants";

const loaderCss = `display: block; margin: 0 auto; margin-bottom: 65px`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      overflowY: "scroll",
      maxHeight: "600px",
    },

    gridList: {
      width: "100%",
      height: "100%",
      margin: theme.spacing(1),
    },

    moviesListBox: {
      margin: theme.spacing(2),
      marginTop: "0px",
    },
    table: {
      width: "100%",
    },
    displayMessage: {
      marginLeft: "15px",
      marginBottom: "35px",
    },
  })
);

export const MoviesListBox: React.FC<MoviesListBoxProps> = (props) => {
  const {
    moviesList,
    nominateMovie,
    setMoviesList,
    disableNominateButton,
    searchQuery,
  } = props;
  // initial value of page is zero due to pagination of material ui which starts with 0
  const [page, setPage] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(
    'Have you searched for "Fast and Furious" yet?'
  );

  const resetMovies = () => {
    setMoviesList([]);
    setTotalMovies(0);
  };

  const [loading, setLoading] = useState(false);

  const onSearchMovie = async (value: any, pageNumber: number) => {
    setLoading(true);
    setPage(pageNumber);
    const moviesResponse: AxiosResponse<any> = await searchMovieBySearchQuery(
      value,
      pageNumber + 1
    );
    const movieData = moviesResponse?.data;
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (movieData?.Response === "False") {
      setDisplayMessage(`${movieData?.Error} Please try searching again!`);
      resetMovies();
    } else if (moviesResponse?.status !== HTTP_STATUS_OK) {
      setDisplayMessage(
        `Oops! Something went wrong!
        Help us improve your experience by sending a message at abc@shoppies.com`
      );
      resetMovies();
    } else {
      setMoviesList(movieData?.Search);
      setTotalMovies(parseInt(movieData?.totalResults));
    }
    setLoading(false);
  };

  // component did mount don't search for movies
  // component did update search for movies
  const queryRef: React.MutableRefObject<boolean | undefined> = useRef();
  useEffect(() => {
    if (!queryRef.current) {
      queryRef.current = true;
    } else {
      onSearchMovie(searchQuery, 0);
    }
    // eslint-disable-next-line
  }, [searchQuery]);

  const classes = useStyles();

  return (
    <>
      <Card className={classes.moviesListBox}>
        <TableContainer>
          <Table className={classes.table} size={"medium"}>
            <TablePagination
              component="tbody"
              count={totalMovies ? totalMovies : 0}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              page={page}
              nextIconButtonProps={{
                onClick: () => onSearchMovie(searchQuery, page + 1),
              }}
              nextIconButtonText={"Next"}
              backIconButtonText={"Previous"}
              backIconButtonProps={{
                onClick: () => onSearchMovie(searchQuery, page - 1),
              }}
              onChangePage={() => console.log("New movies")}
            />
            <div className={classes.root}>
              <Grid container spacing={3} className={classes.gridList}>
                {moviesList?.length ? (
                  loading ? (
                    <MoonLoader
                      css={loaderCss}
                      size={80}
                      color={"#123abc"}
                      loading={loading}
                    />
                  ) : (
                    moviesList?.map((movie: MovieModel) => (
                      <MovieCard
                        movie={movie}
                        key={movie.imdbID}
                        nominateMovie={nominateMovie}
                        disableNominateButton={disableNominateButton}
                      />
                    ))
                  )
                ) : (
                  <Typography component="h4" className={classes.displayMessage}>
                    {displayMessage}
                  </Typography>
                )}
              </Grid>
            </div>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};
