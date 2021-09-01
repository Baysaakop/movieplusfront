import React from 'react';
import { Button, Typography, Spin, message } from 'antd';
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './Login.css';

const Login = (props) => {
    // const [form] = Form.useForm();    
    
    // const onFinish = (values) => {                
    //     props.onAuth(values.email, values.password);               
    // };

    if (props.token) {
        message.info("Signed in.")
        return <Redirect to="/" />
    }

    if (props.error) {
        const errorMessage = props.error.message.toString()
        if (errorMessage.endsWith('400')) {
            message.error("Authentication failed! Username or password is incorrect.")
        }  
    }

    function authFacebook (response) {
        props.onAuthFacebook(response.accessToken)
        console.log(response)
    }

    function authGoogle (response) {
        console.log(response)
        props.onAuthGoogle(response.accessToken)
    }

    function failFacebook (response) {
        console.log(response)
    }


    function failGoogle (response) {
        console.log(response)
    }

    return (
        <div className="login-container">
            {props.loading ? (
                <div className="loading">
                    <Spin tip="Ачааллаж байна..." />
                </div>
            ) : (
                <div className="container" style={{ width: '500px' }}>
                    <div className="form-title" style={{ textAlign: 'center' }}>
                        <Typography.Title level={2} style={{ marginBottom: '24px' }}>
                            Сошиал хаягаар нэвтрэх   
                        </Typography.Title>
                        {/* <Typography.Title level={5} style={{ margin: 0 }}>
                            эсвэл <a href="/signup">шинээр бүртгүүлэх</a>
                        </Typography.Title> */}
                    </div>                                                        
                    {/* <Form                            
                        form={form}                                                    
                        name="login"
                        className="login"
                        layout="vertical"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}   
                        style={{ borderRadius: '5px', padding: '16px' }}                     
                    >
                        <Form.Item            
                            label="И-мэйл"                    
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'И-мэйл оруулна уу!',
                                },
                                {
                                    type: 'email',
                                    message: 'Зөв и-мэйл оруулна уу',
                                }
                            ]}
                        >
                            <Input prefix={<MailOutlined style={{ color: '#555' }} />} placeholder="И-мэйл" />
                        </Form.Item>

                        <Form.Item         
                            label="Нууц үг"                             
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Нууц үг оруулна уу!',
                            },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined style={{ color: '#555' }} />} placeholder="Нууц үг" />
                        </Form.Item>
                        <a href="/password/reset">Нууц үг мартсан?</a>
                        <Form.Item style={{ marginTop: '16px' }}>
                            <Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Нэвтрэх
                            </Button>
                        </Form.Item>                                              
                    </Form>          */}                    
                    <GoogleLogin                                                                                                            
                        clientId="296268545765-t0tu72rhuo4g2rpia6b8qirt08i6mea2.apps.googleusercontent.com"                            
                        render={renderProps => (
                            <Button size="large" danger type="primary" onClick={renderProps.onClick} icon={<GoogleOutlined style={{ fontSize: '18px' }} />} style={{ width: '100%', height: '48px', fontSize: '18px', marginBottom: '24px' }}>
                                Google ашиглан нэвтрэх
                            </Button>
                        )}
                        onSuccess={authGoogle}              
                        onFailure={failGoogle}            
                        // cookiePolicy={'single_host_origin'}
                        // isSignedIn={true}          
                    />
                    <FacebookLogin
                        cssClass="login-facebook"
                        icon={<FacebookFilled style={{ fontSize: '18px' }} />}
                        textButton={<span style={{ marginLeft: '8px' }}>Facebook ашиглан нэвтрэх</span>}
                        appId="833020084024822"
                        fields="name,email,picture"                                    
                        callback={authFacebook}                                
                        onFailure={failFacebook}                            
                    />                     
                </div>
            )}  
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,        
        token: state.token,
        error: state.error,
        created: state.created
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.authLogin(email, password)),
        onAuthFacebook: (access_token) => dispatch(actions.authFacebook(access_token)),
        onAuthGoogle: (access_token) => dispatch(actions.authGoogle(access_token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);