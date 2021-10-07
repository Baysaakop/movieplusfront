import { Form, Row, Col, Input, InputNumber, Radio, Select, Typography, DatePicker, Popconfirm, message, Button, Spin } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../../api"
import ImageUpload from '../../../components/ImageUpload'
import { Editor } from '@tinymce/tinymce-react';
import moment from "moment"
import { PlusOutlined } from "@ant-design/icons"

const { TextArea } = Input
const { Option } = Select

function FilmCreate (props) {
    const [form] = Form.useForm()   
    const [description, setDescription] = useState();
    const [loading, setLoading] = useState()
    const [poster, setPoster] = useState()
    const [landscape, setLandscape] = useState()
    const [ratings, setRatings] = useState()
    const [genres, setGenres] = useState()

    useEffect(() => {
        axios({
            method: 'GET',                        
            url: api.ratings
        })
        .then(res => {                        
            setRatings(res.data.results);            
        })        
        .catch(err => {
            console.log(err.message);
        }) 
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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    function onFinish (values) {      
        setLoading(true)       
        var formData = new FormData();
        formData.append('title', values.title)
        if (description) {
            formData.append('description', description)
        }
        if (values.plot) {
            formData.append('plot', values.plot)
        }
        if (values.trailer) {
            formData.append('trailer', values.trailer)
        }
        if (values.duration) {
            formData.append('duration', values.duration)
        }
        if (values.releasedate) {
            formData.append('releasedate', moment(values.releasedate).format("YYYY-MM-DD"))
        }         
        if (values.is_released !== undefined) {
            formData.append('is_released', values.is_released)
        }
        if (values.in_theater !== undefined) {
            formData.append('in_theater', values.in_theater)
        }  
        if (values.rating) {
            formData.append('rating', values.rating)
        }  
        if (values.genres) {
            formData.append('genres', values.genres)
        } 
        if (poster) {
            formData.append('poster', poster)
        } 
        if (landscape) {
            formData.append('landscape', landscape)
        }       
        formData.append('token', props.token)         
        axios({
            method: 'POST',
            url: `${api.films}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {                        
            if (res.status === 201) {                      
                message.success(`${values.title} кино нэмэгдлээ.`)
                form.resetFields()
                setDescription(undefined)
                setPoster(undefined)
                setLandscape(undefined)
                setLoading(false)                                               
            }             
        }).catch(err => {   
            message.error("Амжилтгүй боллоо.")
            console.log(err)            
            setLoading(false)          
        })        
    }

    function onPosterSelected (path) {        
        setPoster(path);
    }

    function onLandscapeSelected (path) {        
        setLandscape(path);
    }

    function getWidth() {
        if (window.screen.availWidth >= 1600) {
            return (window.screen.availWidth * 0.6) * 0.75 - 64
        } else if (window.screen.availWidth >= 1200) {
            return (window.screen.availWidth * 0.76) * 0.75 - 64
        } else if (window.screen.availWidth >= 992) {
            return (window.screen.availWidth - 24) * 0.75 - 64
        } else {
            return (window.screen.availWidth - 56)
        }
    }

    function getHeight() {
        if (window.screen.availWidth >= 1600) {
            return ((window.screen.availWidth * 0.6) * 0.75 - 64) / 3
        } else if (window.screen.availWidth >= 1200) {
            return ((window.screen.availWidth * 0.76) * 0.75 - 64) / 3
        } else if (window.screen.availWidth >= 992) {
            return ((window.screen.availWidth - 24) * 0.75 - 64) / 3
        } else {
            return (window.screen.availWidth - 56) / 3
        }
    }

    function getPosterWidth() {
        if (window.screen.availWidth >= 1200) {
            return (getWidth() / 4) - 16
        } else if (window.screen.availWidth >= 576) {
            return (getWidth() / 3) - 16
        } else {
            return getWidth()
        }
    }

    function getPosterHeight() {
       return (getPosterWidth() / 2) * 3
    }

    const handleEditorChange = (content, editor) => {
        setDescription(content)
    }

    return (
        loading ? (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        ) : (
            <div>
                <Typography.Title level={3}>Кино нэмэх</Typography.Title>
                <Form layout="vertical" form={form} onFinish={onFinish}>               
                    <Row gutter={[16, 0]}>
                        <Col span={24}>
                            <Form.Item name="landscape" label="Өргөн зураг:">
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>           
                                    <div>
                                        <ImageUpload onImageSelected={onLandscapeSelected} width={getWidth()} height={getHeight()} />                        
                                    </div>                 
                                </div>                               
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={6}>
                            <Form.Item name="poster" label="Постер:">                               
                                <ImageUpload onImageSelected={onPosterSelected} width={getPosterWidth()} height={getPosterHeight()} />                        
                            </Form.Item>                   
                            <Form.Item name="is_released" label="Нээлтээ хийсэн:">                               
                                <Radio.Group defaultValue={true}>
                                    <Radio value={true}>Тийм</Radio>
                                    <Radio value={false}>Үгүй</Radio>
                                </Radio.Group> 
                            </Form.Item>     
                            <Form.Item name="in_theater" label="Театрт гарч буй:">                               
                                <Radio.Group defaultValue={false}>
                                    <Radio value={true}>Тийм</Radio>
                                    <Radio value={false}>Үгүй</Radio>
                                </Radio.Group>          
                            </Form.Item>                       
                        </Col>
                        <Col xs={24} sm={16} md={16} lg={16} xl={18}>
                            <Form.Item name="title" label="Нэр:" rules={[{ required: true, message: 'Та киноны нэрийг оруулна уу!' }]}>
                                <Input />
                            </Form.Item>                        
                            <Row gutter={[16, 0]}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                                    <Form.Item name="genres" label="Төрөл жанр:">                        
                                        <Select
                                            showSearch
                                            mode="multiple"
                                            placeholder="Төрөл сонгоно уу"                                                
                                            optionFilterProp="children"                                
                                        >
                                            { genres ? (
                                                <>
                                                    {genres.map(item => {
                                                        return (
                                                            <Option key={item.id}>{item.name}</Option>
                                                        )
                                                    })}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </Select>                        
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={9} lg={9} xl={6}>
                                    <Form.Item name="rating" label="Насны ангилал:">                        
                                        <Select
                                            showSearch                                
                                            placeholder="Ангилал сонгоно уу"                                                
                                            optionFilterProp="children"                                
                                        >
                                            { ratings ? (
                                                <>
                                                    {ratings.map(item => {
                                                        return (
                                                            <Option key={item.id}>{item.name}</Option>
                                                        )
                                                    })}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </Select>                        
                                    </Form.Item>                                                
                                </Col>
                                <Col xs={24} sm={24} md={9} lg={9} xl={6}>
                                    <Form.Item name="releasedate" label="Нээлт:">
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={4}>
                                    <Form.Item name="duration" label="Хугацаа:">
                                        <InputNumber defaultValue={90} min={0} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>                                                            
                            </Row>
                            <Form.Item name="trailer" label="Трейлер:">
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Дэлгэрэнгүй:">                            
                                <Editor                                
                                    apiKey='wpwv44irouwa2fnzez4rgccg20gz5bri6qmwlt4wbeuha01r'
                                    initialValue=""
                                    init={{
                                        height: 300,
                                        menubar: ['file', 'insert'],                                    
                                        plugins: [
                                            'advlist autolink lists link image imagetools charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],                                        
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image'
                                    }}                                    
                                    onEditorChange={handleEditorChange}
                                />
                            </Form.Item> 
                            <Form.Item name="plot" label="Агуулга:">
                                <TextArea rows={10} />
                            </Form.Item>  
                        </Col>
                    </Row>                                                                                                                                                 
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Popconfirm title="Нэмэх үү？" okText="Тийм" cancelText="Үгүй" onConfirm={form.submit}>
                                <Button icon={<PlusOutlined />} type="primary" style={{ width: '160px' }}>
                                    Нэмэх
                                </Button>
                            </Popconfirm>
                        </div>                                        
                    </Form.Item>                                       
                </Form>
            </div>
        )     
    )
}

export default FilmCreate