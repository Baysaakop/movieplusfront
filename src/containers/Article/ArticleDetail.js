import { BellOutlined, CommentOutlined, EyeOutlined, FacebookFilled, FileTextOutlined, InstagramOutlined, LikeOutlined, TwitterOutlined, YoutubeFilled } from "@ant-design/icons"
import { Grid, Breadcrumb, Button, Col, Row, Space, Tooltip, Typography, Avatar, List } from "antd"
import './ArticleDetail.css'
import ArticleComment from "./ArticleComment"
import { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"

const { useBreakpoint } = Grid

function ArticleDetail (props) {

    const screens = useBreakpoint()
    const [articles, setArticles] = useState(false)

    useEffect(() => {
        getNews()
    }, [])

    function getNews() {        
        axios({
            method: 'GET',
            url: 'https://newsapi.org/v2/everything?q=apple&from=2021-08-22&to=2021-08-22&sortBy=popularity&apiKey=a52be9a836324a96ba0dcf324b916b7f',                         
        }).then(res => {            
            setArticles(res.data.articles)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/articles">Нийтлэл</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Нийтлэл 1
                </Breadcrumb.Item>
            </Breadcrumb>                  
            { screens.xxl || screens.xl || screens.lg ? (
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                    <Col xs={24} sm={24} md={24} lg={16}>                    
                        <img className="article-thumbnail" alt="img" src="https://api.giga.mn/api/image/608d78afdbffea4f67b11a22/large" />
                        <div className="container article-detail" style={{ padding: '24px 80px' }}>                                                         
                            <Typography.Title level={1} style={{ marginBottom: '8px' }}>"Nomadland" киноны сэтгэгдэл</Typography.Title>                   
                            <Typography.Paragraph style={{ fontSize: '16px', fontStyle: 'italic' }}>
                                Oscar 2021-т нэр дэвшиж ялалт байгуулсан энэхүү киноны нэрийг ихэнх хүмүүс андахгүй биз. Киноны товч агуулга нь Америкийн эдийн засгийн хямралын үеэр бүх зүйлээ алдсан 60 гаруй настай эмэгтэй машинтайгаа ганцаараа аялалд гарна. Бүхээгт тэргэнд өдөр хоногоо өнгөрөөж, аяллын турш шинэ хүмүүстэй танилцан,  нүүдэлчдийн амьдралыг санагдуулж буй мэт. Энэ эмэгтэйн нөхөр нь нас барсан ба шинэ газруудад богино хугацаатай нүүдэллэж, ажил хийж, машиндаа хоноглодог тухай гарна.
                                <br />
                                <br />
                                Энэхүү киноны зураг авалт нь байгаль дэлхийн холбоо хамаарлыг маш сайн гаргасан, ихэвчлэн бүрхэг өдөр зураг авалтаа хийсэн юм шиг санагдсан. Над шиг бүрхэг өдөрт дуртай хүнд тохирсон намуухан, аятайхан орчинтой байсан. Киноны турш явагдах хөгжим ая нь энгийн дөлгөөхөн, уянгалаг, чихэнд чийртэй биш байсан учраас цааш үзэхэд хүргэсэн билээ. Nomadland бага зэрэг уйтгартай, өрнөлгүй болохоор кино шүүмжинд их өртсөн ч гэсэн дуртайяа үзсэн үзэгчдийн тоо олон.
                                <br />
                                <br />
                                Сонирхуулахад кино найруулагч нь Хятад эмэгтэй бөгөөд Ази гэхээсээ илүү Америк соёлыг гаргасан. Энэ киног үзэж байхад надад  нүдэнд туссан хэсгүүд бол "Амьдрах боломж байгаа дээр амьдар", "Дурсагддаг зүйлс л амьдардаг", "Гашуудал хагацал хүн бүрт байдаг. Давж чаддаггүй олон хүн бий", "Дотны хүн чинь чиний сэтгэл зүрхээс явахад хар нүх үлддэг" юм. Ерөнхийдөө дэлхийн хаа нэгтээ нүүдэллэж ажил хийдэг хүмүүс байж л байгаа. Нүүдэлчдийн амьдралд дуртай, аялах сонирхолтой хүмүүст зориулсан кино юм шиг санагдлаа. Энгийн ойлгомжгүй кино юм шиг мөртлөө асар гүн гүнзгий утгатай кино байлаа.
                            </Typography.Paragraph>
                            <div style={{ textAlign: 'right' }}>- 2021 оны 5 сарын 17</div>
                            <div className="article-footer">
                                <Space size={[8, 8]} wrap>                                    
                                    <Button shape="round" size="default" type="ghost" icon={<LikeOutlined />}>235</Button>
                                    <Button shape="round" size="default" type="ghost" icon={<CommentOutlined />}>14</Button>
                                    <Button shape="round" size="default" type="ghost" icon={<EyeOutlined />}>3129</Button>
                                    {/* <Button shape="round" size="large" type="ghost" icon={<ShareAltOutlined />}>25</Button> */}
                                </Space>                                
                            </div>
                        </div>
                        <div className="container comment-section" style={{ padding: '24px 80px' }}>
                            <Typography.Title level={3}>Сэтгэгдэл (3)</Typography.Title>
                            <ArticleComment score={70} name="Chandler Bing" date="2020 оны 7 сарын 13" img="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" text="This film is awesome on every level. It captivated me from start to finish with its humour, engaging story and incredible special effects. Idris holds the show together like the pro he is and all of the characters shine as individuals." />
                            <ArticleComment score={50} name="John Doe" date="2020 оны 1 сарын 25" img="https://www.w3schools.com/howto/img_avatar.png" text="No one is safe, and decency is thrown out the window. Not since Deadpool has a movie ever been so f****d up. Though Deadpool wandered more into the sexual and scatological terrain, The Suicide Squad, instead, blurs the line between cartoon violence and gory realism." />
                            <ArticleComment score={90} name="Jane Jones" date="2019 оны 10 сарын 25" img="https://www.w3schools.com/bootstrap4/img_avatar4.png" text="At times, The Suicide Squad feels less like a movie than a mission statement from a director. Behold, look what I can do with a budget and all the comic book characters I can play with. But, the unexpected heart at the center of the film, a sneaky anti-imperialist bent, and Gunn’s wild visual leaps make The Suicide Squad a bloody, gory delight." />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8}>                    
                        <div className="container article-author">                              
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Typography.Title level={5}>Нийтлэсэн</Typography.Title>
                                    <div className="article-author-info">
                                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Avatar size="large" src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" />
                                            <div style={{ marginLeft: '8px' }}>
                                                <Typography.Title level={5} style={{ margin: 0 }}>Баясгалан</Typography.Title>
                                                <Typography.Text type="secondary" style={{ margin: 0 }}>бла бла бла</Typography.Text>
                                            </div>
                                        </div>
                                        <div>
                                            <Button shape="round" type="ghost" icon={<BellOutlined />}>Дагах</Button>
                                        </div>
                                    </div>       
                                </Col>
                                <Col span={8} style={{ textAlign: 'left' }}>
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>Нийтлэл</Typography.Title>                                    
                                    <Typography.Text style={{ fontSize: '16px' }}><FileTextOutlined /> 18</Typography.Text>
                                </Col>                            
                                <Col span={8} style={{ textAlign: 'center' }}>                                    
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>Таалагдсан</Typography.Title>                                                                        
                                    <Typography.Text style={{ fontSize: '16px' }}><LikeOutlined /> 947</Typography.Text>
                                </Col>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>Дагагч</Typography.Title>                   
                                    <Typography.Text style={{ fontSize: '16px' }}><BellOutlined /> 215</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Typography.Title level={5} style={{ marginBottom: '4px' }}>Сошиал сувгууд</Typography.Title>
                                    <div className="article-author-social">
                                        <Tooltip title="Facebook" placement="top">
                                            <Button className="article-author-social-icon fb" size="large" shape="circle" type="text" icon={<FacebookFilled />} />
                                        </Tooltip>    
                                        <Tooltip title="Instagram" placement="top">
                                            <Button className="article-author-social-icon instagram" size="large" shape="circle" type="text" icon={<InstagramOutlined />} />
                                        </Tooltip>                   
                                        <Tooltip title="Twitter" placement="top">
                                            <Button className="article-author-social-icon twitter" size="large" shape="circle" type="text" icon={<TwitterOutlined />} />
                                        </Tooltip>
                                        <Tooltip title="YouTube" placement="top">
                                            <Button className="article-author-social-icon youtube" size="large" shape="circle" type="text" icon={<YoutubeFilled />} />                            
                                        </Tooltip>
                                    </div>
                                </Col>                                
                            </Row>                                             
                        </div>            
                        <div className="container" style={{ marginTop: '24px' }}>
                            <Typography.Title level={5}>Холбоотой нийтлэлүүд</Typography.Title>
                            <List                   
                                itemLayout="vertical"   
                                dataSource={articles ? articles.slice(0, 3) : undefined}
                                renderItem={article => (
                                    <List.Item>
                                        <a href="/articles/2">
                                            <Row gutter={[16, 16]}>
                                                <Col span={12}>
                                                    <img src={article.urlToImage} alt="img" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                                </Col>
                                                <Col span={12}>
                                                    <Typography.Text>{article.title}</Typography.Text>
                                                    <br />
                                                    <Typography.Text type="secondary">{moment(article.publishedAt).format("YYYY-MM-DD")}</Typography.Text>
                                                </Col>
                                            </Row>
                                        </a>
                                    </List.Item>
                                )}
                            />
                        </div>         
                    </Col>
                </Row>
            ) : (
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                    <Col xs={24} sm={24} md={24} lg={8}>                    
                        <div className="container article-author">                              
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Typography.Title level={5}>Нийтлэсэн</Typography.Title>
                                    <div className="article-author-info">
                                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Avatar size="large" src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" />
                                            <div style={{ marginLeft: '8px' }}>
                                                <Typography.Title level={5} style={{ margin: 0 }}>Баясгалан</Typography.Title>
                                                <Typography.Text type="secondary" style={{ margin: 0 }}>бла бла бла</Typography.Text>
                                            </div>
                                        </div>
                                        <div>
                                            <Button shape="round" type="ghost" icon={<BellOutlined />}>Дагах</Button>
                                        </div>
                                    </div>       
                                </Col>
                                <Col span={8} style={{ textAlign: 'left' }}>
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>Нийтлэл</Typography.Title>                                    
                                    <Typography.Text style={{ fontSize: '16px' }}><FileTextOutlined /> 18</Typography.Text>
                                </Col>                            
                                <Col span={8} style={{ textAlign: 'center' }}>                                    
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>Таалагдсан</Typography.Title>                                                                        
                                    <Typography.Text style={{ fontSize: '16px' }}><LikeOutlined /> 947</Typography.Text>
                                </Col>
                                <Col span={8} style={{ textAlign: 'right' }}>
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>Дагагч</Typography.Title>                   
                                    <Typography.Text style={{ fontSize: '16px' }}><BellOutlined /> 215</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Typography.Title level={5} style={{ marginBottom: '4px' }}>Сошиал сувгууд</Typography.Title>
                                    <div className="article-author-social">
                                        <Tooltip title="Facebook" placement="top">
                                            <Button className="article-author-social-icon fb" size="large" shape="circle" type="text" icon={<FacebookFilled />} />
                                        </Tooltip>    
                                        <Tooltip title="Instagram" placement="top">
                                            <Button className="article-author-social-icon instagram" size="large" shape="circle" type="text" icon={<InstagramOutlined />} />
                                        </Tooltip>                   
                                        <Tooltip title="Twitter" placement="top">
                                            <Button className="article-author-social-icon twitter" size="large" shape="circle" type="text" icon={<TwitterOutlined />} />
                                        </Tooltip>
                                        <Tooltip title="YouTube" placement="top">
                                            <Button className="article-author-social-icon youtube" size="large" shape="circle" type="text" icon={<YoutubeFilled />} />                            
                                        </Tooltip>
                                    </div>
                                </Col>                                
                            </Row>                                             
                        </div>                                       
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={16}>                    
                        <div className="container article-detail" style={ screens.xs ? { padding: '24px' } : { padding: '24px 80px' }}>                        
                            <img className="article-thumbnail" alt="img" src="https://api.giga.mn/api/image/608d78afdbffea4f67b11a22/large" />     
                            <Typography.Title level={1} style={{ marginBottom: '8px' }}>"Nomadland" киноны сэтгэгдэл</Typography.Title>                   
                            <Typography.Paragraph style={{ fontSize: '16px', fontStyle: 'italic' }}>
                                Oscar 2021-т нэр дэвшиж ялалт байгуулсан энэхүү киноны нэрийг ихэнх хүмүүс андахгүй биз. Киноны товч агуулга нь Америкийн эдийн засгийн хямралын үеэр бүх зүйлээ алдсан 60 гаруй настай эмэгтэй машинтайгаа ганцаараа аялалд гарна. Бүхээгт тэргэнд өдөр хоногоо өнгөрөөж, аяллын турш шинэ хүмүүстэй танилцан,  нүүдэлчдийн амьдралыг санагдуулж буй мэт. Энэ эмэгтэйн нөхөр нь нас барсан ба шинэ газруудад богино хугацаатай нүүдэллэж, ажил хийж, машиндаа хоноглодог тухай гарна.
                                <br />
                                <br />
                                Энэхүү киноны зураг авалт нь байгаль дэлхийн холбоо хамаарлыг маш сайн гаргасан, ихэвчлэн бүрхэг өдөр зураг авалтаа хийсэн юм шиг санагдсан. Над шиг бүрхэг өдөрт дуртай хүнд тохирсон намуухан, аятайхан орчинтой байсан. Киноны турш явагдах хөгжим ая нь энгийн дөлгөөхөн, уянгалаг, чихэнд чийртэй биш байсан учраас цааш үзэхэд хүргэсэн билээ. Nomadland бага зэрэг уйтгартай, өрнөлгүй болохоор кино шүүмжинд их өртсөн ч гэсэн дуртайяа үзсэн үзэгчдийн тоо олон.
                                <br />
                                <br />
                                Сонирхуулахад кино найруулагч нь Хятад эмэгтэй бөгөөд Ази гэхээсээ илүү Америк соёлыг гаргасан. Энэ киног үзэж байхад надад  нүдэнд туссан хэсгүүд бол "Амьдрах боломж байгаа дээр амьдар", "Дурсагддаг зүйлс л амьдардаг", "Гашуудал хагацал хүн бүрт байдаг. Давж чаддаггүй олон хүн бий", "Дотны хүн чинь чиний сэтгэл зүрхээс явахад хар нүх үлддэг" юм. Ерөнхийдөө дэлхийн хаа нэгтээ нүүдэллэж ажил хийдэг хүмүүс байж л байгаа. Нүүдэлчдийн амьдралд дуртай, аялах сонирхолтой хүмүүст зориулсан кино юм шиг санагдлаа. Энгийн ойлгомжгүй кино юм шиг мөртлөө асар гүн гүнзгий утгатай кино байлаа.
                            </Typography.Paragraph>
                            <div style={{ textAlign: 'right' }}>- 2021 оны 5 сарын 17</div>
                            <div className="article-footer">
                                <Space size={[8, 8]} wrap>                                    
                                    <Button shape="round" size="default" type="ghost" icon={<LikeOutlined />}>235</Button>
                                    <Button shape="round" size="default" type="ghost" icon={<CommentOutlined />}>14</Button>
                                    <Button shape="round" size="default" type="ghost" icon={<EyeOutlined />}>3129</Button>
                                </Space>                                
                            </div>                            
                        </div>
                        <div className="container comment-section">
                            <Typography.Title level={3}>Сэтгэгдэл (3)</Typography.Title>
                            <ArticleComment score={70} name="Chandler Bing" date="2020 оны 7 сарын 13" img="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" text="This film is awesome on every level. It captivated me from start to finish with its humour, engaging story and incredible special effects. Idris holds the show together like the pro he is and all of the characters shine as individuals." />
                            <ArticleComment score={50} name="John Doe" date="2020 оны 1 сарын 25" img="https://www.w3schools.com/howto/img_avatar.png" text="No one is safe, and decency is thrown out the window. Not since Deadpool has a movie ever been so f****d up. Though Deadpool wandered more into the sexual and scatological terrain, The Suicide Squad, instead, blurs the line between cartoon violence and gory realism." />
                            <ArticleComment score={90} name="Jane Jones" date="2019 оны 10 сарын 25" img="https://www.w3schools.com/bootstrap4/img_avatar4.png" text="At times, The Suicide Squad feels less like a movie than a mission statement from a director. Behold, look what I can do with a budget and all the comic book characters I can play with. But, the unexpected heart at the center of the film, a sneaky anti-imperialist bent, and Gunn’s wild visual leaps make The Suicide Squad a bloody, gory delight." />
                        </div>
                    </Col>                                        
                </Row>
            )}            
        </div>
    )
}

export default ArticleDetail