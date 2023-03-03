import React, { Component } from "react";
import Pagination from "./pagination";
import GenresList from "./genresList";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreSrvice";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: null,
    headers: ["Title", "Genre", "Stock", "Rate", "", ""],
    pageSize: 4,
    currentPage: 1,
  };
  componentDidMount() {
    const genres = [{ name: "All" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
    this.setState({ currentGenre: genres[0] });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelection = (newGenre) => {
    this.setState({ currentGenre: newGenre });
    this.setState({ currentPage: 1 });
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((value) => value._id !== movie._id);
    this.setState({ movies: movies });
  };
  handleLike = (movie) => {
    const movies = this.state.movies.map((value) => {
      if (value._id === movie._id) {
        value.liked = !value.liked;
      }
      return value;
    });
    this.setState({ movies: movies });
  };
  render() {
    const { genres, headers, currentGenre, pageSize, currentPage } = this.state;
    let movies =
      currentGenre && currentGenre._id
        ? this.state.movies.filter(
            (value) => value.genre.name === currentGenre.name
          )
        : this.state.movies;
    if (movies.length === 0) return <p>There are no movies in the database!</p>;
    const paginatedMovies = paginate(movies, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <GenresList
            genres={genres}
            textPropName="name"
            idPropName="_id"
            currentGenre={currentGenre}
            onSelect={(newGenre) => this.handleGenreSelection(newGenre)}
          />
        </div>
        <div className="col">
          <p>Showing {movies.length} movies inside the database.</p>
          <MoviesTable
            movies={paginatedMovies}
            headers={headers}
            onLikeStatusChange={(movie) => this.handleLike(movie)}
            onDelete={(movie) => this.handleDelete(movie)}
          />
          <Pagination
            count={movies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(page) => this.handlePageChange(page)}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
