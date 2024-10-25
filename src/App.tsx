import { Contact } from "./components/Contact";
import {Navbar} from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { ParentDashboard } from "./components/ParentDashboard";
import { TeachersDashboard } from "./components/TeachersDashboard";

function App() {
  return (
    <div className="">
      <Navbar />
      <Newsletter/>
      <Contact/> 
      {/* <ParentDashboard/> */}
      <TeachersDashboard/>
    </div>
  );
}

export default App;
