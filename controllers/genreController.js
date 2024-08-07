import Genre from "../models/genre.js";
import asyncHandler from "express-async-handler";
import Book from "../models/book.js";
import { body, validationResult } from "express-validator";

// Display list of all Genre.
export const genre_list = asyncHandler(async (req, res, next) => {
   const allGenres = await Genre.find().sort({ name: 1 }).exec();
   res.render("genre_list", {
      title: "Genre List",
      genre_list: allGenres,
   });
});

// Display detail page for a specific Genre.
export const genre_detail = asyncHandler(async (req, res, next) => {
   // Get details of genre and all associated books (in parallel)
   const [genre, booksInGenre] = await Promise.all([Genre.findById(req.params.id).exec(), Book.find({ genre: req.params.id }, "title summary").exec()]);
   if (genre === null) {
      // No results.
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
   }

   res.render("genre_detail", {
      title: "Genre Detail",
      genre: genre,
      genre_books: booksInGenre,
   });
});

// Display Genre create form on GET.
export const genre_create_get = (req, res, next) => {
   res.render("genre_form", { title: "Create Genre", genre: {}, errors: [] });
};

// Handle Genre create on POST.
export const genre_create_post = [
   // Validate and sanitize the name field.
   body("name", "Genre name must contain at least 3 characters").trim().isLength({ min: 3 }).escape(),

   // Process request after validation and sanitization.
   asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a genre object with escaped and trimmed data.
      const genre = new Genre({ name: req.body.name });

      if (!errors.isEmpty()) {
         // There are errors. Render the form again with sanitized values/error messages.
         res.render("genre_form", {
            title: "Create Genre",
            genre: genre,
            errors: errors.array(),
         });
         return;
      } else {
         // Data from form is valid.
         // Check if Genre with same name already exists.
         const genreExists = await Genre.findOne({ name: req.body.name }).collation({ locale: "en", strength: 2 }).exec();
         if (genreExists) {
            // Genre exists, redirect to its detail page.
            res.redirect(genreExists.url);
         } else {
            await genre.save();
            // New genre saved. Redirect to genre detail page.
            res.redirect(genre.url);
         }
      }
   }),
];

// Display Genre delete form on GET.
export const genre_delete_get = asyncHandler(async (req, res, next) => {
   // Get details of genre and all associated books (in parallel)
   const [genre, booksInGenre] = await Promise.all([Genre.findById(req.params.id).exec(), Book.find({ genre: req.params.id }, "title summary").exec()]);
   if (genre === null) {
      // No results.
      res.redirect("/catalog/genres");
   }

   res.render("genre_delete", {
      title: "Delete Genre",
      genre: genre,
      genre_books: booksInGenre,
   });
});

// Handle Genre delete on POST.
export const genre_delete_post = asyncHandler(async (req, res, next) => {
   // Get details of genre and all associated books (in parallel)
   const [genre, booksInGenre] = await Promise.all([Genre.findById(req.params.id).exec(), Book.find({ genre: req.params.id }, "title summary").exec()]);

   if (booksInGenre.length > 0) {
      // Genre has books. Render in same way as for GET route.
      res.render("genre_delete", {
         title: "Delete Genre",
         genre: genre,
         genre_books: booksInGenre,
      });
      return;
   } else {
      // Genre has no books. Delete object and redirect to the list of genres.
      await Genre.findByIdAndDelete(req.body.id);
      res.redirect("/catalog/genres");
   }
});

// Display Genre update form on GET.
export const genre_update_get = asyncHandler(async (req, res, next) => {
   const genre = await Genre.findById(req.params.id).exec();
   if (genre === null) {
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
   }

   res.render("genre_form", {
      title: "Update Genre",
      genre: genre,
      errors: [],
   });
});

// Handle Genre update on POST.
export const genre_update_post = [
   // Validate and sanitize the name field.
   body("name", "Genre name must contain at least 3 characters").trim().isLength({ min: 3 }).escape(),

   // Process request after validation and sanitization.
   asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a genre object with escaped and trimmed data.
      const genre = new Genre({ name: req.body.name, _id: req.params.id });

      if (!errors.isEmpty()) {
         // There are errors. Render the form again with sanitized values/error messages.
         res.render("genre_form", {
            title: "Update Genre",
            genre: genre,
            errors: errors.array(),
         });
         return;
      } else {
         // Data from form is valid. Update the genre.
         const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, genre, {});
         // Redirect to genre detail page.
         res.redirect(updatedGenre.url);
      }
   }),
];
