
import {Navbar} from './Navbar';
import {Layout} from 'antd';
import {Footer} from '../../miscellanous/Footer';
import './Home.css';

const {Content} = Layout;

const Home = () => {
    return(
        <Layout className = "layout">
            <Navbar/>
            <Content style = {{ padding: '0 50px' }}>
                <div className="content-layout">
                    <h1>Work in progress</h1>
                </div>
            </Content>
            <Footer className="footer"/>
        </Layout>
    );
};

export default Home;