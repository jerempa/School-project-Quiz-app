import { executeQuery } from "../database/database.js";

const listTopics = async () => {
  const res = await executeQuery(
    `SELECT * FROM topics;
            `,
  );
  return res.rows;
};

const listQuestions = async () => {
  const res = await executeQuery(
    `SELECT * FROM questions;
            `,
  );
  return res.rows;
};

const listOptions = async () => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options;
          `,
  );
  return res.rows;
};

const listAnswers = async () => {
  const res = await executeQuery(
    `SELECT * FROM question_answers;
            `,
  );
  return res.rows; //get all of the topics, questions, answer options and answers from the database (for the main page statistics)
};

export { listAnswers, listOptions, listQuestions, listTopics };
