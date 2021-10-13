import { Col, Row, Form, Input, Select, Checkbox, message, Button, Popconfirm } from "antd"
import Modal from "antd/lib/modal/Modal"
import axios from "axios"
import { useState } from "react"
import api from "../../../api"

const { Option } = Select 
const { Search } = Input

function ArtistFilmCastModalCreate (props) {
    const [form] = Form.useForm()   
    const [films, setFilms] = useState()
    const [selection, setSelection] = useState()    
    const [checked, setChecked] = useState(false)

    function onSearch(val) {                
        let url = `${api.films}?title=${val}`        
        if (props.type === "series") {
            url = `${api.series}?title=${val}`
        } 
        axios({
            method: 'GET',
            url: url,
        }).then(res => {                        
            setFilms(res.data.results)                                    
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")                        
        })        
    }

    function onSelect(e) {
        let film = films.find(x => x.id === parseInt(e))        
        setSelection(film)        
    }

    function onFinish (values) {    
        if (selection) {
            const url = `${api.cast}/`
            var formData = new FormData();
            formData.append('artist', props.artist)            
            if (props.type === "film") {
                formData.append('film', selection.id)
            } else if (props.type === "series") {
                formData.append('series', selection.id)
            }                         
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
            message.error("Кино сонгоно уу!")
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
                            <Search placeholder="Уран бүтээл хайх" onSearch={onSearch} enterButton />
                        </Col>
                        <Col span={24}>
                            <Select
                                showSearch                                
                                placeholder="Уран бүтээл сонгоно уу"                                                
                                optionFilterProp="children"       
                                onSelect={onSelect} 
                                style={{ width: '100%' }}                        
                            >
                                { films ? (
                                    <>
                                        {films.map(item => {
                                            return (
                                                <Option key={item.id}>{item.title}</Option>
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

export default ArtistFilmCastModalCreate