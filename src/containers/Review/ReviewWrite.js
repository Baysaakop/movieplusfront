import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { message, Spin, Typography } from "antd"
import { connect } from "react-redux"
import { Form, Input, Button } from "antd"
import ImageUpload from "../../components/ImageUpload"
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment'

function ReviewWrite (props) {
    const [form] = Form.useForm()   
    const [user, setUser] = useState()
    const [film, setFilm] = useState()    
    const [thumbnail, setThumbnail] = useState()
    const [content, setContent] = useState();

    function onSelectThumbnail (image) {
        setThumbnail(image)
    }

    const handleEditorChange = (content) => {        
        setContent(content)
    }

    function onFinish (values) {
        console.log(values)
        console.log(thumbnail)
        console.log(content)
    }


    useEffect(() => {
        if (props.token && !user) {
            getUser()
        }
        getFilm()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps        

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


    function getFilm() {
        const id = props.match.params.id
        const url = api.films + "/" + id + "/"
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                                    
            setFilm(res.data)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getWidth() {
        if (window.screen.width > 800) {
            return 752
        } else {
            return window.screen.width - 48
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            { film ? (
                <div className="container" style={{ maxWidth: '800px'}}>
                    <Typography.Title level={4}>{film.title} ({moment(film.releasedate).year()}) - Review бичих</Typography.Title>
                    <Form layout="vertical" form={form} onFinish={onFinish}> 
                        <Form.Item name="thumbnail" label="Зураг:">
                            <ImageUpload onImageSelected={onSelectThumbnail} width={getWidth()} height={280} />                        
                        </Form.Item>
                        <Form.Item name="title" label="Гарчиг:">
                            <Input />
                        </Form.Item>
                        <Form.Item name="outline" label="Outline:">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Typography.Title level={5}>Review:</Typography.Title>                        
                        <Editor                                
                            apiKey='wpwv44irouwa2fnzez4rgccg20gz5bri6qmwlt4wbeuha01r'
                            initialValue=""
                            init={{
                                height: 400,
                                width: getWidth(),
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
                        <Button type="primary" style={{ marginTop: '16px' }}>Нийтлэх</Button>
                    </Form>
                </div>
            ) : (
                <div className="loading">
                    <Spin tip="Уншиж байна..." />
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

export default connect(mapStateToProps)(ReviewWrite)