import { Button, Result } from "antd";

function PageNotFound (props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh' }}>
            <Result
                status="404"
                title="404" 
                subTitle="Уучлаарай, хуудас олдсонгүй."
                extra={<Button type="text" href="/" style={{ background: '#000', color: '#fff' }}>Буцах</Button>}
            />
        </div>
    )
}

export default PageNotFound