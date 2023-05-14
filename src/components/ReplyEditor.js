import { message,Comment, Avatar, Form, Button, List, Input, Tooltip, Divider } from 'antd';
import React from 'react'
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import axios from "axios"

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} 回复`}
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={item => (
      <li>
        <Comment
          author={item.sender}
          avatar={<Avatar size="large" icon={<UserOutlined />} />}
          content={item.content}
          datetime={<Tooltip title={moment(item.time_stamp * 1000).format('YYYY-MM-DD HH:mm')}>
            <span>{moment(item.time_stamp * 1000).fromNow()}</span>
          </Tooltip>}
        />
        <Divider />
      </li>
    )}
  />
);

const ReplyAera = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea maxLength={32} rows={1} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        提交评论并支付gas
      </Button>
    </Form.Item>
  </>
);

export default class ReplyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      submitting: false,
      value: '',
    };
    this.blogId = props.blogId;
  }
  componentDidMount() {
    console.log(this.blogId);
    axios.get('http://localhost:5000/eth/api/v1.0/commentList', { params: { blogIndex: this.blogId } }).then(res => {
      this.setState({ comments: res.data });
    })

  }

  handleSubmit = () => {
    if (!this.state.value) {
      message.info('内容不能为空');
      return;
    }

    this.setState({
      submitting: true,
    });
    let data = new FormData();
    data.append('blogIndex', this.blogId);
    data.append('content', this.state.value);
    axios.post('http://localhost:5000/eth/api/v1.0/addComment', data).then(res => {
      message.success('更改区块状态成功');
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            sender: '刚刚回复',
            avatar: <p>{<Avatar size="large" icon={<UserOutlined />} />}</p>,
            content: <p>{this.state.value}</p>,
            time_stamp: moment() / 1000,
          },
          ...this.state.comments,
        ],
      });
    })
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
        <Comment
          avatar={<Avatar size="medium" icon={<UserOutlined />} />}
          content={
            <ReplyAera
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
        {comments.length > 0 && <CommentList comments={comments} />}
      </>
    );
  }
}
