import React, { useState, useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import {
  Card,
  Grid,
  TableContainer,
  Table,
  TablePagination,
} from "@material-ui/core";
import { MovieCard } from "./MovieCard";
import { MovieModel } from "../../models-shared/movie-card";
import { searchMovie } from "../../api/movies";
import { MoviesListBoxProps } from "./model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      overflowY: "scroll",
    },

    gridList: {
      width: "100%",
      height: "800px",
      margin: theme.spacing(1),
    },

    moviesListBox: {
      margin: theme.spacing(2),
      marginTop: "0px",
    },
    table: {
      width: "100%",
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

  useEffect(() => {
    const onSearchMovie = async (value: any) => {
      setPage(0);
      const resp: any = await searchMovie(value, page + 1);
      setMoviesList(resp?.data?.Search);
      setTotalMovies(parseInt(resp?.data?.totalResults));
      console.log(resp);
    };
    onSearchMovie(searchQuery);
    // eslint-disable-next-line
  }, [searchQuery]);

  const onNewPage = async (newPageNumber: number) => {
    setPage(newPageNumber);
    const resp: any = await searchMovie(searchQuery, newPageNumber + 1);
    setMoviesList(resp?.data?.Search);
    setTotalMovies(parseInt(resp?.data?.totalResults));
    console.log(resp);
  };
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table className={classes.table} size={"medium"}>
          <TablePagination
            component="div"
            count={totalMovies ? totalMovies : 0}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
            page={page}
            nextIconButtonProps={{ onClick: () => onNewPage(page + 1) }}
            nextIconButtonText={"Next"}
            backIconButtonText={"Previous"}
            backIconButtonProps={{ onClick: () => onNewPage(page - 1) }}
            onChangePage={() => console.log("New movies")}
          />
          <Card className={classes.moviesListBox}>
            <div className={classes.root}>
              <Grid container spacing={3} className={classes.gridList}>
                {moviesList?.map((movie: MovieModel) => (
                  <MovieCard
                    movie={movie}
                    key={movie.imdbID}
                    nominateMovie={nominateMovie}
                    disableNominateButton={disableNominateButton}
                  />
                ))}
              </Grid>
            </div>
          </Card>
        </Table>
      </TableContainer>
    </>
  );
};
