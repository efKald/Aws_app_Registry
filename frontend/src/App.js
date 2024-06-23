import './App.css';
import { Homebar } from './components/homebar';
import { Login } from './components/login';
import { SearchActivity } from './components/searchActivity';
import { RegisterActivity } from './components/registerActivity';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/home';

//React needs Node.js installed to run.
//npm install -g
//.js == .jsx file here.
function App() {
  return (
    <div className="App">
      <Homebar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='home' element={<Home/>} />
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<RegisterActivity/>} />
          <Route path='search' element={<SearchActivity/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
