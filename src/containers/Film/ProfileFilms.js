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
        getFilms(props.item, props.action, page)
        // getGenres()
    }, [props.item, props.action, page])

    function getFilms(user, action, page) {        
        setLoading(true)        
        axios({
            method: 'GET',
            url: `${api.films}?user=${user.id}&action=${action}&page=${page}`,
        }).then(res => {                                         
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
        let items = props.item.profile.film_scores.filter(x => x.film === film)        
        if (items.length > 0) {
            return items[0].user_score
        }
        return undefined
    }

    function getIsLiked(film) {
        let items = props.item.profile.films_liked.filter(x => x === film)        
        if (items.length > 0) {
            return true
        }
        return undefined
    }

    return (
        <div>
            { loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : (
                <div>                    
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
                                <FilmCard                                     
                                    film={film} 
                                    user={props.user} 
                                    token={props.token} 
                                    history={history} 
                                    userScore={getScore(film.id)}
                                    userLiked={getIsLiked(film.id)}
                                />
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