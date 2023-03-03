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
      {genres.map((value, index) => (
        <li
          onClick={() => onSelect(value)}
          key={index}
          className={
            value[textPropName] === currentGenre[textPropName]
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
