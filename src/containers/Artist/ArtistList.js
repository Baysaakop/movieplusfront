import { Breadcrumb, Row, Col, Select, Typography, InputNumber, message, Spin, List, Pagination } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"
import ArtistCard from "./ArtistCard"
import './ArtistList.css'

function ArtistList (props) {

    const [loading, setLoading] = useState(false)
    const [artists, setArtists] = useState()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {        
        getArtists()        
    }, [page]) // eslint-disable-line react-hooks/exhaustive-deps        

    function getArtists() {        
        setLoading(true)
        let url = `${api.artists}?page=${page}`
        axios({
            method: 'GET',
            url: url,
        }).then(res => {
            console.log(res.data.results)
            setArtists(res.data.results)
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
                    Хүмүүс
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container artist-filter" style={{ marginTop: '24px' }}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Мэргэжил:</Typography.Title>
                        <Select defaultValue="1" size="large" style={{ width: '100%'}}>
                            <Select.Option value="1">Бүгд</Select.Option>
                            <Select.Option value="2">Продюсер</Select.Option>
                            <Select.Option value="3">Найруулагч</Select.Option>
                            <Select.Option value="4">Кино зохиолч</Select.Option>
                            <Select.Option value="5">Жүжигчин</Select.Option>
                        </Select>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Он (-оос):</Typography.Title>
                        <InputNumber defaultValue={1900} size="large" style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Он (-хүртэл):</Typography.Title>
                        <InputNumber defaultValue={2021} size="large" style={{ width: '100%' }} />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Typography.Title level={5} style={{ marginBottom: '8px' }}>Эрэмбэлэх:</Typography.Title>
                        <Select defaultValue="1" size="large" style={{ width: '100%'}}>
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
                <div className="artistlist">
                    <List
                        grid={{
                            gutter: [24, 8],
                            xs: 3,
                            sm: 4,
                            md: 6,
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

export default ArtistList