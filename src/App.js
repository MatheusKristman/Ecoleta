import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import List from './components/List';
import Register from './components/Register';
import NotFound from './components/NotFound';
import './App.css';

function App() {
    

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/list' element={<List />} />
                <Route exact path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
