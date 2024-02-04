const AnecdoteSection = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>
        {anecdote}
        <br />
        has {votes} votes
      </p>
    </div>
  );
};

export default AnecdoteSection;
