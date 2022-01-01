import React from "react";
import PropTypes from "prop-types";
import { withStyles, Typography } from "@material-ui/core";
import styles from "./styles";
import { textTruncate } from "../../../../utils";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const { classes, movie } = props;
  const movieImage = `http://localhost:7000/api/movies/${movie.image}`;
  const movieImages = new URL(movieImage).href;
  return (
    <Link to={`movie/${movie._id}`} style={{ textDecoration: "none" }}>
      <div className={classes.card}>
        <img src={movieImage} style={{ height: 300, width: 300 }} />
        <header
          className={classes.header}
          style={{
            backgroundImage: `url(${movieImages}`,
          }}
        >
          <Typography className={classes.h4} variant="h4" color="inherit">
            {movie.genre}
          </Typography>
        </header>
        <div className={classes.body}>
          <p>{movie.duration}</p>
          <h2>{movie.title}</h2>
          <p>{movie.language}</p>
          <p>{movie.cast}</p>
          <p>{movie.director}</p>
          <p>{textTruncate(movie.description)}</p>
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};
export default withStyles(styles)(MovieCard);
