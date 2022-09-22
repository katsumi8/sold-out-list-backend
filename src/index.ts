import Express from "express";
import mongoose from "mongoose";
import apiRouter from "./apis";
import path from "path";
import dotenv from "dotenv";
import cors from "cors"

const port = process.env.PORT || 8000;
const ENV_PATH = path.join(__dirname, "../.env");
dotenv.config({ path: ENV_PATH });

const app = Express();

app.use(Express.json());
app.use(cors())
// app.use(Express.static(path.join(__dirname, "../../frontend/build")));
// app.use(Express.static(path.join(__dirname, "../public")))

// APIの設定
app.use("/api", apiRouter);


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
//   // res.sendFile(path.join(__dirname, "../public/index.html"))
// });

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_NAME } = process.env;

mongoose.connect(
  `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.tvmvs0t.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Unable to connect to MongoDB");
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
      app.listen(port, () => {
        console.log(`listening on *:${port}`);
      });
    }
  }
);
