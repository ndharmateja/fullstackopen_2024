const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((p) => {
        const { name, id, number } = p;
        return (
          <div key={id}>
            <span>{`${name} ${number} `}</span>
            <button onClick={() => handleDelete(p)}>delete</button>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
