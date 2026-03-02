const validator = require("validator");
const validate = (data) => {
  const mandatoryField = ["firstName", "lastName", "emailID"];
  const isAllowed = mandatoryField.every((k) => Object.keys(data).includes(k));
  if (!isAllowed) throw new Error("Some Field Missing");
  if (!validator.isEmail(data.emailID)) throw new Error("Invalid Email");
  if (!validator.isStrongPassword(data.password))
    throw new Error("Enter Strong Password");
};
module.exports = validate;
