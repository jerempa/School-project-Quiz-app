import { assertArrayIncludes, assertEquals } from "../deps.js";
import * as topicService from "./../services/topicService.js";

let topic_name = "Test topic";
const random_number = Math.random();
topic_name += random_number;
await topicService.addTopic("1", topic_name); //create a topic and a random number to make it unique
let topics = await topicService.listTopics();
let topicId = topics.find(({ name }) => name === topic_name); //get the id of the topic

// deno-lint-ignore require-await
Deno.test("Test that addTopic and listTopics works", async () => {
  assertArrayIncludes(topics, random_number); //check if the array contains this added topic
});

Deno.test("Test that findById works", async () => {
  const topicById = await topicService.findById(topicId.id);

  assertEquals(topicById, {
    id: topicId.id,
    name: topic_name,
    user_id: 1,
  }); //test that findById returns the correct object
});

Deno.test("Test that deleteTopic works", async () => {
  await topicService.deleteTopic(topicId.id);
  topics = await topicService.listTopics();
  topicId = topics.find(({ name }) => name === topic_name);

  assertEquals(topicId, undefined);
  //topicId should be undefined after deleting the topic from the database
});
