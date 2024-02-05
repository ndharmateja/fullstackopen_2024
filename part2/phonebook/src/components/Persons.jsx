const Persons = ({ persons }) => {
  return (
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
  );
};

export default Persons;
