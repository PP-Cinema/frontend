import {Layout, Card} from 'antd';
import { useEffect } from 'react';
import {Footer,Header} from '../../miscellanous';
import { LoginForm } from './LoginForm';
import './Login.css';

const { Content} = Layout;


const Login = () =>
{

    useEffect(() => {
        document.title=process.env.REACT_APP_LOGIN_PAGE;
     }, []);
    return(
        <Layout className ="layout">
            <Header type="Login"/>
            <Content style={{ padding: '0 50px' }}>
                <div className="login-content">
                <Card title="Please put your credentials" style={{width: 500}}>
                    <LoginForm/>
                </Card>
                </div>
            </Content>
            <Footer className="footer"/>
        </Layout>
    )
}

export default Login;