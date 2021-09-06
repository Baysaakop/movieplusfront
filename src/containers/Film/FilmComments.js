import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Form, Input, message, Spin, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"
import FilmComment from "./FilmComment"
import moment from 'moment'

function FilmComments (props) {
    const [form] = Form.useForm()
    const [comments, setComments] = useState()    

    useEffect(() => {        
        getComments(props.film)
    }, [props.film])

    function getComments(id) {
        const url = api.comments + "?film=" + id
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                            
            setComments(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    function onFinish (values) {        
        if (!props.user || !props.token) {
            message.error("Та эхлээд нэвтэрсэн байх шаардлагатай.")            
        } else {
            axios({
                method: 'POST',
                url: `${api.comments}/`,
                data: {                    
                    film: props.film,
                    comment: values.comment,                    
                    token: props.token,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            }).then(res => {                                 
                form.resetFields()
                getComments(props.film)            
            }).catch(err => {
                console.log(err.message)            
            })
        }        
    }

    function order(data) {
        return data.sort((a, b) => moment(b.created_at) - moment(a.created_at))
    }

    return (
        <div className="container film-comments" style={{ marginTop: '24px' }}>
            <Typography.Title level={3}>Сэтгэгдэл (3)</Typography.Title>
            { props.user ? (
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <div>               
                        {props.user.profile.avatar ? (
                            <Avatar 
                                className="profile-icon"
                                size="large"                       
                                src={props.user.profile.avatar}                                                                                          
                            />
                        ) : (
                            <Avatar 
                                className="profile-icon"
                                size="large"                       
                                icon={<UserOutlined />}                            
                                style={{ background: '#2c3e50' }}                                                              
                            />
                        )}                   
                    </div>
                    <div style={{ marginLeft: '12px', width: '100%' }}>
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item name="comment" rules={[{ required: true, message: 'Хоосон коммент оруулах боломжгүйг анхаарна уу.' }]} style={{ marginBottom: '8px' }}>
                                <Input.TextArea rows={4} placeholder="Сэтгэгдэл бичих..." style={{ width: '100%' }} />                    
                            </Form.Item>
                            <Button size="small" type="primary" onClick={form.submit}>Оруулах</Button>                        
                        </Form>
                    </div>
                </div>   
            ) : (
                []
            )}            
            { comments ? order(comments).map(item => (
                <FilmComment             
                    data={item}
                    user={props.user}                    
                />
            )) : 
                <div className="loading">
                    <Spin />
                </div>
            }        
        </div>      
    )
}

export default FilmComments