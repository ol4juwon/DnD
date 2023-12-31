import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import { message } from 'antd';
import 'aos/dist/aos.css';
import Navbar from './Components/Navbar'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/aguafina-script';
import Pages from './Pages';
function App() {
  AOS.init();
  message.config({
    top: 100,
    duration: 3,
    maxCount: 2,
  });
  return (
<Router>
  {/* <Navbar /> */}
  <Pages/>
</Router>
  );
}

export default App;
