import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import catalogRouter from "./routes/catalog.js";
import mongoDB from "./config/database.js";
import mongoose from "mongoose";
import expressEjsLayouts from "express-ejs-layouts";
import compression from "compression";
import helmet from "helmet";
import RateLimit from "express-rate-limit";

// importing the path module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// creating the express app
const app = express();

// mongoose connection to the mongoDB
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
   await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout");

// Set up rate limiter: maximum of twenty requests per minute
const limiter = RateLimit({
   windowMs: 1 * 60 * 1000, // 1 minute
   max: 20,
});

// middleware
app.use(compression());
app.use(
   helmet.contentSecurityPolicy({
      directives: {
         "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
      },
   }),
);
app.use(limiter);
app.use(logger("dev"));
app.use(expressEjsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
   res.locals.message = err.message;
   res.locals.error = req.app.get("env") === "development" ? err : {};

   res.status(err.status || 500);
   res.render("error");
});

export default app;
