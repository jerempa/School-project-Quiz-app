const { test, expect } = require("@playwright/test");

test("Main page has expected title.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Quiz app!"); //check if the title is correct
  //await expect(page.locator("a")).toHaveText("Lists"); //check if the link for lists exists
});

test("Only authenticated users can access /quiz", async ({ page }) => {
  await page.goto("/quiz");
  await expect(page.locator("h1")).toHaveText(
    "Login form",
  );
  //unauthenticated user should be redirected to auth/login page
});

test("Register function works", async ({ page }) => {
  await page.goto("/auth/register");
  const email = `${"test@" + Math.random() + ".com"}`;
  const password = "123";
  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Register"]')
    .click();
  const response = await page.request.get("/auth/login");
  await expect(response.status()).toEqual(200); //if the registration was succesful, auth/login status code is 200
});

test("Admin user can add topics", async ({ page }) => {
  await page.goto("/auth/register");
  const email = "admin@admin.com";
  const password = "123456";
  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Register"]')
    .click();
  const response = await page.request.get("/auth/login");
  await expect(response.status()).toEqual(200); //if the registration was succesful, auth/login status code is 200

  //await page.locator(`a >> text='Already registered? Login here.'`).click();

  //if there are problem with the tests, try running them with and without the line above this.

  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Login"]').click(); //logging in
  await expect(page.locator("h3")).toHaveText(
    "Add a topic!",
  ); //find the correct header text with admin
  const topic = `${"Example topic" + Math.random()}`;
  await page.locator("input[type=text]").type(topic);
  await page.locator('input[type="submit"][value="Add"]')
    .click();
  await expect(page.locator(`a >> text='${topic}'`)).toHaveText(`${topic}`); //check if the topic is on the page
});

test("Normal user can't add topics", async ({ page }) => {
  await page.goto("/auth/register");
  const email = `${"test@" + Math.random() + ".com"}`;
  const password = "123456";
  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Register"]').click();
  const response = await page.request.get("/auth/login");
  await expect(response.status()).toEqual(200); //if the registration was succesful, auth/login status code is 200

  //await page.locator(`a >> text='Already registered? Login here.'`).click();

  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Login"]').click(); //logging in
  const boolean = page.isVisible("h3");
  await expect(await boolean).toEqual(false); //There shouldn't be a header 'Add a topic' if the user isn't an admin
});

test("Admin user can delete topics", async ({ page }) => {
  await page.goto("/auth/register");
  const email = "admin@admin.com";
  const password = "123456";
  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Register"]')
    .click();
  const response = await page.request.get("/auth/login");
  await expect(response.status()).toEqual(200); //if the registration was succesful, auth/login status code is 200

  //await page.locator(`a >> text='Already registered? Login here.'`).click();

  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Login"]').click(); //logging in
  await expect(page.locator("h3")).toHaveText(
    "Add a topic!",
  ); //find the correct header text with admin
  const topic = `${"Example topic" + Math.random()}`;
  await page.locator("input[type=text]").type(topic);
  await page.locator('input[type="submit"][value="Add"]')
    .click();
  await expect(page.locator(`a >> text='${topic}'`)).toHaveText(`${topic}`); //check if the topic is at the screen
  await page.locator(`text=${topic} Delete >> input[type="submit"]`).click(); //delete the topic
  const boolean = page.isVisible(`a >> text='${topic}'`);
  await expect(await boolean).toEqual(false); //the topic shouldn't be on the screen anymore
});

test("Adding questions -page has the right topic header", async ({ page }) => {
  await page.goto("/auth/register");
  const email = "admin@admin.com";
  const password = "123456";
  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Register"]')
    .click();
  const response = await page.request.get("/auth/login");
  await expect(response.status()).toEqual(200); //if the registration was succesful, auth/login status code is 200

  //await page.locator(`a >> text='Already registered? Login here.'`).click();

  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Login"]').click(); //logging in
  await expect(page.locator("h3")).toHaveText(
    "Add a topic!",
  ); //find the correct header text with admin
  const topic = `${"Example topic" + Math.random()}`;
  await page.locator("input[type=text]").type(topic);
  await page.locator('input[type="submit"][value="Add"]')
    .click();
  await page.locator(`a >> text='${topic}'`).click(); //click the newly created topic link
  await expect(page.locator("h1")).toHaveText(
    `Name of the topic: ${topic}`,
  ); //the header should be the name of the topic
});

test("User can add questions", async ({ page }) => {
  await page.goto("/auth/register");
  const email = "admin@admin.com";
  const password = "123456";
  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Register"]')
    .click();
  const response = await page.request.get("/auth/login");
  await expect(response.status()).toEqual(200); //if the registration was succesful, auth/login status code is 200

  //await page.locator(`a >> text='Already registered? Login here.'`).click();

  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Login"]').click(); //logging in
  await expect(page.locator("h3")).toHaveText(
    "Add a topic!",
  ); //find the correct header text with admin
  const topic = `${"Example topic" + Math.random()}`;
  await page.locator("input[type=text]").type(topic);
  await page.locator('input[type="submit"][value="Add"]')
    .click();
  await page.locator(`a >> text='${topic}'`).click(); //click the newly created topic link
  await expect(page.locator("h1")).toHaveText(
    `Name of the topic: ${topic}`,
  ); //the header should be the name of the topic //the header should be the name of the topic
  const question = `${"Example question" + Math.random()}`;
  await page.locator("textarea").type(question);
  await page.locator('input[type="submit"][value="Add"]').click();
  await expect(page.locator(`a >> text='${question}'`)).toHaveText(
    question,
  ); //add the question and check that it's on the screen
});

test("User can add answer options", async ({ page }) => {
  await page.goto("/auth/register");
  const email = "admin@admin.com";
  const password = "123456";
  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Register"]')
    .click();
  const response = await page.request.get("/auth/login");
  await expect(response.status()).toEqual(200); //if the registration was succesful, auth/login status code is 200

  //await page.locator(`a >> text='Already registered? Login here.'`).click();

  await page.locator("input[type=email]").type(email);
  await page.locator("input[type=password]").type(password);
  await page.locator('input[type="submit"][value="Login"]').click(); //logging in
  await expect(page.locator("h3")).toHaveText(
    "Add a topic!",
  ); //find the correct header text with admin
  const topic = `${"Example topic" + Math.random()}`;
  await page.locator("input[type=text]").type(topic);
  await page.locator('input[type="submit"][value="Add"]')
    .click();
  await page.locator(`a >> text='${topic}'`).click(); //click the newly created topic link
  await expect(page.locator("h1")).toHaveText(
    `Name of the topic: ${topic}`,
  ); //the header should be the name of the topic //the header should be the name of the topic
  const question = `${"Example question" + Math.random()}`;
  await page.locator("textarea").type(question);
  await page.locator('input[type="submit"][value="Add"]').click();
  await page.locator(`a >> text='${question}'`).click(); //click the newly added question
  await expect(page.locator("h2")).toHaveText(
    `Question: ${question}`,
  ); //the page should have the right question header
  const answer_options = `${"Example option" + Math.random()}`;
  await page.locator("textarea").type(answer_options);
  await page.locator('input[type="submit"][value="Add"]').click(); //add an answer option
  await expect(page.locator(`p >> text='${answer_options}'`)).toHaveText(
    `${answer_options}`,
  ); //the created answer option should be on the screen
});
