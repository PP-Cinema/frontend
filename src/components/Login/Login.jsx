import {PageHeader,Layout} from 'antd';
import {Footer} from '../../miscellanous/Footer';
import { LoginForm } from './LoginForm';
import './Login.css';

const { Content} = Layout;


const Login = () =>
{
    return(
        <Layout className ="layout">
            <PageHeader title="Superkino Employee Login Panel" style ={{background:'darkgrey'}}/>
            <Content style={{ padding: '0 50px' }}>
                <div className="login-content">
                    <h3>Please put your credentials in order to access the maintenance</h3>
                    <LoginForm/>
                </div>
            </Content>
            <Footer className="footer"/>
        </Layout>
    )
}

export default Login;