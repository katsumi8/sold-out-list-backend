"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const apis_1 = __importDefault(require("./apis"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 8000;
const ENV_PATH = path_1.default.join(__dirname, "../.env");
dotenv_1.default.config({ path: ENV_PATH });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/build")));
// app.use(Express.static(path.join(__dirname, "../public")))
// APIの設定
app.use("/api", apis_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/build/index.html"));
    // res.sendFile(path.join(__dirname, "../public/index.html"))
});
const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_NAME } = process.env;
mongoose_1.default.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.tvmvs0t.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log("Unable to connect to MongoDB");
        console.log(err);
    }
    else {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`listening on *:${port}`);
        });
    }
});
