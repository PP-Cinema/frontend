import { Layout, Card, Avatar, Space,Typography } from 'antd';
import { useContext } from 'react';
import { Redirect,useHistory } from 'react-router';
import { Navbar, Footer, Header} from '../../miscellanous';
import { UserContext} from '../../contexts';
import { PATHS, PANEL_TYPES } from '../../strings';
import { IdcardTwoTone, FilePdfTwoTone, VideoCameraTwoTone, GoldTwoTone } from '@ant-design/icons';
import './Panel.css'

const {Content} = Layout;
const {Title} = Typography;

const Panel = () =>
{
    const {accessToken, role} = useContext(UserContext);
    const history = useHistory();
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
                <Content>
                    <div className="main-panel">
                        <Title type={2} style={{alignSelf:'flex-start',paddingTop:40}}>Welcome back!</Title>
                        <div style={{paddingBottom:20,paddingTop:200}}>
                        <Card bordered={false} style={{display:'flex',justifyContent:'center',width:800}}>
                        {
                            PANEL_TYPES.map(pt=>
                            {
                                if(pt.key==='Employee' && role==='Employee') return '';
                                let icon;
                                switch(pt.key)
                                {
                                    case 'Employee':
                                        icon = <IdcardTwoTone/>
                                        break;
                                    case 'Performances':
                                        icon = <GoldTwoTone/>
                                        break;
                                    case 'Movies':
                                        icon = <VideoCameraTwoTone/>
                                        break;
                                    case 'Articles':
                                        icon = <FilePdfTwoTone/>
                                        break;
                                    default:
                                        break;
                                }
                                return (
                                    <Card.Grid hoverable={false} style={{width:'50%',boxShadow:'none',display:'flex',justifyContent:'center'}}>
                                        <Card hoverable={true} style={{width:200}} onClick={()=>history.push(pt.defaultPath)}>
                                            <Card.Grid style={{width:'40%',boxShadow:'none'}}><Avatar size='large' icon={icon} /></Card.Grid>
                                            <Card.Grid style={{width:'60%',boxShadow:'none'}}>{pt.name}</Card.Grid>
                                        </Card>
                                    </Card.Grid>)
                            }
                        
                            )
                        }
                        </Card>
                        </div>
                    </div>
                </Content>
                <Footer/>
            </Layout>
        );
    }

}

export default Panel;