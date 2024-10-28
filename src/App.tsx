import AdminDashboard from "./components/AdminDashboard";
import { Boards } from "./components/Boards";
import { Contact } from "./components/Contact";
import {Navbar} from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { ParentDashboard } from "./components/ParentDashboard";
import { TeachersDashboard } from "./components/TeachersDashboard";

function App() {
  return (
    <div className="">
      <Navbar />
      <AdminDashboard />
      <Newsletter/>
      <Contact/> 
      <ParentDashboard/>
      <TeachersDashboard/>
      {/* <Boards/> */}
    </div>
  );
}

export default App;
