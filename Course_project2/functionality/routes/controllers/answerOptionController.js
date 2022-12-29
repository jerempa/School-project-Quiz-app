import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
  option_text: [validasaur.minLength(1), validasaur.required], //validation requirements for the answer option
};

const getOptionData = async (request, user) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const topic_id = urlParts[2];
  const q_id = urlParts[4];
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    topic_id: topic_id,
    options: await answerOptionService.listOptions(q_id),
    option_text: params.get("option_text"),
    topic: await topicService.findById(topic_id),
    is_correct: params.get("is_correct"),
    question: await questionService.findById(q_id),
    user: user,
  }; //return the data of the posted option form
};

const listOptions = async ({ render, params, user }) => {
  render("answer_options.eta", {
    options: await answerOptionService.listOptions(params.qId),
    question: await questionService.findById(params.qId),
    topic: await topicService.findById(params.id),
    user: user,
  }); //list the page that has all possible answer options and a possibility to add more options
};

const addOption = async ({ render, request, response, user }) => {
  const optionData = await getOptionData(request, user);

  const [passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    optionData.validationErrors = errors;
    render("answer_options.eta", optionData);
  } else {
    await answerOptionService.addOption(
      optionData.question.id,
      optionData.option_text,
      optionData.is_correct,
    );
    response.redirect(
      `/topics/${optionData.topic_id}/questions/${optionData.question.id}`, //validate data and populate fields and give error message if it fails or add data to database and redirect if the input was ok
    );
  }
};

const deleteOption = async ({ response, params }) => {
  const topic_id = params.tId;
  const question_id = params.qId;
  const option_id = params.oId;
  await answerOptionService.deleteOption(
    question_id,
    option_id,
  );
  response.redirect(`/topics/${topic_id}/questions/${question_id}`); //delete an answer option from the database
};

export { addOption, deleteOption, getOptionData, listOptions };
