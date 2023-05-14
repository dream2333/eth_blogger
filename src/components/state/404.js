import { Result, Button } from 'antd';
import { Component, } from 'react'
import { Link } from 'react-router-dom'
export default class HTTP404 extends Component {
    render() {
        return (<Result
            style={{ marginTop: 40, marginBottom: 40, marginLeft: 100, marginRight: 100, paddingTop: 150, paddingBottom: 150, backgroundColor: "#fff" }}
            status="404"
            title="404"
            subTitle="对不起，未找到您需要的内容"
            extra={<Button type="primary"><Link to="/">返回主页</Link></Button>}
        />
        )
    }
}
