import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import Bennefits from '../Bennefits/Bennefits';

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Bennefits />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
