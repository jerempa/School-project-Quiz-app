import { assertArrayIncludes, assertEquals } from "../deps.js";
import * as questionService from "./../services/questionService.js";
import * as topicService from "./../services/topicService.js";

let topic_name = "Test topic";
let question = "Test question";
const random_number = Math.random();
question += random_number;
topic_name += random_number;
await topicService.addTopic("1", topic_name);
const topics = await topicService.listTopics();
const topicId = topics.find(({ name }) => name === topic_name); // add topic, get its id, then add question for the tests
await questionService.addQuestion("1", topicId.id, question);
let questions = await questionService.listQuestions(topicId.id);
let questionId = questions.find(({ question_text }) =>
  question_text === question
);

// deno-lint-ignore require-await
Deno.test("Test that question can be added", async () => {
  assertArrayIncludes(questions, random_number); //check if the array contains this added question
});

Deno.test("Test that findById works", async () => {
  const questionById = await questionService.findById(questionId.id);

  assertEquals(questionById, {
    id: questionId.id,
    user_id: 1,
    topic_id: topicId.id,
    question_text: question,
  }); //test that findById returns the correct object
});

Deno.test("Test that deleteQuestion works", async () => {
  await questionService.deleteQuestion(questionId.id);
  questions = await questionService.listQuestions(topicId.id);
  questionId = questions.find(({ question_text }) =>
    question_text === question
  );

  assertEquals(questionId, undefined);
  //questionId should be undefined after deleting the question from the database
});
