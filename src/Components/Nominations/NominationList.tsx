import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import LinkIcon from "@material-ui/icons/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Grid,
  CardContent,
  Card,
  CardHeader,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { MovieModel } from "../../models-shared/movie-card";
import { NominatedMovie } from "./NominatedMovie";
import { NominationListProps } from "./model";
import { PROD_URL } from "../../constants";
import { searchMovieById } from "../../api/movies";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    nominationHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "5px",
    },
    nominationSection: {
      margin: theme.spacing(1),
      marginTop: "10px",
      width: "100%",
    },
    cardHeader: {
      paddingTop: "25px",
    },
  })
);

export const NominationList: React.FC<NominationListProps> = (props) => {
  const { moviesList, setNominationsList } = props;
  const classes = useStyles();
  const disableListActionButtons = moviesList ? false : true;
  const [clipboardSnackbar, setClipboardSnackbar] = useState(false);
  const removeNomination = (selectedMovie: MovieModel) => {
    const newNominatedMovies = moviesList.filter(
      (movie: MovieModel) => movie.imdbID !== selectedMovie.imdbID
    );
    setNominationsList(newNominatedMovies);
  };

  const removeAllNominations = () => {
    setNominationsList([]);
  };

  // on component did mount, check if there are nominations already
  useEffect(() => {
    const setNominatedMovies = async (ids: string[]) => {
      const newArr = ids.map(async (value) => {
        const movieId = value.substring(2);
        return await searchMovieById(movieId);
      });
      if (newArr && newArr.length > 0) {
        const nominatedMovies = await Promise.all(newArr);
        const tempMoviesArr = nominatedMovies.map((movie) => {
          if (movie?.data.Response === "False") {
            return { Poster: "N/A", Title: "Movie not found!", Year: "N/A" };
          } else {
            return movie?.data;
          }
        });
        setNominationsList(tempMoviesArr);
      } else {
        return [];
      }
    };
    const movieIds: string[] = window.location.search.split(/[?&]+/);
    if (movieIds) {
      movieIds.shift();
      setNominatedMovies(movieIds);
    }
    // eslint-disable-next-line
  }, []);

  const getShareableMoviesLink = async () => {
    await navigator.clipboard.writeText("");
    const shareableLink = new URL(PROD_URL);
    moviesList?.map((movie, index) => {
      shareableLink.searchParams.append(index.toString(), movie.imdbID);
    });
    // writes to the clipboard
    await navigator.clipboard.writeText(shareableLink.href);
    setClipboardSnackbar(true);
  };

  return (
    <Card className={classes.nominationSection}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={clipboardSnackbar}
        autoHideDuration={6000}
        onClose={() => setClipboardSnackbar(false)}
      >
        <Alert onClose={() => setClipboardSnackbar(false)} severity="info">
          Link copied to clipboard!
        </Alert>
      </Snackbar>
      <CardHeader
        className={classes.cardHeader}
        title="Your Nominations List"
        subheader="Maximum 5 nominations allowed."
      />
      <Divider variant="middle" />
      <Grid container className={classes.nominationHeader}>
        <Grid item xs={8}>
          <Typography
            component="h6"
            style={{ display: "flex", marginLeft: "16px" }}
          >
            {moviesList ? moviesList?.length : "0"} nominations
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            color="primary"
            disabled={disableListActionButtons}
            onClick={getShareableMoviesLink}
          >
            <LinkIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            onClick={() => removeAllNominations()}
            style={!disableListActionButtons ? { color: "#f5365c" } : {}}
            disabled={disableListActionButtons}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <CardContent>
        <List className={classes.root}>
          {moviesList?.length !== 0 ? (
            moviesList &&
            moviesList?.map((movie) => (
              <NominatedMovie
                key={movie.imdbID}
                movie={movie}
                removeNomination={removeNomination}
              />
            ))
          ) : (
            <Typography component="h5" style={{ display: "flex" }}>
              You haven't nominated any movies.
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};
