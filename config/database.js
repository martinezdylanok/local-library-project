import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
   throw new Error("Missing MONGODB_URI in environment variables");
}

export default uri;
