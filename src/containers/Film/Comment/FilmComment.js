import { CloseCircleOutlined, DislikeFilled, DislikeOutlined, EditOutlined, LikeFilled, LikeOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Input, Space, Typography, Form, message, Popconfirm, notification } from "antd"
import { useEffect, useState } from "react"
import './FilmComment.css'
import moment from 'moment'
import axios from "axios"
import api from "../../../api"

function FilmComment (props) {
    const [form] = Form.useForm()
    const [comment, setComment] = useState()    
    // const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setComment(props.data)
    }, [props.data])

    function onLike () {
        if (!props.user || !props.token) {
            message.error("Та эхлээд нэвтэрсэн байх шаардлагатай.")            
        } else {
            axios({
                method: 'PUT',
                url: `${api.comments}/${comment.id}/`,
                data: {
                    like: true,                 
                    token: props.token,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            }).then(res => {                                                               
                setComment(res.data)            
            }).catch(err => {
                console.log(err.message)            
            })
        }        
    }

    function onDislike () {
        if (!props.user || !props.token) {
            message.error("Та эхлээд нэвтэрсэн байх шаардлагатай.")            
        } else {
            axios({
                method: 'PUT',
                url: `${api.comments}/${comment.id}/`,
                data: {
                    dislike: true,                 
                    token: props.token,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            }).then(res => {                                                         
                setComment(res.data)            
            }).catch(err => {
                console.log(err.message)            
            })
        }    
    }

    // function onReply () {
    //     setReply(!reply)
    // }

    function onEdit () {
        setEdit(!edit)
    }

    function onFinish (values) {
        if (!props.user || !props.token) {
            message.error("Та эхлээд нэвтэрсэн байх шаардлагатай.")            
        } else {
            axios({
                method: 'PUT',
                url: `${api.comments}/${comment.id}/`,
                data: {                    
                    edit: true,
                    comment: values.comment,                    
                    token: props.token,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            }).then(res => {                                                 
                setComment(res.data)            
                form.resetFields()
                setEdit(false)
            }).catch(err => {
                console.log(err.message)            
            })
        }        
    }

    function onDelete () {
        if (!props.user || !props.token) {
            message.error("Та эхлээд нэвтэрсэн байх шаардлагатай.")            
        } else {
            axios({
                method: 'DELETE',
                url: `${api.comments}/${comment.id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            }).then(res => {                            
                notification['success']({
                    message: 'Коммент устлаа.',
                    description:
                      'Таны сонгосон комментийг устгалаа.',
                  });                                               
                form.resetFields()
                setEdit(false)
                props.onDelete()
            }).catch(err => {
                console.log(err.message)            
            })
        }    
    }

    return (
        <div className="article-comment">
            <Divider />            
            { comment ? (
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>                    
                    <div>
                        {comment.user.profile.avatar ? (
                            <Avatar 
                                className="profile-icon"
                                size="large"                       
                                src={comment.user.profile.avatar}                                                                                          
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
                                <Typography.Title level={5} style={{ margin: 0 }}>{comment.user.username}</Typography.Title>
                                <Typography.Text style={{ fontSize: '12px', margin: 0 }}>{moment(comment.created_at).fromNow()}</Typography.Text>
                            </div>                    
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            { edit ? (
                                <div style={{ marginBottom: '8px' }}>
                                    <Form form={form} onFinish={onFinish}>
                                        <Form.Item name="comment" rules={[{ required: true, message: 'Хоосон коммент оруулах боломжгүйг анхаарна уу.' }]} style={{ marginBottom: '8px' }}>
                                            <Input.TextArea defaultValue={comment.comment} rows={4} placeholder="Сэтгэгдэл бичих..." style={{ width: '100%' }} />                    
                                        </Form.Item>
                                        <Button size="small" type="primary" onClick={form.submit} style={{ marginRight: '8px' }}>Оруулах</Button>   
                                        <Popconfirm title="Устгах уу?" onConfirm={onDelete}>    
                                            <Button danger size="small" type="primary">Устгах</Button>                        
                                        </Popconfirm>
                                    </Form>
                                </div>
                            ) : (
                                <Typography.Paragraph ellipsis={{ rows: 5 }}>
                                    {comment.comment}
                                </Typography.Paragraph>
                            )}                       
                            <div>
                                <Space size={[8, 8]} wrap>
                                    { props.user && comment.likers.filter(x => x === props.user.id).length > 0 ? (
                                        <Button size="small" shape="round" type="text" icon={<LikeFilled />} onClick={onLike}> {comment.likers.length}</Button>
                                    ) : (
                                        <Button size="small" shape="round" type="text" icon={<LikeOutlined />} onClick={onLike}> {comment.likers.length}</Button>
                                    )}     
                                    { props.user && comment.dislikers.filter(x => x === props.user.id).length > 0 ? (
                                        <Button size="small" shape="round" type="text" icon={<DislikeFilled />} onClick={onDislike}> {comment.dislikers.length}</Button>
                                    ) : (
                                        <Button size="small" shape="round" type="text" icon={<DislikeOutlined />} onClick={onDislike}> {comment.dislikers.length}</Button>
                                    )}                                                                    
                                    {/* <Button size="small" shape="round" type="text" icon={ reply ? <MessageFilled /> : <MessageOutlined />} onClick={onReply}> Reply</Button> */}
                                    { props.user && props.user.id === comment.user.id ? (
                                        <Button size="small" shape="round" type="text" icon={ edit ? <CloseCircleOutlined/> : <EditOutlined />} onClick={onEdit}>{ edit ? 'Болих' : 'Засах' }</Button>
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
            ) : (
                <></>
            )}                                           
        </div>
    )
}

export default FilmComment