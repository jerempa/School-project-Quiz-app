import { assertArrayIncludes, assertEquals } from "../deps.js";
import * as questionService from "./../services/questionService.js";
import * as answerOptionService from "./../services/answerOptionService.js";
import * as topicService from "./../services/topicService.js";
import * as quizService from "./../services/quizService.js";

let topic_name = "Test topic";
let question = "Test question";
let answer_option = "Test option";
const random_number = Math.random();
question += random_number;
answer_option += random_number;
topic_name += random_number;
await topicService.addTopic("1", topic_name);
const topics = await topicService.listTopics();
const topicId = topics.find(({ name }) => name === topic_name); // add topic, get its id, then add question for the tests
await questionService.addQuestion("1", topicId.id, question);
const questions = await questionService.listQuestions(topicId.id);
const questionId = questions.find(({ question_text }) =>
  question_text === question
);
await answerOptionService.addOption(questionId.id, answer_option, false);
let options = await answerOptionService.listOptions(questionId.id); //add an answer option and list them
let optionId = options.find(({ option_text }) => option_text === answer_option);

// deno-lint-ignore require-await
Deno.test("Test that answer option can be added", async () => {
  assertArrayIncludes(options, random_number); //check if the array contains this added question
});

Deno.test("Test that deleteOption works", async () => {
  await answerOptionService.deleteOption(questionId.id, optionId.id);
  options = await answerOptionService.listOptions(questionId.id);
  optionId = options.find(({ option_text }) => option_text === answer_option);

  assertEquals(optionId, undefined);
  //optionId should be undefined after deleting the option from the database
});

Deno.test("Test that function quizService.correctAnswer works", async () => {
  assertEquals(
    await quizService.correctAnswer(questionId.id),
    "The correct answer hasn't been set by the users",
  ); //check if function returns the correct option_text when there isn't a correct answer
  answer_option += Math.random();
  await answerOptionService.addOption(
    questionId.id,
    answer_option,
    true,
  );
  assertEquals(
    await quizService.correctAnswer(questionId.id),
    answer_option,
  );
});
