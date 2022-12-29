import { executeQuery } from "../database/database.js";

const listQuestions = async (topicId) => {
  const res = await executeQuery(
    `SELECT * FROM questions where topic_id = $id;
        `,
    { id: topicId },
  );
  return res.rows; //get all the questions from the database
};

const addQuestion = async (userId, topicId, question_text) => {
  await executeQuery(
    `INSERT INTO questions
          (user_id, topic_id, question_text)
            VALUES ($userId, $topicId, $question_text);`,
    {
      userId: userId,
      topicId: topicId,
      question_text: question_text,
    },
  );
}; //add a question to the database

const findById = async (id) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE id = $id;",
    {
      id: id,
    },
  );
  return result.rows[0]; //return a question based on its id
};

const findQuestionsBytopicId = async (topicId) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $topicId;",
    {
      topicId: topicId,
    },
  );
  return result.rows[0]; //return all questions that belong to a certain topic
};

const deleteQuestion = async (questionId) => {
  await executeQuery(
    `DELETE FROM questions WHERE id = $questionId;`,
    { questionId: questionId },
  );
}; //delete a question from the database, based on its question id

const randomQuestion = async () => {
  const res = await executeQuery(
    `SELECT * FROM questions ORDER BY random() LIMIT 1;
        `,
  );
  return res.rows; //return a random question from the database for the API
};

export {
  addQuestion,
  deleteQuestion,
  findById,
  findQuestionsBytopicId,
  listQuestions,
  randomQuestion,
};
