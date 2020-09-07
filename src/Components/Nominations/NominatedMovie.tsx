import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import moviePosterPlaceholder from "../../poster-placeholder.png";
import { NO_POSTER_RESPONSE } from "../../constants";
import { NominatedMovieProps } from "./model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: "inline",
    },
  })
);

export const NominatedMovie: React.FC<NominatedMovieProps> = (props) => {
  const { movie, removeNomination } = props;
  const moviePoster =
    movie.Poster !== NO_POSTER_RESPONSE ? movie.Poster : moviePosterPlaceholder;
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <img
            alt={movie.Title}
            src={moviePoster}
            style={{ width: "50px", height: "auto", marginRight: "10px" }}
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
            onClick={() => removeNomination(movie)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
