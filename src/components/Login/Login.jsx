import {PageHeader,Layout,Form, Input, Button} from 'antd';
import {Footer} from '../../miscellanous/Footer';
import './Login.css';

const { Content} = Layout;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };


const Login = () =>
{
    return(
        <Layout className ="layout">
            <PageHeader title="Superkino Employee Login Panel" style ={{background:'darkgrey'}}/>
            <Content style={{ padding: '0 50px' }}>
                <div className="login-content">
                    <h3>Please put your credentials in order to access the maintenance</h3>
                    <Form {...layout} className="form-layout" name="basic">
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                        <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <Footer className="footer"/>
        </Layout>
    )
}

export default Login;