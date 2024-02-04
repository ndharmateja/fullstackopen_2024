import Header from "./Header";
import Part from "./Part";

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <div>
      <Header name={name} />
      {parts.map((part) => {
        const id = part.id;
        return <Part key={id} part={part} />;
      })}
    </div>
  );
};

export default Course;
