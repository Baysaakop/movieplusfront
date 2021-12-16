import { Form, Row, Col, Input, InputNumber, Radio, Select, Typography, DatePicker, Popconfirm, message, Button, Spin } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../../api"
import ImageUpload from '../../../components/ImageUpload'
import moment from "moment"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"

const { Search, TextArea } = Input
const { Option } = Select

function FilmUpdate (props) {
    const [form] = Form.useForm()   
    const [loading, setLoading] = useState()
    const [poster, setPoster] = useState()
    const [landscape, setLandscape] = useState()
    const [ratings, setRatings] = useState()
    const [genres, setGenres] = useState()
    const [films, setFilms] = useState()
    const [selection, setSelection] = useState()

    useEffect(() => {
        axios({
            method: 'GET',                        
            url: api.ratings
        })
        .then(res => {                        
            setRatings(res.data.results);            
        })        
        .catch(err => {
            console.log(err.message);
        }) 
        axios({
            method: 'GET',                        
            url: api.genres
        })
        .then(res => {                        
            setGenres(res.data.results);            
        })        
        .catch(err => {
            console.log(err.message);
        })        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    function onFinish (values) {              
        console.log(values)
        if (selection) {
            setLoading(true)       
            var formData = new FormData();        
            if (values.title && values.title !== selection.title) {
                formData.append('title', values.title)
            }            
            if (values.plot && values.plot !== selection.plot) {
                formData.append('plot', values.plot)
            }
            if (values.trailer && values.trailer !== selection.trailer) {
                formData.append('trailer', values.trailer)
            }
            if (values.duration && values.duration !== selection.duration) {
                formData.append('duration', values.duration)
            }
            if (values.releasedate && moment(values.releasedate).format("YYYY-MM-DD") !== moment(selection.releasedate).format("YYYY-MM-DD")) {
                formData.append('releasedate', moment(values.releasedate).format("YYYY-MM-DD"))
            }         
            if (values.is_released !== undefined && values.is_released !== selection.is_released) {
                formData.append('is_released', values.is_released)
            }
            if (values.in_theater !== undefined && values.in_theater !== selection.in_theater) {
                formData.append('in_theater', values.in_theater)
            }  
            if (values.rating && selection.rating && values.rating !== selection.rating.id.toString()) {
                formData.append('rating', values.rating)
            }  
            if (values.genres && selection.genres && values.genres !== getGenreIDs(selection.genres)) {
                formData.append('genres', values.genres)
            } 
            // if (description && description !== selection.description) {
            //     formData.append('description', description)
            // }
            if (poster && poster !== selection.poster) {
                formData.append('poster', poster)
            } 
            if (landscape && landscape !== selection.landscape) {
                formData.append('landscape', landscape)
            }       
            formData.append('token', props.token)         
            axios({
                method: 'PUT',
                url: `${api.films}/${selection.id}/`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${props.token}`            
                }
            }).then(res => {                        
                if (res.status === 200) {                      
                    message.info(`${selection.title} киног засварлалаа.`)
                    form.resetFields()                    
                    setPoster(undefined)
                    setLandscape(undefined)
                    setSelection(undefined)
                    setLoading(false)                                               
                }             
            }).catch(err => {   
                message.error("Амжилтгүй боллоо.")
                console.log(err)            
                setLoading(false)          
            })        
        } else {
            message.error("Кино сонгогдоогүй байна.")
        }       
    }

    function onDelete () {
        if (selection) {
            setLoading(true)                      
            axios({
                method: 'DELETE',
                url: `${api.films}/${selection.id}/`,                
                headers: {                    
                    'Authorization': `Token ${props.token}`            
                }
            }).then(res => {                                
                if (res.status === 204) {                      
                    message.warning(`${selection.title} кино устгагдлаа.`)
                    form.resetFields()                    
                    setPoster(undefined)
                    setLandscape(undefined)
                    setSelection(undefined)
                    setLoading(false)                                               
                }             
            }).catch(err => {   
                message.error("Амжилтгүй боллоо.")
                console.log(err)            
                setLoading(false)          
            })        
        } else {
            message.error("Кино сонгогдоогүй байна.")
        }       
    }

    function onPosterSelected (path) {        
        setPoster(path);
    }

    function onLandscapeSelected (path) {        
        setLandscape(path);
    }

    function getWidth() {
        if (window.screen.availWidth >= 1600) {
            return (window.screen.availWidth * 0.6) * 0.75 - 64
        } else if (window.screen.availWidth >= 1200) {
            return (window.screen.availWidth * 0.76) * 0.75 - 64
        } else if (window.screen.availWidth >= 992) {
            return (window.screen.availWidth - 24) * 0.75 - 64
        } else {
            return (window.screen.availWidth - 56)
        }
    }

    function getHeight() {
        if (window.screen.availWidth >= 1600) {
            return ((window.screen.availWidth * 0.6) * 0.75 - 64) / 3
        } else if (window.screen.availWidth >= 1200) {
            return ((window.screen.availWidth * 0.76) * 0.75 - 64) / 3
        } else if (window.screen.availWidth >= 992) {
            return ((window.screen.availWidth - 24) * 0.75 - 64) / 3
        } else {
            return (window.screen.availWidth - 56) / 3
        }
    }

    function getPosterWidth() {
        if (window.screen.availWidth >= 1200) {
            return (getWidth() / 4) - 16
        } else if (window.screen.availWidth >= 576) {
            return (getWidth() / 3) - 16
        } else {
            return getWidth()
        }
    }

    function getPosterHeight() {
       return (getPosterWidth() / 2) * 3
    }

    function onSearch(val) {                
        let url = `${api.films}?title=${val}`
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
        console.log(film)
        form.setFieldsValue({
            title: film.title,
            genres: film.genres ? getGenreIDs(film.genres) : undefined,
            rating: film.rating ? film.rating.id.toString() : undefined,
            releasedate: film.releasedate ? moment(film.releasedate) : undefined,
            duration: film.duration ? film.duration : undefined,
            plot: film.plot,
            trailer: film.trailer,
            is_released: film.is_released,
            in_theater: film.in_theater,
        })
        if (film.landscape) {
            setLandscape(film.landscape)
        } else {
            setLandscape(undefined)
        }
        if (film.poster) {
            setPoster(film.poster)
        } else {
            setPoster(undefined)
        }
        setSelection(film)        
    }

    function getGenreIDs(genres) {
        let result = []
        genres.forEach(genre => {
            result.push(genre.id.toString())
        })
        return result
    }

    return (
        loading ? (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        ) : (
            <div>
                <Typography.Title level={3}>Кино засах</Typography.Title>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <Search placeholder="Кино хайх" onSearch={onSearch} enterButton />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <Select
                            showSearch                                
                            placeholder="Кино сонгоно уу"                                                
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
                { selection ? (
                    <Form layout="vertical" form={form} onFinish={onFinish} style={{ marginTop: '24px' }}>               
                        <Row gutter={[16, 0]}>
                            <Col span={24}>
                                <Form.Item name="landscape" label="Өргөн зураг:">
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>           
                                        <div>
                                            <ImageUpload image={landscape} onImageSelected={onLandscapeSelected} width={getWidth()} height={getHeight()} />                        
                                        </div>                 
                                    </div>                               
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={8} xl={6}>
                                <Form.Item name="poster" label="Постер:">                               
                                    <ImageUpload image={poster} onImageSelected={onPosterSelected} width={getPosterWidth()} height={getPosterHeight()} />                        
                                </Form.Item>                   
                                <Form.Item name="is_released" label="Нээлтээ хийсэн:">                               
                                    <Radio.Group defaultValue={true}>
                                        <Radio value={true}>Тийм</Radio>
                                        <Radio value={false}>Үгүй</Radio>
                                    </Radio.Group> 
                                </Form.Item>     
                                <Form.Item name="in_theater" label="Театрт гарч буй:">                               
                                    <Radio.Group defaultValue={false}>
                                        <Radio value={true}>Тийм</Radio>
                                        <Radio value={false}>Үгүй</Radio>
                                    </Radio.Group>          
                                </Form.Item>                       
                            </Col>
                            <Col xs={24} sm={16} md={16} lg={16} xl={18}>
                                <Form.Item name="title" label="Нэр:" rules={[{ required: true, message: 'Та киноны нэрийг оруулна уу!' }]}>
                                    <Input />
                                </Form.Item>                        
                                <Row gutter={[16, 0]}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                                        <Form.Item name="genres" label="Төрөл жанр:">                        
                                            <Select
                                                showSearch
                                                mode="multiple"
                                                placeholder="Төрөл сонгоно уу"                                                
                                                optionFilterProp="children"                                
                                            >
                                                { genres ? (
                                                    <>
                                                        {genres.map(item => {
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
                                    </Col>
                                    <Col xs={24} sm={24} md={9} lg={9} xl={6}>
                                        <Form.Item name="rating" label="Насны ангилал:">                        
                                            <Select
                                                showSearch                                
                                                placeholder="Ангилал сонгоно уу"                                                
                                                optionFilterProp="children"                                
                                            >
                                                { ratings ? (
                                                    <>
                                                        {ratings.map(item => {
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
                                    </Col>
                                    <Col xs={24} sm={24} md={9} lg={9} xl={6}>
                                        <Form.Item name="releasedate" label="Нээлт:">
                                            <DatePicker style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={4}>
                                        <Form.Item name="duration" label="Хугацаа:">
                                            <InputNumber defaultValue={90} min={0} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>                                                            
                                </Row>
                                <Form.Item name="trailer" label="Трейлер:">
                                    <Input />
                                </Form.Item>                                
                                <Form.Item name="plot" label="Агуулга:">
                                    <TextArea rows={10} />
                                </Form.Item>  
                            </Col>                            
                        </Row>                                                                                                                                                                                                                      
                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Popconfirm title="Засах уу？" okText="Тийм" cancelText="Үгүй" onConfirm={form.submit}>
                                    <Button icon={<CheckOutlined />} type="primary" style={{ width: '160px' }}>
                                        Засах
                                    </Button>
                                </Popconfirm>
                                <Popconfirm title="Устгахдаа итгэлтэй байна уу？" okText="Тийм" cancelText="Үгүй" onConfirm={onDelete}>
                                    <Button danger icon={<CloseOutlined />} type="primary"  style={{ width: '160px' }}>
                                        Устгах
                                    </Button>
                                </Popconfirm>
                            </div>                                        
                        </Form.Item>                                       
                    </Form>
                ) : (
                    <></>
                )}            
            </div>
        )        
    )
}

export default FilmUpdate