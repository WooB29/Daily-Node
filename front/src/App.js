import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/signup';
import SignIn from './pages/signin';
import Home from './pages/home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;