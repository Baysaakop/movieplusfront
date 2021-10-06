import { FormOutlined } from "@ant-design/icons"
import { Button, message, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../../api"
import moment from 'moment'
import FilmReview from "./FilmReview"

function FilmReviews (props) {    
    const [reviews, setReviews] = useState()    

    useEffect(() => {        
        getReviews(props.film)
    }, [props.film])

    function getReviews(id) {
        const url = api.reviews + "?film=" + id
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                                   
            setReviews(res.data.results)                  
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }    

    function order(data) {
        return data.sort((a, b) => moment(b.created_at) - moment(a.created_at))
    }

    return (
        <div className="container film-reviews" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={4}>Reviews ({reviews ? reviews.length : 0})</Typography.Title>
                {props.user ? (
                    <Button href={`/writereview/${props.film}/`} icon={<FormOutlined />} type="dashed">Review бичих</Button>                              
                ) : (
                    <></>
                )}
            </div>
            { reviews && reviews.length > 0 ?  
                <div>
                    {
                        order(reviews.slice(0, 3)).map(item => (
                            <FilmReview             
                                key={item.id}
                                data={item}
                                user={props.user}       
                                token={props.token}             
                                // onDelete={() => getReviews(props.film)}
                            />
                        ))
                    }
                    <div style={{ textAlign: 'end', marginTop: '8px' }}>
                        <Button href={`/reviews?film=${props.film}`} type="primary">Бүгд...</Button>
                    </div>
                </div>
            : 
                <div>                    
                </div>
            }                                
        </div>      
    )
}

export default FilmReviews