import './FilmDetail.css'
import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import moment from "moment"
import blank from './blank.jpg'
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { Breadcrumb, Button, Col, Divider, List, message, Popover, Row, Space, Spin, Typography, Rate, Tabs, notification, DatePicker, Checkbox } from "antd"
import { CheckOutlined, ClockCircleOutlined, HeartOutlined, PlayCircleOutlined, StarOutlined } from "@ant-design/icons"
import ArtistPopover from "../Artist/ArtistPopover"
import Trailer from "../../components/Trailer"
import GenreTag from "../../components/GenreTag"
import FilmReviews from "./Review/FilmReviews"
import FilmScore from "./FilmScore"

function FilmDetail (props) {
    const history = useHistory()
    const [user, setUser] = useState()
    const [film, setFilm] = useState()
    const [crew, setCrew] = useState()
    const [mainCast, setMainCast] = useState()
    const [cast, setCast] = useState()
    const [trailer, setTrailer] = useState(false)        
    const [dateVisible, setDateVisible] = useState(false)
    const [dateWatched, setDateWatched] = useState(moment())

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
        const url = api.crew + "?film=" + id
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
        const url = api.cast + "?film=" + id + "&is_lead=true"
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
        const url = api.cast + "?film=" + id + "&is_lead=false"
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

    function onSelectDate(val) {   
        if (val && val !== null) {
            setDateWatched(val)
        } else {
            setDateWatched(undefined)
        }
    }

    function onWatched () {
        if (user && props.token) {
            let data = {
                watched: true,
                film: film.id
            }
            if (dateVisible && dateWatched) {
                data['date'] = moment(dateWatched).format("YYYY-MM-DD")
            }                                    
            axios({
                method: 'PUT',
                url: `${api.users}/${user.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`                  
                },
                data: data
            })            
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setFilm(res.data.film)
                    if (res.data.flag === true) {
                        notification['success']({
                            message: 'Жагсаалтанд нэмэгдлээ.',
                            description: `${res.data.film.title} кино таны үзсэн киноны жагсаалтанд нэмэгдлээ.`,                            
                        });
                    } else {
                        notification['warning']({
                            message: 'Жагсаалтаас хасагдлаа.',
                            description: `${res.data.film.title} кино таны үзсэн киноны жагсаалтаас хасагдлаа.`,                            
                        });
                    }
                    setDateVisible(false)
                    setDateWatched(moment().format("YYYY-MM-DD"))
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
                    film: film.id
                }
            })            
            .then(res => {                
                if (res.status === 200) {                    
                    setUser(res.data.user)
                    setFilm(res.data.film)
                    if (res.data.flag === true) {
                        notification['success']({
                            message: 'Жагсаалтанд шинэчлэгдлээ.',
                            description: `${res.data.film.title} кино таны таалагдсан киноны жагсаалтанд нэмэгдлээ.`,                            
                        });
                    } else {
                        notification['warning']({
                            message: 'Жагсаалтаас хасагдлаа.',
                            description: `${res.data.film.title} кино таны таалагдсан киноны жагсаалтаас хасагдлаа.`,                            
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
                    film: film.id
                }
            })            
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setFilm(res.data.film)
                    if (res.data.flag === true) {
                        notification['success']({
                            message: 'Жагсаалтанд нэмэгдлээ',
                            description: `${res.data.film.title} кино таны дараа үзэх киноны жагсаалтанд нэмэгдлээ.`,                            
                        });
                    } else {
                        notification['warning']({
                            message: 'Жагсаалтаас хасагдлаа.',
                            description: `${res.data.film.title} кино таны дараа үзэх киноны жагсаалтаас хасагдлаа.`,                            
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
                    film: film.id
                }
            })            
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setFilm(res.data.film)
                    notification['success']({
                        message: 'Үнэлгээ өгсөнд баярлалаа.',
                        description: `${res.data.film.title} кинонд өгсөн таны үнэлгээг хүлээж авлаа.`,                            
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
                        <a href="/films">Кино</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {film.title}
                    </Breadcrumb.Item>
                </Breadcrumb>
                { film.landscape ? (
                    <div style={{ marginTop: '24px', position: 'relative' }}>
                        <img alt={film.title} src={film.landscape} style={{ width: '100%', height: 'auto', objectFit: 'cover', filter: 'blur(1px)' }} />
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.6)', borderRadius: '4px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography.Title style={{ color: '#fff', fontSize: '48px' }}>{film.title}</Typography.Title> 
                        </div>
                    </div>
                ) : (
                    <div style={{ marginTop: '24px', position: 'relative' }}>
                        <div style={{ background: '#11181e', borderRadius: '4px', width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography.Title style={{ color: '#fff', fontSize: '48px' }}>{film.title}</Typography.Title> 
                        </div>
                    </div>
                )} 
                <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: '100%', height: '100%' }}>
                                <div style={{ position: 'relative', paddingBottom: '150%', width: '100%', height: '100%', overflow: 'hidden' }}>                                
                                    <img className="film-poster" alt={film.title} src={film.poster ? film.poster : blank} />                                
                                </div>
                            </div>                            
                            <div className="film-stats">
                                <div className="stat">
                                    <CheckOutlined style={{ marginRight: '4px' }} />
                                    <Typography.Text>{formatCount(film.watched_count)}</Typography.Text>
                                </div>
                                <div className="stat">
                                    <HeartOutlined style={{ marginRight: '4px' }} />
                                    <Typography.Text>{formatCount(film.like_count)}</Typography.Text>
                                </div>
                                <div className="stat">
                                    <ClockCircleOutlined style={{ marginRight: '4px' }} />
                                    <Typography.Text>{formatCount(film.watchlist_count)}</Typography.Text>
                                </div>
                                <div className="stat">
                                    <StarOutlined style={{ marginRight: '4px' }} />
                                    <Typography.Text>{formatCount(film.score_count)}</Typography.Text>
                                </div>
                            </div>
                            { film.trailer ? (
                                <Button className="play-trailer" block size="large" type="primary" icon={<PlayCircleOutlined />} onClick={() => setTrailer(true)}>Трейлер үзэх</Button>
                            ) : (                                        
                                <Button className="play-trailer" block size="large" type="dashed" icon={<PlayCircleOutlined />}>Трейлер ороогүй</Button>
                            )}                                    
                            {trailer ? <Trailer title={film.title} trailer={film.trailer} hide={() => setTrailer(false)} /> : <></>} 
                            <List
                                className="container"
                                style={{ marginTop: '24px', padding: '8px 16px' }}
                                header={<Typography.Title level={5} style={{ margin: 0 }}>Хаанаас үзэх вэ?</Typography.Title>}                                                                
                                dataSource={film.platforms}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <a href={item.url} target="_blank" rel="noreferrer">
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <div style={{ background: item.platform.background, width: '64px', height: '48px', padding: '0 8px', borderRadius: '5px', marginRight: '8px' }}>
                                                    <img alt={item.platform.name} src={item.platform.logo} style={{ height: '100%', width: '100%', objectFit: 'scale-down' }} />
                                                </div>
                                                <Typography.Title level={5} style={{ margin: 0 }}>{item.platform.name}</Typography.Title>
                                            </div>
                                        </a>
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
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Төрөл жанр</Typography.Title>
                                    <Space size={[8, 8]} wrap>
                                        {film.genres.map(genre => (
                                        <GenreTag genre={genre.name} />                                                    
                                        ))}                       
                                    </Space>                                       
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Насны ангилал</Typography.Title>
                                    <Typography.Text>13+</Typography.Text>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Нээлт</Typography.Title>
                                    <Typography.Text>{moment(film.releasedate).year()} оны {moment(film.releasedate).month() + 1} сарын {moment(film.releasedate).date()}</Typography.Text>                            
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={6}>
                                    <Typography.Title level={5}>Үргэлжлэх хугацаа</Typography.Title>
                                    <Typography.Text>{getDuration(film.duration)}</Typography.Text>                            
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
                                                { user && user.profile.films_watched.filter(x => x.film === film.id).length > 0 ? 
                                                    <Button className="watched-fill" size="large" shape="circle" type="text" icon={<CheckOutlined />} onClick={onWatched} />
                                                :
                                                <Popover                                    
                                                    placement="right"                                                        
                                                    trigger="click"
                                                    content={
                                                        <div>
                                                            <Space direction="vertical">
                                                                <Checkbox checked={dateVisible} onChange={() => setDateVisible(!dateVisible)}>Үзсэн өдөр тэмдэглэх</Checkbox>
                                                                {dateVisible ? <DatePicker value={dateWatched} style={{ width: '100%' }} onChange={onSelectDate} /> : <></>}                                                                
                                                                <Button block icon={<CheckOutlined />} type="primary" onClick={onWatched}>Хадгалах</Button>
                                                            </Space>
                                                        </div>
                                                    }
                                                >
                                                    <Button className="watched" size="large" shape="circle" type="text" icon={<CheckOutlined />} />
                                                </Popover>          
                                                }        
                                                <Typography.Text level={5} style={{ display: 'block' }}>Үзсэн</Typography.Text>
                                            </div>
                                            <div className="action">                                                
                                                { user && user.profile.films_liked.filter(x => x === film.id).length > 0 ? 
                                                    <Button className="like-fill" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                                : 
                                                    <Button className="like" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                                }                                                
                                                <Typography.Text level={5} style={{ display: 'block' }}>Таалагдсан</Typography.Text>
                                            </div>                                           
                                            <div className="action">                                                
                                                { user && user.profile.films_watchlist.filter(x => x === film.id).length > 0 ? 
                                                    <Button className="watchlist-fill" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                                :
                                                    <Button className="watchlist" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                                }                                                                                                
                                                <Typography.Text level={5} style={{ display: 'block' }}>Дараа үзэх</Typography.Text>
                                            </div>
                                            {/* <div className="action">
                                                <Tooltip title="Жагсаалтад нэмэх">
                                                    <Button className="addlist" size="large" shape="circle" type="text" icon={<AppstoreAddOutlined />} />   
                                                </Tooltip>
                                                <Typography.Title level={5}>{formatCount(0)}</Typography.Title>                         
                                            </div> */}
                                            <div className="action">
                                                { user && user.profile.film_scores.filter(x => x.film === film.id).length > 0 ? 
                                                    <Popover                                    
                                                        placement="right"
                                                        title={<strong>Таны үнэлгээ: {user.profile.film_scores.filter(x => x.film === film.id)[0].user_score}</strong>}
                                                        trigger="click"
                                                        content={
                                                            <div>
                                                                <Rate defaultValue={user.profile.film_scores.filter(x => x.film === film.id)[0].user_score / 2} allowHalf count={5} onChange={onRate} />
                                                            </div>
                                                        }
                                                    >
                                                        <Button className="rate-fill" size="large" shape="circle" type="text">{user.profile.film_scores.filter(x => x.film === film.id)[0].user_score}</Button> 
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
                                                <Typography.Text level={5} style={{ display: 'block' }}>Үнэлгээ өгөх</Typography.Text>
                                            </div>                                        
                                        </div>
                                    ) : (
                                        <div className="actions">                                            
                                            <div className="action">
                                                { user && user.profile.films_watchlist.filter(x => x === film.id).length > 0 ? 
                                                    <Button className="watchlist-fill" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                                :
                                                    <Button className="watchlist" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                                }      
                                                <Typography.Text level={5} style={{ display: 'block' }}>Дараа үзэх</Typography.Text>
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
                                <FilmReviews film={film} user={user} token={props.token} />                                
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

export default connect(mapStateToProps)(FilmDetail)