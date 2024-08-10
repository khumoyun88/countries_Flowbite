import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Project from './components/Project';
// import { Button } from 'flowbite-react';
import { Button, Navbar, } from "flowbite-react";

function App() {
  
  return (
    <div>
      <Router>
        <header className="w-[900px]">
          <Navbar fluid rounded>

            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? 'active' : '')}>    
              <h1 className='text-2xl font-black'>Logo</h1>
            </NavLink>
              
            <div className="flex md:order-2">
              <Button>Selected</Button>
            </div>
            
          </Navbar>         
        </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/project' element={<Project />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
