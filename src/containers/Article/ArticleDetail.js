import { CommentOutlined, EyeOutlined, FacebookFilled, InstagramOutlined, LikeOutlined, UserAddOutlined, YoutubeFilled } from "@ant-design/icons"
import { Grid, Breadcrumb, Button, Col, Row, Space, Tooltip, Typography, Avatar, message, Spin } from "antd"
import './ArticleDetail.css'
// import ArticleComment from "./ArticleComment"
import { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"
import api from "../../api"
// import { useHistory } from "react-router"
import { connect } from "react-redux"
import RecentArticles from "./RecentArticles"

const { useBreakpoint } = Grid

function ArticleDetail (props) {
    // const history = useHistory()
    const [user, setUser] = useState()
    const screens = useBreakpoint()
    const [article, setArticle] = useState(false)

    useEffect(() => {
        if (props.token && !user) {
            getUser()
        }
        getArticle()
    }, [props.token]) // eslint-disable-line react-hooks/exhaustive-deps

    function getArticle() {        
        const id = props.match.params.id
        const url = api.articles + "/" + id + "/"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {            
            console.log(res.data)
            setArticle(res.data)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getUser () {        
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                    
            setUser(res.data)            
        }).catch(err => {
            console.log(err.message)            
        })
    }  

    function formatCount(count) {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1).toString() + "M";
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1).toString() + "K";
        } else {
            return count.toString();
        }
    }

    return (
        article ? (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Нүүр</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/articles">Нийтлэл</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {article.title}
                    </Breadcrumb.Item>
                </Breadcrumb>                  
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                    <Col xs={24} sm={24} md={24} lg={16}>                    
                        <img className="article-thumbnail" alt="img" src={article.thumbnail} />
                        <div className="container article-detail" style={ screens.xs ? { padding: '24px' } : { padding: '24px 80px' }}>                                                         
                            <Typography.Title level={1} style={{ marginBottom: '8px' }}>{article.title}</Typography.Title>                   
                            <Typography.Paragraph style={{ fontSize: '16px', fontStyle: 'italic' }}>
                                <div dangerouslySetInnerHTML={{__html: article.content }} />                            
                            </Typography.Paragraph>
                            <div style={{ textAlign: 'right' }}>- {moment(article.created_at).format("YYYY оны MM сарын DD")}</div>
                            <div className="article-footer">
                                <Space size={[8, 8]} wrap>                                    
                                    <Button shape="round" size="default" type="ghost" icon={<LikeOutlined />}>235</Button>
                                    <Button shape="round" size="default" type="ghost" icon={<CommentOutlined />}>14</Button>
                                    <Button shape="round" size="default" type="ghost" icon={<EyeOutlined />}>3129</Button>
                                    {/* <Button shape="round" size="large" type="ghost" icon={<ShareAltOutlined />}>25</Button> */}
                                </Space>                                
                            </div>
                        </div>
                        <div className="container" style={ screens.xs ? { marginTop: '24px', padding: '24px' } : { marginTop: '24px', padding: '24px 80px' }}>
                            <Typography.Title level={3}>Сэтгэгдэл (0)</Typography.Title>
                            {/* <ArticleComment score={70} name="Chandler Bing" date="2020 оны 7 сарын 13" img="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" text="This film is awesome on every level. It captivated me from start to finish with its humour, engaging story and incredible special effects. Idris holds the show together like the pro he is and all of the characters shine as individuals." />
                            <ArticleComment score={50} name="John Doe" date="2020 оны 1 сарын 25" img="https://www.w3schools.com/howto/img_avatar.png" text="No one is safe, and decency is thrown out the window. Not since Deadpool has a movie ever been so f****d up. Though Deadpool wandered more into the sexual and scatological terrain, The Suicide Squad, instead, blurs the line between cartoon violence and gory realism." />
                            <ArticleComment score={90} name="Jane Jones" date="2019 оны 10 сарын 25" img="https://www.w3schools.com/bootstrap4/img_avatar4.png" text="At times, The Suicide Squad feels less like a movie than a mission statement from a director. Behold, look what I can do with a budget and all the comic book characters I can play with. But, the unexpected heart at the center of the film, a sneaky anti-imperialist bent, and Gunn’s wild visual leaps make The Suicide Squad a bloody, gory delight." /> */}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8}>                    
                        <div className="container article-author">                              
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Typography.Title level={5}>Нийтлэсэн:</Typography.Title>
                                    <div className="article-author-info">
                                        <a href={`/users/${article.author.id}`}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Avatar size="large" src={article.author.profile.avatar} />
                                                <div style={{ marginLeft: '8px' }}>
                                                    <Typography.Title level={5} style={{ margin: 0 }}>{article.author.username}</Typography.Title>
                                                    <Typography.Text type="secondary" style={{ margin: 0 }}>{article.author.profile.description}</Typography.Text>
                                                </div>
                                            </div>
                                        </a>
                                        <div>
                                            <Button shape="round" size="small" type="primary" icon={<UserAddOutlined />}>Дагах</Button>
                                        </div>
                                    </div>       
                                </Col>
                                <Col span={8} style={{ textAlign: 'center' }}>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{article.author.profile.following.length.toLocaleString()}</Typography.Title>
                                    <Typography.Text>Дагаж буй</Typography.Text>                                               
                                </Col>                            
                                <Col span={8} style={{ textAlign: 'center' }}>                                    
                                    <Typography.Title level={4} style={{ margin: 0 }}>{article.author.profile.followers.length.toLocaleString()}</Typography.Title>
                                    <Typography.Text>Дагагчид</Typography.Text>                  
                                </Col>
                                <Col span={8} style={{ textAlign: 'center' }}>
                                    <Typography.Title level={4} style={{ margin: 0 }}>39</Typography.Title>
                                    <Typography.Text>Нийтлэл</Typography.Text> 
                                </Col>                             
                            </Row>                                                                                        
                        </div>         
                        <div className="container" style={{ marginTop: '24px' }}>
                            <Row gutter={16}>
                                <Col span={8} style={{ textAlign: 'center' }}>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{formatCount(358)}</Typography.Title>
                                    <Typography.Text>Таалагдсан</Typography.Text>                                               
                                </Col>                            
                                <Col span={8} style={{ textAlign: 'center' }}>                                    
                                    <Typography.Title level={4} style={{ margin: 0 }}>{formatCount(2351)}</Typography.Title>
                                    <Typography.Text>Уншсан</Typography.Text>                  
                                </Col>
                                <Col span={8} style={{ textAlign: 'center' }}>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{formatCount(18)}</Typography.Title>
                                    <Typography.Text>Сэтгэгдэл</Typography.Text> 
                                </Col>                          
                            </Row>
                        </div>
                        <div className="container" style={{ marginTop: '24px' }}>
                            <Typography.Title level={5}>Өмнөх нийтлэлүүд:</Typography.Title>
                            <RecentArticles authorID={article.author.id} articleID={article.id} />
                        </div>     
                        <div className="container" style={{ marginTop: '24px' }}>
                            <Typography.Title level={5}>Биднийг дагах:</Typography.Title>
                            <div className="article-author-social">
                                <Tooltip title="Facebook" placement="top">
                                    <Button className="article-author-social-icon fb" size="large" shape="circle" type="text" icon={<FacebookFilled />} />
                                </Tooltip>                            
                                <Tooltip title="Instagram" placement="top">
                                    <Button className="article-author-social-icon instagram" size="large" shape="circle" type="text" icon={<InstagramOutlined />} />
                                </Tooltip>                   
                                <Tooltip title="YouTube" placement="top">
                                    <Button className="article-author-social-icon youtube" size="large" shape="circle" type="text" icon={<YoutubeFilled />} />                            
                                </Tooltip>
                            </div>
                        </div>
                        <div className="container" style={{ marginTop: '24px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography.Title level={4}>Ads</Typography.Title>
                        </div>
                    </Col>
                </Row>           
            </div>
        ) : (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        )        
    )
}


const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ArticleDetail)