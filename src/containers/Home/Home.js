import React from 'react';
import FilmSwiper from '../Film/FilmSwiper';
import './Home.css';
// import axios from 'axios';  
// import api from '../api';
// import { Link } from 'react-router-dom';

function Home (props) {        

    return (
        <div className="home">
            <div>
                <FilmSwiper title="Шинээр нээлтээ хийсэн" />
                <FilmSwiper title="Өндөр үнэлгээтэй" />
            </div>
        </div>
    )
}

export default Home;