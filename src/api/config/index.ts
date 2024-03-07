import dotenv from "dotenv";
dotenv.config();

export default {
  port: 8080,
  jwt: {
    accessValidity: "23m",
    accessSecretKey: "8uhur268uihdi29yu7t",
    refreshValidity: "7d",
    refreshSecretKey: "01wi9w821t7r61t8iw1i98t16rtwuw98y7",
  },
  DB_URI: "mongodb://127.0.0.1:27017/coffee",
};
