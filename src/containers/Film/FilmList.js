import { Breadcrumb, Col, Form, Input, InputNumber, List, message, Pagination, Row, Select, Spin, Typography } from "antd"
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
    const [form] = Form.useForm()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [films, setFilms] = useState()    
    const [genres, setGenres] = useState()  
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()        

    useEffect(() => {                
        if (props.token && !user) {
            getUser()
        }
        if (!genres) {
            getGenres()
        }        
        let params = new URLSearchParams(props.location.search)
        let param_search = params.get('search')
        let param_genre = params.get('genre')
        let param_yearfrom = params.get('yearfrom')
        let param_yearto = params.get('yearto')
        // let param_scorefrom = params.get('scorefrom')
        // let param_scoreto = params.get('scoreto')
        let param_page = params.get('page')
        let param_order = params.get('order')        
        form.setFieldsValue({
            search: param_search && param_search !== null ? param_search : "",
            genre: param_genre && param_genre !== null ? parseInt(param_genre) : 0,
            yearfrom: param_yearfrom && param_yearfrom !== null ? parseInt(param_yearfrom) : 1900,
            yearto: param_yearto && param_yearto !== null ? parseInt(param_yearto) : moment().year(),
            // scorefrom: param_scorefrom && param_scorefrom !== null ? parseInt(param_scorefrom) : 10,
            // scoreto: param_scoreto && param_scoreto !== null ? parseInt(param_scoreto) : 100,
            order: param_order && param_order !== null ? param_order : "-created_at",
        })        
        if (param_page && param_page !== null) {
            setPage(param_page)
        } else {
            setPage(1)
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
            message.error("?????????? ????????????. ?????????????? refresh ?????????? ????.")
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

    function onSearch (val) {        
        const params = new URLSearchParams(props.location.search)        
        params.delete("search")
        if (val && val !== null && val.length > 0) {
            params.append("search", val)
        }        
        history.push(`/films?${params.toString()}`)        
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

    // function onSelectScoreFrom (score) {        
    //     if (score && score !== null && score.toString().length > 1) {
    //         const params = new URLSearchParams(props.location.search)        
    //         params.delete("scorefrom")
    //         params.append("scorefrom", score)
    //         history.push(`/films?${params.toString()}`)  
    //     }              
    // }

    // function onSelectScoreTo (score) {        
    //     if (score && score !== null && score.toString().length > 1) {
    //         const params = new URLSearchParams(props.location.search)        
    //         params.delete("scoreto")
    //         params.append("scoreto", score)
    //         history.push(`/films?${params.toString()}`)  
    //     }              
    // }

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
        params.delete("page")
        params.append("page", 1)
        history.push(`/films?${params.toString()}`)        
    }

    function showTotal() {
        return <Typography.Text style={{ fontWeight: 'bold' }}>???????? {total}:</Typography.Text>;
    }  

    return (
        <div style={{ width: '100%', margin: 0, padding: 0 }}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">????????</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    ????????
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container film-filter">
                <Form form={form} layout="vertical">
                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={24} md={12}>                                                                                                         
                            <Form.Item name="search" label={<Typography.Title level={5} style={{ margin: 0 }}>???????? ????????</Typography.Title>}>
                                <Input.Search                                            
                                    placeholder="???????????? ??????"                                     
                                    onSearch={onSearch} 
                                    enterButton                                    
                                />   
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <Form.Item name="genre" label={<Typography.Title level={5} style={{ margin: 0 }}>??????????</Typography.Title>}>
                                <Select defaultValue={0} onSelect={onSelectGenre} style={{ width: '100%'}}>
                                    <Select.Option key={0} value={0}>????????</Select.Option>            
                                    { genres ? genres.map(g => (
                                        <Select.Option key={g.id} value={g.id}>{g.name}</Select.Option>
                                    )) : []}                            
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* <Col xs={24} sm={24} md={4}>
                            <Typography.Title level={5} style={{ marginBottom: '8px' }}>????????????????:</Typography.Title>
                            <Space size={[8, 8]}>
                                <Button size="middle" type={ isList === false ? "ghost" : "text" } icon={<TableOutlined />} onClick={onSelectGrid} />
                                <Button size="middle" type={ isList === true ? "ghost" : "text" } icon={<BarsOutlined />} onClick={onSelectList} />
                            </Space>
                        </Col> */}
                        <Col xs={24} sm={24} md={6}>
                            <Form.Item name="yearfrom" label={<Typography.Title level={5} style={{ margin: 0 }}>???? (????????)</Typography.Title>}>
                                <InputNumber defaultValue={1900} style={{ width: '100%' }} onChange={onSelectYearFrom} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6}>
                            <Form.Item name="yearto" label={<Typography.Title level={5} style={{ margin: 0 }}>???? (????????)</Typography.Title>}>
                                <InputNumber defaultValue={moment().year()} style={{ width: '100%' }} onChange={onSelectYearTo} />
                            </Form.Item>
                        </Col>
                        {/* <Col xs={24} sm={24} md={4}>
                            <Form.Item name="scorefrom" label={<Typography.Title level={5} style={{ margin: 0 }}>?????????????? (????????)</Typography.Title>}>
                                <InputNumber defaultValue={1} min={1} max={10} style={{ width: '100%' }} onChange={onSelectScoreFrom} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={4}>
                            <Form.Item name="scoreto" label={<Typography.Title level={5} style={{ margin: 0 }}>?????????????? (????????)</Typography.Title>}>
                                <InputNumber defaultValue={10} min={1} max={10} style={{ width: '100%' }} onChange={onSelectScoreTo} />
                            </Form.Item>
                        </Col> */}
                        <Col xs={24} sm={24} md={12}>
                            <Form.Item name="order" label={<Typography.Title level={5} style={{ margin: 0 }}>??????????????????</Typography.Title>}>
                                <Select defaultValue="-created_at" onSelect={onSelectOrder} style={{ width: '100%'}}>
                                    <Select.Option value="-created_at">???????????? ??????????????????</Select.Option>                            
                                    <Select.Option value="-releasedate">???????????????? ??????????</Select.Option>
                                    <Select.Option value="-avg_score">??????????????</Select.Option>   
                                    <Select.Option value="-view_count">??????????????</Select.Option>   
                                    <Select.Option value="-like_count">????????????????????</Select.Option>               
                                    <Select.Option value="-watchlist_count">??????????????????</Select.Option>                            
                                </Select>
                            </Form.Item>
                        </Col>                                                
                    </Row>
                </Form>
            </div>
            { loading ? (
                <div className="loading">
                    <Spin tip="???????????????? ??????????..." />
                </div>
            ) : (
                <div className="filmlist">
                    <List
                        grid={{
                            gutter: [16, 0],
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
                                <FilmCard 
                                    film={film} 
                                    user={user} 
                                    token={props.token} 
                                    history={history} 
                                />
                            </List.Item>
                        )}
                    />                       
                    <Pagination                         
                        defaultCurrent={page}
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