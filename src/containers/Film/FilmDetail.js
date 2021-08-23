import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { Breadcrumb, Button, Col, Divider, List, message, Popover, Progress, Row, Space, Spin, Tag, Tooltip, Typography } from "antd"
import moment from "moment"
import './FilmDetail.css'
import { AppstoreAddOutlined, HeartOutlined, PlayCircleOutlined, StarOutlined } from "@ant-design/icons"
import Avatar from "antd/lib/avatar/avatar"
import FilmReview from "./FilmReview"
import ArtistPopover from "../Artist/ArtistPopover"
import SaveIcon from "../../components/SaveIcon"

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
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <img alt={film.name} src={film.poster} style={{ width: '100%', height: 'auto', borderRadius: '2px' }} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={16} xl={18}>                        
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
                                        percent={63}
                                        format={percent => `${percent}`}
                                    />         
                                    <div style={{ marginLeft: '12px' }}>
                                        <Typography.Title level={4} style={{ marginBottom: 0 }}>Шүүмжлэгчдийн үнэлгээ</Typography.Title>
                                        <Typography.Text>/ Үнэлгээ өгсөн: {formatCount(26)} /</Typography.Text>
                                    </div>                                                                        
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Продюсер</Typography.Title>
                                    <Popover
                                        title={false}
                                        placement="rightTop"
                                        content={
                                            <ArtistPopover artist={data[0]} />
                                        }
                                    >
                                        <a href="/">Kevin Feige</a>                                   
                                    </Popover>
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
                                                <Button className="watchlist" size="large" shape="circle" type="text" icon={<SaveIcon />} />
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
                        {/* <div className="container film-crew">
                            <Typography.Title level={5}>Уран бүтээлчид</Typography.Title>                            
                        </div> */}
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
                            <Typography.Title level={5}>Шүүмж (3)</Typography.Title>
                            <FilmReview score={70} name="Chandler Bing" date="2020 оны 7 сарын 13" img="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" text="This film is awesome on every level. It captivated me from start to finish with its humour, engaging story and incredible special effects. Idris holds the show together like the pro he is and all of the characters shine as individuals." />
                            <FilmReview score={50} name="John Doe" date="2020 оны 1 сарын 25" img="https://www.w3schools.com/howto/img_avatar.png" text="No one is safe, and decency is thrown out the window. Not since Deadpool has a movie ever been so f****d up. Though Deadpool wandered more into the sexual and scatological terrain, The Suicide Squad, instead, blurs the line between cartoon violence and gory realism." />
                            <FilmReview score={90} name="Jane Jones" date="2019 оны 10 сарын 25" img="https://www.w3schools.com/bootstrap4/img_avatar4.png" text="At times, The Suicide Squad feels less like a movie than a mission statement from a director. Behold, look what I can do with a budget and all the comic book characters I can play with. But, the unexpected heart at the center of the film, a sneaky anti-imperialist bent, and Gunn’s wild visual leaps make The Suicide Squad a bloody, gory delight." />
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