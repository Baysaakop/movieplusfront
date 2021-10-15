import { HeartOutlined, MoreOutlined, StarOutlined, CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";
// import SaveIcon from '../../components/SaveIcon'
import { Card, Typography, Button, Drawer, Tooltip, Popover, Rate, message, Spin, Avatar } from "antd";
import { useEffect, useState } from "react";
import '../Film/FilmCard.css'
import blank from '../Film/blank.jpg'
import axios from "axios";
import api from "../../api";
import moment from 'moment'
import FilmScore from "../Film/FilmScore";

function SeriesCard (props) {

    const [drawerOpen, setDrawerOpen] = useState(false)
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

    return (
        <div className="film-card">
            { film ? (
                <>
                    <Card
                        bordered={false}
                        hoverable                                
                        cover={                   
                            <div className="film-poster-container">
                                <a href={`/series/${film.id}`}>
                                    <div style={{ width: '100%', height: '100%' }}>
                                        <div style={{ position: 'relative', paddingBottom: '150%', width: '100%', height: '100%', overflow: 'hidden' }}>                                
                                            <img className="film-poster" alt={film.title} src={film.poster ? film.poster : blank} />                                
                                        </div>
                                    </div>
                                </a>
                                <div className="film-score">
                                    { props.action === "watched" ? (
                                        <Avatar style={{ background: 'rgba(76, 209, 55, 1)' }} icon={<CheckOutlined />} />
                                    ) : props.action === "liked" ? (
                                        <Avatar style={{ background: 'rgba(231, 76, 60, 1)' }} icon={<HeartOutlined />} />
                                    ) : props.action === "watchlist" ? (
                                        <Avatar style={{ background: 'rgba(72, 52, 212, 1)' }} icon={<ClockCircleOutlined />} />
                                    ) : props.action === "scores" ? (
                                        <FilmScore type="card" score={props.score * 10} />
                                    ) : (
                                        <FilmScore type="card" score={film.avg_score} />
                                    )}                                  
                                </div>
                                <div className="film-actions">
                                    <Button size="small" className="button-more" shape="circle" type="text" icon={<MoreOutlined />} onClick={() => setDrawerOpen(true)} />
                                </div>
                                <Drawer        
                                    className="drawer"                    
                                    placement="right"                            
                                    closable={false}
                                    onClose={() => setDrawerOpen(false)}
                                    visible={drawerOpen}
                                    getContainer={false}                            
                                    width={60}                            
                                >
                                    <Tooltip title="Үзсэн" placement="right">
                                        { user && user.profile.series_watched.filter(x => x === film.id).length > 0 ? 
                                            <Button className="watched-fill" size="large" shape="circle" type="text" icon={<CheckOutlined />} onClick={onWatched} />
                                        :
                                            <Button className="watched" size="large" shape="circle" type="text" icon={<CheckOutlined />} onClick={onWatched} />
                                        }                                
                                    </Tooltip>
                                    <Tooltip title="Таалагдсан" placement="right">
                                        { user && user.profile.series_liked.filter(x => x === film.id).length > 0 ? 
                                            <Button className="like-fill" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                        : 
                                            <Button className="like" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                        }                                                           
                                    </Tooltip>                                    
                                    <Tooltip title="Дараа үзэх" placement="right">
                                        { user && user.profile.series_watchlist.filter(x => x === film.id).length > 0 ? 
                                            <Button className="watchlist-fill" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                        :
                                            <Button className="watchlist" size="large" shape="circle" type="text" icon={<ClockCircleOutlined />} onClick={onWatchlist} />
                                        }        
                                    </Tooltip>
                                    {/* <Tooltip title="Жагсаалтад нэмэх" placement="right">
                                        <Button className="addlist" size="large" shape="circle" type="text" icon={<AppstoreAddOutlined />} />                            
                                    </Tooltip>                             */}
                                    <Tooltip title="Үнэлгээ өгөх" placement="right">
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
                                    </Tooltip>                                    
                                </Drawer>
                            </div>                        
                        }                       
                    >                    
                        {/* <Typography.Text className="film-releasedate">{film.releasedate}</Typography.Text> */}
                    </Card>
                    <Typography.Paragraph className="film-title" ellipsis={{ rows: 2 }}>{film.title} ({moment(film.releasedate).year()})</Typography.Paragraph>
                </>
            ) : (
                <Spin />
            )}            
        </div>
    )
}

export default SeriesCard