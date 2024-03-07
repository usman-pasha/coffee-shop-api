import dotenv from "dotenv";
dotenv.config();

export default {
  port: 4000,
  jwt: {
    accessValidity: "1d",
    accessSecretKey: "8uhur268uihdi29yu7t",
    refreshValidity: "7d",
    refreshSecretKey: "01wi9w821t7r61t8iw1i98t16rtwuw98y7",
  },
  email: {
    smtp: {
      host: "",
      port: "",
      auth: {
        user: "",
        pass: "",
      },
    },
    from: "",
  },
};
