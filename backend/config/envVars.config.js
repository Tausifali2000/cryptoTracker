import dotenv from "dotenv"; 

dotenv.config(); 

//constant Variables
export const ENV_VARS = {
  PORT: process.env.PORT || 5000,
  COINGECKO_API_KEY: process.env.COINGECKO_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL
} 