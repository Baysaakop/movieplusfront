import { Breadcrumb, List, Spin } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"

function NewsList (props) {

    const [loading, setLoading] = useState(false)
    const [articles, setArticles] = useState(false)

    useEffect(() => {
        getNews()
    }, [])

    function getNews() {        
        setLoading(true)
        axios({
            method: 'GET',
            url: 'https://newsapi.org/v2/everything?q=apple&from=2021-08-22&to=2021-08-22&sortBy=popularity&apiKey=a52be9a836324a96ba0dcf324b916b7f',                         
        }).then(res => {
            console.log(res.data)
            setArticles(res.data.articles)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Нийтлэл
                </Breadcrumb.Item>
            </Breadcrumb>            
            { loading ? (
                <div className="loading">
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : (
                <div className="news-list" style={{ marginTop: '24px' }}>
                    <List
                        grid={{
                            gutter: [24, 8],
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 3,
                            xl: 3,
                            xxl: 4,
                        }}
                        dataSource={articles ? articles : undefined}
                        renderItem={article => (
                            <List.Item>
                                <ArticleCard article={article} />
                            </List.Item>
                        )}
                    />
                </div>
            )}            
        </div>
    )
}

export default NewsList