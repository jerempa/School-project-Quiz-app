import { executeQuery } from "../database/database.js";

const chooseQuestion = async (topicId) => {
  const question = await executeQuery(
    "SELECT question_text, id FROM questions where topic_id =$topicId ORDER BY RANDOM() LIMIT 1",
    { topicId: topicId },
  );
  return question.rows[0]; //return a random question from a certain topic
};

const checkAnswer = async (optionId) => {
  const boolean = await executeQuery(
    "SELECT is_correct FROM question_answer_options WHERE id=$optionId;",
    { optionId: optionId },
  );
  if (boolean.rows[0]) {
    return boolean.rows[0].is_correct; //return boolean value based on the answer that the user chose. False = incorrect, true = correct
  } //if the optionId isn't found then don't return anything
};

const correctAnswer = async (qId) => {
  const boolean = await executeQuery(
    "SELECT option_text FROM question_answer_options WHERE is_correct=true and question_id=$qId;",
    { qId: qId },
  );
  if (boolean.rows[0]) {
    return boolean.rows[0].option_text; //return the correct answer as a string
  } else {
    return "The correct answer hasn't been set by the users";
  }
};

const storeAnswer = async (userId, questionId, optionId) => {
  await executeQuery(
    `INSERT INTO question_answers
        (user_id, question_id, question_answer_option_id)
          VALUES ($userId, $questionId, $optionId);`,
    {
      userId: userId,
      questionId: questionId,
      optionId: optionId,
    },
  ); //store the user's answer to the database
};

export { checkAnswer, chooseQuestion, correctAnswer, storeAnswer };
