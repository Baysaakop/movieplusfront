import { FormOutlined } from "@ant-design/icons"
import { Button, message, Pagination, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../../api"
import moment from 'moment'
import { useHistory } from "react-router"
import SeriesReview from "./SeriesReview"
import ReviewModalCreate from "../../Film/Review/ReviewModalCreate"

function SeriesReviews (props) {    
    const history = useHistory()
    const [reviews, setReviews] = useState()    
    const [page, setPage] = useState(1) 
    const [total, setTotal] = useState()
    const [visible, setVisible] = useState()

    useEffect(() => {        
        getReviews(props.film.id, 1)
    }, [props.film])

    function getReviews(id, page) {
        const url = api.reviews + "?series=" + id + "&page=" + page
        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'                
            }
        })
        .then(res => {                              
            setReviews(res.data.results)               
            setTotal(res.data.results.length)   
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }    

    function onPageChange (pageNum, pageSize) {        
        setPage(pageNum)
        getReviews(props.film.id, pageNum)
        // const params = new URLSearchParams(props.location.search)        
        // params.delete("page")        
        // if (pageNum > 1) {
        //     params.append("page", pageNum)
        // }
        // history.push(`/films?${params.toString()}`)      
    }


    function order(data) {
        return data.sort((a, b) => moment(b.created_at) - moment(a.created_at))
    }

    function showTotal() {
        return <Typography.Text style={{ fontWeight: 'bold' }}>Нийт {total}:</Typography.Text>;
    }  

    function onNewReviewClick () {
        if (props.user) {
            setVisible(true)
        } else {
            history.push("/login")
        }
    }

    function onHide () {
        getReviews(props.film.id, page)
        setVisible(false)
    }

    return (
        <div className="container film-reviews" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={4}>Сэтгэгдэл ({total})</Typography.Title>
                <Button icon={<FormOutlined />} type="dashed" onClick={onNewReviewClick}>Сэтгэгдэл бичих</Button>     
                { visible ? <ReviewModalCreate type="series" film={props.film} user={props.user} token={props.token} hide={onHide} /> : <></> }
            </div>
            { reviews && reviews.length > 0 ?  
                <div>
                    {
                        order(reviews).map(item => (
                            <SeriesReview             
                                key={item.id}
                                data={item}
                                user={props.user}       
                                film={props.film}
                                token={props.token}             
                                onDelete={() => getReviews(props.film.id, page)}
                            />
                        ))
                    }
                    <Pagination                         
                        defaultCurrent={page}
                        hideOnSinglePage={true}
                        total={total}
                        pageSize={24}
                        showSizeChanger={false}
                        showTotal={showTotal}
                        size="small"
                        style={{ marginTop: '24px' }}
                        onChange={onPageChange}                 
                    />         
                </div>
            : 
                <div>                    
                </div>
            }                                
        </div>      
    )
}

export default SeriesReviews