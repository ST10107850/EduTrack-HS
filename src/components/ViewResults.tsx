import { useParams } from "react-router-dom";
import data from "../data/data.json";

export const ViewResults = () => {
  const { userId } = useParams();
  
  // Convert userId to a string and ensure both `userId` and `u.id` are compared as strings.
  const user = data.teachers
    .concat(data.learners)
    .find((u) => String(u.id) === userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      <p><strong>Email Address:</strong> {user.emailAddress}</p>
      <p><strong>Address:</strong> {user.address}</p>
    </div>
  );
};
