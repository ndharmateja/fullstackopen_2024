const StatisticLine = ({ statistic, value }) => {
  return (
    <tr>
      <td>{statistic}</td>
      <td>{value}</td>
    </tr>
  );
};

export default StatisticLine;
