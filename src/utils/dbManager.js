import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreSrvice";
import { headers } from "../utils/header";

class DBManager {
  static shared = new DBManager();
  constructor() {
    this.movies = getMovies();
    const genres = [{ name: "All" }, ...getGenres()];
    this.genres = genres;
    this.headers = headers;
  }
  sort(movies, header, isAscending) {
    const column = header !== undefined ? header : this.headers[0];
    if (column === this.headers[1]) {
      if (isAscending) {
        const result = movies.sort((a, b) => {
          return a[column.entityName]["name"] > b[column.entityName]["name"];
        });
        return result;
      } else {
        const result = movies.sort((a, b) => {
          return a[column.entityName]["name"] < b[column.entityName]["name"];
        });
        return result;
      }
    }
    if (isAscending) {
      const result = movies.sort((a, b) => {
        return a[column.entityName] > b[column.entityName];
      });
      return result;
    } else {
      const result = movies.sort((a, b) => {
        return a[column.entityName] < b[column.entityName];
      });
      return result;
    }
  }
}

export default DBManager;
