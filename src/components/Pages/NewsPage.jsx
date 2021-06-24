import {Navbar, Footer, Header} from '../../miscellanous';
import React, { useState, useEffect} from "react";
import { Layout,Card,Space, Pagination, Tooltip} from "antd";
import { ArticleService } from "../../services";
import { ArrowRightOutlined } from '@ant-design/icons';
import '../Home/Home.css';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../../strings';

const {Content} = Layout;
const {Meta} = Card;

const NewsPage = () => {

    const history = useHistory();
    const [articles,setArticles] = useState([]);
    const [page,setPage] = useState(1);
    const [totalCount,setTotalCount] = useState(0);
    const itemsPerPage = 4;

    const getArticles = async()=>
    {
        const {data} = await ArticleService.getPages((page-1),itemsPerPage);
        setArticles(data);
    }

    const getCount = async()=>
    {
        const {data} = await ArticleService.getTotalCount(itemsPerPage);
        setTotalCount(data);
    }

    const articleShow = (id) =>
    {
        history.push({pathname: PATHS.ARTICLE_VIEW, search: `?id=${id}`, state: {articleId: id}});
    }

    useEffect(() => {getCount(); getArticles()},[page]);

    const articleCards = articles ? articles.map((a)=>(
        <Card
            key={a.id} 
            style={{width:300}} 
            cover={<img src={a.thumbnailFilePath} height={200} width={200} alt='Missing poster'/>}
            actions={[
                <Tooltip placement='bottom' title='Show Article'>
                    <ArrowRightOutlined key='view' onClick={ () => {articleShow(a.id)}}/>
                </Tooltip>
            ]}
            >
                <Meta title={a.title} style={{whiteSpace:'pre-wrap'}}description={`Date: ${new Date(Date.parse(a.date)).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })} \n\n ${a.abstract}`} />
        </Card>)) : '';

    return(
        <Layout className = "layout">
            <Header type="Home"/>
            <Navbar type="Home"/>
            <Content style = {{ padding: '0 50px', display:'flex',alignItems:'flex-start',justifyContent:'center', paddingTop: 50, paddingBottom: 50 }}>
                <div className="content-layout">
                    <Space size='large' wrap>
                        {articleCards ? articleCards : ''}
                    </Space>
                </div>
            </Content>
            <Pagination style={{alignSelf:'center'}} defaultCurrent={page} defaultPageSize={itemsPerPage} total={(totalCount)*itemsPerPage} onChange={async value=>{ setPage(value);}}/>
            <Footer className="footer"/>
        </Layout>
    );
};

export default NewsPage;