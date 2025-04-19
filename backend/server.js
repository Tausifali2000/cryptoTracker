import express from "express"; 
import cors from "cors"; 
import { ENV_VARS } from "./config/envVars.config.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import path from "path";

const app = express();
const __dirname = path.resolve();
const PORT = ENV_VARS.PORT;

app.use(cors({
  origin: ENV_VARS.CLIENT_URL || "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
 allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/api/coins", dashboardRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}





app.listen(PORT,() => {
  console.log("Server started at " + PORT );
 
});