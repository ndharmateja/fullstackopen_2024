import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const total = () => good + neutral + bad;
  const average = () => (good - bad) / total();
  const positivePercentage = () => (good * 100) / total();

  if (total() == 0)
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );

  return (
    <div>
      <StatisticLine statistic="good" value={good} /> <br />
      <StatisticLine statistic="neutral" value={neutral} /> <br />
      <StatisticLine statistic="bad" value={bad} /> <br />
      <StatisticLine statistic="total" value={total()} /> <br />
      <StatisticLine statistic="average" value={average()} /> <br />
      <StatisticLine statistic="positive" value={positivePercentage()} /> %{" "}
      <br />
    </div>
  );
};

export default Statistics;
