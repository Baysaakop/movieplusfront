import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { Col, Empty, List, Row, Typography } from "antd"
import moment from 'moment'
import './RecentArticles.css'

function RecentArticles (props) {

    const [articles, setArticles] = useState()

    useEffect(() => {
        getArticles(props.authorID)
    }, [props.authorID])

    function getArticles (authorID) {        
        const url = `${api.articles}?author=${authorID}&length=4`
        axios({
            method: 'GET',
            url: url
        }).then(res => {                             
            setArticles(res.data.results)            
        }).catch(err => {
            console.log(err)            
        })
    }

    return (
        <div>
            {articles ? (
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={articles.filter(x => x.id !== props.articleID)}
                        renderItem={item => (
                            <List.Item>
                                <Row gutter={16} className="recent-article">
                                    <Col span={10}>
                                        <a href={`/articles/${item.id}`}>
                                            <img className="article-thumbnail" alt={item.title} src={item.thumbnail} />
                                        </a>
                                    </Col>
                                    <Col span={14}>
                                        <a href={`/articles/${item.id}`}>
                                            <Typography.Title level={5}>{item.title}</Typography.Title>
                                        </a>
                                        <Typography.Text type="secondary">{moment(item.created_at).format("YYYY оны MM сарын DD")}</Typography.Text>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                </div>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </div>
    )
}

export default RecentArticles