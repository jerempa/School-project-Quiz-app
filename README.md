# Project 2: Quiz app

Quiz app is a project that allows a user to register, log in, add and delete
topics (if admin). It's also possible to add and delete questions to the topics
and answer options to the questions. The project has a navigation bar, clear
indication about the pages (e.g. user knows which input he/she is about to give,
the topic and question name are visible if he/she is adding answer options
etc.). The project also has a quiz site, where the user can combine all of these
aforementioned features and use them in a similar way to flashcards.

There is data validation for form fields and access control (certain sites /
functions aren't accessible if you aren't logged in or the admin user).

## Project 2 structure

Under "drill-and-practice" -folder there are directories and files. Not every
directory is in use and has files, apart from a readme-file. Directories include
controllers, database, services, tests, partials, apis, routes, and views and
layouts. Controllers-folder has js-files that take care of the responses that
the user gets at the webpage. Under databases-folder .js file takes care of
basic database functionality. Under services-directory, .js files interact with
the database. Views folder has eta.files for different pages, and under views
there is also layouts that has a layout eta-file. Deps.js has depencies that are
used, routes.js handles requests and app.js the use of middleware and routes
etc. There are more specific comments on every js-file.

Under e2e-playwright -folder there is a quiz_app_testing.spec.js-file that has
functions for testing the program. These can be run by opening the right file in
integrated terminal and running the command "docker-compose run --entrypoint=npx
e2e-playwright playwright test ; docker-compose rm -s". Docker needs to be
running. If the mentioned command isn't working, look at the course material.

If there seems to be problems with the tests (certain locator isn't found), run
them with and without a line that has a mention about it on row 42.

Also under tests-folder there are couple of different files for testing the
program. They also have more specific comments. You can run these test e.g. by
running command "docker-compose run --rm drill-and-practice deno test
--allow-all" on integrated terminal.

NOTE: if the tests don't work with the aforementioned command. You should
manually set your own database credentials to database.js (replace rows 1 to 4
with: import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({ hostname: "your hostname", database: "your
database", user: "your user", password: "your password", port: 5432, });) Refer
to the course material if you're having problems setting up your own database.
ElephantSQL isn't the only site you can user for setting up your own database,
so you can use any of your choice.

Then run the file e.g. by running deno test --allow-all on integrated terminal.

## Guidelines for running the application locally

The applications can be accessed at localhost:7777. You can run it e.g. by
"docker-compose up" -command, but make sure that Docker is running.

ElephantSQL was used for making this project. ElephantSQL database used
port 5432. If you wish to use ElephantSQL while running the program locally,
remember to change the database.js file and its contents, otherwise you can run
the program with "docker-compose up". ElephantSQL can be found at
https://www.elephantsql.com/.

If you wish to use ElephantSQL, after modifying database.js with your own
credentials, you can run the program with e.g. command "deno run --allow-net
--allow-read --allow-env --watch app-launch.js

## Online deployment with Fly.io

The program is accessible in the following link:
https://quiz-app-project2.fly.dev/ If the page says internal server error,
please refresh the page. There has been problems with Fly.io, so hopefully these
don't appear when you try to open the page and it works fine.
