import * as statisticsService from "../../services/statisticsService.js";

const getStatisticsData = async () => {
  return {
    topics: await statisticsService.listTopics(),
    questions: await statisticsService.listQuestions(),
    options: await statisticsService.listOptions(),
    answers: await statisticsService.listAnswers(),
  };
};

const showMain = async ({ render }) => {
  const statistics = await getStatisticsData();
  render("main.eta", statistics); //statistics data for the main page and show the main page for the user, regardless if it's logged in or not
};

export { showMain };
