import { Breadcrumb, List, Spin } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"
import ArticleCard from "./ArticleCard"

function ArticleList (props) {

    const [loading, setLoading] = useState(false)
    const [articles, setArticles] = useState()

    useEffect(() => {
        getNews()
    }, [])

    function getNews() {        
        setLoading(true)
        const url = `${api.articles}?page=1`
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
                            xxl: 3,
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

export default ArticleList