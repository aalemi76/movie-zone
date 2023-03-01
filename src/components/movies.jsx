import React, { Component } from "react";
import Pagination from "./pagination";
import GenresList from "./genresList";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreSrvice";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    headers: ["Title", "Genre", "Stock", "Rate"],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All",
  };
  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelection = (newGenre) => {
    this.setState({ currentGenre: newGenre.name });
    this.setState({ currentPage: 1 });
  };
  render() {
    const { genres, currentGenre } = this.state;
    const { headers: headers } = this.state;
    const { pageSize, currentPage } = this.state;
    let movies = [];
    if (currentGenre !== "All") {
      movies = this.state.movies.filter(
        (value) => value.genre.name === currentGenre
      );
    } else {
      movies = this.state.movies;
    }
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
          <table className="table">
            <thead>
              <tr>
                {headers.map((value, index) => (
                  <th key={index} scope="col">
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedMovies.map((movie) => (
                <tr key={movie._id}>
                  <th scope="row">{movie.title}</th>
                  <th scope="row">{movie.genre.name}</th>
                  <th scope="row">{movie.numberInStock}</th>
                  <th scope="row">{movie.dailyRentalRate}</th>
                </tr>
              ))}
            </tbody>
          </table>
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
