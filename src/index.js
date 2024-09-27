import { addRoute } from "./routes/add.js";
import { balanceRoute } from "./routes/balance.js";
import { spendRoute } from "./routes/spend.js";
import { createPayersTable } from "./utls/sql.js";
import express from 'express';


// Initializing express server
const app = express();
const port = 8000;

// Create the payers table if it does not already exist
createPayersTable();

app.use(express.json());

// Define the api routes
app.post("/add", addRoute);
app.post("/spend", spendRoute);
app.get("/balance", balanceRoute);

// Listening on point 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
