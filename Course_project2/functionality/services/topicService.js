import { executeQuery } from "../database/database.js";

const addTopic = async (userId, name) => {
  await executeQuery(
    `INSERT INTO topics
        (user_id, name)
          VALUES ($userId, $name)`,
    {
      userId: userId,
      name: name,
    },
  );
}; //add a new topic to the database

const listTopics = async () => {
  const res = await executeQuery(`SELECT * FROM topics ORDER BY name;
      `);
  return res.rows; //return all of the topics in alphabetical order
};

const findById = async (id) => {
  const result = await executeQuery(
    "SELECT * FROM topics WHERE id = $id;",
    {
      id: id,
    },
  );
  return result.rows[0]; //find and return a topic based on its id
};

const deleteTopic = async (topicId) => {
  await executeQuery(
    `DELETE FROM questions WHERE topic_id = $topicId;`,
    { topicId: topicId },
  );
  await executeQuery(
    `DELETE FROM topics WHERE id = $topicId;`,
    { topicId: topicId }, //delete questions based on topic id and then the topic
  );
};

export { addTopic, deleteTopic, findById, listTopics };
