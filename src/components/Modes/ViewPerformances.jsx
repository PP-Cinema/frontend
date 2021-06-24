import React,{useContext, useEffect, useState} from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../contexts";
import { PATHS } from "../../strings";
import { Navbar, Header,Footer } from "../../miscellanous";
import { Layout, Select,Calendar,Card, Form, TimePicker, DatePicker, InputNumber, Button} from 'antd';
import { MovieService, HallService } from "../../services";
import '../Panel/Panel.css';

const {Content} = Layout
const {Option} = Select;

const ViewPerformances = () =>
{
    const {accessToken, role} = useContext(UserContext);
    const [halls,setHalls] = useState([]);
    const [movies,setMovies] = useState([]);
    const [movieSelected,setSelected] = useState(false);
    const [movieId, setId] = useState(0);
    const [normalprice, setPrice] = useState(1);
    const [discountprice, setDiscountPrice] = useState(1);
    let price = 0;
    const discount = 0.51;

    const getHalls = async()=>
    {
        const {data} = await HallService.getHalls();
        setHalls(data);
    }

    const getMovies = async()=>
    {
        const {data} = await MovieService.getAllMovies();
        setMovies(data);
    }
    
    const getPerformances = (value) =>
    {
        let listData =[];
        const performances = movies.find((m)=> m.id === movieId)?.performances;
        performances.forEach((p)=>{
            if(p.date.getMonth()===value.month() && p.date.getDate()===value.date())
                listData.push(p);
        });
        
        return listData;
    }

    const onFormFinish = async values =>
    {
        console.log(values);
    }

    const dateCellRenderer = (value) =>
    {
        let listData = getPerformances(value);
        return
        (
            <ul>
                {listData.map((perf)=>
                {
                    <li key={perf.id}>{perf.date} </li>
                })
            }
            </ul>
        )
    }

    useEffect(()=>{getMovies();getHalls();},[role]);

    if(!accessToken)
    {
        return <Redirect to={PATHS.HOMEPAGE} />;
    }
    else
    {
        const movieSelect = movies.map((m)=>
            <Option key={m.id} value={m.id} title={m.title}>{m.title}</Option>);
        const hallSelect = halls.map((h)=>
            <Option key={h.id} value={h.hallLetter}>{h.hallLetter}</Option>
        );
        return(
            <Layout>
                <Header type="Panel"/>
                <Navbar type={role}/>
                <Content className="content-layout">
                    <Card
                        style={{minWidth:1200,minHeight:1000, paddingTop:25, paddingBottom: 25}}
                        bordered={false}
                    >
                        <Card.Grid hoverable={false} style={{ width: '25%', minHeight: 800, boxShadow:'none'}} key="movie-select">
                            <Card type='inner' bordered={false} title="Select a Movie" style={{minHeight: 150, width:250}}>
                                <Select showSearch style={{width: 250, paddingTop: 20}} placeholder="Select a Movie" optionFilterProp="movie" 
                                filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={(values)=>{setId(values); setSelected(true)}}
                                >
                                    {movieSelect}
                                </Select>
                            </Card>
                            {movieSelected ?
                                <Card type='inner' bordered={false} title="Add Performance" style={{minHeight:641, width:250}}>
                                    <Form name='basic' style={{margin:10, paddingTop: 20}} onFinish={onFormFinish} >
                                        <Form.Item
                                            label='Time'
                                            name='time'
                                            rules={[{ required: true, message: 'Please set the time!' }]}
                                        >
                                        <TimePicker minuteStep={15} format='HH:mm'/> 
                                        </Form.Item>
                                        <Form.Item
                                            label='Date'
                                            name='date'
                                            rules={[{ required: true, message: 'Please set the date!' }]}
                                        >
                                        <DatePicker format='DD/MM/YYYY'/>
                                        </Form.Item>
                                        <Form.Item
                                            label='Hall'
                                            name='hall'
                                            rules={[{ required: true, message: 'Please pick the hall!' }]}
                                        >
                                        <Select showSearch placeholder='Select a Hall' optionFilterProp='movie' style={{width:80}} 
                                            filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {hallSelect}
                                        </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label='Normal Price'
                                            name='normalPrice'
                                            rules={[{ required: true, message: 'Please set the normal ticket price!' }]}
                                        >
                                            <InputNumber min={1} max={100} defaultValue={1} onChange={setPrice}/>
                                        </Form.Item>
                                        <Form.Item
                                            label='Discount Price'
                                            name='discountPrice'
                                        >
                                            <InputNumber value={discountprice} defaultValue={discountprice} min={1} max={100}/>
                                        </Form.Item>
                                        <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Add Performance
                                        </Button>
                                        <div style={{paddingTop: 10}}></div>
                                        <Button type="primary" onClick={()=>{console.log(normalprice);setDiscountPrice(normalprice)}}>
                                            Calculate discount price
                                        </Button>
                        </Form.Item>
                                    </Form>
                                </Card> 
                                : ''
                            }
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={{boxShadow:'none' ,width: '75%', minHeight: 800}} key="calendar">
                            {
                                movieSelected ? 
                                    <Calendar dateCellRender={dateCellRenderer} style={{maxWidth:900}}/> 
                                :''
                            }
                        </Card.Grid>
                    </Card>
                </Content>
                <Footer/>
            </Layout>
        );
    }
}

export default ViewPerformances;