import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Row, Col, Breadcrumb, Input, Divider, Button, message } from 'antd'
import '../style/Editor.css'
import ReactMarkdown from 'react-markdown'
import { Link } from "react-router-dom";
import axios from "axios"

class Editor extends React.Component {
  state = {
    textValue: "* 此处为文本测试\n" +
      "* 您上传的文章将被永存至以太坊及ipfs之上\n" +
      "* 提交需耗费gas费用\n",
    title: ""
  };

  componentDidMount() {
    if (this.props.match.params.id != -1) {
      axios.get('http://localhost:5000/eth/api/v1.0/blog', { params: { id: this.props.match.params.id } }).then(res => {
        this.setState({ textValue: res.data.content, title: res.data.title })
      }).catch(error => {
        console.log(error)
        this.props.history.push({ pathname: '/ERROR500' })
      });
    }
  }

  blogHandleChange = value => {
    this.setState({ textValue: value });
  };

  titleHandleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  submitChange = () => {
    if (this.state.textValue == "") {
      message.info('内容不能为空');
      return;
    }

    if (this.state.title == "") {
      message.info('标题不能为空');
      return;
    }
    let data = new FormData();
    data.append('title', this.state.title);
    data.append('content', this.state.textValue);
    if (this.props.match.params.id == -1) {
      axios.post('http://localhost:5000/eth/api/v1.0/addBlog', data).then(res => {
        message.success('更改区块状态成功');
        axios.get('http://localhost:5000/eth/api/v1.0/getCount').then(res => {
          this.props.history.push({ pathname: '/update', state: { success: true, blogId: res.data.count - 1 } })
        })
      })
        .catch(error => {
          this.props.history.push({ pathname: '/update', state: { success: false } })
        });
    }
    else {
      data.append('index', this.props.match.params.id);
      axios.post('http://localhost:5000/eth/api/v1.0/updateBlog', data).then(res => {
        message.success('更改区块状态成功');
        this.props.history.push({ pathname: '/update', state: { success: true, blogId: this.props.match.params.id} })
      })
        .catch(error => {
          this.props.history.push({ pathname: '/update', state: { success: false } })
        });
    }
  };

  render() {
    return (
      <div className="Editor">
        <Row className="blog" type="flex" justify="center">
          <Col xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                <Breadcrumb.Item>文章编辑器</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="blog-left">
              <Input className="title-input" size="large" maxLength={32} value={this.state.title} placeholder="请在此输入标题" bordered={false} onChange={this.titleHandleChange} />
              <Divider className="title-divider" />
              <ReactMarkdown className="editor-content"
                children={this.state.textValue}
              />
              <SimpleMDE
                id="your-custom-id"
                value={this.state.textValue}
                options={{
                  spellChecker: false,
                  maxHeight: "300px",
                  toolbar: [
                    'bold',
                    'italic',
                    'heading',
                    '|',
                    'quote',
                    'code',
                    'table',
                    'horizontal-rule',
                    'unordered-list',
                    'ordered-list',
                    '|',
                    'link',
                    'image',
                    '|',
                    'side-by-side',
                    'fullscreen',
                  ]
                }}
                onChange={this.blogHandleChange}
              />
              <Button type="primary" onClick={this.submitChange}>提交</Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Editor