import * as quizService from "../../services/quizService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";

const listTopics = async ({ render }) => {
  render("quiz.eta", {
    topics: await topicService.listTopics(),
    num_of_questions: 1,
  }); //show the topics in the quiz page, num of questions is for keeping track if the topic has questions or not
};

let chosenQuestion = {};

const chooseQuestion = async ({ render, params, response }) => {
  const question_and_id = await quizService.chooseQuestion(params.tId);
  chosenQuestion = question_and_id;
  if (!(chosenQuestion)) {
    render("quiz.eta", {
      topics: await topicService.listTopics(),
      num_of_questions: await questionService.findQuestionsBytopicId(
        params.tId,
      ),
      certain_topic: await topicService.findById(params.tId), //if the topic doesn't have questions (num of questions is null) then render the page again and inform the user about it
    });
  } else {
    response.redirect(`/quiz/${params.tId}/questions/${question_and_id.id}`); //redirect if it has questions
  }
};

const listAnswers = async ({ render, params }) => {
  render("quiz_questions.eta", {
    question: chosenQuestion,
    options: await answerOptionService.listOptions(chosenQuestion.id),
    id: params.tId,
  }); //render the answer options
};

const checkAnswer = async ({ params, response, user }) => {
  await quizService.storeAnswer(user.id, params.qId, params.oId);
  const boolean = await quizService.checkAnswer(params.oId);
  if (boolean === true) {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
  } else {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
  } //check if the answer was correct and redirect based on the boolean value
};

const showAnswer = async ({ render, params, request }) => {
  const url = new URL(request.url);
  if (url.pathname.includes("incorrect")) {
    render("answer.eta", {
      answer: await quizService.correctAnswer(params.qId),
      boolean: false,
      topic_id: params.tId,
    });
  } else {
    render("answer.eta", {
      boolean: true,
      topic_id: params.tId,
    });
  } //render the page which shows if the answer was correct or not. If it was incorrect then show the correct answer also
};

export { checkAnswer, chooseQuestion, listAnswers, listTopics, showAnswer };
