import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// Test Route
app.get("/", (req, res) => {
  res.send("HomelyHub Backend is running successfully!");
}); 


app.listen(PORT, () => {
  console.log(`Server is running on port no.: ${PORT}`);
})



