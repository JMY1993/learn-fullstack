const Course = ({courses, headerName}) => (
    <div>
      <Header headerName={headerName} />
      {courses.map((course) => (
        <Curriculum key={course.id} name={course.name} parts={course.parts} />
      ))}
    </div>
)

const Header = ({text}) => <h1>{text}</h1>

const CurriculumItem = ({ partName, exercises }) => {
  return (
    <p>
      {partName} {exercises}
    </p>
  );
};

const Curriculum = ({ name, parts }) => {
  return (
    <div>
      <h2>{name}</h2>
      {parts.map((part) => (
        <CurriculumItem
          key={part.id}
          partName={part.name}
          exercises={part.exercises}
        />
      ))}
      <h3>total of {parts.reduce((sum, c)=>sum+c.exercises, 0)} exercises</h3>
    </div>
  );
};

export default Course;