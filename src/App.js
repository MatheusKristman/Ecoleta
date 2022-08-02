import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import List from './components/List';
import Register from './components/Register';
import './App.css';

function App() {
    

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/list' element={<List />} />
                <Route exact path='/register' element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
