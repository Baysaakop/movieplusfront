import { UserOutlined } from "@ant-design/icons"
import { Typography, Avatar, Form, Input, Button } from "antd"
import ReviewComment from "./ReviewComment"

function ReviewComments (props) {

    const [form] = Form.useForm()
    // const [comments, setComments] = useState()    

    // useEffect(() => {        
    //     getComments(props.review)
    // }, [props.review])

    // function getComments(id) {
    //     const url = api.comments + "?review=" + id
    //     axios({
    //         method: 'GET',
    //         url: url,
    //         headers: {
    //             'Content-Type': 'application/json'                
    //         }
    //     })
    //     .then(res => {                            
    //         setComments(res.data.results)                  
    //     })
    //     .catch(err => {
    //         message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
    //     })
    // }

    // function onFinish (values) {        
    //     if (!props.user || !props.token) {
    //         message.error("Та эхлээд нэвтэрсэн байх шаардлагатай.")            
    //     } else {
    //         axios({
    //             method: 'POST',
    //             url: `${api.comments}/`,
    //             data: {                    
    //                 film: props.film,
    //                 comment: values.comment,                    
    //                 token: props.token,
    //             },
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Token ${props.token}`
    //             }
    //         }).then(res => {                                 
    //             form.resetFields()
    //             getComments(props.film)            
    //         }).catch(err => {
    //             console.log(err.message)            
    //         })
    //     }        
    // }

    // function order(data) {
    //     return data.sort((a, b) => moment(b.created_at) - moment(a.created_at))
    // }

    return (
        <div>
            <div className="container comment-section">
                <Typography.Title level={3}>Сэтгэгдэл (3)</Typography.Title>
                { props.user ? (
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <div>               
                            {props.user.profile.avatar ? (
                                <Avatar 
                                    className="profile-icon"
                                    size="large"                       
                                    src={props.user.profile.avatar}                                                                                          
                                />
                            ) : (
                                <Avatar 
                                    className="profile-icon"
                                    size="large"                       
                                    icon={<UserOutlined />}                            
                                    style={{ background: '#2c3e50' }}                                                              
                                />
                            )}                   
                        </div>
                        <div style={{ marginLeft: '12px', width: '100%' }}>
                            <Form form={form}>
                                <Form.Item name="comment" rules={[{ required: true, message: 'Хоосон коммент оруулах боломжгүйг анхаарна уу.' }]} style={{ marginBottom: '8px' }}>
                                    <Input.TextArea rows={4} placeholder="Сэтгэгдэл бичих..." style={{ width: '100%' }} />                    
                                </Form.Item>
                                <Button size="small" type="primary" onClick={form.submit}>Оруулах</Button>                        
                            </Form>
                        </div>
                    </div>   
                ) : (
                    []
                )}   
                {/* <ReviewComment             
                    key={1}
                    data={item}
                    user={props.user}       
                    token={props.token}             
                    onDelete={() => getComments(props.film)}
                /> */}
                {/* <ArticleComment score={70} name="Chandler Bing" date="2020 оны 7 сарын 13" img="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.6435-9/87077813_2744961182284766_328801625072205824_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PSzog0fgG9YAX-iRSiR&_nc_ht=scontent.fuln1-2.fna&oh=9daf9e48a7cca1a1e98a2ac53fc1175c&oe=61437DDC" text="This film is awesome on every level. It captivated me from start to finish with its humour, engaging story and incredible special effects. Idris holds the show together like the pro he is and all of the characters shine as individuals." />
                <ArticleComment score={50} name="John Doe" date="2020 оны 1 сарын 25" img="https://www.w3schools.com/howto/img_avatar.png" text="No one is safe, and decency is thrown out the window. Not since Deadpool has a movie ever been so f****d up. Though Deadpool wandered more into the sexual and scatological terrain, The Suicide Squad, instead, blurs the line between cartoon violence and gory realism." />
                <ArticleComment score={90} name="Jane Jones" date="2019 оны 10 сарын 25" img="https://www.w3schools.com/bootstrap4/img_avatar4.png" text="At times, The Suicide Squad feels less like a movie than a mission statement from a director. Behold, look what I can do with a budget and all the comic book characters I can play with. But, the unexpected heart at the center of the film, a sneaky anti-imperialist bent, and Gunn’s wild visual leaps make The Suicide Squad a bloody, gory delight." /> */}
            </div>
        </div>
    )
}

export default ReviewComments