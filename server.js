const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const productRoutes = require("./routes/product");
const photoRoutes = require("./routes/photo");

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

//middleware
app.use(morgan("dev"));
app.use(express.json({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
//routes
app.use("/api/product", productRoutes);
app.use("/api/photo", photoRoutes);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`app running on port ${PORT}`));
