import { useEffect, useState } from "react"
import axios from "axios"
import api from "../../api"
import { message, List, Typography } from "antd"
import moment from 'moment'

function BoxOffice (props) {
    
    const [films, setFilms] = useState()    

    useEffect(() => {        
        getFilms()        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps        

    function getFilms() {        
        let url = `${api.films}?order=-rating`
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
        <div>
            <List
                itemLayout="horizontal"
                dataSource={films ? films.slice(0, 3) : undefined}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <img alt={item.title} src={item.poster} style={{ width: '60px', height: 'auto' }} />
                        }
                        title={
                            <a href={`/films/${item.id}`}>
                                <Typography.Title level={5}>
                                    {item.title}
                                </Typography.Title>
                            </a>
                        }
                        description={
                            <div>
                                <div>
                                    <Typography.Text>Нээлт: {moment(item.releasedate).format("YYYY-MM-DD")}</Typography.Text>
                                </div>
                                <div>
                                    <Typography.Text>Орлого: ~~~</Typography.Text>
                                </div>
                            </div>
                        }
                    />
                </List.Item>
                )}
            />
        </div>
    )
}

export default BoxOffice;