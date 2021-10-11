import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../../api"
import { Modal, message, Popconfirm, Spin, notification, Checkbox } from "antd"
import { Form, Input, Button } from "antd"
import { Editor } from '@tinymce/tinymce-react';
import { FormOutlined } from "@ant-design/icons"

function ReviewModalUpdate (props) {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()            
    const [comment, setComment] = useState()

    useEffect(() => {
        setComment(props.review.comment)
    }, [props.review]) // eslint-disable-line react-hooks/exhaustive-deps        
    
    const handleEditorChange = (content) => {        
        setComment(content)
    }

    function onFinish (values) {        
        if (comment && comment !== null && comment !== '') {
            setLoading(true)
            var formData = new FormData();            
            formData.append('token', props.token)                         
            if (values.is_spoiler && values.is_spoiler !== props.review.is_spoiler) {
                formData.append('is_spoiler', values.is_spoiler)        
            }   
            if (values.title && values.title !== props.review.title) {
                if (values.title === '') {
                    formData.append('title', `${props.film.title} киноны сэтгэгдэл`)
                } else {
                    formData.append('title', values.title)
                }                
            }
            if (comment !== props.review.comment) {
                formData.append('comment', comment)              
            }            
            axios({
                method: 'PUT',
                url: `${api.reviews}/${props.review.id}/`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${props.token}`            
                }
            }).then(res => {                                            
                form.resetFields()
                setLoading(false)
                notification['success']({
                    message: 'Хүлээж авлаа.',
                    description:
                      `${props.film.title} киноны талаарх таны сэтгэгдлийг хүлээж авлаа.`,
                })
                props.hide(res.data)
            }).catch(err => {
                console.log(err.message)            
                setLoading(false)
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")                
            })        
        } else {
            message.error("Сэтгэгдэл хоосон байна.")
        }         
    }

    return (
        <div>
             <Modal 
                className="review-modal"
                centered           
                title={`${props.review.title} - засах`}
                footer={false}                                                                                                                                      
                visible={true}                                   
                onCancel={() => props.hide()}                                                      
                width={600}
                style={{ padding: 0 }}
            >       
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '600px' }}>
                    { loading ? (
                        <Spin tip="Ачааллаж байна..." />
                    ) : (
                        <Form 
                            layout="vertical" 
                            form={form} 
                            onFinish={onFinish} 
                            initialValues={{ 
                                spoiler: props.review.is_spoiler, 
                                title: props.review.title 
                            }}
                        > 
                            <Form.Item name="is_spoiler" label="Spoiler агуулсан эсэх" valuePropName="checked">                                
                                <Checkbox>Тийм</Checkbox>
                            </Form.Item>
                            <Form.Item name="title" label="Гарчиг">                                
                                <Input />
                            </Form.Item>                             
                            <Editor                                
                                apiKey='wpwv44irouwa2fnzez4rgccg20gz5bri6qmwlt4wbeuha01r'
                                initialValue={props.review.comment}
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
                    )}  
                </div>                    
            </Modal>            
        </div>
    )
}

export default ReviewModalUpdate