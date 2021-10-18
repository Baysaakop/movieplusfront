import { useEffect, useState } from "react"
import axios from "axios"
import { message, Popconfirm, Spin, Typography } from "antd"
import { connect } from "react-redux"
import { Form, Input, Button } from "antd"
import { Editor } from '@tinymce/tinymce-react';
import { FormOutlined } from "@ant-design/icons"
import api from "../../api"
import ImageUpload from "../../components/ImageUpload"

function ArticleWrite (props) {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)       
    const [user, setUser] = useState()    
    const [thumbnail, setThumbnail] = useState()
    const [content, setContent] = useState()    

    useEffect(() => {
        if (props.token && !user) {
            getUser()
        }       
    }, [user]) // eslint-disable-line react-hooks/exhaustive-deps            

    function getUser () {        
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                                
            setUser(res.data)            
        }).catch(err => {
            console.log(err.message)            
        })
    }    

    function getWidth() {
        if (window.screen.width > 800) {
            return 752
        } else {
            return window.screen.width - 48
        }
    }

    function onSelectThumbnail (image) {
        setThumbnail(image)
    }

    const handleEditorChange = (content) => {        
        setContent(content)
    }

    function onFinish (values) {
        if (user && props.token) {
            if (content && content !== null && content !== "") {
                setLoading(true)
                var formData = new FormData();             
                formData.append('token', props.token)                           
                formData.append('title', values.title)
                formData.append('outline', values.outline)
                formData.append('content', content)        
                if (thumbnail) {
                    formData.append('thumbnail', thumbnail)
                }                  
                axios({
                    method: 'POST',
                    url: `${api.articles}/`,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${props.token}`            
                    }
                }).then(res => {                                                     
                    if (res.status === 201) {      
                        form.resetFields()
                        setLoading(false)
                        message.success("Нийтлэлийг хүлээж авлаа.")
                    }                     
                }).catch(err => {
                    console.log(err.message)            
                    message.error("Алдаа гарлаа.")
                    setLoading(false)                    
                })
            } else {
                message.error("Нийтлэл хоосон байна.")
            }
        } else {
            message.error("Та эхлээд нэвтэрсэн байх шаардлагатай.")          
        }         
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            { loading ? (
                <div className="loading">
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : (
                <div className="container" style={{ maxWidth: '800px'}}>
                    <Typography.Title level={4}>Нийтлэл бичих</Typography.Title>
                    <Form layout="vertical" form={form} onFinish={onFinish}> 
                        <Form.Item name="thumbnail" label="Зураг:">                            
                            <ImageUpload onImageSelected={onSelectThumbnail} width={getWidth()} height={280} />                        
                        </Form.Item>
                        <Form.Item name="title" label="Гарчиг:" rules={[{ required: true, message: 'Гарчиг оруулна уу!' }]}>                            
                            <Input />
                        </Form.Item>                       
                        <Form.Item name="outline" label="Товч:" rules={[{ required: true, message: 'Outline оруулна уу!' }]}>                            
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Typography.Text style={{ display: 'block' }}>Нийтлэл:</Typography.Text>
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
                        <Popconfirm title="Нийтлэх үү?" onConfirm={form.submit}>
                            <Button type="primary" icon={<FormOutlined />} style={{ marginTop: '16px' }}>Нийтлэх</Button>
                        </Popconfirm>
                    </Form>
                </div>
            )}                    
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(ArticleWrite)