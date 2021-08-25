import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { Breadcrumb, Button, Col, Divider, message, Row, Spin, Timeline, Tooltip, Typography } from "antd"
import { FacebookFilled, InstagramOutlined, TwitterOutlined, YoutubeFilled } from "@ant-design/icons"
import './ArtistDetail.css'

function ArtistDetail (props) {

    const [artist, setArtist] = useState()

    useEffect(() => {
        getArtist()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps        

    function getArtist() {
        const id = props.match.params.id
        const url = api.artists + "/" + id + "/"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {            
            console.log(res.data)
            setArtist(res.data)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        artist ? (
            <div>            
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Нүүр</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/people">Хүмүүс</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {artist.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <img alt={artist.name} src={artist.avatar} style={{ width: '100%', height: 'auto', borderRadius: '2px' }} />                                                         
                        <div className="container artist-info">                            
                            <Typography.Title level={5}>Мэргэжил</Typography.Title>
                            <Typography.Text>
                                {artist.occupation.map(occupation => (
                                    <span>{occupation.name}, </span>
                                ))}
                            </Typography.Text>
                            <Typography.Title level={5}>Төрсөн өдөр</Typography.Title>
                            <Typography.Text>
                                {artist.birthday ? artist.birthday : '- Мэдээлэл байхгүй'}
                            </Typography.Text>
                            <Typography.Title level={5} style={{ marginBottom: '4px' }}>Сошиал сувгууд</Typography.Title>
                            <div className="artist-social">     
                                <Tooltip title="Facebook" placement="bottom">
                                    <Button className="artist-social-icon fb" size="large" shape="circle" type="text" icon={<FacebookFilled />} />
                                </Tooltip>    
                                <Tooltip title="Instagram" placement="bottom">
                                    <Button className="artist-social-icon instagram" size="large" shape="circle" type="text" icon={<InstagramOutlined />} />
                                </Tooltip>                   
                                <Tooltip title="Twitter" placement="bottom">
                                    <Button className="artist-social-icon twitter" size="large" shape="circle" type="text" icon={<TwitterOutlined />} />
                                </Tooltip>
                                <Tooltip title="YouTube" placement="bottom">
                                    <Button className="artist-social-icon youtube" size="large" shape="circle" type="text" icon={<YoutubeFilled />} />                            
                                </Tooltip>
                            </div>     
                        </div>      
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={16} xl={18}>                        
                        <div className="container artist-detail">
                            <Typography.Title level={2} style={{ marginBottom: 0 }}>{artist.name}</Typography.Title>
                            <Divider style={{ margin: '8px 0 16px 0' }} />     
                            <Typography.Title level={5}>Танилцуулга</Typography.Title>                                                                          
                            <Typography.Text>{artist.biography ? artist.biography : 'In metus urna, hendrerit vitae mi dapibus, volutpat dignissim justo. Duis sodales vitae leo at ultricies. Maecenas in eros ante. Nunc accumsan turpis vel finibus viverra. In vestibulum dolor et augue laoreet porta. Praesent sit amet ipsum porta, sollicitudin nunc non, venenatis felis. Suspendisse vulputate nisl fringilla, interdum velit non, varius sem.'}</Typography.Text>                                                                                      
                        </div>
                        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                            <Col xs={24} sm={24} md={24} lg={12}>
                                <div className="container">
                                    <Typography.Title level={5}>Кино</Typography.Title>            
                                    <Timeline style={{ marginTop: '16px' }}>
                                        <Timeline.Item>2001 - Зүрхэнд шивнэсэн үг</Timeline.Item>
                                        <Timeline.Item>2002 - Ноён солиот</Timeline.Item>
                                        <Timeline.Item>2004 - Уулын төмөр</Timeline.Item>
                                        <Timeline.Item>2007 - Хайрыг хайрла</Timeline.Item>
                                        <Timeline.Item>2012 - Нар сарны зааг</Timeline.Item>
                                        <Timeline.Item>2015 - Маш нууц</Timeline.Item>
                                        <Timeline.Item>2018 - Маш нууц 2: Байтаг богд</Timeline.Item>
                                    </Timeline>    
                                </div>
                            </Col> 
                            <Col xs={24} sm={24} md={24} lg={12}>
                                <div className="container">
                                    <Typography.Title level={5}>Цуврал</Typography.Title>            
                                    <Timeline style={{ marginTop: '16px' }}>
                                        <Timeline.Item>2001 - Зүрхэнд шивнэсэн үг</Timeline.Item>
                                        <Timeline.Item>2004 - Уулын төмөр</Timeline.Item>
                                        <Timeline.Item>2007 - Хайрыг хайрла</Timeline.Item>
                                        <Timeline.Item>2015 - Маш нууц</Timeline.Item>
                                        <Timeline.Item>2018 - Маш нууц 2: Байтаг богд</Timeline.Item>
                                    </Timeline>    
                                </div>
                            </Col> 
                        </Row>
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

export default ArtistDetail