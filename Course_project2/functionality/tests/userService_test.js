import { assertArrayIncludes } from "../deps.js";
import * as userService from "./../services/userService.js";

let email = "Test email";
const password = "123";
const random_number = Math.random();
email += random_number;
await userService.addUser(email, false, password); //adding a user, note that the password isn't hashed as we only call the addUser function.
const find_user = await userService.findUserByEmail(email); //find user based on email

// deno-lint-ignore require-await
Deno.test("Test that user can be added", async () => {
  assertArrayIncludes(find_user, random_number); //check if the array contains this added user with random number of the email
});
