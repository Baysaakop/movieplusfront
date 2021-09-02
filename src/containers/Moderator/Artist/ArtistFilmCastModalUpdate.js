import { Form, message, Button, Input, Checkbox, Popconfirm } from "antd"
import Modal from "antd/lib/modal/Modal"
import axios from "axios"
import { useState } from "react"
import api from "../../../api"

function ArtistFilmCastModalUpdate (props) {
    const [form] = Form.useForm()   
    const [checked, setChecked] = useState(false)

    function onFinish (values) {                
        const url = `${api.cast}/${props.id}/`
        var formData = new FormData();
        formData.append('artist', props.artist)
        formData.append('film', props.film)        
        formData.append('token', props.token)
        formData.append('is_lead', checked)
        formData.append('role_name', values.role_name)
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

    function onChange (e) {
        setChecked(e.target.checked)
    }

    return (
        <div>
            <Modal 
                className="film-cast-modal"
                centered           
                title={props.title}
                footer={false}                                                                                                                                      
                visible={true}                                   
                onCancel={() => props.hide()}                                                      
                width={400}
                style={{ padding: 0 }}
            >                                                   
                <div>                    
                    <Form layout="vertical" form={form} onFinish={onFinish}>    
                        <Form.Item name="is_lead" label="Гол дүр эсэх:">                        
                            <Checkbox defaultChecked={props.is_lead} onChange={onChange}>Тийм</Checkbox>
                        </Form.Item>
                        <Form.Item name="role_name" label="Дүр:">                        
                            <Input defaultValue={props.role_name} />
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

export default ArtistFilmCastModalUpdate