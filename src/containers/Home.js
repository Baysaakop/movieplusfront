import React from 'react';
import { Grid, Col, Divider, Row, Typography, Avatar } from 'antd';
import './Home.css';
import About from '../components/About';
import TreeCountOrder from '../tree/TreeCountOrder';
import TreeList from '../tree/TreeList';
import ProjectList from '../project/ProjectList';
import Leaderboard from '../account/Leaderboard';
import HomeOrder from '../tree/HomeOrder';
import Idea from '../components/Idea';
// import axios from 'axios';  
// import api from '../api';
// import { Link } from 'react-router-dom';

const { useBreakpoint } = Grid;

function Home (props) {    
    const screens = useBreakpoint();    

    return (
        <div className="home">
                    
        </div>
    )
}

export default Home;