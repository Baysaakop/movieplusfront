import { BellOutlined, CommentOutlined, FacebookFilled, FileTextOutlined, InstagramOutlined, LikeOutlined, ShareAltOutlined, TwitterOutlined, YoutubeFilled } from "@ant-design/icons"
import { Breadcrumb, Button, Col, Row, Space, Statistic, Tooltip, Typography } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import './ArticleDetail.css'

function ArticleDetail (props) {
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
                    <div className="container article-detail">
                        <Typography.Title level={1}>"Nomadland" киноны сэтгэгдэл</Typography.Title>
                        <img className="article-thumbnail" alt="img" src="https://api.giga.mn/api/image/608d78afdbffea4f67b11a22/large" />                        
                        <Typography.Paragraph style={{ fontSize: '16px' }}>
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
                                <Button shape="round" size="large" type="text" icon={<LikeOutlined />}>235</Button>
                                <Button shape="round" size="large" type="text" icon={<CommentOutlined />}>14</Button>
                                <Button shape="round" size="large" type="text" icon={<ShareAltOutlined />}>25</Button>
                            </Space>
                            <div style={{ fontStyle: 'italic' }}>2021 оны 5 сарын 17</div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8}>
                    <div className="container article-author">
                        <Typography.Title level={5}>Нийтлэсэн</Typography.Title>
                        <div className="article-author-info">
                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Avatar size="large" src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" />
                                <div style={{ marginLeft: '8px' }}>
                                    <Typography.Title level={5} style={{ margin: 0 }}>Bayasgalan</Typography.Title>
                                    <Typography.Text type="secondary" style={{ margin: 0 }}>blah blah blah</Typography.Text>
                                </div>
                            </div>
                            <div>
                                <Button shape="round" type="text" icon={<BellOutlined />} style={{ background: '#11181e', color: '#fff' }}>Дагах</Button>
                            </div>
                        </div>          
                        <Row className="article-author-stats" gutter={[16, 16]}>
                            <Col span={8} style={{ textAlign: 'left' }}>
                                <Statistic title={<Typography.Title level={5} style={{ marginBottom: 0 }}>Нийтлэл</Typography.Title>} prefix={<FileTextOutlined />} value={17} />
                            </Col>                            
                            <Col span={8} style={{ textAlign: 'center' }}>
                                <Statistic title={<Typography.Title level={5} style={{ marginBottom: 0 }}>Таалагдсан</Typography.Title>} prefix={<LikeOutlined />} value={1398} />
                            </Col>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                <Statistic title={<Typography.Title level={5} style={{ marginBottom: 0 }}>Дагагч</Typography.Title>} prefix={<BellOutlined />} value={425} />
                            </Col>
                        </Row>              
                        <div className="article-author-social">
                            <Tooltip title="Facebook" placement="bottom">
                                <Button className="article-author-social-icon fb" size="large" shape="circle" type="text" icon={<FacebookFilled />} />
                            </Tooltip>    
                            <Tooltip title="Instagram" placement="bottom">
                                <Button className="article-author-social-icon instagram" size="large" shape="circle" type="text" icon={<InstagramOutlined />} />
                            </Tooltip>                   
                            <Tooltip title="Twitter" placement="bottom">
                                <Button className="article-author-social-icon twitter" size="large" shape="circle" type="text" icon={<TwitterOutlined />} />
                            </Tooltip>
                            <Tooltip title="YouTube" placement="bottom">
                                <Button className="article-author-social-icon youtube" size="large" shape="circle" type="text" icon={<YoutubeFilled />} />                            
                            </Tooltip>
                        </div>
                    </div>                   
                </Col>
            </Row>
        </div>
    )
}

export default ArticleDetail