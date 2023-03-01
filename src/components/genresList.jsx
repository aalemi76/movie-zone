import React from "react";

const GenresList = ({
  genres,
  textPropName,
  idPropName,
  currentGenre,
  onSelect,
}) => {
  return (
    <ul className="list-group">
      {genres.map((value) => (
        <li
          onClick={() => onSelect(value)}
          key={value[idPropName]}
          className={
            value[textPropName] === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {value[textPropName]}
        </li>
      ))}
    </ul>
  );
};

export default GenresList;
