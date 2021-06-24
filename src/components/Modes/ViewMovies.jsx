import React, {useContext, useState, useEffect} from "react";
import { Redirect, useHistory } from "react-router";
import { Navbar,Header,Footer, displayNotification } from "../../miscellanous";
import { UserContext } from "../../contexts";
import { PATHS, EMPLOYEE_MODES, REQUEST_STATUS } from "../../strings";
import { Layout, Space, Card, Button, Popconfirm,message, Pagination, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, TableOutlined } from "@ant-design/icons";
import { MovieService } from "../../services";
import '../Panel/Panel.css';

const {Content} = Layout;
const {Meta} = Card;

const ViewMovies = () =>
{
    const history = useHistory();
    const {accessToken, role} = useContext(UserContext);
    const [movies,setMovies] = useState([]);
    const [refresh,setRefresh] = useState();
    const [page,setPage] = useState(1);
    const [totalCount,setTotalCount] = useState(0);
    const itemsPerPage = 4;

    const getMovies = async()=>
    {
        console.log(page);
        const {data} = await MovieService.getPages((page-1),itemsPerPage);
        console.log(data);
        setMovies(data);
    }

    const getCount = async()=>
    {
        const {data} = await MovieService.getTotalCount(itemsPerPage);
        setTotalCount(data);
    }

    const onDeleteClick = async (id) =>
    {
        const {status,error} = await MovieService.deleteMovie(id);
        if(status === REQUEST_STATUS.SUCCESS)
        {
            displayNotification('success','Success','Successfully deleted the movie');
        }
        else
        {
            displayNotification('error', 'Error',`${error}`);
        }
        setRefresh({});
    }

    useEffect(() => {getCount(); getMovies()},[refresh,page]);

    if(!accessToken)
    {
        return <Redirect to={PATHS.HOMEPAGE} />;
    }
    else
    {
        const movieCards = movies ? movies.map((m)=>(
            <Card
                key={m.id} 
                style={{width:300}} 
                cover={<img src={m.posterFilePath} height={200} width={200} alt='Missing poster'/>}
                actions={[
                    <Popconfirm title='Are you sure you want to delete this movie?' okText='Yes' cancelText='No' onCancel={() => message.info('Cancelled deleting',3)} onConfirm={()=> {onDeleteClick(m.id)}}>
                        <Tooltip title="Delete Movie" placement='bottom'>
                            <DeleteOutlined key='delete' danger='true'/>
                        </Tooltip>
                    </Popconfirm>,
                    <Tooltip title='Edit Movie' placement='bottom'>
                        <EditOutlined key='edit'/>
                    </Tooltip>,
                    <Tooltip title='Add Performance' placement='bottom'>
                        <PlusOutlined key='performance'/>
                    </Tooltip>,
                    <Tooltip title='View Performances' placement='bottom'>
                        <TableOutlined key='performances'/>
                    </Tooltip>
                ]}
                >
                    <Meta title={m.title} style={{whiteSpace:'pre-wrap'}}description={`Length: ${m.length} \n ${m.abstract ? `${m.abstract}`: ''}`} />
            </Card>
        )) : '';
        return(
            <Layout>
                <Header type="Panel"/>
                <Navbar type={role}/>
                <Content className="content-layout" style={{display:'flex',alignItems:'flex-start', paddingTop: 50, paddingBottom: 50}}>
                    <Space size='large' wrap>
                        {movieCards ? movieCards : ''}
                        { page === totalCount ?
                            <Card key='Add new' bordered={false}>
                                <Button type='dashed' icon={<PlusOutlined/>} onClick={() => history.push(EMPLOYEE_MODES.find(({key}) => key==='add-movie').path)}>
                                    Add new movie
                                </Button>
                            </Card> : ''
                        }
                    </Space>
                </Content>
                <Pagination style={{alignSelf:'center'}} defaultCurrent={page} defaultPageSize={itemsPerPage} total={(totalCount)*itemsPerPage} onChange={async value=>{ setPage(value);}}/>
                <Footer/>
            </Layout>
        );
    }
}


export default ViewMovies;