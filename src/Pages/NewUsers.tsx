import { NewLearner } from "../components/NewLearner";
import { NewTeacher } from "../components/NewTeacher";
import { ApiProvider } from '../hooks/ApiContext';

export const NewUsers = () => {
  return (
    <div>
      <ApiProvider api="/api/learners">
        <NewLearner />
      </ApiProvider>
      <ApiProvider api="/api/teachers">
        <NewTeacher />
      </ApiProvider>
    </div>
  );
};
