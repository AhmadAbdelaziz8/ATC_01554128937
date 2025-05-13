import pg from "pg";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error(
      "Error initial connection test",
      err.stack
    );
  }
  
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error(
        "Error executing query for initial connection test",
        err.stack
      );
    }
    console.log("connected to PostgreSQL");
  });
});

const db = {
  query: (text, params) => pool.query(text, params),
  pool: pool,
};

export default pool;
