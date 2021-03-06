import { Button, Result, Row, Col, Spin, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../../api';
import SubMenu from 'antd/lib/menu/SubMenu';
import FilmCreate from './Film/FilmCreate';
import FilmUpdate from './Film/FilmUpdate';
import ArtistCreate from './Artist/ArtistCreate';
import ArtistUpdate from './Artist/ArtistUpdate';
import ArtistFilmCrew from './Artist/ArtistFilmCrew';
import ArtistFilmCast from './Artist/ArtistFilmCast';
import FilmCrew from './Film/FilmCrew';
import FilmCast from './Film/FilmCast';
import SeriesCreate from './Series/SeriesCreate';
import SeriesUpdate from './Series/SeriesUpdate';
import SeriesCrew from './Series/SeriesCrew';
import SeriesCast from './Series/SeriesCast';
import ArtistSeriesCrew from './Artist/ArtistSeriesCrew';
import ArtistSeriesCast from './Artist/ArtistSeriesCast';
import FilmPlatform from './Film/FilmPlatform';

function Moderator (props) {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()
    const [key, setKey] = useState('1')

    useEffect(() => {        
        if (props.token && props.token !== null && !user) {
            getUser()
        }
    }, [props.token]) // eslint-disable-line react-hooks/exhaustive-deps

    function getUser () {
        setLoading(true)
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                    
            setUser(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }    

    function onSelect (e) {
        setKey(e.key)
    }

    return (
        loading ? (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        ) : user ? (
            parseInt(user.profile.role) < 3 ? (
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={24} lg={6}>
                        <Menu
                            defaultSelectedKeys={[key]}
                            defaultOpenKeys={['film']}
                            mode="inline"
                            style={{ width: '100%' }}
                            onClick={onSelect}
                        >
                            <SubMenu key="film" title="Кино">
                                <Menu.ItemGroup key="film1" title="Ерөнхий мэдээлэл">
                                    <Menu.Item key="1">Нэмэх</Menu.Item>
                                    <Menu.Item key="2">Засах / Устгах</Menu.Item>                                    
                                    <Menu.Item key="3">Үзэх суваг</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="film2" title="Бүрэлдэхүүн">
                                    <Menu.Item key="4">Баг бүрэлдэхүүн</Menu.Item>
                                    <Menu.Item key="5">Дүр</Menu.Item>
                                </Menu.ItemGroup>                                
                            </SubMenu>
                            <SubMenu key="series" title="Цуврал">
                                <Menu.ItemGroup key="series1" title="Ерөнхий мэдээлэл">
                                    <Menu.Item key="6">Нэмэх</Menu.Item>
                                    <Menu.Item key="7">Засах / Устгах</Menu.Item>                                    
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="series2" title="Бүрэлдэхүүн">
                                    <Menu.Item key="8">Баг бүрэлдэхүүн</Menu.Item>
                                    <Menu.Item key="9">Дүр</Menu.Item>                                    
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu key="artists" title="Хүмүүс">
                                <Menu.ItemGroup key="artists1" title="Ерөнхий мэдээлэл">
                                    <Menu.Item key="10">Нэмэх</Menu.Item>
                                    <Menu.Item key="11">Засах / Устгах</Menu.Item>                                    
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="artists2" title="Уран бүтээл">
                                    <SubMenu key="artists-film" title="Кино">
                                        <Menu.Item key="12">Баг бүрэлдэхүүн</Menu.Item>
                                        <Menu.Item key="13">Дүр</Menu.Item>                                        
                                    </SubMenu>
                                    <SubMenu key="artists-series" title="Цуврал">
                                        <Menu.Item key="14">Баг бүрэлдэхүүн</Menu.Item>
                                        <Menu.Item key="15">Дүр</Menu.Item>                                        
                                    </SubMenu>                           
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu key="genres" title="Төрөл жанр">
                                <Menu.Item key="16">Нэмэх</Menu.Item>
                                <Menu.Item key="17">Засах / Устгах</Menu.Item>                
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18}>
                        <div className="container">                            
                            { key === "1" ? (
                                <FilmCreate token={props.token} />
                            ) : key === "2" ? (
                                <FilmUpdate token={props.token} />
                            ) : key === "3" ? (
                                <FilmPlatform token={props.token} />
                            ) : key === "4" ? (
                                <FilmCrew token={props.token} />
                            ) : key === "5" ? (
                                <FilmCast token={props.token} />
                            ) : key === "6" ? (
                                <SeriesCreate token={props.token} />
                            ) : key === "7" ? (
                                <SeriesUpdate token={props.token} />
                            ) : key === "8" ? (
                                <SeriesCrew token={props.token} />
                            ) : key === "9" ? (
                                <SeriesCast token={props.token} />
                            ) : key === "10" ? (
                                <ArtistCreate token={props.token} />
                            ) : key === "11" ? (
                                <ArtistUpdate token={props.token} />
                            ) : key === "12" ? (
                                <ArtistFilmCrew token={props.token} />
                            ) : key === "13" ? (
                                <ArtistFilmCast token={props.token} />
                            ) : key === "14" ? (
                                <ArtistSeriesCrew token={props.token} />
                            ) : key === "15" ? (
                                <ArtistSeriesCast token={props.token} />
                            ) : key === "16" ? (
                                <>Genre add</>
                            ) : key === "17" ? (
                                <>Genre edit/delete</>
                            ) : (
                                <></>
                            )}
                        </div>
                    </Col>
                </Row>
            ) : (
                <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Result
                        status="403"
                        title="403"
                        subTitle="Уучлаарай, энэ хуудсанд нэвтрэх эрхгүй байна."
                        extra={<Button type="primary" href="/">Нүүр хуудас руу шилжих</Button>}
                    />
                </div>
            )            
        ) : (
            <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Result
                    status="403"
                    title="403"
                    subTitle="Уучлаарай, та нэвтэрсэн байх шаардлагатай."
                    extra={<Button type="primary" href="/login">Нэвтрэх</Button>}
                />
            </div>
        )   
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Moderator)