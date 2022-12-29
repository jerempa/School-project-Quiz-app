import { executeQuery } from "../database/database.js";

const listOptions = async (questionId) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options where question_id = $id;
          `,
    { id: questionId },
  );
  return res.rows; //get all the answer options that have correct question id from the database
};

const addOption = async (questionId, option_text, is_correct) => {
  if (is_correct === null) {
    is_correct = false;
  } // check if the value of the checkbox is null
  await executeQuery(
    `INSERT INTO question_answer_options
            (question_id, option_text, is_correct)
              VALUES ($questionId, $option_text, $is_correct);`,
    {
      questionId: questionId,
      option_text: option_text,
      is_correct: is_correct,
    },
  ); //add values to the database
};

const deleteOption = async (questionId, optionId) => {
  await executeQuery(
    `DELETE FROM question_answers WHERE question_id = $questionId;`,
    { questionId: questionId },
  );
  await executeQuery(
    `DELETE FROM question_answer_options WHERE id = $optionId;`,
    { optionId: optionId },
  );
}; //delete an answer from the database based on question id and options based on option id

const deleteOptionByquestionId = async (questionId) => {
  await executeQuery(
    `DELETE FROM question_answers WHERE question_id = $questionId;`,
    { questionId: questionId },
  );
  await executeQuery(
    `DELETE FROM question_answer_options WHERE question_id = $questionId;`,
    { questionId: questionId },
  ); //delete question answers and answer options from the database
};

export { addOption, deleteOption, deleteOptionByquestionId, listOptions };
