import React from 'react'
import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
const { Paragraph, Text } = Typography;

export default class UpdateResult extends React.Component {
    render() {
        let result = null
        if (this.props.location.state.success == false) {

            result = <Result
                status="error"
                title="上传失败"
                subTitle="请检查并排除相关问题"
                style={{ marginTop: 40, marginBottom: 40, marginLeft: 100, marginRight: 100, paddingTop: 150, paddingBottom: 50, backgroundColor: "#fff" }}
                extra={<Button key="buy" onClick={() => this.props.history.goBack()}>返回</Button>}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            可能会存在以下问题:
              </Text>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> 网络波动，请排除网络问题
                </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> 您的账户没有足够余额
                </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> 与钱包连接失败
                </Paragraph>
                </div>
            </Result>
        }
        else if (this.props.location.state.success == true) {
            result =
                <Result
                    status="success"
                    title="上传成功"
                    subTitle="博客已成功同步至区块链！"
                    style={{ marginTop: 40, marginBottom: 40, marginLeft: 100, marginRight: 100, paddingTop: 150, paddingBottom: 150, backgroundColor: "#fff" }}
                    extra={[
                        <Button type="primary" key="console">
                            <Link to={"/detailed/" + this.props.location.state.blogId}>去查看</Link>
                        </Button>,
                        <Button key="buy" onClick={() => this.props.history.goBack()}>
                            再写一篇
                        </Button>
                    ]}
                />
        }
        return result


    }
}