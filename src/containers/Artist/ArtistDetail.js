import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { Breadcrumb, Button, Col, Divider, message, Row, Spin, Tooltip, Typography } from "antd"
import { BellOutlined, FacebookFilled, InstagramOutlined, LikeOutlined, TwitterOutlined, YoutubeFilled } from "@ant-design/icons"
import './ArtistDetail.css'
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import Filmography from "./Filmography"

function ArtistDetail (props) {
    const history = useHistory()
    const [user, setUser] = useState()
    const [artist, setArtist] = useState()
    const [filmCrew, setFilmCrew] = useState()
    const [seriesCrew, setSeriesCrew] = useState()
    const [filmCast, setFilmCast] = useState()
    const [seriesCast, setSeriesCast] = useState()    

    useEffect(() => {
        if (props.token && !user) {
            getUser()
        }
        getArtist()
        getFilmCrew()
        getSeriesCrew()
        getFilmCast()
        getSeriesCast()
    }, [props.token]) // eslint-disable-line react-hooks/exhaustive-deps        

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
            setArtist(res.data)                  
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

    function getFilmCrew() {
        const id = props.match.params.id
        const url = api.crew + "?artist=" + id + "&type=film"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                        
            setFilmCrew(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getSeriesCrew() {
        const id = props.match.params.id
        const url = api.crew + "?artist=" + id + "&type=series"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                        
            setSeriesCrew(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getFilmCast() {
        const id = props.match.params.id
        const url = api.cast + "?artist=" + id + "&type=film"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                        
            setFilmCast(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getSeriesCast() {
        const id = props.match.params.id
        const url = api.cast + "?artist=" + id + "&type=series"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                        
            setSeriesCast(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
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
                    like_artist: true,
                    artist: artist.id
                }
            })            
            .then(res => {                
                if (res.status === 200) {
                    setUser(res.data.user)
                    setArtist(res.data.artist)
                }                                                         
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Error has occured. Please try again later.")
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
                    follow_artist: true,
                    artist: artist.id
                }
            })            
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data.user)
                    setArtist(res.data.artist)
                }                                                        
            })
            .catch(err => {                      
                console.log(err.message)      
                message.error("Error has occured. Please try again later.")
            })    
        } else {
            history.push("/login")
        }       
    }

    return (
        artist ? (
            <div>            
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Нүүр</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/artists">Хүмүүс</a>
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
                                {artist.occupations.map(occupation => (
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
                            <div className="actions">
                                <div className="action">
                                    <Tooltip title="Like">
                                        { user && user.profile.artists_liked.filter(x => x === artist.id).length > 0 ? 
                                            <Button className="like-fill" size="large" shape="circle" type="text" icon={<LikeOutlined />} onClick={onLike} />
                                        : 
                                            <Button className="like" size="large" shape="circle" type="text" icon={<LikeOutlined />} onClick={onLike} />
                                        }
                                    </Tooltip>
                                    <Typography.Title level={5}>{formatCount(artist.like_count)}</Typography.Title>
                                </div>
                                <div className="action">                                            
                                    <Tooltip title="Follow">
                                        { user && user.profile.artists_followed.filter(x => x === artist.id).length > 0 ? 
                                            <Button className="followed-fill" size="large" shape="circle" type="text" icon={<BellOutlined />} onClick={onWatched} />
                                        :
                                            <Button className="followed" size="large" shape="circle" type="text" icon={<BellOutlined />} onClick={onWatched} />
                                        }
                                    </Tooltip>
                                    <Typography.Title level={5}>{formatCount(artist.follow_count)}</Typography.Title>
                                </div>
                            </div>        
                        </div>
                        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>                            
                            <Col xs={24} sm={24} md={24} lg={12}>
                            { filmCast && filmCast.length > 0 ? (                                
                                <Filmography type="cast" mode="film" title="Кино дүрүүд" data={filmCast} />                                     
                            ) : []}
                            { filmCrew && filmCrew.length > 0 ? (                                
                                <Filmography type="crew" mode="film" title="Кино бүтээлүүд" data={filmCrew} />                                     
                            ) : []}
                            </Col> 
                            <Col xs={24} sm={24} md={24} lg={12}>
                            { seriesCast && seriesCast.length > 0 ? (                                
                                <Filmography type="cast" mode="series" title="ТВ Цувралын дүрүүд" data={seriesCast} />                                     
                            ) : []}
                            { seriesCrew && seriesCrew.length > 0 ? (                                
                                <Filmography type="crew" mode="series" title="ТВ Цувралууд" data={seriesCrew} />                                     
                            ) : []}
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

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ArtistDetail)