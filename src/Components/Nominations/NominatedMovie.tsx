import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  ListItemSecondaryAction,
  Slide,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moviePosterPlaceholder from "../../poster-placeholder.png";
import { NO_POSTER_RESPONSE } from "../../constants";
import { NominatedMovieProps } from "./model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: "inline",
    },
    deleteBtn: {
      color: "#f5365c",
    },
    moviePoster: {
      width: "50px",
      height: "auto",
      marginRight: "10px",
    },
  })
);

export const NominatedMovie: React.FC<NominatedMovieProps> = (props) => {
  const { movie, removeNomination } = props;
  const moviePoster =
    movie.Poster !== NO_POSTER_RESPONSE ? movie.Poster : moviePosterPlaceholder;
  const classes = useStyles();
  const [showAnimation, setShowAnimation] = useState(true);

  const removeNominatedMovie = async () => {
    await exitAnimation();
    if (showAnimation) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      removeNomination(movie);
    }
  };

  const exitAnimation = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        setShowAnimation((prev) => !prev);
        return resolve();
      }, 100)
    );
  };

  return (
    <>
      <Slide direction="right" in={showAnimation} unmountOnExit timeout={800}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <img
              alt={movie.Title}
              src={moviePoster}
              className={classes.moviePoster}
            />
          </ListItemAvatar>
          <ListItemText
            primary={movie.Title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {movie.Year}
                </Typography>
              </React.Fragment>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              className={classes.deleteBtn}
              onClick={removeNominatedMovie}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Slide>
      <Divider variant="inset" component="li" />
    </>
  );
};
