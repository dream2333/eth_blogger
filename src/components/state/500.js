import { Result, Button } from 'antd';
import { Component, } from 'react'
import { Link } from 'react-router-dom'
export default class HTTP404 extends Component {
    render() {
        return (
            <Result
                style={{ marginTop: 40, marginBottom: 40, marginLeft: 100, marginRight: 100, paddingTop: 150, paddingBottom: 150, backgroundColor: "#fff" }}
                status="500"
                title="500"
                subTitle="对不起，连接发生了一些错误"
                extra={<Button type="primary"><Link to="/">返回主页</Link></Button>}
            />)
    }
}
