import React, {useContext, useState, useEffect} from "react";
import { UserContext } from "../../contexts";
import { Redirect, useHistory } from "react-router";
import { Navbar,Header,Footer, displayNotification } from "../../miscellanous";
import { PATHS, EMPLOYEE_MODES, REQUEST_STATUS } from "../../strings";
import { Layout,Button, Card, Popconfirm,message, Space, Pagination} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ArticleService } from "../../services";
import '../Panel/Panel.css';

const {Content} = Layout;
const {Meta} = Card;

const ViewArticles = () =>
{

    const history = useHistory();
    const {accessToken, role} = useContext(UserContext);
    const [articles,setArticles] = useState([]);
    const [refresh,setRefresh] = useState();
    const [page,setPage] = useState(1);
    const [totalCount,setTotalCount] = useState(0);
    const itemsPerPage = 4;


    const getArticles = async()=>
    {
        console.log(page);
        const {data} = await ArticleService.getPages((page-1),itemsPerPage);
        console.log(data);
        setArticles(data);
    }

    const getCount = async()=>
    {
        const {data} = await ArticleService.getTotalCount(itemsPerPage);
        setTotalCount(data);
    }

    const onDeleteClick = async (id) =>
    {
        const {status,error} = await ArticleService.deleteArticle(id);
        if(status === REQUEST_STATUS.SUCCESS)
        {
            displayNotification('success','Success','Successfully deleted the user');
        }
        else
        {
            displayNotification('error', 'Error',`${error}`);
        }
        setRefresh({});
    }

    useEffect(() => {getCount(); getArticles()},[refresh,page]);

    if(!accessToken)
    {
        return <Redirect to={PATHS.HOMEPAGE} />;
    }
    else
    {
        const articleCards = articles ? articles.map((a)=>(
            <Card
                key={a.id} 
                style={{width:300}} 
                cover={<img src={a.thumbnailFilePath} height={200} width={200} alt='Missing poster'/>}
                actions={[
                    <Popconfirm title='Are you sure you want to delete this movie?' okText='Yes' cancelText='No' onCancel={() => message.info('Cancelled deleting',3)} onConfirm={()=> {onDeleteClick(a.id)}}>
                        <DeleteOutlined key='delete' danger='true'/>
                    </Popconfirm>,
                    <EditOutlined key='edit'/>,
                ]}
                >
                    <Meta title={a.title} style={{whiteSpace:'pre-wrap'}}description={`Date: ${new Date(Date.parse(a.date)).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })} \n\n ${a.abstract}`} />
            </Card>
        )): '';
        return(
            <Layout>
                <Header type="Panel"/>
                <Navbar type={role}/>
                <Content className="content-layout" style={{display:'flex',alignItems:'flex-start', paddingTop: 50}}>
                    <Space size='large' wrap>
                        {articleCards ? articleCards : ''}
                        { page === totalCount ?
                            <Card key='Add new' bordered={false}>
                                <Button type='dashed' icon={<PlusOutlined/>} onClick={() => history.push(EMPLOYEE_MODES.find(({key}) => key==='add-article').path)}>
                                    Add new article
                                </Button>
                            </Card> : ''
                        }
                    </Space>
                    <Pagination style={{alignSelf:'flex-end'}} defaultCurrent={page} defaultPageSize={itemsPerPage} total={(totalCount)*itemsPerPage} onChange={async value=>{ setPage(value);}}/>
                </Content>
                <Footer/>
            </Layout>
        );
    }
}

export default ViewArticles