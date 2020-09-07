import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import {
  Card,
  Grid,
  TableContainer,
  Table,
  TablePagination,
  TextField,
} from "@material-ui/core";
import { MovieCard } from "./MovieCard";
import { MovieModel } from "../models/movie-card";

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

type MoviesListBoxProps = {
  moviesList: MovieModel[];
  totalMovies: number;
  onNewPage: any;
  page: number;
};

export const MoviesListBox: React.FC<MoviesListBoxProps> = (props) => {
  const { moviesList, totalMovies, onNewPage, page } = props;

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
            onChangePage={() => console.log("change page")}
          />
          <Card className={classes.moviesListBox}>
            <div className={classes.root}>
              <Grid container spacing={3} className={classes.gridList}>
                {moviesList?.map((movie) => (
                  <MovieCard movie={movie} key={movie.Title} />
                ))}
              </Grid>
            </div>
          </Card>
        </Table>
      </TableContainer>
    </>
  );
};
