import React,{useContext, useEffect, useState} from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../contexts";
import { PATHS, REQUEST_STATUS } from "../../strings";
import { Navbar, Header,Footer, displayNotification } from "../../miscellanous";
import { Layout, Select,Card,Button,List,Typography} from 'antd';
import { MovieService, PerformanceService } from "../../services";
import moment from "moment";
import '../Panel/Panel.css';

const {Content} = Layout
const {Option} = Select;
const {Title} = Typography;

const DeletePerformances = () =>
{
    const {accessToken, role} = useContext(UserContext);
    const [movies,setMovies] = useState([]);
    const [movieSelected,setSelected] = useState(false);
    const [movieId, setId] = useState(0);
    const [refresh,setRefresh] = useState();

    const getMovies = async()=>
    {
        const {data} = await MovieService.getAllMovies();
        setMovies(data);
    }

    const PerformancesToDelete= () =>
    {
        const performances = movies.find(m=>m.id===movieId)?.performances;
        if(!performances) return;
        const toDelete = performances.filter(p=>moment(p.date).isBefore(moment()));
        return toDelete;
    }

    const DeletePerformances = async() =>
    {
        const performances = PerformancesToDelete();
        performances.forEach(async p=> {await PerformanceService.deletePerformance(p.id);setRefresh({});});
    }

    useEffect(()=>
    {
        getMovies(); 
    },[refresh]);

    useEffect(() => {
        document.title=process.env.REACT_APP_PANEL_PAGE;
     }, []);

    if(!accessToken)
    {
        return <Redirect to={PATHS.HOMEPAGE} />;
    }
    else
    {
        const movieSelect = movies.map((m)=>
        <Option key={m.id} value={m.id} title={m.title}>{m.title}</Option>);

        return(
            <Layout>
                <Header type="Panel"/>
                <Navbar type={role}/>
                <Content className="content-layout">
                    <Card
                        style={{minWidth:1200,minHeight:1000, paddingTop:25, paddingBottom: 25}}
                        bordered={false}
                    >
                        <Card.Grid hoverable={false} style={{ width: '25%', minHeight: 800, boxShadow:'none'}} key="movie-select">
                            <Card type='inner' bordered={false} title="Select a Movie" style={{minHeight: 150, width:250}}>
                                <Select showSearch style={{width: 250}} placeholder="Select a Movie" optionFilterProp="movie" 
                                filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={(values)=>{setId(values); setSelected(true)}}
                                >
                                    {movieSelect}
                                </Select>
                            </Card>
                            { movieSelected && <Button type='primary' danger onClick={DeletePerformances}>Delete Performances</Button>}
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{boxShadow:'none' ,width: '75%', minHeight: 800,display:'flex',flexDirection:'column'}} key="toDeleteList">
                            <Title level={3}>Outdated Performances</Title>
                            {
                                movieSelected &&  <List
                                pagination={
                                    {   onChange: page => {
                                        console.log(page);
                                      },
                                      pageSize: 10,
                                      position: 'top',
                                      style:{alignSelf:'center'}
                                    }}
                                dataSource={PerformancesToDelete()}
                                itemLayout='horizontal'
                                renderItem={item=>
                                    {
                                        console.log(item);
                                        return(
                                        <List.Item 
                                        >
                                            <List.Item.Meta 
                                                title={`ID: ${item.id}`} 
                                                description={`Date: ${moment(item.date).format('dddd, MMMM Do YYYY, HH:mm')}  Hall: ${item.hall.hallLetter}`} 
                                                style={{textAlign:'left',textIndent:30,whiteSpace:'pre-wrap'}}/>
                                        </List.Item>
                                        )
                                    }}
                                style={{width:'100%'}}
                            >
                            </List>
                            }
                        </Card.Grid>
                    </Card>
                </Content>
                <Footer/>
            </Layout>
        )
    }
}

export default DeletePerformances;