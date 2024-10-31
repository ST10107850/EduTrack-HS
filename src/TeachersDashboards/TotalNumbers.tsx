import { useLocation } from "react-router-dom";
// import data from "../data/data.json";

export const TotalNumbers = () => {
  const location = useLocation();
  const {
    fullName,
    surname,
    teacherId,
    gradeId = [],
  } = location.state || {
    fullName: "Teacher",
    surname: "",
    teacherId: null,
    gradeId: [],
  };

  const formattedFullName = `${fullName} ${surname}`;

  // const totalLearners = data.learners ? data.learners.length : 0;
  // const totalTeachers = data.teachers ? data.teachers.length : 0;
  // const totalParents = data.parents ? data.parents.length : 0;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-semibold text-center text-white">
        Hello {formattedFullName}
      </h1>
    </div>
  );
};
