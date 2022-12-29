import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerOptionService.js";
import * as quizService from "../../services/quizService.js";

const randomQuestion = async ({ response }) => {
  let document = {};
  const question = await questionService.randomQuestion();
  if (question.length === 0) {
    response.body = document;
  }
  const answer_options = await answerService.listOptions(question[0].id);
  delete question[0].topic_id;
  delete question[0].user_id;
  for (let i = 0; i < answer_options.length; i++) {
    answer_options[i]["optionId"] = answer_options[i]["id"];
    answer_options[i]["optionText"] = answer_options[i]["option_text"];
    delete answer_options[i]["id"];
    delete answer_options[i]["option_text"];
    delete answer_options[i].question_id;
    delete answer_options[i].is_correct;
  }
  document = {
    questionId: question[0].id,
    questionText: question[0].question_text,
    answerOptions: answer_options,
  }; //retrieve the question and answer options, delete unnecessary data then put the data to the response.body

  response.body = document;
};

const checkAnswer = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;
  const correctAnswer = await quizService.checkAnswer(document.optionId);
  if (correctAnswer) {
    response.body = { correct: true };
  }
  if (!(correctAnswer)) {
    response.body = { correct: false };
  }
  //return true or false depending on if the answer was correct or not
};

export { checkAnswer, randomQuestion };
