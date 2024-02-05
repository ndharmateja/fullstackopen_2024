const NumbersList = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {persons.map(({ name, id, number }) => (
          <div key={id}>
            <span>
              {name} {number}
            </span>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumbersList;
