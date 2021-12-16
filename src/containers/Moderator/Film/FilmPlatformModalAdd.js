import { Modal, Form, Input, Select, message, Button, Popconfirm } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../../api"

const { Option } = Select 

function FilmPlatformModalAdd (props) {
    const [form] = Form.useForm()   
    const [platforms, setPlatforms] = useState()

    useEffect(() => {
        let url = `${api.platforms}`
        axios({
            method: 'GET',
            url: url,
        }).then(res => {                        
            setPlatforms(res.data.results)                                    
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")                        
        })        
    }, [])

    function onFinish (values) {        
        const url = `${api.films}/${props.film}/`
        var formData = new FormData();
        formData.append('platform', values.platform)
        formData.append('url', values.url)
        formData.append('token', props.token)            
        axios({
            method: 'PUT',
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {                        
            if (res.status === 200) {                      
                message.info(`Амжилттай`)
                form.resetFields()                                                                                                                                  
            }      
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Modal 
                className="film-platform-modal"
                centered           
                title="Суваг нэмэх"
                footer={false}                                                                                                                                      
                visible={true}                                   
                onCancel={() => props.hide()}                                                      
                width={400}
                style={{ padding: 0 }}
            >                                                   
                <div>                    
                    <Form layout="vertical" form={form} onFinish={onFinish}>    
                        <Form.Item name="platform" label="Суваг:" rules={[{ required: true, message: 'Суваг сонгоно уу!' }]}>
                            <Select
                                showSearch                                
                                placeholder="Суваг сонгоно уу"                                                
                                optionFilterProp="children"       
                                style={{ width: '100%' }}                        
                            >
                                { platforms ? (
                                    <>
                                        {platforms.map(item => {
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
                        <Form.Item name="url" label="Холбоос:" rules={[{ required: true, message: 'Холбоос оруулна уу!' }]}>                        
                            <Input />
                        </Form.Item>                       
                        <Popconfirm title="Хадгалах уу？" okText="Тийм" cancelText="Үгүй" onConfirm={form.submit}>
                            <Button block type="primary">
                                Хадгалах
                            </Button>
                        </Popconfirm>
                    </Form>
                </div> 
            </Modal>
        </div>
    )
}

export default FilmPlatformModalAdd