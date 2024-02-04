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
      <table>
        <tbody>
          <StatisticLine statistic="good" value={good} />
          <StatisticLine statistic="neutral" value={neutral} />
          <StatisticLine statistic="bad" value={bad} />
          <StatisticLine statistic="total" value={total()} />
          <StatisticLine statistic="average" value={average()} />
          <StatisticLine
            statistic="positive"
            value={`${positivePercentage()} %`}
          />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
