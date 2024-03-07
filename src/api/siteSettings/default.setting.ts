export const auth = {
  mandatoryRegisterFields: [
    { name: "firstName", type: "String" },
    { name: "lastName", type: "String" },
    { name: "userName", type: "String" },
  ],
  accessTokenValidity: 900, // Ex. 60, "2 days", "10h", "7d". Numeric value is seconds
  refreshTokenValidity: "30d", // Ex. 60, "2 days", "10h", "7d". Numeric value is seconds
};

export const notification = {
  smsGateway: "SNS", // SNS, oursms, twilio-verify, twilio-message
  emailGateway: "SES", //Default is AWS-SES
  smsRegistrationTemplate: "default",
  emailRegistrationTemplate: "default",
  showDiscord: false,
};

export const api = {
  api: `api`,
  version: `v1`,
};
