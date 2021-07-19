import { Layout,Input,Modal,List,Typography, Tooltip, Popconfirm,message, Button,Card } from "antd";
import { CloseOutlined,EnterOutlined } from "@ant-design/icons";
import { Footer,Navbar,Header,displayNotification } from "../../miscellanous";
import React, { useState, useEffect} from "react";
import { PATHS, REQUEST_STATUS } from '../../strings';
import { ReservationService } from "../../services";
import moment from "moment";
import '../Home/Home.css';

const {Title} = Typography
const {Content} = Layout;
const {Search} = Input;

const ReservationsPage = () =>
{

    const [isModalVisible,setModalVisible] = useState(false);
    const [lastName,setLastName] = useState();
    const [reservations,setReservations] = useState([]);
    const [reservation,setReservation] = useState({});
    const [email, setEmail] = useState();
    const [refresh,setRefresh] = useState();
    const [userValidated,setValidated] = useState(false);
    const [reservationView,setReservationView] = useState(false);


    const onSearch = (email) =>{
        if(email==='') return;
        setEmail(email);
        setModalVisible(true);
    }

    useEffect(()=>{if(userValidated) GetReservations(); console.log('render')},[refresh])


    const GetReservations = async()=>
    {
        const {status,data} = await ReservationService.getUserReservations(email,lastName);
        if(status===REQUEST_STATUS.SUCCESS)
        {
            setReservations(data);
            setValidated(true);
        }
        else
        {
            displayNotification('error','Error','Something went wrong, please try again');
        }
    }


    const onOk = async() =>
    {
        setModalVisible(false);
        await GetReservations();
    }

    const onCancelClick = async reservationId =>
    {
        const {status,error} = await ReservationService.cancelReservation(reservationId);
        if(status===REQUEST_STATUS.SUCCESS)
        {
            displayNotification('success','Success','Reservation cancelled successfully');
            setRefresh({});
            setReservationView(false);
        }
        else
        {
            displayNotification('error','Error',`${error}`);
        }
    }

    const viewReservation = item =>
    {
        setReservation(item);
        setReservationView(true);
    }

    return(
        <Layout className='layout'>
            <Header type='Home'/>
            <Navbar type='Home'/>
            <Content style = {{ padding: '0 50px', display:'flex',alignItems:'flex-start',justifyContent:'center', paddingTop: 50, paddingBottom: 50 }}>
                <div className='reservations-layout'>
                    <div style={{paddingBottom:20,paddingTop:20,display:'flex',justifyContent:'space-evenly',width:'100%'}}>
                        {reservations.length > 0 ? <Title level={2} style={{paddingLeft:20,justifySelf:'flex-start'}}>Your Reservations</Title> : "" }
                        <div style={{minWidth: reservations.length >0 ? '60%' : '80%'}}></div> 
                       <Search
                        placeholder='Enter your email'
                        allowClear
                        size='large'
                        onSearch={onSearch}
                        style={{paddingRight:20,justifySelf:'flex-end',maxWidth:'20%'}}
                        />
                    </div>
                    <div style={{width:'100%',height:'100%',paddingTop:20,paddingLeft:20,paddingBottom:20,paddingRight:20,alignSelf:'flex-start'}}>
                        {
                            (reservations.length > 0 && !reservationView) &&
                            <List
                                pagination={
                                    {   onChange: page => {
                                        console.log(page);
                                      },
                                      pageSize: 10,
                                      position: 'top',
                                      style:{alignSelf:'center'}
                                    }}
                                dataSource={reservations}
                                itemLayout='horizontal'
                                renderItem={item=>
                                    {
                                        return(
                                        <List.Item 
                                            actions=
                                            {[
                                                <Button type='link' onClick={()=>viewReservation(item)}>View</Button>,
                                                <Tooltip placement='bottom' title='Cancel Reservation'>
                                                    <Popconfirm title='Are you sure you want to cancel this reservation?' okText='Yes' cancelText='No' onCancel={() => message.info('Reservation was not cancelled',3)} onConfirm={()=> {onCancelClick(item.id)}}>
                                                        <CloseOutlined/>
                                                    </Popconfirm>
                                                </Tooltip>]}
                                        >
                                            <List.Item.Meta 
                                                title={item.performance.movie.title} 
                                                description={`Date: ${moment(item.performance.date).format('dddd, MMMM Do YYYY, HH:mm')}   Price: ${item.performance.normalPrice*item.normalTickets+item.performance.discountedPrice*item.discountedTickets} PLN`} 
                                                style={{textAlign:'left',textIndent:30,whiteSpace:'pre-wrap'}}/>
                                        </List.Item>
                                        )
                                    }}
                            >
                            </List>
                        }
                        {
                            reservationView && (
                                <Card
                                    title={reservation.performance.movie.title}
                                    style={{whiteSpace:'pre-wrap',fontSize:18}}
                                    bordered={false}
                                    actions={
                                        [
                                            <Tooltip placement='bottom' title='Back to the view'><EnterOutlined onClick={()=>{setReservationView(false);setReservation({})}}/></Tooltip>,
                                            <Tooltip placement='bottom' title='Cancel Reservation'>
                                                <Popconfirm title='Are you sure you want to cancel this reservation?' okText='Yes' cancelText='No' onCancel={() => message.info('Reservation was not cancelled',3)} onConfirm={()=> {onCancelClick(reservation.id)}}>
                                                    <CloseOutlined/>
                                                 </Popconfirm>
                                            </Tooltip>
                                        ]
                                    }
                                >
                                    <p>{`Date: ${moment(reservation.performance.date).format('dddd, MMMM Do YYYY, HH:mm')}`}</p>
                                    <p>{`Normal tickets: ${reservation.normalTickets}\nDiscount tickets: ${reservation.discountedTickets}`}</p>
                                    <p>{`Seats: ${reservation.seats.map(s=> `\n Row: ${s.row} Seat: ${s.seatNumber}`)}`}</p>
                                    <p style={{textAlign:'right',fontWeight:'bolder',fontSize:22}}>{`Final price: ${(reservation.normalTickets*reservation.performance.normalPrice + reservation.discountedTickets*reservation.performance.discountedPrice)} PLN`}</p>
                                </Card>
                            )
                        }
                    </div>

                    <Modal visible={isModalVisible} 
                        onOk={onOk} 
                        onCancel={()=>setModalVisible(false)}
                        okButtonProps={{disabled: (lastName && lastName!=='') ? false : true}}
                        title='Before you continue'
                    >
                        <p>In order to see your reservations we kindly ask you to put your last name here</p>
                        <Input onChange={e=>{setLastName(e.target.value)}} addonBefore='Your last name:'/>
                    </Modal>
                </div>
            </Content>
            <Footer className='footer'/> 
        </Layout>
    );
}

export default ReservationsPage;