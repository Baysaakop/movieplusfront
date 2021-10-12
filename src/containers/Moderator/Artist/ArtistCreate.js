import { Form, Row, Col, Input, Select, Typography, DatePicker, Popconfirm, message, Button, Spin } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../../api"
import ImageUpload from '../../../components/ImageUpload'
import { Editor } from '@tinymce/tinymce-react';
import moment from "moment"
import { PlusOutlined } from "@ant-design/icons"

const { Option } = Select

function ArtistCreate (props) {
    const [form] = Form.useForm()   
    const [loading, setLoading] = useState()
    const [biography, setBiography] = useState();    
    const [avatar, setAvatar] = useState()        
    const [occupations, setOccupations] = useState()

    useEffect(() => {
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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    function onFinish (values) {      
        setLoading(true)       
        var formData = new FormData();
        formData.append('name', values.name)
        if (biography) {
            formData.append('biography', biography)
        }
        if (values.lastname) {
            formData.append('lastname', values.lastname)
        }
        if (values.firstname) {
            formData.append('firstname', values.firstname)
        }        
        if (values.birthdate) {
            formData.append('birthdate', moment(values.birthdate).format("YYYY-MM-DD"))
        }                 
        if (values.occupations) {
            formData.append('occupations', values.occupations)
        } 
        if (values.facebook_channel) {
            formData.append('facebook_channel', values.facebook_channel)
        }
        if (values.instagram_channel) {
            formData.append('instagram_channel', values.instagram_channel)
        }  
        if (values.twitter_channel) {
            formData.append('twitter_channel', values.twitter_channel)
        }
        if (values.youtube_channel) {
            formData.append('youtube_channel', values.youtube_channel)
        }  
        if (avatar) {
            formData.append('avatar', avatar)
        }       
        formData.append('token', props.token)         
        axios({
            method: 'POST',
            url: `${api.artists}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        }).then(res => {                        
            if (res.status === 201) {                      
                message.success(`${values.name} артист нэмэгдлээ.`)
                form.resetFields()
                setBiography(undefined)
                setAvatar(undefined)                
                setLoading(false)                                               
            }             
        }).catch(err => {   
            message.error("Амжилтгүй боллоо.")
            console.log(err)            
            setLoading(false)          
        })        
    }

    function onAvatarSelected (path) {        
        setAvatar(path);
    }

    function getWidth() {
        if (window.screen.availWidth >= 1600) {
            return (window.screen.availWidth * 0.6) * 0.75 - 64
        } else if (window.screen.availWidth >= 1200) {
            return (window.screen.availWidth * 0.76) * 0.75 - 64
        } else if (window.screen.availWidth >= 992) {
            return (window.screen.availWidth - 24) * 0.75 - 64
        } else {
            return (window.screen.availWidth - 48)
        }
    }

    function getAvatarWidth() {
        if (window.screen.availWidth >= 1200) {
            return (getWidth() / 4) - 16
        } else if (window.screen.availWidth >= 576) {
            return (getWidth() / 3) - 16
        } else {
            return getWidth()
        }
    }

    function getAvatarHeight() {
       return (getAvatarWidth() / 2) * 3
    }

    const handleEditorChange = (content, editor) => {
        setBiography(content)
    }

    return (
        loading ? (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        ) : (
            <div>
                <Typography.Title level={3}>Артист нэмэх</Typography.Title>
                <Form layout="vertical" form={form} onFinish={onFinish}>               
                    <Row gutter={[16, 0]}>                        
                        <Col xs={24} sm={8} md={8} lg={8} xl={6}>
                            <Form.Item name="avatar" label="Зураг:">                               
                                <ImageUpload onImageSelected={onAvatarSelected} width={getAvatarWidth()} height={getAvatarHeight()} />                        
                            </Form.Item>                   
                            <Form.Item name="facebook_channel" label="Facebook:">                               
                                <Input />
                            </Form.Item>     
                            <Form.Item name="instagram_channel" label="Instagram:">                               
                                <Input />
                            </Form.Item>
                            <Form.Item name="twitter_channel" label="Twitter:">                               
                                <Input />
                            </Form.Item>
                            <Form.Item name="youtube_channel" label="Youtube:">                               
                                <Input />
                            </Form.Item>                       
                        </Col>
                        <Col xs={24} sm={16} md={16} lg={16} xl={18}>
                            <Form.Item name="name" label="Нэр:" rules={[{ required: true, message: 'Та артистын нэрийг оруулна уу!' }]}>
                                <Input placeholder="А.Бат-Эрдэнэ" />
                            </Form.Item>                        
                            <Row gutter={[16, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <Form.Item name="lastname" label="Овог:">
                                        <Input placeholder="Анх-Эрдэнэ" />
                                    </Form.Item>       
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12}>
                                    <Form.Item name="firstname" label="Нэр:">
                                        <Input placeholder="Бат-Эрдэнэ" />
                                    </Form.Item>       
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={16}>
                                    <Form.Item name="occupations" label="Мэргэжил:">                        
                                        <Select
                                            showSearch
                                            mode="multiple"
                                            placeholder="Мэргэжил сонгоно уу"                                                
                                            optionFilterProp="children"                                
                                        >
                                            { occupations ? (
                                                <>
                                                    {occupations.map(item => {
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
                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                    <Form.Item name="birthdate" label="Төрсөн өдөр:">
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>                                                                                         
                            </Row>                            
                            <Form.Item name="biography" label="Танилцуулга:">                            
                                <Editor                                
                                    apiKey='wpwv44irouwa2fnzez4rgccg20gz5bri6qmwlt4wbeuha01r'
                                    initialValue=""
                                    init={{
                                        height: 400,
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

export default ArtistCreate