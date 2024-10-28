
import { Contact } from "./components/Contact";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { ParentDashboard } from "./components/ParentDashboard";
import { TeachersDashboard } from "./components/TeachersDashboard";
import { NewUsers } from "./Pages/NewUsers";

function App() {
  return (
    <div className="">
      <Navbar />
      <Newsletter />
      <Contact />
      <ParentDashboard />
      <TeachersDashboard />
      <NewUsers/>
    </div>
  );
}

export default App;
