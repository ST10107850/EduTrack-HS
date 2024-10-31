import data from "../data/data.json"; 

export const TotalNumber = () => {
  // Calculate the totals based on the length of each array
  const totalLearners = data.learners ? data.learners.length : 0;
  const totalTeachers = data.teachers ? data.teachers.length : 0;
  const totalParents = data.parents ? data.parents.length : 0;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-semibold text-center text-white">
        Hello Admin
      </h1>
      <div className="flex mt-5 space-x-4">
        <div className="bg-blue-600 py-2 px-4 text-center text-white rounded-lg">
          <p>Total Number Of Learners:</p>
          <p>{totalLearners}</p>
        </div>
        <div className="bg-blue-600 py-2 px-4 text-center text-white rounded-lg">
          <p>Total Number Of Teachers:</p>
          <p>{totalTeachers}</p>
        </div>
        <div className="bg-blue-600 py-2 px-4 text-center text-white rounded-lg">
          <p>Total Number Of Parents:</p>
          <p>{totalParents}</p>
        </div>
      </div>
    </div>
  );
};
