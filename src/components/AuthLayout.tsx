
import { Navbar } from './Navbar';
import { Newsletter } from './Newsletter';
import { Contact } from './Contact';
import { NewUsers } from '../Pages/NewUsers';
import About from './About';
import Staff from './Staff';


export const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <Newsletter />
      <About/>
      <Staff/>
      <Contact />
      <NewUsers/>

    </>
  );
};
