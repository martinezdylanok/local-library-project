import dotenv from "dotenv";

dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

if (!username || !password) {
   throw new Error("Missing USERNAME or PASSWORD in environment variables");
}

const uri = `mongodb+srv://${username}:${password}@cluster0.trsdxew.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0
`;

export default uri;
