import React, { Component, } from 'react'
import { Row, Col, Breadcrumb, Affix, Button, Card, Divider, Spin, Modal, message } from 'antd'
import { Link } from "react-router-dom";
import '../style/Detailed.css'
import ReplyEditor from './ReplyEditor'
import { CalendarOutlined, WalletOutlined, FieldNumberOutlined, EditOutlined, CommentOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from "axios"
import moment from 'moment';

export default class Detailed extends Component {
  state = {
    blogDetail: {
      title: "没有发现文章哦～",
      content: "没有发现文章哦～",
      sender: "来自火星",
      id: -1,
      time_stamp: 0
    },
    editable:false
  }


  componentDidMount() {
    axios.get('http://localhost:5000/eth/api/v1.0/blog', { params: { id: this.props.match.params.id } }).then(res => {
      this.setState({ blogDetail: res.data })
      axios.get('http://localhost:5000/eth/api/v1.0/getWalletInfo').then(res => {
        this.setState({ editable: (res.data.sender == this.state.blogDetail.sender)})
    })
    }).catch(error => {
      console.log(error)
      this.props.history.push({ pathname: '/ERROR500' })
    });

  }

  showDeleteConfirm = (id) => {
    Modal.confirm({
      title: '确认删除此项目吗?',
      icon: <DeleteOutlined />,
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: () => {
        this.handleOk(id)//确认按钮的回调方法，在下面
      }
      ,
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  //删除的弹出框的确认按钮,执行删除操作
  handleOk = (id) => {
    let params = { id: id };
    axios.get('http://localhost:5000/eth/api/v1.0/delete', { params: { id: this.props.match.params.id } }).then(res => {
      console.log(this.state)
      this.props.history.push({ pathname: '/'})
      message.success("删除成功！")
    })
      .catch(error => {
        this.props.history.push({ pathname: '/ERROR500' })
      });
  };

  updateHandle = () =>{
    this.props.history.push({ pathname: '/editor/'+this.state.blogDetail.id })
  }

  render() {
    return (
      <div>
        <Row className="comm-main" type="flex" justify="center">
          {(this.state.blogDetail.id != -1) && (this.state.editable) && <Affix offsetTop={50}>
            <div style={{ marginTop: 25, marginRight: 10 }}>
              <Button type="primary" shape="circle" icon={<EditOutlined />} size="large" onClick={() => {this.updateHandle()}}/><br />
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} size="large" style={{ marginTop: 15 }} onClick={() => this.showDeleteConfirm(1)} /><br />
            </div>
          </Affix>}
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <Card style={{ padding: 30 }}>
                <Breadcrumb>
                  <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                  <Breadcrumb.Item>{this.state.blogDetail.title}</Breadcrumb.Item>
                </Breadcrumb>
                <Spin spinning={this.state.blogDetail.id < 0} tip="正在从链上读取...">
                  <div>
                    <div className="detailed-title">
                      {this.state.blogDetail.title}
                    </div>

                    <div className="list-icon center">
                      <span><CalendarOutlined /> {moment(this.state.blogDetail.time_stamp * 1000).format("YYYY-MM-DD HH:mm")}</span>
                      <span><WalletOutlined /> {this.state.blogDetail.sender}</span>
                      <span><FieldNumberOutlined /> {this.state.blogDetail.id}</span>
                    </div>

                    <div className="detailed-content" >
                      <ReactMarkdown
                        source={this.state.blogDetail.content}
                        escapeHtml={false}
                      />
                    </div>
                    <Divider />
                  </div>
                </Spin>
                {(this.state.blogDetail.id != -1) && <ReplyEditor blogId={this.props.match.params.id} />}
              </Card>
            </div>
          </Col>

          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Affix offsetTop={60}>
              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                <MarkNav
                  updateHashAuto={false}
                  className="article-menu"
                  source={this.state.blogDetail.content}
                />
              </div>
            </Affix>

          </Col>
        </Row>
      </div>
    )
  }
}