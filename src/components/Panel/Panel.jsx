import { Layout } from 'antd';
import { useContext } from 'react';
import { Redirect } from 'react-router';
import { Navbar, Footer, Header} from '../../miscellanous';
import { UserContext} from '../../contexts';
import { PATHS } from '../../strings';
import './Panel.css'

const {Content} = Layout;

const Panel = () =>
{
    const {accessToken, role} = useContext(UserContext);
    if(!accessToken)
    {
        return <Redirect to={PATHS.HOMEPAGE} />;
    }
    else
    {
        return(
            <Layout>
                <Header type="Panel"/>
                <Navbar type={role}/>
                <Content className="content-layout">

                </Content>
                <Footer/>
            </Layout>
        );
    }

}

export default Panel;