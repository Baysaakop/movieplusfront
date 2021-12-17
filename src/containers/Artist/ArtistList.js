import { Breadcrumb, Form, Row, Col, Input, Select, Typography, message, Spin, List, Pagination } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"
import ArtistCard from "./ArtistCard"
import { useHistory } from "react-router-dom"
import './ArtistList.css'

function ArtistList (props) {
    const history = useHistory()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [occupations, setOccupations] = useState()
    const [artists, setArtists] = useState()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {       
        if (!occupations) {
            getOccupations()
        } 
        let params = new URLSearchParams(props.location.search)
        let param_name = params.get('name')
        let param_occupation = params.get('occupation')
        let param_page = params.get('page')
        let param_order = params.get('order')    
        form.setFieldsValue({
            name: param_name && param_name !== null ? param_name : "",
            occupation: param_occupation && param_occupation !== null ? parseInt(param_occupation) : 0,
            order: param_order && param_order !== null ? param_order : "-created_at",
        })        
        if (param_page && param_page !== null) {
            setPage(param_page)
        } else {
            setPage(1)
        }       
        getArtists(props.location.search)        
    }, [props.location.search]) // eslint-disable-line react-hooks/exhaustive-deps        

    function getOccupations() {
        axios({
            method: 'GET',                        
            url: api.occupations
        })
        .then(res => {                        
            setOccupations(res.data.results);            
        })        
        .catch(err => {
            console.log(err.message);
        })        
    }

    function getArtists(url) {        
        setLoading(true)        
        axios({
            method: 'GET',
            url: api.artists + url,
        }).then(res => {            
            setArtists(res.data.results)
            setTotal(res.data.count)
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")
            setLoading(false)
        })        
    }

    function onSearch (val) {        
        const params = new URLSearchParams(props.location.search)        
        params.delete("name")
        if (val && val !== null && val.length > 0) {
            params.append("name", val)
        }        
        history.push(`/artists?${params.toString()}`)        
    }

    function onSelectOccupation (id) {
        const params = new URLSearchParams(props.location.search)        
        params.delete("occupation")
        if (parseInt(id) > 0) {
            params.append("occupation", id)
        }
        history.push(`/artists?${params.toString()}`)        
    }

    function onSelectOrder (value) {
        const params = new URLSearchParams(props.location.search)        
        params.delete("order")
        params.append("order", value)
        params.delete("page")
        params.append("page", 1)
        history.push(`/artists?${params.toString()}`)        
    }


    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
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
                    Хүмүүс
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container artist-filter" style={{ marginTop: '24px' }}>
                <Form form={form} layout="vertical">
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={24} md={12}>                                                                                                         
                            <Form.Item name="name" label={<Typography.Title level={5} style={{ margin: 0 }}>Уран бүтээлч хайх</Typography.Title>}>
                                <Input.Search                                            
                                    placeholder="Уран бүтээлчийн нэр"                                     
                                    onSearch={onSearch} 
                                    enterButton                                    
                                />   
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6}>
                            <Form.Item name="occupation" label={<Typography.Title level={5} style={{ margin: 0 }}>Мэргэжил</Typography.Title>}>
                                <Select defaultValue={0} onSelect={onSelectOccupation} style={{ width: '100%'}}>
                                    <Select.Option key={0} value={0}>Бүгд</Select.Option>            
                                    { occupations ? occupations.map(o => (
                                        <Select.Option key={o.id} value={o.id}>{o.name}</Select.Option>
                                    )) : []}                            
                                </Select>
                            </Form.Item>                            
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6}>
                            <Form.Item name="order" label={<Typography.Title level={5} style={{ margin: 0 }}>Эрэмбэлэх</Typography.Title>}>
                                <Select defaultValue="1" onSelect={onSelectOrder} style={{ width: '100%'}}>
                                    <Select.Option value="-created_at">Шинээр нэмэгдсэн</Select.Option>                            
                                    <Select.Option value="-birthdate">Төрсөн огноо</Select.Option>
                                    <Select.Option value="firstname">Үсгийн дарааллаар</Select.Option>                                   
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            { loading ? (
                <div className="loading">
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : (
                <div className="artistlist">
                    <List
                        grid={{
                            gutter: [16, 0],
                            xs: 4,
                            sm: 4,
                            md: 5,
                            lg: 8,
                            xl: 8,
                            xxl: 8,
                        }}
                        dataSource={artists}
                        renderItem={artist => (
                            <List.Item>
                                <ArtistCard artist={artist} />
                            </List.Item>
                        )}
                    />
                    <Pagination 
                        current={page} 
                        total={total}
                        pageSize={40}
                        showSizeChanger={false}
                        showTotal={showTotal}
                        onChange={onPageChange}                 
                    />
                </div>            
            )}            
        </div>
    )
}

export default ArtistList