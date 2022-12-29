import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  topic: [validasaur.minLength(1), validasaur.required], //validation requirements for new topic
};

const getTopicData = async (request, user) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    topic: params.get("name"),
    user: user,
    topics: await topicService.listTopics(),
  };
}; //get data from the form

const addTopic = async ({ render, request, response, user }) => {
  const topicData = await getTopicData(request, user);

  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if (!passes) {
    console.log(errors);
    topicData.validationErrors = errors;
    render("allTopics.eta", topicData);
  } else {
    await topicService.addTopic(
      user.id,
      topicData.topic,
    );
    response.redirect("/topics");
  } //validate inputted data and add it to database if ok, if not then give error message
};

const listTopics = async ({ render, user }) => {
  render("allTopics.eta", {
    topics: await topicService.listTopics(),
    user: user,
  });
}; //list all the topics and render page

const deleteTopic = async ({ response, params, user }) => {
  if (user.admin) {
    const topic_id = params.id;
    const questions = await questionService.findQuestionsBytopicId(topic_id);
    if (questions) {
      await answerOptionService.deleteOptionByquestionId(questions.id);
      await questionService.deleteQuestion(questions.id);
    }
    await topicService.deleteTopic(
      topic_id,
    );
  }
  response.redirect(`/topics`); //delete a spesific topic
};

export { addTopic, deleteTopic, getTopicData, listTopics };
