import { useHistory, useLocation } from "react-router"
import React,{ useEffect, useState } from "react";
import { MovieService } from "../../services";
import { Layout, Button, Space, Typography, Card, Image } from "antd";
import { Header,Navbar,Footer } from "../../miscellanous";
import { ArrowLeftOutlined } from "@ant-design/icons";
import '../Home/Home.css';
import Paragraph from "antd/lib/typography/Paragraph";

const {Content} = Layout;
const {Title,Text} = Typography;



const MoviePage = () =>
{
    const location = useLocation();
    const [movie,setMovie] = useState({});
    const history = useHistory();
    const state = location.state? location.state.movieId : location.pathname

    const getMovie = async() =>
    {
        console.log(location.search.split('=')[1]);
        console.log(location.state);
        const {data} = location.state ? await MovieService.getMovie(location.state.movieId) : await MovieService.getMovie(Number(location.search.split('=')[1]));
        setMovie(data);
    }

    useEffect(()=>{getMovie()},[state]);

    return(
        <Layout className='layout'>
            <Header type="Home"/>
            <Navbar type="Home"/>
            <Content style = {{ padding: '0 50px', display:'flex',alignItems:'flex-start',justifyContent:'center', paddingTop: 50, paddingBottom: 50 }}>
                <Space size='large'>
                    <Button icon={<ArrowLeftOutlined/>} style={{justifySelf:'flex-start', alignSelf:'flex-start'}} size='large' shape='circle' type='default' onClick={()=>history.goBack()}/>
                    <div className='content-layout'>
                        <Card
                            title={<Title level={1} >{movie.title}</Title>}
                            extra={<Text strong style={{fontSize:'large'}}>{`Duration: ${movie.length}`}</Text>}
                            style={{minWidth:1200,minHeight:1000}}
                            headStyle={{textAlign:'left'}}
                            bordered={false}     
                        >
                            <Card.Grid style={{width:'38%', border: 0}}>
                                <Image width={400} height={400} src={movie.posterFilePath} style={{justifySelf:'flex-start'}}/>
                            </Card.Grid>
                            <Card.Grid hoverable={false} style={{width:'62%',minHeight:1000}}>
                                <Paragraph style={{fontSize: 'large'}}>
                                    {movie.description}
                                </Paragraph>
                            </Card.Grid>
                        </Card>
                    </div>
                </Space>
            </Content>
            <Footer className="footer"/>
        </Layout>
    )
}

export default MoviePage;