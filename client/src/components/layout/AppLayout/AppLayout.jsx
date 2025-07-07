import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Hero from '../../Hero/Hero';
import Benefits from '../../Benefits/Benefits';
import About from '../../About/About';
import Timeline from '../../Timeline/Timeline';
const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Benefits />
      <About />
      <Timeline />
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;
