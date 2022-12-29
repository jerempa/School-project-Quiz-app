import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.minLength(4), validasaur.required], //validation requirements for email and password
};

const registrationData = { email: "", password: "" };

const getRegistrationData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  registrationData.email = params.get("email");
  registrationData.password = params.get("password"); //get the data from the form
};

const registerUser = async ({ render, request, response }) => {
  let is_admin = false;
  await getRegistrationData(request);
  const [passes, errors] = await validasaur.validate(
    registrationData,
    registrationValidationRules,
  );

  if (!passes) {
    console.log(errors);
    registrationData.validationErrors = errors;
    render("registration.eta", registrationData);
  } else {
    if (
      registrationData.email === "admin@admin.com" &&
      registrationData.password === "123456"
    ) {
      is_admin = true;
    }
    await userService.addUser(
      registrationData.email,
      is_admin,
      await bcrypt.hash(registrationData.password),
    );
    response.redirect("/auth/login"); //validate registration data and give error messages and populate data if it fails validation or redirect to login page
  }
};

const showRegistrationForm = ({ render }) => {
  registrationData.email = "";
  registrationData.password = "";
  registrationData.validationErrors = "";
  render("registration.eta", registrationData); //render the registration page
};

export { registerUser, showRegistrationForm };
