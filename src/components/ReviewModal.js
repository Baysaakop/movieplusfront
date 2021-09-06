import { Modal, Form, Input, Button } from "antd"
import { useState } from "react"
import ImageUpload from "./ImageUpload"
import { Editor } from '@tinymce/tinymce-react';

function ReviewModal (props) {
    const [form] = Form.useForm()   
    const [thumbnail, setThumbnail] = useState()
    const [content, setContent] = useState();

    function onSelectThumbnail (image) {
        setThumbnail(image)
    }

    const handleEditorChange = (content, editor) => {
        setContent(content)
    }

    function onFinish (values) {
        console.log(values)
    }

    return (
        <div>
             <Modal 
                className="review"
                centered                                                                                                                                 
                visible={true}
                title={`${props.title} - Review`}
                footer={null}                    
                onCancel={() => props.hide()}                                                      
                width={600}
                style={{ padding: 0 }}
            >                                                   
                <div>
                    <Form layout="vertical" form={form} onFinish={onFinish}> 
                        <Form.Item name="thumbnail" label="Зураг:">
                            <ImageUpload onImageSelected={onSelectThumbnail} width={552} height={200} />                        
                        </Form.Item>
                        <Form.Item name="title" label="Гарчиг:">
                            <Input />
                        </Form.Item>
                        <Form.Item name="outline" label="Outline:">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="content" label="Review:">
                            <Editor                                
                                apiKey='wpwv44irouwa2fnzez4rgccg20gz5bri6qmwlt4wbeuha01r'
                                initialValue=""
                                init={{
                                    height: 400,
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
                        </Form.Item>
                        <Button type="primary">Нийтлэх</Button>
                    </Form>
                </div> 
            </Modal>
        </div>
    )
}

export default ReviewModal