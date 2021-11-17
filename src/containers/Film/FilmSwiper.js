import { Button, message, Spin, Typography } from "antd"
import axios from "axios"
import React, { useState, useEffect } from "react"
import api from "../../api"
import FilmCard from "./FilmCard"
import "./FilmSwiper.css"
import InfiniteCarousel from 'react-leaf-carousel'
import { DoubleRightOutlined } from "@ant-design/icons"


function FilmSwiper (props) {
    const [loading, setLoading] = useState(false)
    const [films, setFilms] = useState()    

    useEffect(() => {                
        getFilms()        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps        

    function getFilms() {        
        setLoading(true)
        let url = `${api.films}?order=${props.field}`
        axios({
            method: 'GET',
            url: url,
        }).then(res => {            
            setFilms(res.data.results)
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")
            setLoading(false)
        })        
    }

    return (
        loading ? (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        ) : (
            <div>
                <div className="film-swiper-header">
                    <div className="film-swiper-title">
                        <Typography.Title level={4} style={{ margin: 0 }}>{props.title}</Typography.Title>
                    </div>
                    <div>
                        <Button type="ghost" icon={<DoubleRightOutlined />}>Бүгд</Button>
                    </div>
                </div>
                <InfiniteCarousel
                    breakpoints={[
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2,
                        },
                    },
                    ]}                    
                    swipe={true}
                    showSides={true}
                    sidesOpacity={1}
                    sideSize={0}
                    slidesToScroll={2}
                    slidesToShow={6}
                    slidesSpacing={12}                    
                    scrollOnDevice={true}
                >
                    {films ? films.map(film => (
                        <FilmCard film={film} user={props.user} token={props.token} history={props.history} />
                    )) : []}  
                </InfiniteCarousel>                                                      
            </div>
        )               
    )
}

export default FilmSwiper