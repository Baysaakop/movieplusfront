import { Spin, Carousel, Tag } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"

function HomeCarousel (props) {
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
            ) : articles ? (
                <Carousel autoplay dotPosition="top">
                    { articles.map(item => (
                        <div>
                            <div style={{ position: 'relative', width: '100%', paddingTop: '50%', background: '#222f3e' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ position: 'relative', overflow: 'hidden', height: '100%', width: '100%' }}>
                                        <a href={`/articles/${item.id}`}>
                                            <img alt={item.title} src={item.thumbnail} style={{ width: '100%', height: 'auto', objectFit: 'scale-down' }} />
                                        </a>
                                        <a href={`/articles/${item.id}`}>
                                            <div style={{ position: 'absolute', bottom: '0%', width: '100%', padding: '16px', background: 'rgba(0, 0, 0, 0.8)', color: '#fff', fontSize: '18px'}}>
                                                {item.title}
                                            </div>
                                        </a>
                                        <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                                            <Tag color="#130f40">Шинэ бүтээл</Tag>
                                            <Tag color="#40407a">Review</Tag>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    ))}                   
                </Carousel>
            ) : []}            
        </div>
    )
}

export default HomeCarousel