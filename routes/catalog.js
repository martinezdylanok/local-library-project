import express from "express";
const router = express.Router();

// Importing controller modules.
import { index as book_index, book_create_get, book_create_post, book_delete_get, book_delete_post, book_update_get, book_update_post, book_detail, book_list } from "../controllers/bookController.js";
import { author_create_get, author_create_post, author_delete_get, author_delete_post, author_update_get, author_update_post, author_detail, author_list } from "../controllers/authorController.js";
import { genre_create_get, genre_create_post, genre_delete_get, genre_delete_post, genre_update_get, genre_update_post, genre_detail, genre_list } from "../controllers/genreController.js";
import { bookinstance_create_get, bookinstance_create_post, bookinstance_delete_get, bookinstance_delete_post, bookinstance_update_get, bookinstance_update_post, bookinstance_detail, bookinstance_list } from "../controllers/bookInstanceController.js";

// BOOK ROUTES
router.get("/", book_index);
router.get("/book/create", book_create_get);
router.post("/book/create", book_create_post);
router.get("/book/:id/delete", book_delete_get);
router.post("/book/:id/delete", book_delete_post);
router.get("/book/:id/update", book_update_get);
router.post("/book/:id/update", book_update_post);
router.get("/book/:id", book_detail);
router.get("/books", book_list);

// AUTHOR ROUTES
router.get("/author/create", author_create_get);
router.post("/author/create", author_create_post);
router.get("/author/:id/delete", author_delete_get);
router.post("/author/:id/delete", author_delete_post);
router.get("/author/:id/update", author_update_get);
router.post("/author/:id/update", author_update_post);
router.get("/author/:id", author_detail);
router.get("/authors", author_list);

// GENRE ROUTES
router.get("/genre/create", genre_create_get);
router.post("/genre/create", genre_create_post);
router.get("/genre/:id/delete", genre_delete_get);
router.post("/genre/:id/delete", genre_delete_post);
router.get("/genre/:id/update", genre_update_get);
router.post("/genre/:id/update", genre_update_post);
router.get("/genre/:id", genre_detail);
router.get("/genres", genre_list);

// BOOKINSTANCE ROUTES
router.get("/bookinstance/create", bookinstance_create_get);
router.post("/bookinstance/create", bookinstance_create_post);
router.get("/bookinstance/:id/delete", bookinstance_delete_get);
router.post("/bookinstance/:id/delete", bookinstance_delete_post);
router.get("/bookinstance/:id/update", bookinstance_update_get);
router.post("/bookinstance/:id/update", bookinstance_update_post);
router.get("/bookinstance/:id", bookinstance_detail);
router.get("/bookinstances", bookinstance_list);

export default router;
