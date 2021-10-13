import { Col, Row, Typography, Input, Select, message, List, Space, Button, Pagination, Popconfirm } from "antd"
import axios from "axios"
import { useState } from "react"
import api from "../../../api"
import moment from "moment"
import { PlusOutlined } from "@ant-design/icons"
import ArtistFilmCrewModalCreate from "./ArtistFilmCrewModalCreate"
import ArtistFilmCrewModalUpdate from "./ArtistFilmCrewModalUpdate"

const { Search } = Input
const { Option } = Select

function ArtistSeriesCrew (props) {        
    const [artists, setArtists] = useState()
    const [selection, setSelection] = useState()
    const [crew, setCrew] = useState()
    const [total, setTotal] = useState()
    const [page, setPage] = useState()
    const [modalCreate, setModalCreate] = useState(false)
    const [member, setMember] = useState(false)

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
        getCrew(artist.id, 1)     
        setSelection(artist)        
    }
    
    function getCrew(id, page) {        
        const url = `${api.crew}?artist=${id}&type=series&page=${page}`
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
            setTotal(res.data.count)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function orderByYear (crew) {
        if (crew) {
            return crew.sort((a, b) => moment(a.series.releasedate).year() - moment(b.series.releasedate).year())
        } 
        return undefined       
    }

    function getRoles (roles) {
        let result = []
        roles.forEach(role => {
            result.push(role.name)
        })
        return result.toString()
    }

    function onModalCreateHide () {
        getCrew(selection.id, 1)
        setModalCreate(false)
    }

    function onModalUpdateShow (item) {
        setMember(item)     
    }

    function onModalUpdateHide () {
        setMember(undefined)
        getCrew(selection.id, 1)        
    }

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
        getCrew(selection.id, pageNum)
    }

    function showTotal() {
        return <Typography.Text style={{ fontWeight: 'bold' }}>Нийт {total}:</Typography.Text>;
    }  

    function onDelete (id) {
        const url = `${api.crew}/${id}/`
        axios({
            method: 'DELETE',
            url: url,            
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {                        
            if (res.status === 204) {                      
                message.info(`Амжилттай`)
                getCrew(selection.id, 1)                                                                                                                                      
            }      
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
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
                    <ArtistFilmCrewModalCreate 
                        type="series"
                        title="Цуврал нэмэх"
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
                <Col xs={24} sm={24} md={24} lg={8}>Роль</Col>
                <Col xs={24} sm={24} md={24} lg={6}></Col>
                { member ? 
                    <ArtistFilmCrewModalUpdate
                        type="series"
                        title={`Роль засах - ${member.series.title}`}
                        id={member.id}
                        artist={member.artist.id}
                        film={member.series.id}
                        roles={member.roles}
                        token={props.token} 
                        hide={onModalUpdateHide} 
                    /> 
                    : 
                    <></> 
                }             
                <List 
                    itemLayout="horizontal"
                    dataSource={orderByYear(crew)}
                    style={{ width: '100%' }}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Col xs={24} sm={24} md={24} lg={2}>
                                {moment(item.series.releasedate).year()}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8}>
                                {item.series.title}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8}>
                                {getRoles(item.roles)}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={6}>
                                <Space size={[8, 8]} wrap>
                                    <Button size="small" type="text" onClick={() => onModalUpdateShow(item)}>Засах</Button>                                    
                                    <Popconfirm title="Устгахдаа итгэлтэй байна уу？" okText="Тийм" cancelText="Үгүй" onConfirm={() => onDelete(item.id)}>
                                        <Button size="small" danger type="text">Устгах</Button>
                                    </Popconfirm>
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

export default ArtistSeriesCrew