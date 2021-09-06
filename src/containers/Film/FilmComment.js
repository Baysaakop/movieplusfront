import { DislikeFilled, DislikeOutlined, EditFilled, EditOutlined, LikeFilled, LikeOutlined, MessageFilled, MessageOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Input, Space, Typography, Form, message } from "antd"
import { useState } from "react"
import './FilmComment.css'
import moment from 'moment'
import axios from "axios"
import api from "../../api"

function FilmComment (props) {
    const [form] = Form.useForm()
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)

    function onLike () {
        setLike(!like)
    }

    function onDislike () {
        setDislike(!dislike)
    }

    function onReply () {
        setReply(!reply)
    }

    function onEdit () {
        setEdit(!edit)
    }

    function onFinish (values) {
        if (!props.user || !props.token) {
            message.error("Та эхлээд нэвтэрсэн байх шаардлагатай.")            
        } else {
            axios({
                method: 'PUT',
                url: `${api.films}/${props.film}/`,
                data: {
                    type: 'update',
                    id: props.data.id,
                    comment: values.comment,                    
                    token: props.token,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            }).then(res => {                                 
                form.resetFields()
                //setComments(res.data.comments)            
            }).catch(err => {
                console.log(err.message)            
            })
        }        
    }

    return (
        <div className="article-comment">
            <Divider />            
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>                    
                <div>
                    {props.data.user.profile.avatar ? (
                        <Avatar 
                            className="profile-icon"
                            size="large"                       
                            src={props.data.user.profile.avatar}                                                                                          
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <Typography.Title level={5} style={{ margin: 0 }}>{props.data.user.username}</Typography.Title>
                            <Typography.Text style={{ fontSize: '12px', margin: 0 }}>{moment(props.data.created_at).fromNow()}</Typography.Text>
                        </div>                    
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        { edit ? (
                            <div style={{ marginBottom: '8px' }}>
                                <Form form={form} onFinish={onFinish}>
                                    <Form.Item name="comment" rules={[{ required: true, message: 'Хоосон коммент оруулах боломжгүйг анхаарна уу.' }]} style={{ marginBottom: '8px' }}>
                                        <Input.TextArea defaultValue={props.data.comment} rows={4} placeholder="Сэтгэгдэл бичих..." style={{ width: '100%' }} />                    
                                    </Form.Item>
                                    <Button size="small" type="primary" onClick={form.submit} style={{ marginRight: '8px' }}>Оруулах</Button>       
                                    <Button danger size="small" type="primary" onClick={form.submit}>Устгах</Button>                        
                                </Form>
                            </div>
                        ) : (
                            <Typography.Paragraph ellipsis={{ rows: 5 }}>
                                {props.data.comment}
                            </Typography.Paragraph>
                        )}                       
                        <div>
                            <Space size={[16, 16]} wrap>
                                { props.user && props.data.likers.includes(x => x === props.user.id) ? (
                                    <Button size="small" shape="round" type="text" icon={<LikeFilled />} onClick={onLike}> {props.data.likers.length}</Button>
                                ) : (
                                    <Button size="small" shape="round" type="text" icon={<LikeOutlined />} onClick={onLike}> {props.data.likers.length}</Button>
                                )}                                
                                <Button size="small" shape="round" type="text" icon={ dislike ? <DislikeFilled /> : <DislikeOutlined />} onClick={onDislike}> 4</Button>
                                <Button size="small" shape="round" type="text" icon={ reply ? <MessageFilled /> : <MessageOutlined />} onClick={onReply}> Reply</Button>
                                { props.user && props.user.id === props.data.user.id ? (
                                    <Button size="small" shape="round" type="text" icon={ edit ? <EditFilled/> : <EditOutlined />} onClick={onEdit}>{ edit ? 'Болих' : 'Засах' }</Button>
                                ) : (
                                    []
                                )}                                
                            </Space>                            
                        </div>
                        {/* { reply ? (
                        <div style={{ marginTop: '24px', marginLeft: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <div>               
                                    <Avatar size="large" src={props.img} />
                                </div>
                                <div style={{ marginLeft: '12px', width: '100%' }}>
                                    <Input.TextArea rows={4} placeholder="Сэтгэгдэл бичих..." style={{ width: '100%', marginBottom: '8px' }} />                    
                                    <Button size="small" type="primary">Submit</Button>                        
                                </div>
                            </div>         
                        ) : []} */}
                    </div>
                </div>
            </div>                                
        </div>
    )
}

export default FilmComment