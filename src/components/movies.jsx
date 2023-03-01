import React, { Component } from "react";
import Pagination from "./pagination";
import { getMovies } from "../services/movieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    headers: ["Title", "Genre", "Stock", "Rate"],
    pageSize: 4,
    currentPage: 1,
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { length: count } = this.state.movies;
    const { movies: movies, headers: headers } = this.state;
    const { pageSize: pageSize, currentPage: currentPage } = this.state;
    if (count === 0) return <p>There are no movies in the database!</p>;
    return (
      <React.Fragment>
        <p>Showing {count} movies inside the database.</p>
        <table className="table">
          <thead>
            <tr>
              {headers.map((value) => (
                <th key={value} scope="col">
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr>
                <th scope="row">{movie.title}</th>
                <th scope="row">{movie.genre.name}</th>
                <th scope="row">{movie.numberInStock}</th>
                <th scope="row">{movie.dailyRentalRate}</th>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={12}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(page) => this.handlePageChange(page)}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
