import React, { useState } from "react";

export default function AddMovei() {
  const [movieForm, setMovieForm] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const [movieFormErrors, setMovieFormErrors] = useState({
    name: null,
    description: null,
    price: null,
  });

  const handleInputChange = (e) => {
    const field_name = e.target.name;
    const field_value = e.target.value;
    if (field_name === "movie_name") {
      setMovieForm({
        ...movieForm,
        name: field_value,
      });

      setMovieFormErrors({
        ...movieFormErrors,
        name:
          field_value.length === 0
            ? "This field is required"
            : field_value.length < 3
            ? "Min.length is 3"
            : null,
      });
    }

    if (field_name === "description") {
      setMovieForm({
        ...movieForm,
        description: field_value,
      });

      setMovieFormErrors({
        ...movieFormErrors,
        description:
          field_value.length === 0
            ? "This field is required"
            : field_value.length > 200
            ? "Max length is 200"
            : null,
      });
    }

    if (field_name === "price") {
      setMovieForm({
        ...movieForm,
        price: field_value,
      });
      setMovieFormErrors({
        ...movieFormErrors,
        price:
          Number(field_value) === 0 ? "Price should be greater than 0" : null,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(movieForm);
  };

  return (
    <>
      <h2>Add New Movie</h2>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="movie_name" className="form-label">
            Movie name
          </label>
          <input
            type="text"
            className={`form-control ${
              movieFormErrors.name ? "border-danger" : ""
            }`}
            id="movie_name"
            name="movie_name"
            aria-describedby="movie_name_help"
            value={movieForm.name}
            onChange={handleInputChange}
          />
          {movieFormErrors.name && (
            <div id="movie_name_help" className="form-text text-danger">
              {movieFormErrors.name}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="movie_description" className="form-label">
            Description
          </label>
          <textarea
            rows={5}
            type="text"
            className="form-control"
            id="movie_description"
            name="description"
            value={movieForm.description}
            onChange={handleInputChange}
          />
          {movieFormErrors.description && (
            <div id="movie_name_help" className="form-text text-danger">
              {movieFormErrors.description}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            aria-describedby="price_help"
            name="price"
            value={movieForm.price}
            onChange={handleInputChange}
          />
          {movieFormErrors.price && (
            <div id="movie_name_help" className="form-text text-danger">
              {movieFormErrors.price}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
