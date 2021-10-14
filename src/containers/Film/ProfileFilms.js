import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { message, List, Pagination, Spin, Typography } from "antd"
import FilmCard from "./FilmCard"
import { useHistory } from "react-router"

function ProfileFilms (props) {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [films, setFilms] = useState()
    const [page, setPage] = useState(1)    
    const [total, setTotal] = useState()

    useEffect(() => {
        getFilms(props.user, props.action, page)
    }, [props.user, props.action, page])

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
        return props.user.profile.film_scores.find(x => x.film === film).user_score
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