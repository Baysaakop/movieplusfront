import React from 'react';
import { Grid } from 'antd';
import './Home.css';
// import axios from 'axios';  
// import api from '../api';
// import { Link } from 'react-router-dom';

const { useBreakpoint } = Grid;

function Home (props) {    
    const screens = useBreakpoint();    

    return (
        <div className="home">
            <div style={{ height: '200vh' }}>
                aa
            </div>
        </div>
    )
}

export default Home;