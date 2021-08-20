import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { Breadcrumb, Col, message, Progress, Row, Space, Spin, Tag, Typography } from "antd"
import moment from "moment"
import './FilmDetail.css'

function FilmDetail (props) {

    const [film, setFilm] = useState()

    useEffect(() => {
        getFilm()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps        

    function getFilm() {
        const id = props.match.params.id
        const url = api.films + "/" + id + "/"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {            
            console.log(res.data)
            setFilm(res.data.movie)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getDuration (duration) {
        let hour = Math.floor(duration / 60)
        let min = duration - (hour * 60)
        return `${hour} цаг ${min} мин`
    }

    return (
        film ? (
            <div>            
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Нүүр</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/films">Кино</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {film.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <img alt={film.name} src={film.poster} style={{ width: '100%', height: 'auto', borderRadius: '2px' }} />
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18}>
                        <div className="film-detail">
                            <Typography.Title level={2}>{film.name} ({moment(film.releasedate).year()})</Typography.Title>
                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Төрөл жанр</Typography.Title>
                                    <Space size={[8, 8]} wrap>
                                    {film.genre.map(genre => (
                                       <Tag color="cyan" style={{ margin: 0 }}>{genre.name}</Tag>                                                                                      
                                    ))}                       
                                    </Space>                                       
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Насны ангилал</Typography.Title>
                                    <Typography.Text>13+</Typography.Text>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Нээлтийн огноо</Typography.Title>
                                    <Typography.Text>- {moment(film.releasedate).year()} оны {moment(film.releasedate).month() + 1} сарын {moment(film.releasedate).date()}</Typography.Text>                            
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Үргэлжлэх хугацаа</Typography.Title>
                                    <Typography.Text>{getDuration(film.duration)}</Typography.Text>                            
                                </Col>
                                <Col xs={24} sm={24} md={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Progress                                                                   
                                        type="circle"
                                        width={64}                                                 
                                        strokeColor="#f39c12"
                                        trailColor="#3c3c3c"                                 
                                        strokeWidth={6}      
                                        percent={film.score}
                                        format={percent => `${percent}`}
                                    />         
                                    <div style={{ marginLeft: '12px' }}>
                                        <Typography.Title level={4} style={{ marginBottom: 0 }}>Үзэгчдийн үнэлгээ</Typography.Title>
                                        <Typography.Text>/ Үнэлгээ өгсөн: 1231 /</Typography.Text>
                                    </div>                                                                        
                                </Col>
                                <Col xs={24} sm={24} md={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Progress                                                                   
                                        type="circle"
                                        width={64}                                                 
                                        strokeColor="#f39c12"
                                        trailColor="#3c3c3c"                                 
                                        strokeWidth={6}      
                                        percent={film.score}
                                        format={percent => `${percent}`}
                                    />         
                                    <div style={{ marginLeft: '12px' }}>
                                        <Typography.Title level={4} style={{ marginBottom: 0 }}>Шүүмжлэгчдийн үнэлгээ</Typography.Title>
                                        <Typography.Text>/ Үнэлгээ өгсөн: 1231 /</Typography.Text>
                                    </div>                                                                        
                                </Col>
                                <Col span={24}>
                                    <div className="actions">
                                        
                                    </div>
                                </Col>
                            </Row>                                                   
                            <Typography.Title level={5} style={{ marginTop: '24px' }}>Ерөнхий мэдээлэл</Typography.Title>
                            <Typography.Paragraph>
                            Sed vel dignissim quam. Integer facilisis lobortis odio, in varius leo. Sed lobortis non odio eu mattis. In ut tempor turpis, in dapibus sem. Aliquam aliquet eros sed varius placerat. Proin sollicitudin luctus magna ac vulputate. Phasellus bibendum tortor nec est tincidunt, quis euismod orci pulvinar.
                            </Typography.Paragraph>
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

export default FilmDetail