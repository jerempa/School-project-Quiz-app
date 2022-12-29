import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  question: [validasaur.minLength(1), validasaur.required], //validation requirements for new topics
};

const getQuestionData = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const topic_id = urlParts[2];
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    topic: await topicService.findById(topic_id),
    question: params.get("question_text"),
    questions: await questionService.listQuestions(topic_id),
  }; //get the topic data from the form
};

const listQuestions = async ({ render, params }) => {
  render("topic.eta", {
    questions: await questionService.listQuestions(params.id),
    topic: await topicService.findById(params.id), //call another file and function to show all the available questions for this particular topic
  });
};

const addQuestion = async ({ render, request, response, user }) => {
  const questionData = await getQuestionData(request, user);

  const [passes, errors] = await validasaur.validate(
    questionData,
    topicValidationRules,
  );

  if (!passes) {
    console.log(errors);
    questionData
      .validationErrors = errors;
    render("topic.eta", questionData);
  } else {
    await questionService.addQuestion(
      user.id,
      questionData.topic.id,
      questionData.question,
    );
    response.redirect(`/topics/${questionData.topic.id}`); //add the data and validate it: give error messages and populate fields or redirect if ok
  }
};

const deleteQuestion = async ({ response, params }) => {
  const topic_id = params.tId;
  const question_id = params.qId;
  await questionService.deleteQuestion(
    question_id,
  );
  response.redirect(`/topics/${topic_id}`); //delete a question from the database
};

export { addQuestion, deleteQuestion, listQuestions };
