import { PlusOutlined } from "@ant-design/icons"
import { Typography, Row, Col, Input, Select, message, Button, List, Space, Popconfirm, Pagination } from "antd"
import axios from "axios"
import { useState } from "react"
import api from "../../../api"
import FilmCastModalCreate from "./FilmCastModalCreate"
import FilmCastModalUpdate from "./FilmCastModalUpdate"

const { Search } = Input
const { Option } = Select

function FilmCast (props) {

    const [films, setFilms] = useState()
    const [selection, setSelection] = useState()
    const [cast, setCast] = useState()
    const [total, setTotal] = useState()
    const [page, setPage] = useState()
    const [modalCreate, setModalCreate] = useState(false)
    const [member, setMember] = useState(false)

    function onSearch(val) {                
        let url = `${api.films}?title=${val}`
        axios({
            method: 'GET',
            url: url,
        }).then(res => {                        
            setFilms(res.data.results)                                    
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")                        
        })        
    }

    function onSelect(e) {
        let film = films.find(x => x.id === parseInt(e))        
        getCast(film.id, 1)     
        setSelection(film)        
    }

    function getCast(id, page) {        
        const url = `${api.cast}?film=${id}&page=${page}`
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

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
        getCast(selection.id, pageNum)
    }

    function showTotal() {
        return <Typography.Text style={{ fontWeight: 'bold' }}>Нийт {total}:</Typography.Text>;
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
    }

    function onDelete (id) {
        const url = `${api.cast}/${id}/`
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
                getCast(selection.id, 1)                                                                                                                                      
            }      
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Typography.Title level={3}>Кино засах</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Search placeholder="Кино хайх" onSearch={onSearch} enterButton />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                    <Select
                        showSearch                                
                        placeholder="Кино сонгоно уу"                                                
                        optionFilterProp="children"       
                        onSelect={onSelect} 
                        style={{ width: '100%' }}                        
                    >
                        { films ? (
                            <>
                                {films.map(item => {
                                    return (
                                        <Option key={item.id}>{item.title}</Option>
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
                <Typography.Title level={5} style={{ margin: '16px 0' }}>Жүжигчид</Typography.Title>
                <Button icon={<PlusOutlined />} type="dashed" onClick={() => setModalCreate(true)}>Шинээр нэмэх</Button>
                { modalCreate && selection ? 
                    <FilmCastModalCreate 
                        title="Артист нэмэх"
                        film={selection.id}
                        token={props.token} 
                        hide={onModalCreateHide} 
                    /> 
                    : 
                    <></> 
                }                
            </div>            
            <Row gutter={[16, 16]}>                                                                           
                <Col xs={24} sm={24} md={24} lg={6}>Артист</Col>
                <Col xs={24} sm={24} md={24} lg={6}>Дүр</Col>
                <Col xs={24} sm={24} md={24} lg={6}>Гол дүр</Col>
                <Col xs={24} sm={24} md={24} lg={6}></Col>
                { member ? 
                    <FilmCastModalUpdate
                        title={`Дүр засах - ${member.artist.name}`}
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
                    dataSource={cast}
                    style={{ width: '100%' }}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Col xs={24} sm={24} md={24} lg={6}>
                                {item.artist.name}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={6}>
                                {item.role_name}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={6}>
                                {item.is_lead ? 'Гол' : 'Туслах'}
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

export default FilmCast