import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, EditOutlined, MobileOutlined, MailOutlined, FacebookFilled, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api';
import ImageUpload from '../components/ImageUpload';

function AccountDetail (props) {
    const [form] = Form.useForm();    
    const [image, setImage] = useState();  

    useEffect(() => {                      
        if (props.user) { 
            setImage(props.user.profile.avatar)
            form.setFieldsValue({                
                email: props.user.email,             
                username: props.user.username,                
                description: props.user.profile.description,
                phone_number: props.user.profile.phone_number,
                facebook_channel: props.user.profile.facebook_channel,
                instagram_channel: props.user.profile.instagram_channel,
                youtube_channel: props.user.profile.youtube_channel,
            })              
        }
    }, [props.user]) // eslint-disable-line react-hooks/exhaustive-deps

    function onFinish (values) {                          
        console.log(values)
        var formData = new FormData();
        if (values.username && values.username !== props.user.username) {
            formData.append('username', values.username)
        }      
        if (values.description !== props.user.profile.description) {
            formData.append('description', values.description)
        }        
        if (values.phone_number !== props.user.profile.phone_number) { 
            formData.append('phone_number', values.phone_number);        
        }    
        if (values.facebook_channel !== props.user.profile.facebook_channel) { 
            formData.append('facebook_channel', values.facebook_channel);        
        }     
        if (values.instagram_channel !== props.user.profile.instagram_channel) { 
            formData.append('instagram_channel', values.instagram_channel);        
        }        
        if (values.youtube_channel !== props.user.profile.youtube_channel) { 
            formData.append('youtube_channel', values.youtube_channel);        
        }        
        if (image && image !== props.user.profile.avatar) {
            formData.append('avatar', image);
        }                
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
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
                message.info("???????????????? ????????????????????????.")   
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
                        <Form.Item name="avatar" label="??????????">
                            <div style={{ width: '150px', height: '150px' }}>
                                <ImageUpload onImageSelected={onImageSelected} image={props.user.profile.avatar} width={200} height={200} />   
                            </div>                             
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={18}>
                        <Row gutter={[16, 0]}>
                            <Col xs={24} sm={24} md={8}>
                                <Form.Item name="email" label="??-????????:">
                                    <Input disabled prefix={<MailOutlined style={{ color: '#a1a1a1' }} />} />
                                </Form.Item>                          
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                <Form.Item name="username" label="???????????????????????? ??????:" rules={[{ required: true, message: '???????????????????????? ?????? ???????????? ???????? ????????????????.' }]}>
                                    <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} />
                                </Form.Item>   
                            </Col>
                            <Col xs={24} sm={24} md={8}>                        
                                <Form.Item name="phone_number" label="???????????? ????????????:">
                                    <Input prefix={<MobileOutlined style={{ color: '#a1a1a1' }} />} />
                                </Form.Item> 
                            </Col>
                            <Col span={24}>
                                <Form.Item name="description" label="??????">
                                    <Input.TextArea rows={5} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={8}>                        
                        <Form.Item name="facebook_channel" label="Facebook:">
                            <Input prefix={<FacebookFilled />} />                            
                        </Form.Item> 
                    </Col>
                    <Col xs={24} sm={24} md={8}>                        
                        <Form.Item name="instagram_channel" label="Instagram:">
                            <Input prefix={<InstagramOutlined />} />                            
                        </Form.Item> 
                    </Col>
                    <Col xs={24} sm={24} md={8}>                        
                        <Form.Item name="youtube_channel" label="Youtube:">
                            <Input prefix={<YoutubeOutlined />} />                            
                        </Form.Item> 
                    </Col>
                </Row>                          
                <Form.Item>                                                                  
                    <Button type="primary" icon={<EditOutlined />} onClick={form.submit} style={{ width: '100%' }}>
                        ????????????????
                    </Button>                                                                                                        
                </Form.Item>         
            </Form>
        </div>
    )
};

export default AccountDetail;