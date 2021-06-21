import React, {useContext, useState, useEffect} from "react";
import { Redirect, useHistory } from "react-router";
import { Navbar,Header,Footer } from "../../miscellanous";
import { UserContext } from "../../contexts";
import { PATHS, EMPLOYEE_MODES } from "../../strings";
import { Layout, Space, Card, Button } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { MovieService } from "../../services";

const {Content} = Layout;
const {Meta} = Card;

const ViewMovies = () =>
{
    const history = useHistory();
    const {accessToken, role} = useContext(UserContext);
    const [movies,setMovies] = useState([]);
    const [refresh,setRefresh] = useState();

    const getMovies = async()=>
    {
        const {data} = await MovieService.getAllMovies();
        setMovies(data);
    }

    //useEffect(() => {getMovies()},[refresh]);

    if(!accessToken)
    {
        return <Redirect to={PATHS.HOMEPAGE} />;
    }
    else
    {
        const movieCards = movies.map((m)=>(
            <Card 
                style={{width:300}} 
                cover={<img src={m.posterFilePath} alt='Missing poster'/>}
                actions={[
                    <DeleteOutlined key='delete' danger disabled/>,
                    <EditOutlined key='edit' disabled/>,
                    <PlusOutlined key='performance' disabled/>
                ]}
                >
                    <Meta title={m.title} description={`Length: ${m.length}\n Description: ${m.description ? `${m.description}`: ''}`} />
            </Card>
        ));
        return(
            <Layout>
                <Header type="Panel"/>
                <Navbar type={role}/>
                <Content className="content-layout" style={{display:'flex',alignItems:'flex-start', paddingTop: 50}}>
                    <Space size='large' wrap>
                        <Card key='Add new' bordered={false}>
                            {movieCards}
                            <Button type='dashed' icon={<PlusOutlined/>} onClick={() => history.push(EMPLOYEE_MODES.find(({key}) => key==='add-movie').path)}>
                                Add new movie
                            </Button>
                        </Card>
                    </Space>
                </Content>
                <Footer/>
            </Layout>
        );
    }
}


export default ViewMovies;