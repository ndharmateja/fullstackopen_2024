import Header from "./Header";
import Part from "./Part";

const Course = ({ course }) => {
  const { name, parts } = course;

  const totalExercises = () =>
    parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header name={name} />
      {parts.map((part) => {
        const id = part.id;
        return <Part key={id} part={part} />;
      })}
      <strong>total of {totalExercises()} exercises</strong>
    </div>
  );
};

export default Course;
