
import {Navbar, Footer, Header} from '../../miscellanous';
import { useEffect } from 'react';
import {Layout} from 'antd';
import './Home.css';

const {Content} = Layout;

const Home = () => {

    useEffect(() => {
        document.title=process.env.REACT_APP_MAIN_PAGE;
     }, []);
     
    return(
        <Layout className = "layout">
            <Header type="Home"/>
            <Navbar type="Home"/>
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