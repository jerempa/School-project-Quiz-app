import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerOptionController from "./controllers/answerOptionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";

import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);

router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);

router.get(
  "/topics/:id/questions/:qId",
  answerOptionController.listOptions,
);
router.post(
  "/topics/:id/questions/:qId/options",
  answerOptionController.addOption,
);

router.post(
  "/topics/:tId/questions/:qId/delete",
  questionController.deleteQuestion,
);

router.post(
  "/topics/:tId/questions/:qId/options/:oId/delete",
  answerOptionController.deleteOption,
);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/quiz", quizController.listTopics);
router.get("/quiz/:tId", quizController.chooseQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.listAnswers);

router.post(
  "/quiz/:tId/questions/:qId/options/:oId",
  quizController.checkAnswer,
);

router.get("/quiz/:tId/questions/:qId/correct", quizController.showAnswer);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showAnswer);

router.get("/api/questions/random", questionApi.randomQuestion);
router.post("/api/questions/answer", questionApi.checkAnswer); //different routes that call different functions

export { router };
