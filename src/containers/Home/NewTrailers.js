import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { message, Typography, Button, Spin } from "antd"
import InfiniteCarousel from 'react-leaf-carousel'
import { DoubleRightOutlined } from "@ant-design/icons"

function NewTrailers(props) {
    const [loading, setLoading] = useState(false)
    const [films, setFilms] = useState()    

    useEffect(() => {        
        getFilms()        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps        

    function getFilms() {        
        setLoading(true)
        let url = `${api.films}?order=-releasedate&length=3`
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

    function getHeight() {
        if (window.screen.availWidth >= 1200) {
            return window.screen.availWidth * 0.35 / 2
        } else if (window.screen.availWidth >= 992) {
            return (window.screen.availWidth - 48) * 0.5 / 2
        } else {
            return (window.screen.availWidth - 32) * 0.6
        }
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
                        <Typography.Title level={4} style={{ margin: 0 }}>Шинэ трейлер</Typography.Title>
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
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            },
                        },
                    ]}                    
                    swipe={true}
                    showSides={true}
                    sidesOpacity={1}
                    sideSize={0}
                    slidesToShow={2}
                    slidesToScroll={1}            
                    slidesSpacing={12}                    
                    scrollOnDevice={true}
                >
                    {films ? films.map(film => (
                        <div>
                            {/* <img alt={film.title} src={film.landscape} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
                            <iframe 
                                title={film.title} 
                                width="100%" 
                                height={getHeight()} 
                                src={film.trailer} 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                            >
                            </iframe>                                                
                        </div>
                    )) : []}  
                </InfiniteCarousel>                                   
            </div>
        )
    )
}

export default NewTrailers