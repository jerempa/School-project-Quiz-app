import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const loginData = { email: "", password: "" };

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );
  if (userFromDatabase.length != 1) {
    loginData.password = "";
    loginData.email = "This email doesn't belong to a user!";
    render("login.eta", loginData);
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    loginData.email = "";
    loginData.password = "The password was incorrect!";
    render("login.eta", loginData);
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics"); //process the login by checking if the email and passwords are found and if they match with an existing user
};

const showLoginForm = ({ render }) => {
  loginData.password = "";
  loginData.email = "";
  render("login.eta", loginData); //show login form
};

export { processLogin, showLoginForm };
