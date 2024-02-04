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
      <span>good {good}</span> <br />
      <span>neutral {neutral}</span> <br />
      <span>bad {bad}</span> <br />
      <span>total {total()}</span> <br />
      <span>average {average()}</span> <br />
      <span>positive {positivePercentage()} %</span>
    </div>
  );
};

export default Statistics;
