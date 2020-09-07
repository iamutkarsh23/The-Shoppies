import React from "react";
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
} from "@material-ui/core";
import { MovieModel } from "../../models-shared/movie-card";
import { NominatedMovie } from "./NominatedMovie";
import { NominationListProps } from "./model";

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
  const disableListActionButtons = moviesList.length === 0 ? true : false
  const removeNomination = (selectedMovie: MovieModel) => {
    const newNominatedMovies = moviesList.filter(
      (movie: MovieModel) => movie.imdbID !== selectedMovie.imdbID
    );
    setNominationsList(newNominatedMovies);
    console.log(newNominatedMovies);
  };

  const removeAllNominations = () => {
    setNominationsList([]);
  };

  return (
    <Card className={classes.nominationSection}>
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
            {moviesList?.length} nominations
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton color="primary" disabled={disableListActionButtons}>
            <LinkIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            onClick={() => removeAllNominations()}
            style={!disableListActionButtons ? {color: "#f5365c"} : {}}
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
