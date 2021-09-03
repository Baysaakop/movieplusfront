import { Col, Row, Form, Input, Select, message, Button, Checkbox, Popconfirm } from "antd"
import Modal from "antd/lib/modal/Modal"
import axios from "axios"
import { useState } from "react"
import api from "../../../api"

const { Option } = Select 
const { Search } = Input

function FilmCastModalCreate (props) {
    const [form] = Form.useForm()   
    const [artists, setArtists] = useState()
    const [selection, setSelection] = useState()
    const [checked, setChecked] = useState(false)

    function onSearch(val) {                
        let url = `${api.artists}?name=${val}`
        axios({
            method: 'GET',
            url: url,
        }).then(res => {                        
            setArtists(res.data.results)                                    
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")                        
        })        
    }

    function onSelect(e) {
        let artist = artists.find(x => x.id === parseInt(e))        
        setSelection(artist)        
    }

    function onFinish (values) {
        if (selection) {
            const url = `${api.cast}/`
            var formData = new FormData();
            formData.append('artist', selection.id)
            formData.append('film', props.film)                
            formData.append('token', props.token)
            if (checked) {
                formData.append('is_lead', true)
            }
            if (values.role_name) {
                formData.append('role_name', values.role_name)
            }
            axios({
                method: 'POST',
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${props.token}`            
                }
            })
            .then(res => {                        
                if (res.status === 201) {                      
                    message.info(`Амжилттай`)
                    form.resetFields()                                                
                    setSelection(undefined)                                                                                 
                }      
            })
            .catch(err => {
                message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
            })
        } else {
            message.error("Артист сонгоно уу!")
        }
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
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Search placeholder="Артист хайх" onSearch={onSearch} enterButton />
                        </Col>
                        <Col span={24}>
                            <Select
                                showSearch                                
                                placeholder="Артист сонгоно уу"                                                
                                optionFilterProp="children"       
                                onSelect={onSelect} 
                                style={{ width: '100%' }}                        
                            >
                                { artists ? (
                                    <>
                                        {artists.map(item => {
                                            return (
                                                <Option key={item.id}>{item.name}</Option>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Select>            
                        </Col>
                    </Row>
                    <Form layout="vertical" form={form} onFinish={onFinish} style={{ marginTop: '24px' }}>    
                        <Form.Item name="is_lead" label="Гол дүр эсэх:">                        
                            <Checkbox onChange={onChange}>Тийм</Checkbox>
                        </Form.Item>
                        <Form.Item name="role_name" label="Дүр:">                        
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

export default FilmCastModalCreate