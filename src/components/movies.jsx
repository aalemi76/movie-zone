import React, { Component } from "react";
import Pagination from "./pagination";
import GenresList from "./genresList";
import { paginate } from "../utils/paginate";
import DBManager from "../utils/dbManager";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: null,
    headers: DBManager.shared.headers,
    sortCol: DBManager.shared.headers[0],
    isAscending: true,
    pageSize: 4,
    currentPage: 1,
  };
  componentDidMount() {
    this.setState({
      movies: DBManager.shared.movies,
      genres: DBManager.shared.genres,
      currentGenre: DBManager.shared.genres[0],
    });
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
  handleSort = (header) => {
    const isAscending =
      header.name !== this.state.sortCol.name ? true : !this.state.isAscending;
    this.setState({ isAscending: isAscending });
    this.setState({ sortCol: header });
  };
  render() {
    const {
      genres,
      headers,
      sortCol,
      isAscending,
      currentGenre,
      pageSize,
      currentPage,
    } = this.state;
    let movies =
      currentGenre && currentGenre._id
        ? this.state.movies.filter(
            (value) => value.genre.name === currentGenre.name
          )
        : this.state.movies;
    if (movies.length === 0) return <p>There are no movies in the database!</p>;
    const orderedMovies = DBManager.shared.sort(movies, sortCol, isAscending);
    const paginatedMovies = paginate(orderedMovies, currentPage, pageSize);
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
            onLikeStatusChange={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
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
