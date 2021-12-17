import { List, message, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"
import FilmScore from "../Film/FilmScore"

function InTheaterList (props) {

    const [films, setFilms] = useState()        

    useEffect(() => {                
        getFilms()        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps        

    function getFilms() {                
        let url = `${api.films}?order=${props.field}&length=5`
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

    return (
        <div className="container" style={{ padding: '0px 16px' }}>
            <List
                itemLayout="horizontal"
                dataSource={films}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            // avatar={
                            //     <a href={`/films/${item.id}/`}>
                            //         <img alt={item.title} src={item.poster} style={{ width: '48px', height: 'auto' }} />
                            //     </a>
                            // }
                            title={
                                <a href={`/films/${item.id}/`}>
                                    <Typography.Title level={5} style={{ margin: 0 }}>{item.title}</Typography.Title>                                    
                                </a>
                            }                                 
                        />
                        <div>
                            <FilmScore type="card" score={item.avg_score} />                            
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default InTheaterList