import moment from 'moment'
import { AppstoreAddOutlined, HeartOutlined, StarOutlined, CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Space, Button, Tooltip, Popover, Rate, message, Spin } from "antd";
import { useEffect, useState } from "react";
import './FilmCard.css'
import blank from './blank.jpg'
import axios from "axios";
import api from "../../api";
import './FilmListItem.css'
import GenreTag from '../../components/GenreTag';
import FilmScore from './FilmScore';

function FilmListItem (props) {

    const [user, setUser] = useState()
    const [film, setFilm] = useState()

    useEffect(() => {
        setFilm(props.film)
        setUser(props.user)
    }, [props.film, props.user])

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
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Error has occured. Please try again later.")
            })    
        } else {
            props.history.push("/login")
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
                    film: film.id
                }
            })            
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setFilm(res.data.film)
                }                                                        
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Алдаа гарлаа. Хуудсаа refresh хийнэ үү.")
            })    
        } else {
            props.history.push("/login")
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
                }                                                        
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Алдаа гарлаа. Хуудсаа refresh хийнэ үү.")
            })    
        } else {
            props.history.push("/login")
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
                }                                                        
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Алдаа гарлаа. Хуудсаа refresh хийнэ үү.")
            })    
        } else {
            props.history.push("/login")
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

    return (
        <div className="film-listitem">
            { film ? (
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <div className="container" style={{ width: '100%' }}>
                        <Row gutter={[24, 0]}>
                            <Col xs={12} sm={12} md={12} lg={3}>
                                <a href={`/films/${film.id}/`}>
                                    <img alt={film.title} src={film.poster ? film.poster : blank} style={{ height: '168px', width: 'auto', objectFit: 'scale-down' }} />
                                </a>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={9}>
                                <a href={`/films/${film.id}/`}>
                                    <Typography.Title level={5}>{film.title} ({moment(film.releasedate).year()})</Typography.Title>                                    
                                </a>
                                { film.genres ?
                                    <Space size={[8, 8]} wrap>
                                    {film.genres.map(genre => (                                        
                                        <GenreTag genre={genre.name} />                                                                       
                                    ))}                       
                                    </Space>          
                                :
                                    <></>
                                }     
                                {/* { film.rating ? <Typography.Text style={{ display: 'block', margin: '4px 0' }}>{film.rating.name}</Typography.Text> : <></> }               
                                { film.duration ? <Typography.Text style={{ display: 'block', margin: '4px 0' }}>{getDuration(film.duration)}</Typography.Text> : <></> }  */}
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <FilmScore type="mid" score={film.avg_score} />     
                                <div style={{ marginLeft: '12px' }}>
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>Үзэгчдээс</Typography.Title>
                                    <Typography.Text>/ Санал: {formatCount(film.score_count)} /</Typography.Text>
                                </div>                                                                        
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <FilmScore type="mid" score={47} />     
                                <div style={{ marginLeft: '12px' }}>
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>Шүүмжлэгчдээс</Typography.Title>
                                    <Typography.Text>/ Санал: {formatCount(26)} /</Typography.Text>
                                </div>                                                                        
                            </Col>
                        </Row>
                    </div>    
                    { film.is_released ? (
                        <div className="actions">
                            <Tooltip title="Таалагдсан" placement="right">
                                { user && user.profile.films_liked.filter(x => x === film.id).length > 0 ? 
                                    <Button className="like-fill" size="large" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                : 
                                    <Button className="like" size="large" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                }                                                           
                            </Tooltip>
                            <Tooltip title="Үзсэн" placement="right">
                                { user && user.profile.films_watched.filter(x => x === film.id).length > 0 ? 
                                    <Button className="watched-fill" size="large" type="text" icon={<CheckOutlined />} onClick={onWatched} />
                                :
                                    <Button className="watched" size="large" type="text" icon={<CheckOutlined />} onClick={onWatched} />
                                }                                
                            </Tooltip>
                            <Tooltip title="Дараа үзэх" placement="right">
                                { user && user.profile.films_watchlist.filter(x => x === film.id).length > 0 ? 
                                    <Button className="watchlist-fill" size="large" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                :
                                    <Button className="watchlist" size="large" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                }        
                            </Tooltip>
                            <Tooltip title="Жагсаалтад нэмэх" placement="right">
                                <Button className="addlist" size="large" type="text" icon={<AppstoreAddOutlined />} />                            
                            </Tooltip>                            
                            <Tooltip title="Үнэлгээ өгөх" placement="right">
                                { user && user.profile.scores.filter(x => x.film === film.id).length > 0 ? 
                                    <Popover                                    
                                        placement="right"
                                        title={<strong>Таны үнэлгээ: {user.profile.scores.filter(x => x.film === film.id)[0].user_score}</strong>}
                                        trigger="click"
                                        content={
                                            <div>
                                                <Rate defaultValue={user.profile.scores.filter(x => x.film === film.id)[0].user_score / 2} allowHalf count={5} onChange={onRate} />
                                            </div>
                                        }
                                    >
                                        <Button className="rate-fill" size="large" type="text">{user.profile.scores.filter(x => x.film === film.id)[0].user_score}</Button> 
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
                                        <Button className="rate" size="large" type="text" icon={<StarOutlined />} /> 
                                    </Popover>       
                                }                
                            </Tooltip>    
                        </div>
                    ) : (
                        <div className="actions">                           
                            <Tooltip title="Дараа үзэх" placement="right">
                                { user && user.profile.films_watchlist.filter(x => x === film.id).length > 0 ? 
                                    <Button className="watchlist-fill" size="large" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                :
                                    <Button className="watchlist" size="large" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                }        
                            </Tooltip>                              
                        </div>
                    )}
                </div>
            ) : (
                <Spin />
            )}
        </div>  
    )
}

export default FilmListItem