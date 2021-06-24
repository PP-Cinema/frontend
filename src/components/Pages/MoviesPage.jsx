import {Navbar, Footer, Header} from '../../miscellanous';
import React, { useState, useEffect} from "react";
import { Layout,Card,Space, Pagination,Tooltip} from "antd";
import { MovieService } from "../../services";
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import '../Home/Home.css';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../../strings';

const {Content} = Layout;
const {Meta} = Card;

const MoviesPage = () => {

    const history = useHistory();
    const [movies,setMovies] = useState([]);
    const [page,setPage] = useState(1);
    const [totalCount,setTotalCount] = useState(0);
    const itemsPerPage = 4;

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

    const movieCards = movies ? movies.map((m)=>(
        <Card
            key={m.id} 
            style={{width:300}} 
            cover={<img src={m.posterFilePath} height={200} width={200} alt='Missing poster'/>}
            actions={[
                <Tooltip placement='bottom' title='View Movie'>
                    <ArrowRightOutlined key='view' onClick={ () => {movieShow(m.id)}}/>
                </Tooltip>,
                <Tooltip placement="bottom" title='Show Performances'>
                    <PlusOutlined key='performances' />
                </Tooltip>
            ]}
            >
                <Meta title={m.title} style={{whiteSpace:'pre-wrap'}}description={`Duration: ${m.length} \n \n ${m.abstract}`} />
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
            <Pagination style={{alignSelf:'center'}} defaultCurrent={page} defaultPageSize={itemsPerPage} total={(totalCount)*itemsPerPage} onChange={async value=>{ setPage(value);}}/>
            <Footer className="footer"/>
        </Layout>
    );
};

export default MoviesPage;