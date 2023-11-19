
import './App.css';
import LoginPage from './components/Auth';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './components/Signup';
import GmailPage from './components/GmailPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<LoginPage/>}></Route>
        <Route path='/signup'element={<Signup/>}></Route>
        <Route path='/gmail'element={<GmailPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
