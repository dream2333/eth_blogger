import { Component } from 'react';
import { Layout, Menu} from 'antd';
import {
  PieChartFilled,
  DashboardFilled,
} from '@ant-design/icons';
import BlogList from './BlogList'

const { Header, Footer, Sider, Content } = Layout;

export default class BasicLayout extends Component {
  render() {
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh' }}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <PieChartFilled/>
              <span>首页</span>
            </Menu.Item>
            <Menu.Item key="2">
              <PieChartFilled/>
              <span>文章</span>
            </Menu.Item>
            <Menu.Item key="3">
              <PieChartFilled/>
              <span>首页</span>
            </Menu.Item>
            <Menu.Item key="4">
              <PieChartFilled/>
              <span>测试</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <BlogList/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}