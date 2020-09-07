import React, { useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Grid,
  Grow,
} from "@material-ui/core";
import { IMDB_URL, NO_POSTER_RESPONSE } from "../constants";
import { MovieCardProps } from "../models/movie-card";
import moviePosterPlaceholder from "../poster-placeholder.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    movieCard: {
      height: "100%",
      padding: "4px",
    },
    moviePoster: {
      width: "200px",
    },
    movieCardContent: {
      padding: "5px",
    },
    movieCardButtons: {
      justifyContent: "center",
    },
  })
);

export const MovieCard: React.FC<MovieCardProps> = (props) => {
  const { movie, nominateMovie, disableNominateButton } = props;
  const moviePoster =
    movie.Poster !== NO_POSTER_RESPONSE ? movie.Poster : moviePosterPlaceholder;

  const classes = useStyles();

  const viewMovieCast = () => {
    const url = `${IMDB_URL}/title/${movie?.imdbID}/fullcredits`;
    window.open(url, "__blank");
  };

  return (
    <Grow in timeout={1500}>
      <Grid item xs={4}>
        <Card className={classes.movieCard}>
          <img
            className={classes.moviePoster}
            src={moviePoster}
            alt={movie.Title}
          />
          <CardContent className={classes.movieCardContent}>
            <Typography gutterBottom variant="h5" component="h3">
              {movie.Title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {movie.Year}
            </Typography>
          </CardContent>
          <CardActions className={classes.movieCardButtons}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              style={{ borderRadius: "20px" }}
              onClick={viewMovieCast}
            >
              View Cast
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              style={{ borderRadius: "20px" }}
              onClick={(e) => nominateMovie(movie)}
              disabled={disableNominateButton(movie.imdbID)}
            >
              Nominate
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grow>
  );
};
