import { Form, Select, message, Button, Popconfirm } from "antd"
import Modal from "antd/lib/modal/Modal"
import axios from "axios"
import { useState, useEffect } from "react"
import api from "../../../api"

const { Option } = Select 

function ArtistFilmCrewModalUpdate (props) {
    const [form] = Form.useForm()   
    const [occupations, setOccupations] = useState()

    useEffect(() => {
        axios({
            method: 'GET',                        
            url: api.occupations
        })
        .then(res => {                        
            setOccupations(res.data.results.filter(x => x.id !== 1));            
        })        
        .catch(err => {
            console.log(err.message);
        })        
    }, [props.film]) // eslint-disable-line react-hooks/exhaustive-deps    

    function onFinish (values) {                
        if (values.roles) {
            const url = `${api.crew}/${props.id}/`
            var formData = new FormData();
            formData.append('artist', props.artist)
            formData.append('film', props.film)
            formData.append('roles', values.roles)
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
        } else {
            message.error("Роль сонгоно уу!")    
        }
    }

    return (
        <div>
            <Modal 
                className="film-crew-modal"
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
                        <Form.Item name="roles" label="Роль:">                        
                            <Select
                                showSearch
                                mode="multiple"
                                placeholder="Роль сонгоно уу"                                                
                                optionFilterProp="children"                                
                            >
                                { occupations ? (
                                    <>
                                        {occupations.map(item => {
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

export default ArtistFilmCrewModalUpdate