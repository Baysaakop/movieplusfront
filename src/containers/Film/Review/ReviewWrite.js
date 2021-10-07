import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../../api"
import { message, Popconfirm, Rate, Result, Spin, Typography } from "antd"
import { connect } from "react-redux"
import { Form, Input, Button } from "antd"
import ImageUpload from "../../../components/ImageUpload"
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment'
import { FormOutlined } from "@ant-design/icons"

function ReviewWrite (props) {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)   
    const [finished, setFinished] = useState(false)   
    const [failed, setFailed] = useState(false)
    const [user, setUser] = useState()
    const [film, setFilm] = useState()    
    const [thumbnail, setThumbnail] = useState()
    const [content, setContent] = useState()
    const [score, setScore] = useState()

    useEffect(() => {
        if (props.token && !user) {
            getUser()
        }
        if (user) {
            getFilm()        
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
            console.log(res.data)
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
            getScore(user, res.data)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function getScore(user, film) {
        let item = user.profile.scores.find(x => x.film === film.id)
        if (item && item !== null) {
            setScore(item.user_score)
        } else {
            setScore(0)
        }
    }

    function onRate(val) {
        setScore(val * 2)
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
        if (!user || !props.token) {
            message.error("Та эхлээд нэвтэрсэн байх шаардлагатай.")            
        } else if (!content || content === null || content === "") {
            message.error("Review хоосон байна.")
        } else {
            setLoading(true)
            var formData = new FormData();
            formData.append('film', film.id)            
            formData.append('token', props.token)         
            formData.append('title', values.title)
            formData.append('outline', values.outline)
            formData.append('content', content)        
            if (thumbnail) {
                formData.append('thumbnail', thumbnail)
            }  
            if (score) {
                formData.append('score', score)
            }               
            axios({
                method: 'POST',
                url: `${api.reviews}/`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${props.token}`            
                }
            }).then(res => {                                 
                form.resetFields()
                setLoading(false)
                if (res.status === 201) {      
                    setFinished(true)        
                }                     
            }).catch(err => {
                console.log(err.message)            
                setLoading(false)
                setFailed(true)
            })
        }            
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            { loading ? (
                <div className="loading">
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : finished ? (
                <div className="result">
                    <Result
                        status="success"
                        title="Таны review-г хүлээж авлаа."
                        subTitle="Админууд шалгаж дууссаны дараа таны review нийтлэгдэх болно. Танд баярлалаа."
                        extra={[
                            <Button type="primary" key="home" href="/">
                                Нүүр хуудас
                            </Button>                        
                        ]}
                    />
                </div>
            ) : failed ? (
                <div className="result">
                    <Result
                        status="error"
                        title="Алдаа гарлаа."
                        subTitle="Таны review-г хүлээж авах процессэд алдаа гарлаа. Та гараад дахин оролдоно уу."
                        extra={[
                            <Button type="primary" key="home" href="/">
                                Нүүр хуудас
                            </Button>                        
                        ]}
                    />
                </div>
            ) : (
                film ? (
                    <div className="container" style={{ maxWidth: '800px'}}>
                        <Typography.Title level={4}>{film.title} ({moment(film.releasedate).year()}) - Review бичих</Typography.Title>
                        <Form layout="vertical" form={form} onFinish={onFinish}> 
                            <Form.Item name="thumbnail">
                                <Typography.Title level={5}>Зураг:</Typography.Title>       
                                <ImageUpload onImageSelected={onSelectThumbnail} width={getWidth()} height={280} />                        
                            </Form.Item>
                            <Form.Item name="title" rules={[{ required: true, message: 'Гарчиг оруулна уу!' }]}>
                                <Typography.Title level={5}>Гарчиг:</Typography.Title>      
                                <Input />
                            </Form.Item>
                            <Form.Item name="score">
                                <Typography.Title level={5}>Үнэлгээ:</Typography.Title>
                                <Rate allowHalf value={score ? score / 2 : 0} onChange={onRate} />
                                <span className="ant-rate-text" style={{ fontWeight: 'bold', fontSize: '18px' }}> - {score ? score : ''}</span>
                            </Form.Item>
                            <Form.Item name="outline" rules={[{ required: true, message: 'Outline оруулна уу!' }]}>
                                <Typography.Title level={5}>Товч:</Typography.Title>           
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
                            <Popconfirm title="Нийтлэх үү?" onConfirm={form.submit}>
                                <Button type="primary" icon={<FormOutlined />} style={{ marginTop: '16px' }}>Нийтлэх</Button>
                            </Popconfirm>
                        </Form>
                    </div>
                ) : (
                    <></>
                )
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