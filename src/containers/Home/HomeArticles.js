import { DoubleRightOutlined } from "@ant-design/icons"
import { Button, Spin, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"
import ArticleCard from "../Article/ArticleCard"
import InfiniteCarousel from 'react-leaf-carousel'

function HomeArticles (props) {

    const [loading, setLoading] = useState(false)
    const [articles, setArticles] = useState()

    useEffect(() => {
        getNews()
    }, [])

    function getNews() {        
        setLoading(true)
        const url = `${api.articles}?length=4`
        axios({
            method: 'GET',
            url: url
        }).then(res => {     
            console.log(res.data)       
            setArticles(res.data.results)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    return (
        <div>        
            { loading ? (
                <div className="loading">
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : (
                <div className="news-list" style={{ marginTop: '24px' }}>
                    <div className="film-swiper-header">
                        <div className="film-swiper-title">
                            <Typography.Title level={4} style={{ margin: 0 }}>Шинэ нийтлэл</Typography.Title>
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
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                },
                            },
                        ]}                    
                        swipe={true}
                        showSides={true}
                        sidesOpacity={1}
                        sideSize={0}
                        slidesToShow={3}
                        slidesToScroll={1}            
                        slidesSpacing={12}                    
                        scrollOnDevice={true}
                    >
                        {articles ? articles.map(article => (
                            <ArticleCard article={article} />
                        )) : []}  
                    </InfiniteCarousel>  
                </div>
            )}            
        </div>
    )
}

export default HomeArticles