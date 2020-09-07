import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LinkIcon from "@material-ui/icons/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  ListSubheader,
  Grid,
  Button,
  CardContent,
  Card,
  CardHeader,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { MovieModel } from "../models/movie-card";

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
      width: "100%"
    },
    cardHeader: {
      paddingTop: "25px",
    },
  })
);

type NominationListProps = {
  moviesList: MovieModel[];
};

export const NominationList: React.FC<NominationListProps> = (props) => {
  const { moviesList } = props;
  const classes = useStyles();

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
          <Typography component="h6">3 nominations</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton aria-label="delete" color="primary">
            <LinkIcon />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <CardContent>
        <List className={classes.root}>
          {moviesList?.map((movie) => (
            <React.Fragment key={movie.Title}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <img alt={movie.Title} src={movie.Poster} style={{width: "50px", height: "auto", marginRight: "10px"}}/>
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
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}

        </List>
      </CardContent>
    </Card>
  );
};
