import React, {useContext, useEffect, useState} from 'react';
import { Redirect, useHistory } from 'react-router';
import { Layout, Space, Card, Button, Popconfirm, message } from 'antd';
import { Header, Navbar,Footer, displayNotification } from '../../miscellanous';
import { UserContext } from '../../contexts';
import { EMPLOYEE_MODES, PATHS, REQUEST_STATUS } from '../../strings';
import { UserService } from '../../services';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

const {Content} = Layout;


const ViewEmployees = () =>
{
    
    const {accessToken, role} = useContext(UserContext);
    const [employees,setEmployees] = useState([]);
    const [refresh,setRefresh] = useState();

    const history = useHistory();

    const getEmployees = async() => 
    {
        const {data} = await UserService.getEmployees();
        setEmployees(data);
    }

    

    const onEditClick = () =>
    {

    }

    const onDeleteClick = async (id) =>
    {
        const {status,error} = await UserService.deleteEmployee(id);
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

    useEffect(()=>
    {
        getEmployees();
    },[refresh])

    if(!accessToken)
    {
        return <Redirect to={PATHS.HOMEPAGE} />;
    }
    else
    {
        const employeeCards = employees.map(a=> (<Card key={a.login} title={a.login} style={{display:'flex',justifyContent:'space-evenly'}}>
            <Button type='primary' icon={<EditOutlined/>} disabled onClick={onEditClick}/>
            <Popconfirm title='Are you sure you want to delete this user?' okText='Yes' cancelText='No' onCancel={() => message.info('Cancelled deleting',3)} onConfirm={()=> {onDeleteClick(a.id)}} >
            <Button type='primary' danger icon={<DeleteOutlined/>} disabled={a.admin ? true : false} />
            </Popconfirm>
        </Card>));
        return(
            <Layout>
                <Header type="Panel"/>
                <Navbar type={role}/>
                <Content className="content-layout" style={{display:'flex',alignItems:'flex-start', paddingTop: 50}}>
                    <Space size='large' wrap>
                        {employeeCards}
                        <Card key='Add new' bordered={false}>
                            <Button type='dashed' icon={<PlusOutlined/>} onClick={() => history.push(EMPLOYEE_MODES.find(({key}) => key==='add-employee').path)}>
                                Add new user
                            </Button>
                        </Card>
                    </Space>
                </Content>
                <Footer/>
            </Layout>
        );
    }
}

export default ViewEmployees;