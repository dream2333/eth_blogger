import React, { Component } from 'react'
import { Row, Col, List, Breadcrumb, Card, Divider, Affix, Skeleton, Button, Empty } from 'antd'
import { CalendarOutlined, WalletOutlined, MessageOutlined } from '@ant-design/icons';
import ChainInfo from './ChainInfo'
import axios from "axios"
import moment from 'moment';
import '../style/Home.css'
import '../style/Comm.css'
import { Link, Route } from "react-router-dom";


const CreateGuider = () => (
  <>
    <Empty
      style = {{marginTop:200}}
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={
        <span>
          链上暂无数据
      </span>
      }
    >
      <Link to="/editor/-1"><Button type="primary" >创建一个新的博客内容</Button></Link>
    </Empty>
  </>
)

export default class Home extends Component {
  state = {
    mylist: [],
    loading: true
  };


  componentDidMount() {

    axios.get('http://localhost:5000/eth/api/v1.0/blogList').then(res => {
      this.setState({ mylist: res.data, loading: false })
    })
    .catch(error => {
      this.props.history.push({ pathname: '/ERROR500' })
    });

  }

  render() {
    return (
      <div className="Home">
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                <Breadcrumb.Item>文章列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {this.state.loading ? <Card style={{ marginTop: 16 }}><Skeleton active /></Card> : (this.state.mylist.length == 0 ? <CreateGuider />:
              (<List
              split={false}
              itemLayout="vertical"
              dataSource={this.state.mylist}
              renderItem={item => (
                <List.Item>
                  <div className="site-card-border-less-wrapper">
                    <Card title={<div className="list-title"><Link to={'/detailed/' + item.id}>{item.title}</Link></div>} bordered={false} >
                      <div className="list-context">{item.abstract}</div>
                      <div className="list-icon">
                        <span style={{ paddingLeft: 0 }}><CalendarOutlined /> {moment(item.time_stamp * 1000).format("YYYY-MM-DD HH:mm")}</span>
                        <Divider type="vertical" />
                        <span><WalletOutlined />  {item.sender}</span>
                        <Divider type="vertical" />
                        <span><MessageOutlined /> {item.replys}</span>
                      </div>
                    </Card>
                  </div>
                </List.Item>
              )}
            />))}
          </Col>

          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4.5}>
            <Affix offsetTop={52}>
              <ChainInfo />
            </Affix>
          </Col>

        </Row>
      </div>
    )
  }
}

