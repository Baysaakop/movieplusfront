import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, EditOutlined, MobileOutlined, MailOutlined, FacebookFilled, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api';
import ImageUpload from '../components/ImageUpload';

function AccountDetail (props) {
    const [form] = Form.useForm();    
    const [image, setImage] = useState();  

    // useEffect(() => {                      
    //     if (props.user) { 
    //         setImage(props.user.profile.avatar)
    //         form.setFieldsValue({                
    //             email: props.user.email,             
    //             username: props.user.username,                
    //             first_name: props.user.first_name,
    //             last_name: props.user.last_name,                           
    //             mobile: props.user.profile.phone_number,      
    //             birth_date: props.user.profile.birth_date ? moment(props.user.profile.birth_date, "YYYY-MM-DD") : undefined,
    //             role: props.user.profile.role === "1" ? "Admin" : props.user.profile.role === "2" ? "Moderator" : "User"
    //         })              
    //     }
    // }, [props.user])

    function onFinish (values) {                          
        var formData = new FormData();
        if (values.username) {
            formData.append('username', values.username)
        }      
        if (values.description) {
            formData.append('description', values.description)
        }        
        if (values.phone_number) { 
            formData.append('phone_number', values.phone_number);        
        }    
        if (values.facebook_channel) { 
            formData.append('facebook_channel', values.facebook_channel);        
        }     
        if (values.instagram_channel) { 
            formData.append('instagram_channel', values.instagram_channel);        
        }     
        if (values.twitter_channel) { 
            formData.append('twitter_channel', values.twitter_channel);        
        }     
        if (values.youtube_channel) { 
            formData.append('youtube_channel', values.youtube_channel);        
        }        
        if (image) {
            formData.append('avatar', image);
        }                
        axios({
            method: 'PUT',
            url: `${api.users}/${props.user.id}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`                     
            },
            data: formData
        })            
        .then(res => {
            if (res.status === 200) {
                message.info("Мэдээлэл шинэчлэгдлээ.")   
            }                                                         
        })
        .catch(err => {                      
            console.log(err.message)      
            message.error("Error has occured. Please try again later.")
        })          
    }

    const onImageSelected = (path) => {
        setImage(path);
    }

    return (
        <div>            
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Row gutter={[16, 0]}>
                    <Col xs={24}  sm={24} md={6}>
                        <Form.Item name="avatar" label="Зураг">
                            <div style={{ width: '150px', height: '150px' }}>
                                <ImageUpload onImageSelected={onImageSelected} image={props.user.profile.avatar} width={200} height={200} />   
                            </div>                             
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={18}>
                        <Row gutter={[16, 0]}>
                            <Col xs={24} sm={24} md={8}>
                                <Form.Item name="email" label="И-Мэйл:">
                                    <Input disabled prefix={<MailOutlined style={{ color: '#a1a1a1' }} />} defaultValue={props.user.email} />
                                </Form.Item>                          
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                <Form.Item name="username" label="Хэрэглэгчийн нэр:">
                                    <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} defaultValue={props.user.username ? props.user.username : undefined} />
                                </Form.Item>   
                            </Col>
                            <Col xs={24} sm={24} md={8}>                        
                                <Form.Item name="phone_number" label="Утасны дугаар:">
                                    <Input prefix={<MobileOutlined style={{ color: '#a1a1a1' }} />} defaultValue={props.user.profile.phone_number ? props.user.profile.phone_number : undefined} />
                                </Form.Item> 
                            </Col>
                            <Col span={24}>
                                <Form.Item name="description" label="Био">
                                    <Input.TextArea rows={5} defaultValue={props.user.profile.description ? props.user.profile.description : undefined} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={6}>                        
                        <Form.Item name="facebook_channel" label="Facebook:">
                            <Input prefix={<FacebookFilled />} defaultValue={props.user.profile.facebook_channel ? props.user.profile.facebook_channel : undefined} />                            
                        </Form.Item> 
                    </Col>
                    <Col xs={24} sm={24} md={6}>                        
                        <Form.Item name="instagram_channel" label="Instagram:">
                            <Input prefix={<InstagramOutlined />} defaultValue={props.user.profile.instagram_channel ? props.user.profile.instagram_channel : undefined} />                            
                        </Form.Item> 
                    </Col>
                    <Col xs={24} sm={24} md={6}>                        
                        <Form.Item name="twitter_channel" label="Twitter:">
                            <Input prefix={<TwitterOutlined />} defaultValue={props.user.profile.twitter_channel ? props.user.profile.twitter_channel : undefined} />                            
                        </Form.Item> 
                    </Col>
                    <Col xs={24} sm={24} md={6}>                        
                        <Form.Item name="youtube_channel" label="Youtube:">
                            <Input prefix={<YoutubeOutlined />} defaultValue={props.user.profile.youtube_channel ? props.user.profile.youtube_channel : undefined} />                            
                        </Form.Item> 
                    </Col>
                </Row>                          
                <Form.Item>                                                                  
                    <Button type="primary" icon={<EditOutlined />} onClick={form.submit} style={{ width: '100%' }}>
                        Хадгалах
                    </Button>                                                                                                        
                </Form.Item>         
            </Form>
        </div>
    )
};

export default AccountDetail;