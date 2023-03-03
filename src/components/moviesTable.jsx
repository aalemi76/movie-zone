import React from "react";
import Like from "./like";

const MoviesTable = ({ movies, headers, onLikeStatusChange, onDelete }) => {
  return (
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
        {movies.map((movie) => (
          <tr key={movie._id}>
            <th scope="row">{movie.title}</th>
            <th scope="row">{movie.genre.name}</th>
            <th scope="row">{movie.numberInStock}</th>
            <th scope="row">{movie.dailyRentalRate}</th>
            <th scope="row">
              <Like
                status={movie.liked}
                onTap={() => onLikeStatusChange(movie)}
              />
            </th>
            <th scope="row">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
