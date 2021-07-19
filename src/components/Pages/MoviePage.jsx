import { useHistory, useLocation } from "react-router"
import React,{ useEffect, useState } from "react";
import { MovieService } from "../../services";
import { Layout, Button, Space, Typography, Card, Image, Select, DatePicker } from "antd";
import { Header,Navbar,Footer,YoutubeEmbed } from "../../miscellanous";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PATHS } from "../../strings";
import '../Home/Home.css';
import Paragraph from "antd/lib/typography/Paragraph";
import moment from "moment";

const {Content} = Layout;
const {Title,Text} = Typography;



const MoviePage = () =>
{
    const location = useLocation();
    const [movie,setMovie] = useState({});
    const [date,setDate] = useState(moment());
    const [performances,setPerformances] = useState([]);
    const history = useHistory();
    const state = location.state? location.state.movieId : location.pathname

    const getMovie = async() =>
    {
        console.log(location.search.split('=')[1]);
        console.log(location.state);
        const {data} = location.state ? await MovieService.getMovie(location.state.movieId) : await MovieService.getMovie(Number(location.search.split('=')[1]));
        const datePerformances = data.performances.filter(p => moment(new Date(Date.parse(p.date))).date() === date.date());
        datePerformances.sort((a,b) => new Date(Date.parse(a.date)).getTime() - new Date(Date.parse(b.date)).getTime());
        setPerformances(datePerformances);
        setMovie(data);
    }

    useEffect(()=>{getMovie()},[state,date]);


    const now = moment();
    const weekLater = moment().add(7,'d');



    console.log(movie);

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
                            <Card.Grid style={{width:'38%', border: 0, boxShadow: 'none'}}>
                                <Image width={400} height={400} src={movie.posterFilePath} style={{justifySelf:'flex-start'}}/>
                                { movie.performances ? 
                                <Card type='inner' style={{minHeight:600}} bordered={false} title='Performances'>
                                        <div style={{paddingTop:20}}>
                                            <DatePicker
                                                disabledDate={(current)=> {
                                                    const tooEarly = now && current.diff(now,'d') > 6;
                                                    const tooLate = weekLater && weekLater.diff(current,'d') > 7;
                                                    return tooEarly || tooLate
                                                }
                                                }
                                                onChange={(values)=>{values ? setDate(values) : setDate(now)}}
                                                defaultPickerValue={now}
                                                defaultValue={now}
                                            />
                                        </div>
                                        <div style={{paddingTop:20}}>
                                        { 
                                            performances.map((p)=>
                                            {
                                                const date = new Date(Date.parse(p.date));
                                                let hours = date.getHours();
                                                let minutes = date.getMinutes();
                                                hours = ("0" + hours).slice(-2);
                                                minutes = ("0" + minutes).slice(-2);
                                                return (<Card.Grid hoverable={false} style={{boxShadow:'none', width:'15%'}}><a href={`${PATHS.PERFORMANCE_BOOK}?id=${p.id}`}>{`${hours}:${minutes}`}</a></Card.Grid>)
                                            })
                                        }
                                        </div>
                                </Card>    
                                : ""}
                            </Card.Grid>
                            <Card.Grid hoverable={false} style={{width:'62%',minHeight:1000, boxShadow: 'none'}}>
                                <Paragraph style={{fontSize: 'large'}}>
                                    {movie.description}
                                </Paragraph>
                                <YoutubeEmbed link='https://www.youtube.com/watch?v=d6hoxOKQOMI'/>
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