import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
   name: { type: String, required: true, minlength: 3, maxLength: 100 },
});

GenreSchema.virtual("url").get(function () {
   return `/catalog/url/${this._id}`;
});

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;
