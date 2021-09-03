import { PlusOutlined } from "@ant-design/icons"
import { Typography, Row, Col, Input, Select, message, Button, List, Space, Popconfirm, Pagination } from "antd"
import axios from "axios"
import { useState } from "react"
import api from "../../../api"
import FilmCrewModalCreate from "./FilmCrewModalCreate"
import FilmCrewModalUpdate from "./FilmCrewModalUpdate"

const { Search } = Input
const { Option } = Select

function FilmCrew (props) {

    const [films, setFilms] = useState()
    const [selection, setSelection] = useState()
    const [crew, setCrew] = useState()
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
        getCrew(film.id, 1)     
        setSelection(film)        
    }

    function getCrew(id, page) {        
        const url = `${api.crew}?film=${id}&page=${page}`
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

    function getRoles (roles) {
        let result = []
        roles.forEach(role => {
            result.push(role.name)
        })
        return result.toString()
    }

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
        getCrew(selection.id, pageNum)
    }

    function showTotal() {
        return <Typography.Text style={{ fontWeight: 'bold' }}>Нийт {total}:</Typography.Text>;
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
                <Typography.Title level={5} style={{ margin: '16px 0' }}>Уран бүтээлчид</Typography.Title>
                <Button icon={<PlusOutlined />} type="dashed" onClick={() => setModalCreate(true)}>Шинээр нэмэх</Button>
                { modalCreate && selection ? 
                    <FilmCrewModalCreate 
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
                <Col xs={24} sm={24} md={24} lg={12}>Роль</Col>
                <Col xs={24} sm={24} md={24} lg={6}></Col>
                { member ? 
                    <FilmCrewModalUpdate
                        title={`Роль засах - ${member.artist.name}`}
                        id={member.id}
                        artist={member.artist.id}
                        film={member.film.id}
                        role={member.role}
                        token={props.token} 
                        hide={onModalUpdateHide} 
                    /> 
                    : 
                    <></> 
                }             
                <List 
                    itemLayout="horizontal"
                    dataSource={crew}
                    style={{ width: '100%' }}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Col xs={24} sm={24} md={24} lg={6}>
                                {item.artist.name}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12}>
                                {getRoles(item.role)}
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

export default FilmCrew