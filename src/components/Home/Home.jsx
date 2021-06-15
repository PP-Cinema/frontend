
import {Navbar} from './Navbar';
import {Layout} from 'antd';
import {Footer} from './Footer';
import './Home.css';

const {Content} = Layout;

const Home = () => {
    return(
        <Layout>
            <Navbar/>
            <Content>
                <h1>Super strona</h1>
            </Content>
            <Footer className="footer"/>
        </Layout>
    );
};

export default Home;