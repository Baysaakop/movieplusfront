import { Button, Result, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';
import './Profile.css'
import AccountDetail from './AccountDetail';

function Profile (props) {    
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()    

    useEffect(() => {        
        if (props.token && props.token !== null && !user) {
            getUser()
        }
    }, [props.token]) // eslint-disable-line react-hooks/exhaustive-deps

    function getUser () {
        setLoading(true)
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(res => {                                
            setUser(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }        

    return (
        loading ? (
            <div className="loading">
                <Spin tip="Ачааллаж байна..." />
            </div>
        ) : user ? (
            <div>                
                <div className="container">
                    <AccountDetail token={props.token} user={user} />                  
                </div>                
            </div>
        ) : (
            <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Result
                    status="403"
                    title="403"
                    subTitle="Уучлаарай, та нэвтэрсэн байх шаардлагатай."
                    extra={<Button type="primary" href="/login">Нэвтрэх</Button>}
                />
            </div>
        )      
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Profile)