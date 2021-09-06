import { Breadcrumb, Col, InputNumber, List, message, Pagination, Row, Select, Spin, Typography } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import './FilmList.css'
import FilmCard from "./FilmCard"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import moment from 'moment'

function FilmList (props) {    
    const history = useHistory()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [films, setFilms] = useState()    
    const [genres, setGenres] = useState()

    const [genre, setGenre] = useState("0")
    const [yearFrom, setYearFrom] = useState(1900)
    const [yearTo, setYearTo] = useState(moment().year())    
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()
    const [order, setOrder] = useState("-created_at")

    useEffect(() => {                
        if (props.token && !user) {
            getUser()
        }
        if (!genres) {
            getGenres()
        }        
        let params = new URLSearchParams(props.location.search)
        let param_genre = params.get('genre')
        let param_yearfrom = params.get('yearfrom')
        let param_yearto = params.get('yearto')
        let param_page = params.get('page')
        let param_order = params.get('order')
        if (param_genre && param_genre !== null) {
            setGenre(param_genre)
        } else {
            setGenre(undefined)
        }
        if (param_yearfrom && param_yearfrom !== null) {
            setYearFrom(param_yearfrom)
        } else {
            setYearFrom(1900)
        }
        if (param_yearto && param_yearto !== null) {
            setYearTo(param_yearto)
        } else {
            setYearTo(moment().year())
        }
        if (param_page && param_page !== null) {
            setPage(param_page)
        } else {
            setPage(1)
        }
        if (param_order && param_order !== null) {
            setOrder(param_order)
        } else {
            setOrder('-created_at')
        }
        getFilms(props.location.search)                
    }, [props.token, props.location.search]) // eslint-disable-line react-hooks/exhaustive-deps        

    function getGenres() {
        axios({
            method: 'GET',                        
            url: api.genres
        })
        .then(res => {                        
            setGenres(res.data.results);            
        })        
        .catch(err => {
            console.log(err.message);
        })        
    }

    function getFilms(url) {        
        setLoading(true)        
        axios({
            method: 'GET',
            url: api.films + url,
        }).then(res => {                        
            setFilms(res.data.results)
            setTotal(res.data.count)
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")
            setLoading(false)
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

    function onSelectGenre (id) {
        const params = new URLSearchParams(props.location.search)        
        params.delete("genre")
        if (parseInt(id) > 0) {
            params.append("genre", id)
        }
        history.push(`/films?${params.toString()}`)        
    }

    function onSelectYearFrom (year) {        
        if (year && year !== null && year.toString().length === 4) {
            const params = new URLSearchParams(props.location.search)        
            params.delete("yearfrom")
            params.append("yearfrom", year)
            history.push(`/films?${params.toString()}`)  
        }              
    }

    function onSelectYearTo (year) {
        if (year && year !== null && year.toString().length === 4) {
            const params = new URLSearchParams(props.location.search)        
            params.delete("yearto")
            params.append("yearto", year)
            history.push(`/films?${params.toString()}`)        
        }
    }

    function onPageChange (pageNum, pageSize) {        
        const params = new URLSearchParams(props.location.search)        
        params.delete("page")        
        if (pageNum > 1) {
            params.append("page", pageNum)
        }
        history.push(`/films?${params.toString()}`)      
    }

    function onSelectOrder (value) {
        const params = new URLSearchParams(props.location.search)        
        params.delete("order")
        params.append("order", value)
        history.push(`/films?${params.toString()}`)        
    }

    function showTotal() {
        return <Typography.Text style={{ fontWeight: 'bold' }}>Нийт {total}:</Typography.Text>;
    }  

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Кино
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container film-filter">
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Төрөл:</Typography.Title>                                                                        
                        <Select defaultValue={genre} onSelect={onSelectGenre} style={{ width: '100%'}}>
                            <Select.Option key="0" value="0">Бүгд</Select.Option>            
                            { genres ? genres.map(g => (
                                <Select.Option key={g.id} value={g.id}>{g.name}</Select.Option>
                            )) : []}                            
                        </Select>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Он (-оос):</Typography.Title>
                        <InputNumber defaultValue={yearFrom} style={{ width: '100%' }} onChange={onSelectYearFrom} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Он (-хүртэл):</Typography.Title>
                        <InputNumber defaultValue={yearTo} style={{ width: '100%' }} onBlur={onSelectYearTo} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Эрэмбэлэх:</Typography.Title>
                        <Select defaultValue={order} onSelect={onSelectOrder} style={{ width: '100%'}}>
                            <Select.Option value="-created_at">Шинээр нэмэгдсэн</Select.Option>                            
                            <Select.Option value="-releasedate">Нээлтийн огноо</Select.Option>
                            <Select.Option value="-avg_score">Үнэлгээ</Select.Option>   
                            <Select.Option value="-view_count">Хандалт</Select.Option>   
                            <Select.Option value="-like_count">Таалагдсан</Select.Option>               
                            <Select.Option value="-watchlist_count">Хадгалсан</Select.Option>                            
                        </Select>
                    </Col>
                </Row>
            </div>
            { loading ? (
                <div className="loading">
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : (
                <div className="filmlist">
                    <List
                        grid={{
                            gutter: [24, 8],
                            xs: 2,
                            sm: 3,
                            md: 4,
                            lg: 6,
                            xl: 6,
                            xxl: 6,
                        }}
                        dataSource={films}
                        renderItem={film => (
                            <List.Item key={film.id}>
                                <FilmCard film={film} user={user} token={props.token} history={history} />
                            </List.Item>
                        )}
                    />
                    <Pagination 
                        current={page} 
                        total={total}
                        pageSize={24}
                        showSizeChanger={false}
                        showTotal={showTotal}
                        onChange={onPageChange}                 
                    />
                </div>            
            )}            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(FilmList)