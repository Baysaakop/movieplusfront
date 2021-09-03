import { Col, Row, Typography, Input, Select, message, List, Space, Button, Pagination } from "antd"
import axios from "axios"
import { useState } from "react"
import api from "../../../api"
import moment from "moment"
import { PlusOutlined } from "@ant-design/icons"
import ArtistFilmCastModalCreate from "./ArtistFilmCastModalCreate"
import ArtistFilmCastModalUpdate from "./ArtistFilmCastModalUpdate"

const { Search } = Input
const { Option } = Select

function ArtistFilmCast (props) {        
    const [artists, setArtists] = useState()
    const [selection, setSelection] = useState()
    const [cast, setCast] = useState()
    const [total, setTotal] = useState()
    const [page, setPage] = useState()
    const [modalCreate, setModalCreate] = useState(false)    
    const [member, setMember] = useState()

    function onSearch(val) {                
        let url = `${api.artists}?name=${val}`
        axios({
            method: 'GET',
            url: url,
        }).then(res => {                        
            setArtists(res.data.results)                                    
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")                        
        })        
    }

    function onSelect(e) {
        let artist = artists.find(x => x.id === parseInt(e))
        getCast(artist.id, 1)     
        setSelection(artist)        
    }
    
    function getCast(id, page) {        
        const url = `${api.cast}?artist=${id}&page=${page}`
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
            setTotal(res.data.count)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function orderByYear (cast) {
        if (cast) {
            return cast.sort((a, b) => moment(a.film.releasedate).year() - moment(b.film.releasedate).year())
        } 
        return undefined       
    }

    function onModalCreateHide () {
        getCast(selection.id, 1)
        setModalCreate(false)
    }

    function onModalUpdateShow (item) {
        setMember(item)        
    }

    function onModalUpdateHide () {
        setMember(undefined)
        getCast(selection.id, 1)
        // setModalUpdate(false)
    }

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
        getCast(selection.id, pageNum)
    }

    function showTotal() {
        return <Typography.Text style={{ fontWeight: 'bold' }}>Нийт {total}:</Typography.Text>;
    }  

    return (
        <div>
            <Typography.Title level={3}>Артист засах</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Typography.Title level={5}>Артист хайх</Typography.Title>
                    <Search placeholder="Артист хайх" onSearch={onSearch} enterButton />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Typography.Title level={5}>Артист сонгох</Typography.Title>
                    <Select
                        showSearch                                
                        placeholder="Артист сонгоно уу"                                                
                        optionFilterProp="children"       
                        onSelect={onSelect} 
                        style={{ width: '100%' }}                        
                    >
                        { artists ? (
                            <>
                                {artists.map(item => {
                                    return (
                                        <Option key={item.id}>{item.name}</Option>
                                    )
                                })}
                            </>
                        ) : (
                            <></>
                        )}
                    </Select>            
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={5} style={{ margin: '16px 0' }}>Ажлууд</Typography.Title>
                <Button icon={<PlusOutlined />} type="dashed" onClick={() => setModalCreate(true)}>Шинээр нэмэх</Button>
                { modalCreate && selection ? 
                    <ArtistFilmCastModalCreate 
                        title="Кино нэмэх"
                        artist={selection.id}
                        token={props.token} 
                        hide={onModalCreateHide} 
                    /> 
                    : 
                    <></> 
                }                
            </div>            
            <Row gutter={[16, 16]}>                                                           
                <Col xs={24} sm={24} md={24} lg={2}>Он</Col>
                <Col xs={24} sm={24} md={24} lg={8}>Кино</Col>
                <Col xs={24} sm={24} md={24} lg={4}>Дүр</Col>
                <Col xs={24} sm={24} md={24} lg={4}>Гол дүр</Col>
                <Col xs={24} sm={24} md={24} lg={6}></Col>
                { member ? 
                    <ArtistFilmCastModalUpdate
                        title={`Дүр засах - ${member.film.title}`}
                        id={member.id}
                        artist={member.artist.id}
                        film={member.film.id}
                        is_lead={member.is_lead === true}
                        role_name={member.role_name}
                        token={props.token} 
                        hide={onModalUpdateHide} 
                    /> 
                    : 
                    <></> 
                }             
                <List 
                    itemLayout="horizontal"
                    dataSource={orderByYear(cast)}
                    style={{ width: '100%' }}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Col xs={24} sm={24} md={24} lg={2}>
                                {moment(item.film.releasedate).year()}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8}>
                                {item.film.title}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={4}>
                                {item.role_name}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={4}>
                                {item.is_lead ? 'Гол' : 'Туслах'}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={6}>
                                <Space size={[8, 8]} wrap>
                                    <Button size="small" type="text" onClick={() => onModalUpdateShow(item)}>Засах</Button>                                   
                                    <Button size="small" danger type="text">Устгах</Button>
                                </Space>
                            </Col>
                        </List.Item>
                    )}
                />
                <Pagination 
                    current={page} 
                    total={total}
                    pageSize={24}
                    size="small"
                    showSizeChanger={false}
                    showTotal={showTotal}
                    onChange={onPageChange}                 
                />
            </Row>
        </div>
    )
}

export default ArtistFilmCast