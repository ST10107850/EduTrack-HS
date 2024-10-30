
import { Navbar } from './Navbar';
import { Newsletter } from './Newsletter';
import { Contact } from './Contact';
import { NewUsers } from '../Pages/NewUsers';


export const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <Newsletter />
      <Contact />
      <NewUsers/>

    </>
  );
};
