import React,{Component} from 'react'
import '../style/Header.css'
import {
    HomeOutlined,
    EditOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { Row, Col, Menu } from 'antd'
import { Link } from 'react-router-dom'


export default class Header extends Component {
    render() {
        return (<div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo"><Link to="/">Blogger</Link></span>
                    <span className="header-txt">基于区块链的博客系统</span>
                </Col>

                <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal">
                        <Menu.Item key="home">
                            <HomeOutlined />
                            <Link to="/">文章首页</Link>
                        </Menu.Item>
                        <Menu.Item key="addBlog">
                            <EditOutlined />
                            <Link to="/editor/-1">写博客</Link>
                        </Menu.Item>
                        <Menu.Item key="readBlog">
                            <SmileOutlined />
                            <Link to="/detailed/0">读博客</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>)
    }
}
