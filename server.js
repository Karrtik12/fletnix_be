const express = require("express");
const connectDB = require("./config/db");
const titles = require("./routes/titles");
const auth = require("./routes/auth");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/titles", titles);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
