import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { message, List, Spin } from "antd"
import FilmCard from "./FilmCard"
import { useHistory } from "react-router"

function FilmRow (props) {    
    // const [form] = Form.useForm()
    const history = useHistory()
    const [films, setFilms] = useState()        

    useEffect(() => {
        getFilms(props.item, props.action)        
    }, [props.item, props.action])

    function getFilms(user, action) {                
        axios({
            method: 'GET',
            url: `${api.films}?user=${user.id}&action=${action}&length=4`,
        }).then(res => {                                         
            setFilms(res.data.results)                        
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")            
        })        
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
            { films ? (                
                <div>
                    <List
                        grid={{
                            gutter: [16, 0],
                            xs: 2,
                            sm: 2,
                            md: 3,
                            lg: 4,       
                            xl: 4,       
                            xxl: 4,                            
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
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <Spin tip="Ачааллаж байна..." />
                </div>
            )}                             
        </div>
    )
} 

export default FilmRow