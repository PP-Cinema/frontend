import {Navbar, Footer, Header} from '../../miscellanous';
import React, { useState, useEffect} from "react";
import { Layout,Card,DatePicker, Pagination, Row, Col} from "antd";
import { MovieService } from "../../services";
import '../Home/Home.css';
import { PATHS } from '../../strings';
import moment from 'moment';

const {Content} = Layout;


const PerformancesPage = () => {

    const [movies,setMovies] = useState([]);
    const [page,setPage] = useState(1);
    const [totalCount,setTotalCount] = useState(0);
    const [date,setDate] = useState(moment());
    const itemsPerPage = 8;
    const halfItems = 4;

    const getMovies = async()=>
    {
        const {data} = await MovieService.getPages((page-1),itemsPerPage);
        setMovies(data);
    }

    const getCount = async()=>
    {
        const {data} = await MovieService.getTotalCount(itemsPerPage);
        setTotalCount(data);
    }


    useEffect(() => {getCount(); getMovies()},[page]);
    useEffect(() => {
        document.title=process.env.REACT_APP_MAIN_PAGE;
     }, []);

    const movieCards = movies ? movies.map((m)=>(
        <Card
            key={m.id} 
            style={{width:300}}
            title={m.title}
            headStyle={{textAlign:'center'}}
            extra={<a href={`${PATHS.MOVIE_VIEW}?id=${m.id}`}>View</a>}
        >
        { m.performances ?  
            m.performances
                .filter(p => moment(new Date(Date.parse(p.date))).date() === date.date())
                    .sort((a,b) => new Date(Date.parse(a.date)).getTime() - new Date(Date.parse(b.date)).getTime())
                        .map((p)=>
                        {
                            const pDate = new Date(Date.parse(p.date));
                            let hours = pDate.getHours();
                            let minutes = pDate.getMinutes();
                            hours = ("0" + hours).slice(-2);
                            minutes = ("0" + minutes).slice(-2);
                            return (
                                <Card.Grid hoverable={false} style={{boxShadow:'none', width:'15%'}}>
                                    {moment(pDate).isAfter(moment()) ? <a href={`${PATHS.PERFORMANCE_BOOK}?id=${p.id}`}>{`${hours}:${minutes}`}</a> : <s>{`${hours}:${minutes}`}</s>}
                                </Card.Grid>
                            )
                        }): ''
        }
        </Card>)) : '';

    const firstHalfMovies = movieCards ? movieCards.slice(0,halfItems).map((mc)=> <Col span={6}>{mc}</Col>) : '';
    const secondHalfMovies = movieCards ? movieCards.slice(halfItems,movieCards.length).map((mc)=> <Col span={6}>{mc}</Col>) : '';

    const now = moment();
    const weekLater = moment().add(7,'d');

    return(
        <Layout className = "layout">
            <Header type="Home"/>
            <Navbar type="Home"/>
            <Content style = {{ padding: '0 50px', display:'flex',alignItems:'flex-start',justifyContent:'center', paddingTop: 50, paddingBottom: 50 }}>
                <div className="reservations-layout">
                        <div style={{paddingTop:20,alignSelf:'flex-start',paddingLeft:50}}>
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
                                    size = 'large'
                                />
                        </div>
                    <Row gutter={[24,64]} style={{paddingTop: 200,paddingLeft:150,paddingRight:100,minWidth:1200}}>
                        {firstHalfMovies}
                        {secondHalfMovies}
                    </Row>
                </div>
            </Content>
            <Pagination style={{paddingTop:10, paddingBottom:5, alignSelf:'center'}} defaultCurrent={page} defaultPageSize={itemsPerPage} total={(totalCount)*itemsPerPage} onChange={async value=>{ setPage(value);}}/>
            <Footer className="footer"/>
        </Layout>
    );
};

export default PerformancesPage;