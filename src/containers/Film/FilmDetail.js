import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { Breadcrumb, Button, Col, Divider, List, message, Progress, Row, Space, Spin, Tag, Tooltip, Typography } from "antd"
import moment from "moment"
import './FilmDetail.css'
import { AppstoreAddOutlined, EyeOutlined, HeartOutlined, PlayCircleOutlined, StarOutlined } from "@ant-design/icons"
import Avatar from "antd/lib/avatar/avatar"

const data = [
    {
        name: 'Robert Downey Jr.',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg'
    },
    {
        name: 'Chris Evans',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/3bOGNsHlrswhyW79uvIHH1V43JI.jpg'
    },
    {
        name: 'Chris Hemsworth',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/jpurJ9jAcLCYjgHHfYF32m3zJYm.jpg'
    },
    {
        name: 'Mark Ruffalo',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/z3dvKqMNDQWk3QLxzumloQVR0pv.jpg'
    },
    {
        name: 'Scarlett Johansson',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg'
    },
    {
        name: 'Benedict Cumberbatch',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/fBEucxECxGLKVHBznO0qHtCGiMO.jpg'
    },
    {
        name: 'Jeremy Renner',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/ycFVAVMliCCf0zXsKWNLBG3YxzK.jpg'
    },
    {
        name: 'Don Cheadle',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/b1EVJWdFn7a75qVYJgwO87W2TJU.jpg'
    },
    {
        name: 'Chadwick Boseman',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/mXxiOTrTMJBRSVRfgaSDhOfvfxU.jpg'
    },
    {
        name: 'Tom Holland',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/l6zPRmg8NI7Y65G5GUqwvjxFdsx.jpg'
    },
    {
        name: 'Brie Larson',
        img: 'https://www.themoviedb.org/t/p/w66_and_h66_face/iqZ5uKJWbwSITCK4CqdlUHZTnXD.jpg'
    },
]

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
                    <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                        <img alt={film.name} src={film.poster} style={{ width: '100%', height: 'auto', borderRadius: '2px' }} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={20}>                        
                        <div className="container film-detail">
                            <Typography.Title level={2} style={{ marginBottom: 0 }}>{film.name} ({moment(film.releasedate).year()})</Typography.Title>
                            <Divider style={{ margin: '8px 0 16px 0' }} />
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
                                    <Typography.Text>{moment(film.releasedate).year()} оны {moment(film.releasedate).month() + 1} сарын {moment(film.releasedate).date()}</Typography.Text>                            
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Үргэлжлэх хугацаа</Typography.Title>
                                    <Typography.Text>{getDuration(film.duration)}</Typography.Text>                            
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
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
                                        <Typography.Text>/ Үнэлгээ өгсөн: {formatCount(756)} /</Typography.Text>
                                    </div>                                                                        
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
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
                                        <Typography.Text>/ Үнэлгээ өгсөн: {formatCount(26)} /</Typography.Text>
                                    </div>                                                                        
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Продюсер</Typography.Title>
                                    <a href="/">Kevin Feige</a>                                   
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Найруулагч</Typography.Title>
                                    <a href="/">Anthony Russo</a>, 
                                    <a href="/"> Joe Russo</a>                                        
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <Typography.Title level={5}>Жүжигчид</Typography.Title>
                                    <a href="/">Robert Downey Jr.</a>,
                                    <a href="/"> Chris Evans</a>,
                                    <a href="/"> Chris Hemsworth</a>,
                                    <a href="/"> Mark Ruffalo</a>,  
                                    <a href="/"> Scarlett Johansson</a>,  
                                    <a href="/"> Benedict Cumberbatch</a>  
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={8} xl={6}>
                                    <Button block className="play-trailer" shape="round" size="large" type="text" icon={<PlayCircleOutlined />}>Трейлер үзэх</Button>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={16} xl={18}>
                                    <div className="actions">
                                        <div className="action">
                                            <Tooltip title="Таалагдсан">
                                                <Button className="like" size="large" shape="circle" type="text" icon={<HeartOutlined />} />
                                            </Tooltip>
                                            <Typography.Title level={5}>{formatCount(1512)}</Typography.Title>
                                        </div>
                                        <div className="action">
                                            <Tooltip title="Дараа үзэх">
                                                <Button className="watchlist" size="large" shape="circle" type="text" icon={<EyeOutlined />} />
                                            </Tooltip>
                                            <Typography.Title level={5}>{formatCount(238)}</Typography.Title>
                                        </div>
                                        <div className="action">
                                            <Tooltip title="Жагсаалтад нэмэх">
                                                <Button className="addlist" size="large" shape="circle" type="text" icon={<AppstoreAddOutlined />} />   
                                            </Tooltip>
                                            <Typography.Title level={5}>{formatCount(94)}</Typography.Title>                         
                                        </div>
                                        <div className="action">
                                            <Tooltip title="Үнэлгээ өгөх">
                                                <Button className="rate" size="large" shape="circle" type="text" icon={<StarOutlined />} />
                                            </Tooltip>
                                            <Typography.Title level={5}>{formatCount(756)}</Typography.Title>
                                        </div>                                        
                                    </div>
                                </Col>
                            </Row>                                                   
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={16}>       
                        <div className="container film-description">
                            <Typography.Title level={5}>Танилцуулга</Typography.Title>
                            <Typography.Paragraph>
                            Sed vel dignissim quam. Integer facilisis lobortis odio, in varius leo. Sed lobortis non odio eu mattis. In ut tempor turpis, in dapibus sem. Aliquam aliquet eros sed varius placerat. Proin sollicitudin luctus magna ac vulputate. Phasellus bibendum tortor nec est tincidunt, quis euismod orci pulvinar.
                            </Typography.Paragraph>
                        </div>
                        <div className="container film-plot">
                            <Typography.Title level={5}>Агуулга</Typography.Title>
                            <Typography.Paragraph>
                            Sed vel dignissim quam. Integer facilisis lobortis odio, in varius leo. Sed lobortis non odio eu mattis. In ut tempor turpis, in dapibus sem. Aliquam aliquet eros sed varius placerat. Proin sollicitudin luctus magna ac vulputate. Phasellus bibendum tortor nec est tincidunt, quis euismod orci pulvinar.
                            </Typography.Paragraph>
                        </div>
                        <div className="container film-crew">
                            <Typography.Title level={5}>Уран бүтээлчид</Typography.Title>                            
                        </div>
                        <div className="container film-cast">
                            <Typography.Title level={5}>Жүжигчид</Typography.Title>
                            <List
                                grid={{
                                    gutter: 16,
                                    xs: 3,
                                    sm: 3,
                                    md: 4,
                                    lg: 4,
                                    xl: 6,
                                    xxl: 8,
                                }}               
                                dataSource={data}                 
                                renderItem={item => (
                                    <List.Item>
                                        <Avatar shape="square" size={80} src={item.img} />
                                        <br />
                                        <Typography.Text>{item.name}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8}> 
                        <div className="container film-reviews">
                            <Typography.Title level={5}>Шүүмж</Typography.Title>
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