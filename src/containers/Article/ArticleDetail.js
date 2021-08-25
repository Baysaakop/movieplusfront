import { BellOutlined, CommentOutlined, FacebookFilled, FileTextOutlined, InstagramOutlined, LikeOutlined, ShareAltOutlined, TwitterOutlined, YoutubeFilled } from "@ant-design/icons"
import { Grid, Breadcrumb, Button, Col, Row, Space, Tooltip, Typography, Avatar } from "antd"
import './ArticleDetail.css'

const { useBreakpoint } = Grid

function ArticleDetail (props) {

    const screens = useBreakpoint()

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
            <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
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
                        <div className="article-footer">
                            <Space size={[8, 8]} wrap>
                                <Button shape="round" size="large" type="ghost" icon={<LikeOutlined />}>235</Button>
                                <Button shape="round" size="large" type="ghost" icon={<CommentOutlined />}>14</Button>
                                <Button shape="round" size="large" type="ghost" icon={<ShareAltOutlined />}>25</Button>
                            </Space>
                            {/* <div style={{ fontStyle: 'italic' }}>2021 оны 5 сарын 17</div> */}
                        </div>
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
                        <Typography.Title level={5}>Бусад нийтлэлүүд</Typography.Title>
                    </div>         
                </Col>
            </Row>
        </div>
    )
}

export default ArticleDetail