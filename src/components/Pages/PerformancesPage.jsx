import {Navbar, Footer, Header} from '../../miscellanous';
import React, { useState, useEffect} from "react";
import { Layout,Card,Space, Pagination,Tooltip, Row, Col} from "antd";
import { MovieService } from "../../services";
import '../Home/Home.css';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../../strings';

const {Content} = Layout;


const PerformancesPage = () => {

    const history = useHistory();
    const [movies,setMovies] = useState([]);
    const [page,setPage] = useState(1);
    const [totalCount,setTotalCount] = useState(0);
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

    const movieCards = movies ? movies.map((m)=>(
        <Card
            key={m.id} 
            style={{width:300}}
            title={m.title}
            headStyle={{textAlign:'center'}}
            extra={<a href={`${PATHS.MOVIE_VIEW}?id=${m.id}`}>View</a>}
            >
            {movies.performances ? movies.performances.forEach((p)=>
            {
                <a href="">{new Date(Date.parse(p.date)).toLocaleDateString('en-US',{hour:'2-digit',minute:'2-digit'})}</a>
            }) : ''
            }
        </Card>)) : '';

    const firstHalfMovies = movieCards ? movieCards.slice(0,halfItems).map((mc)=> <Col span={6}>{mc}</Col>) : '';
    const secondHalfMovies = movieCards ? movieCards.slice(halfItems,movieCards.length).map((mc)=> <Col span={6}>{mc}</Col>) : '';

    return(
        <Layout className = "layout">
            <Header type="Home"/>
            <Navbar type="Home"/>
            <Content style = {{ padding: '0 50px', display:'flex',alignItems:'flex-start',justifyContent:'center', paddingTop: 50, paddingBottom: 50 }}>
                <div className="content-layout">
                    <Row gutter={[24,64]}>
                        {firstHalfMovies}
                        {secondHalfMovies}
                    </Row>
                </div>
            </Content>
            <Pagination style={{alignSelf:'center'}} defaultCurrent={page} defaultPageSize={itemsPerPage} total={(totalCount)*itemsPerPage} onChange={async value=>{ setPage(value);}}/>
            <Footer className="footer"/>
        </Layout>
    );
};

export default PerformancesPage;