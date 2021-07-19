 import { useLocation, useHistory } from "react-router";
 import React, {useState, useEffect} from "react";
import { PerformanceService, ReservationService } from "../../services";
import { Navbar,Header, Footer, displayNotification } from "../../miscellanous";
import { Steps, Layout, Space, Button, Card, Form, Input, Select, message } from "antd";
import { ArrowLeftOutlined} from "@ant-design/icons";
import { PATHS, STEPS, REQUEST_STATUS } from "../../strings";
import '../Home/Home.css';

const {Content} = Layout;
const {Step} = Steps;
const {Option} = Select;

const BookPage = () =>
{
    const location = useLocation();
    const [step, setStep] = useState(0);
    const [performance,setPerformance] = useState();
    const [formData,setFormData] = useState();
    const [seatsNum,setSeatsNum] = useState(0);
    const [seatsLeft,setSeatsLeft] = useState(0);
    const [chosenSeats,setChosenSeats] = useState([]);
    const [nTickets,setNTickets] = useState(0);
    const [dTickets,setDTickets] = useState(0);
    const [form] = Form.useForm();
    const history = useHistory();

    const getPerformance = async() =>
    {
        const {data} = await PerformanceService.getPerformance(location.search.split('=')[1]);
        console.log(data);
        setPerformance(data);
    }

    useEffect(()=>{if(!performance)getPerformance()},[location, step,seatsNum,seatsLeft]);

    const onFinish = values =>
    {
        setFormData(values);
        console.log(values);
        message.success('Saved credentials');
    }

    const NextStep = () =>
    {
        if(step===1)
        {
            if(seatsNum===0)
            {
                message.error('In order to continue you need to pick at least one seat');
                return;
            }
            setSeatsLeft(seatsNum)
        }
        if(step===2)
        {
            if(!formData)
            {
                message.error('Please fill all required credentials and save them');
                return;
            }
        }
        setStep(step+1);
    }

    const PrevStep = () =>
    {
        setStep(step-1);
    }

    const HallLayout = () =>
    {
        const layout =[];
        const cols = 10;
        let rows = performance.hall.seats / cols >> 0;
        for(let i = 0; i<rows;i++)
        {
            layout.push([i+1]);
            for(let j=0; j<cols;j++)
                layout[i].push(j+1);
            layout[i].push(i+1);
        }
        return layout;
    }

    const RenderNSelect = () =>
    {
        const select=[];
        let seats;
        nTickets >= seatsLeft ? seats=nTickets+seatsLeft : seats=seatsLeft;
        for(let i=0;i<seats+1;i++)
        {
            select.push(i);
        }
        return select;
    }

    const RenderDSelect = () =>
    {
        const select=[];
        let seats;
        dTickets >= seatsLeft ? seats=dTickets+seatsLeft : seats=seatsLeft;
        for(let i=0;i<seats+1;i++)
        {
            select.push(i);
        }
        return select;
    }

    const OnConfirm = async()=>
    {
        const finalSeats = chosenSeats.filter(cs=>cs.value===true).map(cs=> {return {row: ((cs.id / 10) >> 0) + 1,seat: cs.id % 10} });
        let seatString = finalSeats.map(fs=> `${fs.row},${fs.seat}`).toString();
        console.log(seatString);
        if(!formData.remarks) formData.remarks='';
        const {status,error} = await ReservationService.createReservation(formData.email,formData.normalTickets,
            formData.discountTickets,formData.firstName,
            formData.lastName,formData.remarks,performance.id,seatString);
        if(status===REQUEST_STATUS.SUCCESS)
        {
            displayNotification('success','Success','Reservation confirmed');
            history.push(PATHS.HOMEPAGE);
        }
        else
        {
            displayNotification('error','Error',`${error}`);
            history.push(PATHS.HOMEPAGE);
        }
    }

    return(
        <Layout className='layout'>
            <Header type="Home"/>
            <Navbar type="Home"/>
            <Content style = {{ padding: '0 50px', display:'flex',alignItems:'flex-start',justifyContent:'center', paddingTop: 50, paddingBottom: 50 }}>
                <Space size='large'>
                    <Button icon={<ArrowLeftOutlined/>} style={{justifySelf:'flex-start', alignSelf:'flex-start'}} size='large' shape='circle' type='default' onClick={()=>history.goBack()}/>
                    {performance?
                    <div className='book-content'>
                        <div style={{width:'80%',paddingTop:20,paddingBottom:20}}>
                            <Steps current={step}>
                                {
                                    STEPS.map(step => 
                                        <Step key={step.title} title={step.title} icon={step.icon}/>
                                        )
                                }
                            </Steps>
                        </div>
                        <div style={{minHeight: 300, paddingTop: 40, paddingBottom: 40, width: '80%'}}>
                                {
                                    step === 0 && 
                                    (
                                        <Card title='Reservation Information'>
                                            <Card.Grid hoverable={false} style={{width:'100%',boxShadow:'none'}}>
                                                {`Movie: ${performance.movie.title}`}
                                            </Card.Grid>
                                            <Card.Grid hoverable={false} style={{width:'100%',boxShadow:'none'}}>
                                                {`Duration: ${performance.length} minutes`}
                                            </Card.Grid>
                                            <Card.Grid hoverable={false} style={{width:'100%',boxShadow:'none'}}>
                                                {`Date: ${new Date(Date.parse(performance.date)).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit',minute
                                            :'2-digit', hour12:false })}`}
                                            </Card.Grid>
                                        </Card>
                                    )
                                }
                                {
                                    step === 1 && 
                                    (
                                        <Card key='Seat Picker' title='Choose Seats' style={{minHeight: 600}}>
                                            <div style={{width:'100%',display:'flex'}}>
                                            <Card key='layout' type='inner' title='Screen' style= {{width: '85%'}}>
                                                <div style={{paddingTop: 50, paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
                                                    {
                                                        HallLayout().map(e =>
                                                            {
                                                                const seats = e.slice(1,e.length-1);
                                                                seats.forEach(s=>  {
                                                                    if(!chosenSeats.find(cs=>cs.id===((e[0]-1)*10+s))){
                                                                        let isReserved = false;
                                                                        if(performance.reservations){
                                                                            performance.reservations.every(r=>{
                                                                                if(r.seats.find(rs=> rs.row===e[0] && rs.seatNumber===s))
                                                                                {
                                                                                    isReserved=true;
                                                                                    return false;
                                                                                }
                                                                                return true;
                                                                        });
                                                                        }
                                                                        chosenSeats.push({id:((e[0]-1)*10+s),value:false,isReserved: isReserved}
                                                                    )}
                                                                    });
                                                                return(
                                                                    <div style={{justifyContent:'center',display:'flex'}}>
                                                                        <Card.Grid key={`${e[0]}rowLeft`} hoverable={false} style={{width:'8%',maxHeight:10,alignItems:'center',justifyContent:'center',display:'flex',boxShadow:'none'}}>
                                                                            {e[0]}
                                                                        </Card.Grid>
                                                                        {
                                                                            seats.map(s=>
                                                                                {
                                                                                    const foundSeat = chosenSeats.find(cs=>cs.id===((e[0]-1)*10+s));

                                                                                    return (<Card.Grid
                                                                                    key={`${foundSeat.id}`} 
                                                                                    hoverable={foundSeat.isReserved ? false : true}
                                                                                    style=
                                                                                    {
                                                                                        {
                                                                                            width:'8%',
                                                                                            maxHeight:10,
                                                                                            alignItems:'center',
                                                                                            justifyContent:'center',
                                                                                            display:'flex',
                                                                                            backgroundColor: foundSeat.isReserved ? 'gray' : foundSeat.value ? 'orange': 'green',
                                                                                            color: foundSeat.isReserved ? 'white' : 'black'
                                                                                        }
                                                                                    }
                                                                                    onClick={()=>{
                                                                                        let isClicked = foundSeat.value;
                                                                                        foundSeat.value = !isClicked;
                                                                                        isClicked ? setSeatsNum(seatsNum-1) : setSeatsNum(seatsNum+1);
                                                                                    }}
                                                                                    >
                                                                                        {s}
                                                                                    </Card.Grid>)})
                                                                        }
                                                                        <Card.Grid key={`${e[e.length-1]}rowRight`} hoverable={false} style={{width:'8%',maxHeight:10,alignItems:'center',justifyContent:'center',display:'flex',boxShadow:'none'}}>
                                                                            {e[e.length-1]}
                                                                        </Card.Grid>
                                                                    </div>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </div>
                                            </Card>
                                            <Card key='keys' title='Key' bordered={false} style={{width:'15%',height:'30%',margin:'0 8px'}}>
                                                    <Card.Grid key='free' hoverable={false} style={{backgroundColor:'green',color:'black',width:'100%'}}>
                                                        Free
                                                    </Card.Grid>
                                                    <Card.Grid key='chosen' hoverable={false} style={{backgroundColor:'orange',color:'black',width:'100%'}}>
                                                        Your choice
                                                    </Card.Grid>
                                                    <Card.Grid key='reserved' hoverable={false} style={{backgroundColor: 'gray', color:'white',width:'100%'}}>
                                                        Reserved
                                                    </Card.Grid>
                                            </Card>
                                            </div>
                                        </Card>
                                    )
                                }
                                {
                                    step === 2 && 
                                    (
                                        <Card title='Credentials'>
                                            <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                                                <div style={{paddingTop:20,fontSize:16,whiteSpace:'pre-wrap'}}>
                                                    {`Number of seats: ${seatsNum}\nChosen seats: ${chosenSeats.filter(cs=>cs.value===true).map(s=> {return (`\nRow: ${((s.id/10)>>0) + 1} Seat: ${s.id%10}`)})}
                                                    `}</div>
                                                <Form name='basic' form={form} onFinish={onFinish} style={{width:400,margin:25, justifySelf:'center'}}
                                                    initialValues={
                                                        {
                                                            'normalTickets':0,
                                                            'discountTickets':0,
                                                        }
                                                    }
                                                >
                                                    <Form.Item
                                                        label='First Name'
                                                        name='firstName'
                                                        rules={[{ required: true, message: 'Please put your first name!' }]}    
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Last Name'
                                                        name='lastName'
                                                        rules={[{ required: true, message: 'Please put your last name!' }]}    
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Email'
                                                        name='email'
                                                        rules={[{ required: true, message: 'Please put your email!' }]}    
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Normal Tickets'
                                                        name='normalTickets'
                                                        rules={[{ required: true, message: 'Please put amount of normal tickets!' }]}    
                                                    >
                                                        <Select onSelect={(value)=>
                                                        {
                                                            setSeatsLeft(seatsNum-(dTickets+value));
                                                            setNTickets(value);
                                                        }} 
                                                        style={{width:'80%'}}>
                                                            {
                                                                RenderNSelect().map(o=><Option key={`${o}n`} value={o}>{o}</Option>)
                                                            }
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Discount Tickets'
                                                        name='discountTickets'
                                                        rules={[{ required: true, message: 'Please put amount of discount tickets!' }]}    
                                                    >
                                                        <Select onSelect={(value)=>
                                                        {
                                                            setSeatsLeft(seatsNum-(nTickets+value));
                                                            setDTickets(value);
                                                        }} 
                                                        style={{width:'80%'}}>
                                                            {
                                                                RenderDSelect().map(o=><Option key={`${o}d`} value={o}>{o}</Option>)
                                                            }
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Remarks'
                                                        name='remarks'
                                                    >
                                                        <Input.TextArea autoSize/>
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Button type='default' htmlType='submit'>
                                                            Save 
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                        </Card>
                                    )
                                }
                                {
                                    step === 3 && (
                                        <Card title='Summary'>
                                            <div style={{display:'flex',alignItems:'center',flexDirection:'column',whiteSpace:'pre-wrap',fontSize:18}}>
                                                <div style={{paddingBottom:20}}>
                                                    {`Movie: ${performance.movie.title}\n`}
                                                    {`Date: ${new Date(Date.parse(performance.date)).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit',minute
                                            :'2-digit', hour12:false })}`}
                                                </div>
                                                <div style={{paddingBottom:10}}>
                                                    {`Number of seats: ${seatsNum}\nChosen seats: ${chosenSeats.filter(cs=>cs.value===true).map(s=> {return (`\nRow: ${((s.id/10)>>0) + 1 } Seat: ${s.id%10}`)})}
                                                    `}
                                                </div>
                                                <div style={{paddingBottom:20}}>
                                                    {`Normal tickets: ${formData.normalTickets}\nDiscount tickets: ${formData.discountTickets}`}
                                                </div>
                                                <div style={{paddingBottom:20}}>
                                                    {`First name: ${formData.firstName}\nLast name: ${formData.lastName}\n Email: ${formData.email}`}
                                                </div>
                                                <div style={{paddingBottom:20, alignSelf:'flex-end',fontWeight:'bolder',fontSize:22}}>
                                                    {`Final price: ${(formData.normalTickets*performance.normalPrice + formData.discountTickets*performance.discountedPrice)} PLN`}
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                }
                        </div>
                        <div style={{paddingBottom:20}}>
                            {
                                step < STEPS.length - 1 && (
                                    <Button size='large' type='primary' htmlType='submit' onClick={()=>NextStep()}>
                                        Next
                                    </Button>
                                )
                            }
                            {
                                step === STEPS.length - 1 && (
                                    <Button size='large' type='primary' onClick={OnConfirm}>
                                        Confirm Reservation
                                    </Button>
                                )
                            }
                            {
                                step > 0 && (
                                    <Button size='large' type='default' style={{margin:'0 8px'}} onClick={()=>PrevStep()}>
                                        Previous
                                    </Button>
                                )
                            }
                        </div> 
                    </div>
                :''}
                </Space>
            </Content>
            <Footer className="footer"/>
        </Layout>
    );

}

export default BookPage;