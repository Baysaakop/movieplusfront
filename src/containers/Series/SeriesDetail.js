import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { Breadcrumb, Button, Col, Divider, List, message, Popover, Row, Space, Spin, Tooltip, Typography, Rate, Tabs, notification } from "antd"
import moment from "moment"
import '../Film/FilmDetail.css'
import { CheckOutlined, ClockCircleOutlined, DesktopOutlined, HeartOutlined, PlayCircleOutlined, StarOutlined } from "@ant-design/icons"
import ArtistPopover from "../Artist/ArtistPopover"
import Trailer from "../../components/Trailer"
import blank from '../Film/blank.jpg'
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import GenreTag from "../../components/GenreTag"
import FilmScore from "../Film/FilmScore"
import SeriesReviews from "./Review/SeriesReviews"

const data = [
    // 'PRIME CINEPLEX',
    // 'URGOO',
    // 'TENGIS',
    'LOOKTV',
    'SKYGO',
    'VOO',    
];

function SeriesDetail (props) {
    const history = useHistory()
    const [user, setUser] = useState()
    const [film, setFilm] = useState()
    const [crew, setCrew] = useState()
    const [mainCast, setMainCast] = useState()
    const [cast, setCast] = useState()
    const [trailer, setTrailer] = useState(false)        

    useEffect(() => {
        if (props.token && !user) {
            getUser()
        }
        getFilm()
        getCrew()
        getMainCast() 
        getCast()        
    }, [props.user]) // eslint-disable-line react-hooks/exhaustive-deps        

    function getFilm() {
        const id = props.match.params.id
        const url = api.series + "/" + id + "/"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                         
            //console.log(res.data)           
            setFilm(res.data)                  
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

    function getCrew() {
        const id = props.match.params.id
        const url = api.crew + "?series=" + id
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                        
            setCrew(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getMainCast() {
        const id = props.match.params.id
        const url = api.cast + "?series=" + id + "&is_lead=true"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                                    
            setMainCast(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getCast() {
        const id = props.match.params.id
        const url = api.cast + "?series=" + id + "&is_lead=false"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                                    
            setCast(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getWholeCrew (members) {
        let results = []
        members.forEach(member => {
            member.roles.forEach(r => {
                let item = {                    
                    artist: member.artist,
                    role: r.name
                }
                results.push(item)
            })
        })
        return results
    }

    function getDuration (duration) {
        let hour = Math.floor(duration / 60)
        let min = duration - (hour * 60)
        if (hour > 0) {
            return `${hour} цаг ${min} мин`
        } else {
            return `${min} мин`
        }        
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

    function onLike () {
        if (user && props.token) {
            axios({
                method: 'PUT',
                url: `${api.users}/${user.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`                  
                },
                data: {
                    like: true,
                    series: film.id
                }
            })            
            .then(res => {                
                if (res.status === 200) {                    
                    setUser(res.data.user)
                    setFilm(res.data.series)
                    if (res.data.flag === true) {
                        notification['success']({
                            message: 'Жагсаалт шинэчлэгдлээ.',
                            description: `${res.data.series.title} цуврал таалагдсан цувралын жагсаалтанд нэмэгдлээ.`,                            
                        });
                    } else {
                        notification['warning']({
                            message: 'Жагсаалт шинэчлэгдлээ.',
                            description: `${res.data.series.title} цуврал таалагдсан цувралын жагсаалтаас хасагдлаа.`,                            
                        });
                    }
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Алдаа гарлаа. Хуудсаа refresh хийнэ үү.")
            })    
        } else {
            history.push("/login")
        }       
    }

    function onWatched () {
        if (user && props.token) {
            axios({
                method: 'PUT',
                url: `${api.users}/${user.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`                  
                },
                data: {
                    watched: true,
                    series: film.id
                }
            })            
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setFilm(res.data.series)
                    if (res.data.flag === true) {
                        notification['success']({
                            message: 'Жагсаалт шинэчлэгдлээ.',
                            description: `${res.data.series.title} цуврал үзсэн цувралын жагсаалтанд нэмэгдлээ.`,                            
                        });
                    } else {
                        notification['warning']({
                            message: 'Жагсаалт шинэчлэгдлээ.',
                            description: `${res.data.series.title} цуврал үзсэн цувралын жагсаалтаас хасагдлаа.`,                            
                        });
                    }
                }                                                        
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Алдаа гарлаа. Хуудсаа refresh хийнэ үү.")
            })    
        } else {
            history.push("/login")
        }       
    }

    function onWatchlist () {
        if (user && props.token) {
            axios({
                method: 'PUT',
                url: `${api.users}/${user.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`                  
                },
                data: {
                    watchlist: true,
                    series: film.id
                }
            })            
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setFilm(res.data.series)
                    if (res.data.flag === true) {
                        notification['success']({
                            message: 'Жагсаалт шинэчлэгдлээ.',
                            description: `${res.data.series.title} цуврал дараа үзэх цувралын жагсаалтанд нэмэгдлээ.`,                            
                        });
                    } else {
                        notification['warning']({
                            message: 'Жагсаалт шинэчлэгдлээ.',
                            description: `${res.data.series.title} цуврал дараа үзэх цувралын жагсаалтаас хасагдлаа.`,                            
                        });
                    }
                }                                                        
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Алдаа гарлаа. Хуудсаа refresh хийнэ үү.")
            })    
        } else {
            history.push("/login")
        }       
    }

    function onRate (val) {        
        if (user && props.token) {
            axios({
                method: 'PUT',
                url: `${api.users}/${user.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`                  
                },
                data: {
                    score: val * 2,
                    series: film.id
                }
            })            
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setFilm(res.data.series)
                    notification['success']({
                        message: 'Үнэлгээ өгсөнд баярлалаа.',
                        description: `${res.data.series.title} цувралд өгсөн таны үнэлгээг хүлээж авлаа.`,                            
                    });
                }                                                        
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Алдаа гарлаа. Хуудсаа refresh хийнэ үү.")
            })    
        } else {
            history.push("/login")
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
                        <a href="/series">Цуврал</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {film.title}
                    </Breadcrumb.Item>
                </Breadcrumb>
                { film.landscape ? (
                    <div style={{ marginTop: '24px', position: 'relative' }}>
                        <img alt={film.title} src={film.landscape} style={{ width: '100%', height: 'auto', objectFit: 'cover', filter: 'blur(1px)' }} />
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.6)', borderRadius: '4px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Typography.Title style={{ color: '#fff', fontSize: '48px' }}>{film.title}</Typography.Title> */}
                        </div>
                    </div>
                ) : (
                    <></>
                )} 
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: '100%', height: '100%', marginBottom: '24px' }}>
                                <div style={{ position: 'relative', paddingBottom: '150%', width: '100%', height: '100%', overflow: 'hidden' }}>                                
                                    <img className="film-poster" alt={film.title} src={film.poster ? film.poster : blank} />                                
                                </div>
                            </div>                            
                            { film.trailer ? (
                                <Button className="play-trailer" block size="large" type="ghost" icon={<PlayCircleOutlined />} onClick={() => setTrailer(true)}>Трейлер үзэх</Button>
                            ) : (                                        
                                <Button className="play-trailer" block size="large" type="ghost" icon={<PlayCircleOutlined />}>Трейлер ороогүй</Button>
                            )}                                    
                            {trailer ? <Trailer title={film.title} trailer={film.trailer} hide={() => setTrailer(false)} /> : <></>} 
                            <List
                                className="container"
                                style={{ marginTop: '24px', padding: 0 }}
                                header={<Typography.Title level={5} style={{ margin: 0 }}>Хаанаас үзэх вэ?</Typography.Title>}                                
                                bordered
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item key={item}>
                                        <Button icon={<DesktopOutlined /> } type="ghost" shape="round">{item}</Button>
                                    </List.Item>
                                )}
                            />
                        </div>                        
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={18}>                        
                        <div className="container film-detail">
                            <Typography.Title level={2} style={{ marginBottom: 0 }}>{film.title} ({moment(film.releasedate).year()})</Typography.Title>
                            <Divider style={{ margin: '8px 0 16px 0' }} />
                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={24} md={12} lg={8}>
                                    <Typography.Title level={5}>Төрөл жанр</Typography.Title>
                                    <Space size={[8, 8]} wrap>
                                        {film.genres.map(genre => (
                                            <GenreTag genre={genre.name} />                                                    
                                        ))}                       
                                    </Space>                                       
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={8}>
                                    <Typography.Title level={5}>Насны ангилал</Typography.Title>
                                    <Typography.Text>13+</Typography.Text>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={8}>
                                    <Typography.Title level={5}>Нээлтийн огноо</Typography.Title>
                                    <Typography.Text>{moment(film.releasedate).year()} оны {moment(film.releasedate).month() + 1} сарын {moment(film.releasedate).date()}</Typography.Text>                            
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={8}>
                                    <Typography.Title level={5}>Үргэлжлэх хугацаа</Typography.Title>
                                    <Typography.Text>{getDuration(film.duration)}</Typography.Text>                            
                                </Col>         
                                <Col xs={24} sm={24} md={12} lg={8}>
                                    <Typography.Title level={5}>Нийт бүлэг</Typography.Title>
                                    <Typography.Text>{film.seasons}</Typography.Text>                            
                                </Col>         
                                <Col xs={24} sm={24} md={12} lg={8}>
                                    <Typography.Title level={5}>Нийт анги</Typography.Title>
                                    <Typography.Text>{film.episodes}</Typography.Text>                            
                                </Col>                                
                                <Col span={24}>
                                    <Typography.Title level={5}>Агуулга</Typography.Title>
                                    <Typography.Paragraph>
                                        { film.plot !== "" ? (
                                            <div dangerouslySetInnerHTML={{__html: film.plot }} />   
                                        ) : (
                                            'Sed vel dignissim quam. Integer facilisis lobortis odio, in varius leo. Sed lobortis non odio eu mattis. In ut tempor turpis, in dapibus sem. Aliquam aliquet eros sed varius placerat. Proin sollicitudin luctus magna ac vulputate. Phasellus bibendum tortor nec est tincidunt, quis euismod orci pulvinar.'
                                        )}       
                                    </Typography.Paragraph>
                                </Col>         
                                <Col xs={24} sm={24} md={24} lg={8} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>                                    
                                    <FilmScore type="detail" score={film.avg_score} />
                                    <div style={{ marginLeft: '12px' }}>
                                        <Typography.Title level={4} style={{ marginBottom: 0 }}>Үнэлгээ</Typography.Title>
                                        <Typography.Text>/ Санал: {formatCount(film.score_count)} /</Typography.Text>
                                    </div>                                                                        
                                </Col>                                                  
                                <Col xs={24} sm={24} md={24} lg={16}>
                                    { film.is_released ? (
                                        <div className="actions">
                                            <div className="action">                                            
                                                <Tooltip title="Үзсэн">
                                                    { user && user.profile.series_watched.filter(x => x === film.id).length > 0 ? 
                                                        <Button className="watched-fill" size="large" shape="circle" type="text" icon={<CheckOutlined />} onClick={onWatched} />
                                                    :
                                                        <Button className="watched" size="large" shape="circle" type="text" icon={<CheckOutlined />} onClick={onWatched} />
                                                    }
                                                </Tooltip>
                                                <Typography.Title level={5}>{formatCount(film.watched_count)}</Typography.Title>
                                            </div>
                                            <div className="action">
                                                <Tooltip title="Таалагдсан">
                                                    { user && user.profile.series_liked.filter(x => x === film.id).length > 0 ? 
                                                        <Button className="like-fill" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                                    : 
                                                        <Button className="like" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                                    }
                                                </Tooltip>
                                                <Typography.Title level={5}>{formatCount(film.like_count)}</Typography.Title>
                                            </div>                                            
                                            <div className="action">
                                                <Tooltip title="Дараа үзэх">
                                                    { user && user.profile.series_watchlist.filter(x => x === film.id).length > 0 ? 
                                                        <Button className="watchlist-fill" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                                    :
                                                        <Button className="watchlist" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                                    }                                                
                                                </Tooltip>
                                                <Typography.Title level={5}>{formatCount(film.watchlist_count)}</Typography.Title>
                                            </div>
                                            <div className="action">
                                                { user && user.profile.series_scores.filter(x => x.series === film.id).length > 0 ? 
                                                    <Popover                                    
                                                        placement="right"
                                                        title={<strong>Таны үнэлгээ: {user.profile.series_scores.filter(x => x.series === film.id)[0].user_score}</strong>}
                                                        trigger="click"
                                                        content={
                                                            <div>
                                                                <Rate defaultValue={user.profile.series_scores.filter(x => x.series === film.id)[0].user_score / 2} allowHalf count={5} onChange={onRate} />
                                                            </div>
                                                        }
                                                    >
                                                        <Button className="rate-fill" size="large" shape="circle" type="text">{user.profile.series_scores.filter(x => x.series === film.id)[0].user_score}</Button> 
                                                    </Popover>       
                                                : 
                                                    <Popover                                    
                                                        placement="right"
                                                        title={<strong>Үнэлгээ өгөх</strong>}
                                                        trigger="click"
                                                        content={
                                                            <div>
                                                                <Rate allowHalf count={5} onChange={onRate} />
                                                            </div>
                                                        }
                                                    >
                                                        <Button className="rate" size="large" shape="circle" type="text" icon={<StarOutlined />} /> 
                                                    </Popover>       
                                                }
                                                <Typography.Title level={5}>{formatCount(film.score_count)}</Typography.Title>
                                            </div>                                        
                                        </div>
                                    ) : (
                                        <div className="actions">                                            
                                            <div className="action">
                                                <Tooltip title="Дараа үзэх">
                                                    { user && user.profile.films_watchlist.filter(x => x === film.id).length > 0 ? 
                                                        <Button className="watchlist-fill" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                                    :
                                                        <Button className="watchlist" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                                    }                                                
                                                </Tooltip>
                                                <Typography.Title level={5}>{formatCount(film.watchlist_count)}</Typography.Title>
                                            </div>                                                                                                                       
                                        </div>
                                    )}                                    
                                </Col>
                            </Row>                                                   
                        </div>
                        <div className="container" style={{ marginTop: '24px' }}>       
                            <Tabs defaultActiveKey="1" className="film-detail-tabs">
                                <Tabs.TabPane tab="Баг бүрэлдэхүүн" key="1">
                                    <List                                
                                        itemLayout="horizontal"    
                                        dataSource={crew ? getWholeCrew(crew) : undefined}
                                        renderItem={member => (
                                            <List.Item>
                                                <Row gutter={[24, 24]} style={{ width: '100%' }}>
                                                    <Col span={12} style={{ textAlign: 'right' }}>
                                                        <Typography.Text>{member.role}</Typography.Text>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Popover
                                                            title={false}
                                                            placement="rightTop"
                                                            content={
                                                                <ArtistPopover artist={member.artist} />
                                                            }
                                                        >
                                                            <a href={`/artists/${member.artist.id}`}>{member.artist.name} </a>
                                                        </Popover>                                            
                                                    </Col>                                               
                                                </Row>
                                            </List.Item>
                                        )}
                                    />               
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Жүжигчид" key="2">
                                    <div className="film-maincast">             
                                        <Typography.Title level={5}>Гол дүр</Typography.Title>                           
                                        <List
                                            grid={{
                                                gutter: 24,
                                                xs: 3,
                                                sm: 3,
                                                md: 4,
                                                lg: 4,
                                                xl: 6,
                                                xxl: 6,
                                            }}               
                                            dataSource={mainCast}                 
                                            renderItem={member => (
                                                <List.Item key={member.id}>
                                                    <a href={`/artists/${member.artist.id}`}>
                                                        <img alt={member.artist.name} src={member.artist.avatar} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />                                                
                                                    </a>
                                                    <Typography.Text style={{ fontWeight: 'bold', display: 'block', textAlign: 'center' }}>{member.artist.name}</Typography.Text>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                    <div className="film-cast">             
                                        <Typography.Title level={5}>Туслах дүр</Typography.Title>                           
                                        <List
                                            grid={{
                                                gutter: 24,
                                                xs: 3,
                                                sm: 3,
                                                md: 4,
                                                lg: 4,
                                                xl: 6,
                                                xxl: 6,
                                            }}               
                                            dataSource={cast}                 
                                            renderItem={member => (
                                                <List.Item key={member.id}>
                                                    <a href={`/artists/${member.artist.id}`}>
                                                        <img alt={member.artist.name} src={member.artist.avatar} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />                                                
                                                    </a>
                                                    <Typography.Text style={{ fontWeight: 'bold', display: 'block', textAlign: 'center' }}>{member.artist.name}</Typography.Text>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Зураг" key="3">
                                    <Typography.Text>Зураг</Typography.Text>
                                </Tabs.TabPane>
                            </Tabs>                                                                                                                                          
                        </div>                        
                        { film.is_released ? (
                            <>                                
                                <SeriesReviews film={film} user={user} token={props.token} /> 
                            </>
                        ) : ([])}
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

export default connect(mapStateToProps)(SeriesDetail)