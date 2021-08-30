import { Breadcrumb, Col, InputNumber, List, message, Pagination, Row, Select, Spin, Typography } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import './FilmList.css'
import FilmCard from "./FilmCard"

function FilmList (props) {    
    const [loading, setLoading] = useState(false)
    const [films, setFilms] = useState()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {        
        getFilms()        
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps        

    function getFilms() {        
        setLoading(true)
        let url = `${api.films}?page=${page}`
        axios({
            method: 'GET',
            url: url,
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
                    Кино
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container film-filter">
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Төрөл:</Typography.Title>
                        <Select defaultValue="0" style={{ width: '100%'}}>
                            <Select.Option value="0">Бүгд</Select.Option>
                            <Select.Option value="1">Action</Select.Option>
                            <Select.Option value="2">Adventure</Select.Option>
                            <Select.Option value="3">Comedy</Select.Option>
                            <Select.Option value="4">Crime</Select.Option>
                            <Select.Option value="5">Drama</Select.Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Он (-оос):</Typography.Title>
                        <InputNumber defaultValue={1900} style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Он (-хүртэл):</Typography.Title>
                        <InputNumber defaultValue={2021} style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Эрэмбэлэх:</Typography.Title>
                        <Select defaultValue="1" style={{ width: '100%'}}>
                            <Select.Option value="1">Шинээр нэмэгдсэн</Select.Option>                            
                            <Select.Option value="2">Нээлтийн огноо</Select.Option>
                            <Select.Option value="3">Үнэлгээ</Select.Option>   
                            <Select.Option value="4">Хандалт</Select.Option>   
                            <Select.Option value="5">Таалагдсан</Select.Option>               
                            <Select.Option value="6">Хадгалсан</Select.Option>                            
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
                            <List.Item>
                            <FilmCard film={film} />
                            </List.Item>
                        )}
                    />
                    <Pagination 
                        current={page} 
                        total={total}
                        pageSize={20}
                        showSizeChanger={false}
                        showTotal={showTotal}
                        onChange={onPageChange}                 
                    />
                </div>            
            )}            
        </div>
    )
}

export default FilmList