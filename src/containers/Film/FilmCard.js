import { HeartOutlined, StarOutlined, CheckOutlined, ClockCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import SaveIcon from '../../components/SaveIcon'
import { Card, Button, Drawer, Tooltip, Popover, Rate, message, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import './FilmCard.css'
import blank from './blank.jpg'
import axios from "axios";
import api from "../../api";
import moment from 'moment'
import FilmScore from "./FilmScore";

function FilmCard (props) {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [user, setUser] = useState()
    const [film, setFilm] = useState()
    const [action, setAction] = useState(false)

    useEffect(() => {        
        setFilm(props.film)
        setUser(props.user)      
    }, [props.film, props.user]) // eslint-disable-line react-hooks/exhaustive-deps     

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

    function openDrawer () {        
        setDrawerOpen(true)
    }   

    function closeDrawer () {        
        setDrawerOpen(false)
    }   

    function onBlur () {        
        if (action === false) {            
            setDrawerOpen(false)            
        } else {
            setAction(false)
        }
    }

    function onMouseDown () {
        setAction(true)
    }

    function isWatched () {
        if (user && user.profile.films_watched.filter(x => x.film === film.id).length > 0) {
            return true
        } else {
            return false
        }
    }

    function isLiked () {
        if (user && user.profile.films_liked.filter(x => x === film.id).length > 0) {
            return true
        } else {
            return false
        }
    }

    function isWatchlisted () {
        if (user && user.profile.films_watchlist.filter(x => x === film.id).length > 0) {
            return true
        } else {
            return false
        }
    }

    function isRated () {
        if (user && user.profile.film_scores.filter(x => x.film === film.id).length > 0) {
            return true
        } else {
            return false
        }
    }
    
    function getUserRating () {
        return user.profile.film_scores.filter(x => x.film === film.id)[0].user_score
    }
    return (
        <div className="film-card">
            { film ? (
                <Tooltip title={`${film.title} (${moment(film.releasedate).year()})`}>
                    <Card                                                                                    
                        hoverable                          
                        bordered={false}                    
                        cover={                   
                            <div className="film-poster-container">
                                <a href={`/films/${film.id}`}>
                                    <div style={{ width: '100%', height: '100%' }}>
                                        <div style={{ position: 'relative', paddingBottom: '150%', width: '100%', height: '100%', overflow: 'hidden' }}>                                
                                            <img className="film-poster" alt={film.title} src={film.poster ? film.poster : blank} />                                
                                        </div>
                                    </div>
                                </a>
                                <div className="film-score">
                                    <FilmScore type="card" score={film.avg_score} />                                    
                                </div>
                                <div className="film-actions">                                    
                                    { isLiked() ? 
                                        <Button size="middle" className="button-more liked" type="text" icon={<HeartOutlined />} onClick={openDrawer} />
                                    : isWatched() ? 
                                        <Button size="middle" className="button-more watched" type="text" icon={<CheckOutlined />} onClick={openDrawer} />
                                    : isWatchlisted() ? 
                                        <Button size="middle" className="button-more watchlisted" type="text" icon={<ClockCircleOutlined />} onClick={openDrawer} />
                                    :
                                        <Button size="middle" className="button-more" type="text" icon={<PlusOutlined />} onClick={openDrawer} />
                                    }
                                </div>
                                { film.is_released ? (
                                    <Drawer                  
                                        onBlur={onBlur}                                                                
                                        className="drawer"                    
                                        placement="right"                            
                                        closable={false}
                                        onClose={closeDrawer}
                                        visible={drawerOpen}
                                        getContainer={false}                            
                                        width={60}                            
                                    >
                                        <Tooltip title="Үзсэн" placement="right">
                                            { isWatched() ? 
                                                <Button className="watched-fill" size="large" shape="circle" type="text" icon={<CheckOutlined />} onClick={onWatched} onMouseDown={onMouseDown} />
                                            :
                                                <Button className="watched" size="large" shape="circle" type="text" icon={<CheckOutlined />} onClick={onWatched} onMouseDown={onMouseDown} />
                                            }                                
                                        </Tooltip>
                                        <Tooltip title="Таалагдсан" placement="right">
                                            { isLiked() ? 
                                                <Button className="like-fill" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} onMouseDown={onMouseDown} />
                                            : 
                                                <Button className="like" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} onMouseDown={onMouseDown} />
                                            }                                                           
                                        </Tooltip>                                    
                                        <Tooltip title="Дараа үзэх" placement="right">
                                            { isWatchlisted() ? 
                                                <Button className="watchlist-fill" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} onMouseDown={onMouseDown} />
                                            :
                                                <Button className="watchlist" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} onMouseDown={onMouseDown} />
                                            }        
                                        </Tooltip>
                                        <Tooltip title="Үнэлгээ өгөх" placement="right">
                                            { isRated() ? 
                                                <Popover                                    
                                                    placement="right"
                                                    title={<strong>Таны үнэлгээ: {getUserRating()}</strong>}
                                                    trigger="click"                                                    
                                                    content={
                                                        <div onMouseDown={onMouseDown}>
                                                            <Rate defaultValue={getUserRating() / 2} allowHalf count={5} onChange={onRate} />
                                                        </div>
                                                    }
                                                >
                                                    <Button className="rate-fill" size="large" shape="circle" type="text" onMouseDown={onMouseDown}>{getUserRating()}</Button> 
                                                </Popover>       
                                            : 
                                                <Popover                                    
                                                    placement="right"
                                                    title={<strong>Үнэлгээ өгөх</strong>}
                                                    trigger="click"                                                    
                                                    content={
                                                        <div onMouseDown={onMouseDown}>
                                                            <Rate allowHalf count={5} onChange={onRate} />
                                                        </div>
                                                    }
                                                >
                                                    <Button className="rate" size="large" shape="circle" type="text" icon={<StarOutlined />} onMouseDown={onMouseDown} /> 
                                                </Popover>       
                                            }                
                                        </Tooltip>                                    
                                    </Drawer>
                                ) : (
                                    <Drawer        
                                        onBlur={onBlur}           
                                        className="drawer"                    
                                        placement="right"                            
                                        closable={false}
                                        onClose={closeDrawer}
                                        visible={drawerOpen}
                                        getContainer={false}                            
                                        width={60}                            
                                    >
                                        <Tooltip title="Дараа үзэх" placement="right">
                                            { user && user.profile.films_watchlist.filter(x => x === film.id).length > 0 ? 
                                                <Button className="watchlist-fill" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} onMouseDown={onMouseDown} />
                                            :
                                                <Button className="watchlist" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} onMouseDown={onMouseDown} />
                                            }        
                                        </Tooltip>
                                    </Drawer>
                                )}
                            </div>                        
                        }                       
                    >                    
                    </Card>
                    { props.userScore ? 
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Rate className="rating-below-poster" allowHalf disabled defaultValue={props.userScore / 2} style={{ fontSize: '16px' }} />                        
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* { props.userLiked ? 
                                <HeartOutlined style={{ color: 'rgba(231, 76, 60, 1)', fontSize: '16px' }} />
                            :
                                <></>
                            } */}
                            <Typography.Text style={{ paddingTop: '2px', fontWeight: 'bold' }}>{props.userScore} / 10</Typography.Text>
                        </div>
                    </div>
                    : 
                        <></>
                    }
                </Tooltip>
            ) : (
                <Spin />
            )}            
        </div>
    )
}

export default FilmCard