import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
      marginBottom: "0px",
    },
    searchText: {
      display: "flex",
      marginBottom: "15px",
    },
    searchInput: {
      marginBottom: "0px",
      alignSelf: "center",
      width: "100%",
    },
  })
);

type SearchBoxProps = {
  onSearchMovie: any;
};

export const SearchBox: React.FC<SearchBoxProps> = (props: any) => {
  const { onSearchMovie } = props;
  const classes = useStyles();

  const onChange = (event: any) => {
    onSearchMovie(event.target.value);
  };

  return (
    <form
      className={classes.root}
      noValidate
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
    >
      <Typography component="h5" className={classes.searchText}>
        What are some of your favorite movies?
      </Typography>

      <TextField
        id="outlined-basic"
        label="Movie Title"
        className={classes.searchInput}
        onChange={onChange}
      />
    </form>
  );
};
