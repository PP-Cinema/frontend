import {Navbar, Footer, Header} from '../../miscellanous';
import React, { useState, useEffect} from "react";
import { Layout,Card,Space, Pagination,Tooltip} from "antd";
import { MovieService } from "../../services";
import { ArrowRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import '../Home/Home.css';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../../strings';
import moment from 'moment';

const {Content} = Layout;
const {Meta} = Card;


const MoviesPage = () => {

    const history = useHistory();
    const [movies,setMovies] = useState([]);
    const [page,setPage] = useState(1);
    const [totalCount,setTotalCount] = useState(0);
    const [display, setDisplay] = useState(false);
    const itemsPerPage = 4;
    const today = moment();

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

    const movieShow = (id) =>
    {
        history.push({pathname: PATHS.MOVIE_VIEW, search: `?id=${id}`, state: {movieId: id}});
    }

    useEffect(() => {getCount(); getMovies()},[page]);
    useEffect(() => {
        document.title=process.env.REACT_APP_MAIN_PAGE;
     }, []);

    const movieCards = movies ? movies.map((m)=>(
        <Card
            key={m.id} 
            style={{width:300}} 
            cover={<img src={m.posterFilePath} height={200} width={200} alt='Missing poster'/>}
            actions={[
                <Tooltip placement='bottom' title='View Movie'>
                    <ArrowRightOutlined key='view' onClick={ () => {movieShow(m.id)}}/>
                </Tooltip>,            
                !display ? <Tooltip placement="bottom" title='Show Today Performances'>
                    <PlusOutlined key='performancesShow' onClick={()=>{setDisplay(!display)}}/>
                </Tooltip> : <Tooltip placement='bottom' title='Hide Today Performances'>
                        <MinusOutlined key='performancesHide' onClick={()=>{setDisplay(!display)}}/>
                </Tooltip>
    
            ]}
            >
                <Meta title={m.title} style={{whiteSpace:'pre-wrap'}}description={`Duration: ${m.length} \n \n ${m.abstract}`} />
                {display ? 
                    <div style={{paddingTop:20}}>
                    { 
                        m.performances
                            .filter(p => moment(new Date(Date.parse(p.date))).date() === today.date())
                                .sort((a,b) => new Date(Date.parse(a.date)).getTime() - new Date(Date.parse(b.date)).getTime())
                                    .map((p)=>
                                    {
                                        const date = new Date(Date.parse(p.date));
                                        let hours = date.getHours();
                                        let minutes = date.getMinutes();
                                        hours = ("0" + hours).slice(-2);
                                        minutes = ("0" + minutes).slice(-2);
                                        return (
                                        <Card.Grid hoverable={false} style={{boxShadow:'none', width:'15%'}}>
                                            {moment(date).isAfter(today) ? <a href={`${PATHS.PERFORMANCE_BOOK}?id=${p.id}`}>{`${hours}:${minutes}`}</a> : <s>{`${hours}:${minutes}`}</s>}
                                        </Card.Grid>
                                    )
                                    })
                    }
                 </div> : ''    
                }
        </Card>)) : '';

    return(
        <Layout className = "layout">
            <Header type="Home"/>
            <Navbar type="Home"/>
            <Content style = {{ padding: '0 50px', display:'flex',alignItems:'flex-start',justifyContent:'center', paddingTop: 50, paddingBottom: 50 }}>
                <div className="content-layout">
                    <Space size='large' wrap>
                        {movieCards ? movieCards : ''}
                    </Space>
                </div>
            </Content>
            <Pagination style={{paddingTop:10, paddingBottom:5, alignSelf:'center'}} defaultCurrent={page} defaultPageSize={itemsPerPage} total={(totalCount)*itemsPerPage} onChange={async value=>{ setPage(value);}}/>
            <Footer className="footer"/>
        </Layout>
    );
};

export default MoviesPage;