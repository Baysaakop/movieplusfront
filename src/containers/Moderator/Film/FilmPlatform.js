import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { Typography, Row, Col, Input, Select, message, Button, List, Popconfirm } from "antd"
import axios from "axios"
import { useState } from "react"
import api from "../../../api"
import FilmPlatformModalAdd from "./FilmPlatformModalAdd"

const { Search } = Input
const { Option } = Select

function FilmPlatform (props) {

    const [films, setFilms] = useState()
    const [selection, setSelection] = useState()
    const [platforms, setPlatforms] = useState()
    const [modalCreate, setModalCreate] = useState(false)

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
        getPlatforms(film.id)     
        setSelection(film)        
    }

    function getPlatforms(id) {        
        const url = api.films + "/" + id + "/"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                                    
            setPlatforms(res.data.platforms)                          
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function onModalCreateHide () {
        getPlatforms(selection.id)
        setModalCreate(false)
    }

    function onDelete (item) {
        const url = `${api.films}/${selection.id}/`
        var formData = new FormData();
        formData.append('platform', item.platform.id)
        formData.append('delete', true)
        formData.append('token', props.token)            
        axios({
            method: 'PUT',
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {                        
            if (res.status === 200) {                      
                message.info(`Устгагдлаа.`)
                getPlatforms(selection.id)                                                                          
            }      
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Typography.Title level={3}>Кино үзэх сувгууд</Typography.Title>
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
                <Typography.Title level={5} style={{ margin: '16px 0' }}>Сувгууд</Typography.Title>
                <Button icon={<PlusOutlined />} type="dashed" onClick={() => setModalCreate(true)}></Button>                
            </div>                        
            { modalCreate && selection ? 
                <FilmPlatformModalAdd                         
                    film={selection.id}
                    token={props.token} 
                    hide={onModalCreateHide} 
                /> 
                : 
                <></> 
            }                
            <Row gutter={[16, 16]}>                                                                           
                <Col xs={24} sm={24} md={24} lg={4}>Суваг</Col>
                <Col xs={24} sm={24} md={24} lg={16}>Холбоос</Col>                
                <Col xs={24} sm={24} md={24} lg={4}></Col>                
                <List 
                    itemLayout="horizontal"
                    dataSource={platforms}
                    style={{ width: '100%' }}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Col xs={24} sm={24} md={24} lg={4}>
                                <Typography.Text>{item.platform.name}</Typography.Text>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={16}>
                                <Typography.Text>{item.url}</Typography.Text>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={4} style={{ textAlign: 'end' }}> 
                                <Popconfirm title="Устгахдаа итгэлтэй байна уу？" okText="Тийм" cancelText="Үгүй" onConfirm={() => onDelete(item)}>
                                    <Button danger type="dashed" icon={<DeleteOutlined />} />
                                </Popconfirm>
                            </Col>
                        </List.Item>
                    )}
                />
            </Row>
        </div>
    )
}

export default FilmPlatform