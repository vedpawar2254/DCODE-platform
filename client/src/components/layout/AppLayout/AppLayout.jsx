import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import Bennefits from '../Bennefits/Bennefits';
import About from '../About/About';

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Bennefits />
      <About />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
