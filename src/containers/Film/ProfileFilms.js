import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { message, List, Pagination, Spin, Typography } from "antd"
import FilmCard from "./FilmCard"
import { useHistory } from "react-router"

function ProfileFilms (props) {
    const history = useHistory()
    // const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [films, setFilms] = useState()
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()
    // const [genres, setGenres] = useState()  

    useEffect(() => {
        getFilms(props.user, props.action, page)
        // getGenres()
    }, [props.user, props.action, page])

    function getFilms(user, action, page) {        
        setLoading(true)        
        axios({
            method: 'GET',
            url: `${api.films}?user=${user.id}&action=${action}&page=${page}`,
        }).then(res => {                             
            console.log(res.data.results)
            setFilms(res.data.results)
            setTotal(res.data.count)
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")
            setLoading(false)
        })        
    }

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
    }

    function showTotal() {
        return <Typography.Text style={{ fontWeight: 'bold' }}>Нийт {total}:</Typography.Text>;
    }  

    function getScore(film) {
        return props.user.profile.film_scores.find(x => x.film === film).user_score
    }

    // function getGenres() {
    //     axios({
    //         method: 'GET',                        
    //         url: api.genres
    //     })
    //     .then(res => {                        
    //         setGenres(res.data.results);            
    //     })        
    //     .catch(err => {
    //         console.log(err.message);
    //     })        
    // }

    // function onSelectGenre (id) {
        
    // }

    // function onSelectOrder (value) {
            
    // }

    return (
        <div>
            { loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : (
                <div>
                    {/* <div>
                        <Form form={form} layout="vertical">
                            <Row gutter={[16, 0]}>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item name="genre" label={<Typography.Title level={5} style={{ margin: 0 }}>Төрөл</Typography.Title>}>
                                        <Select defaultValue={0} onSelect={onSelectGenre} style={{ width: '100%'}}>
                                            <Select.Option key={0} value={0}>Бүгд</Select.Option>            
                                            { genres ? genres.map(g => (
                                                <Select.Option key={g.id} value={g.id}>{g.name}</Select.Option>
                                            )) : []}                            
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Form.Item name="order" label={<Typography.Title level={5} style={{ margin: 0 }}>Эрэмбэлэх</Typography.Title>}>
                                        <Select defaultValue="-created_at" onSelect={onSelectOrder} style={{ width: '100%'}}>
                                            <Select.Option value="-created_at">Шинээр нэмэгдсэн</Select.Option>                            
                                            <Select.Option value="-releasedate">Нээлтийн огноо</Select.Option>
                                            <Select.Option value="-avg_score">Үнэлгээ</Select.Option>                    
                                        </Select>
                                    </Form.Item>
                                </Col>                                                
                            </Row>
                        </Form>
                    </div> */}
                    <List
                        grid={{
                            gutter: [16, 0],
                            xs: 2,
                            sm: 3,
                            md: 4,
                            lg: 6,
                            xl: 6,
                            xxl: 6,
                        }}
                        dataSource={films}
                        renderItem={film => (
                            <List.Item key={film.id}>
                                <FilmCard action={props.action} score={props.action === "scores" ? getScore(film.id) : 0} film={film} user={props.profile} token={props.token} history={history} />
                            </List.Item>
                        )}
                    />      
                    <Pagination                         
                        defaultCurrent={page}
                        total={total}
                        pageSize={24}
                        showSizeChanger={false}
                        showTotal={showTotal}
                        onChange={onPageChange}                 
                    />     
                </div>
            )}                             
        </div>
    )
} 

export default ProfileFilms