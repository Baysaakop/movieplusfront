import { AppstoreAddOutlined, HeartOutlined, MoreOutlined, StarOutlined, CheckOutlined } from "@ant-design/icons";
import SaveIcon from '../../components/SaveIcon'
import { Card, Typography, Progress, Button, Drawer, Tooltip, Popover, Rate, message, Spin } from "antd";
import { useEffect, useState } from "react";
import './FilmCard.css'
import blank from './blank.jpg'
import axios from "axios";
import api from "../../api";

const desc = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

function FilmCard (props) {

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
                    score: val,
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
                <Card
                    bordered={false}
                    hoverable                                
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
                                <Progress                                
                                    type="circle"
                                    width={40}                                                 
                                    strokeColor="#f39c12"
                                    trailColor="#3c3c3c"                                 
                                    strokeWidth={6}      
                                    percent={film.avg_score}
                                    format={percent => `${percent}`}
                                />                    
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
                                <Tooltip title="Таалагдсан" placement="right">
                                    { user && user.profile.films_liked.filter(x => x === film.id).length > 0 ? 
                                        <Button className="like-fill" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                    : 
                                        <Button className="like" size="large" shape="circle" type="text" icon={<HeartOutlined />} onClick={onLike} />
                                    }                                                           
                                </Tooltip>
                                <Tooltip title="Үзсэн" placement="right">
                                    { user && user.profile.films_watched.filter(x => x === film.id).length > 0 ? 
                                        <Button className="watched-fill" size="large" shape="circle" type="text" icon={<CheckOutlined />} onClick={onWatched} />
                                    :
                                        <Button className="watched" size="large" shape="circle" type="text" icon={<CheckOutlined />} onClick={onWatched} />
                                    }                                
                                </Tooltip>
                                <Tooltip title="Дараа үзэх" placement="right">
                                    { user && user.profile.films_watchlist.filter(x => x === film.id).length > 0 ? 
                                        <Button className="watchlist-fill" size="large" shape="circle" type="text" icon={<SaveIcon />} onClick={onWatchlist} />
                                    :
                                        <Button className="watchlist" size="large" shape="circle" type="text" icon={<SaveIcon />} onClick={onWatchlist} />
                                    }        
                                </Tooltip>
                                <Tooltip title="Жагсаалтад нэмэх" placement="right">
                                    <Button className="addlist" size="large" shape="circle" type="text" icon={<AppstoreAddOutlined />} />                            
                                </Tooltip>                            
                                <Tooltip title="Үнэлгээ өгөх" placement="right">
                                    { user && user.profile.scores.filter(x => x.film === film.id).length > 0 ? 
                                        <Popover                                    
                                            placement="right"
                                            title={<strong>Таны үнэлгээ: {user.profile.scores.filter(x => x.film === film.id)[0].user_score}</strong>}
                                            trigger="click"
                                            content={
                                                <div>
                                                    <Rate count={10} tooltips={desc} onChange={onRate} />
                                                </div>
                                            }
                                        >
                                            <Button className="rate-fill" size="large" shape="circle" type="text">{user.profile.scores.filter(x => x.film === film.id)[0].user_score}</Button> 
                                        </Popover>       
                                    : 
                                        <Popover                                    
                                            placement="right"
                                            title={<strong>Үнэлгээ өгөх</strong>}
                                            trigger="click"
                                            content={
                                                <div>
                                                    <Rate count={10} tooltips={desc} onChange={onRate} />
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
                    <Typography.Paragraph className="film-title" ellipsis={{ rows: 2 }}>{film.title}</Typography.Paragraph>
                    <Typography.Text className="film-releasedate">{film.releasedate}</Typography.Text>
                </Card>
            ) : (
                <Spin />
            )}            
        </div>
    )
}

export default FilmCard