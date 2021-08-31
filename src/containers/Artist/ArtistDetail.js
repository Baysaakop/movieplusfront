import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { Breadcrumb, Button, Col, Divider, message, Popover, Row, Spin, Timeline, Tooltip, Typography } from "antd"
import { FacebookFilled, InstagramOutlined, TwitterOutlined, YoutubeFilled } from "@ant-design/icons"
import './ArtistDetail.css'
import FilmPopover from "../Film/FilmPopover"
import moment from "moment"

function ArtistDetail (props) {

    const [artist, setArtist] = useState()
    const [crew, setCrew] = useState()
    const [cast, setCast] = useState()

    useEffect(() => {
        getArtist()
        getCrew()
        getCast()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps        

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
            console.log(res.data)
            setArtist(res.data)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }    

    function getCrew() {
        const id = props.match.params.id
        const url = api.crew + "?artist=" + id
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                        
            console.log(res.data)
            setCrew(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getCast() {
        const id = props.match.params.id
        const url = api.cast + "?artist=" + id
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                        
            console.log(res.data)
            setCast(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getProducer (members) {
        let results = []
        members.forEach(member => {
            member.role.forEach(r => {
                if (r.id === 3) {
                    results.push(member)
                }
            })
        })
        return results
    }

    function getDirector (members) {
        let results = []
        members.forEach(member => {
            member.role.forEach(r => {
                if (r.id === 2) {
                    results.push(member)
                }
            })
        })
        return results
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
                                {artist.occupation.map(occupation => (
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
                        </div>
                        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                            { cast && cast.length > 0 ? (
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <div className="container">
                                        <Typography.Title level={5}>Бүтээлүүд (Жүжигчин)</Typography.Title>            
                                        <Timeline style={{ marginTop: '16px' }}>
                                            {cast ? cast.map(member => (
                                                <Timeline.Item>
                                                    <Popover
                                                        title={false}
                                                        placement="rightTop"
                                                        content={
                                                            <FilmPopover film={member.film} />
                                                        }
                                                    >
                                                        <a className="film-timeline" href={`/films/${member.film.id}`}>
                                                            {moment(member.film.releasedate).year()} - {member.film.title} {member.role_name ? ` | Дүр: ${member.role_name}` : ''}
                                                        </a>                                   
                                                    </Popover>                                            
                                                </Timeline.Item>             
                                            )) : []}                                                                
                                        </Timeline>    
                                    </div>
                                </Col> 
                            ) : []}   
                            { crew && getProducer(crew).length > 0 ? (
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <div className="container">
                                        <Typography.Title level={5}>Бүтээлүүд (Продюсер)</Typography.Title>            
                                        <Timeline style={{ marginTop: '16px' }}>
                                            {crew ? getProducer(crew).map(member => (
                                                <Timeline.Item>
                                                    <Popover
                                                        title={false}
                                                        placement="rightTop"
                                                        content={
                                                            <FilmPopover film={member.film} />
                                                        }
                                                    >
                                                        <a className="film-timeline" href={`/films/${member.film.id}`}>{moment(member.film.releasedate).year()} - {member.film.title}</a>                                   
                                                    </Popover>                                            
                                                </Timeline.Item>             
                                            )) : []}                                                                
                                        </Timeline>    
                                    </div>
                                </Col> 
                            ) : []}           
                            { crew && getDirector(crew).length > 0 ? (
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <div className="container">
                                        <Typography.Title level={5}>Бүтээлүүд (Найруулагч)</Typography.Title>            
                                        <Timeline style={{ marginTop: '16px' }}>
                                            {crew ? getDirector(crew).map(member => (
                                                <Timeline.Item>
                                                    <Popover
                                                        title={false}
                                                        placement="rightTop"
                                                        content={
                                                            <FilmPopover film={member.film} />
                                                        }
                                                    >
                                                        <a className="film-timeline" href={`/films/${member.film.id}`}>{moment(member.film.releasedate).year()} - {member.film.title}</a>                                   
                                                    </Popover>                                            
                                                </Timeline.Item>             
                                            )) : []}                                                                
                                        </Timeline>    
                                    </div>
                                </Col> 
                            ) : []}                                                                  
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

export default ArtistDetail