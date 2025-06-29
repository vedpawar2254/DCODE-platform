import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
