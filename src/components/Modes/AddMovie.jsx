import React, {useContext,useEffect} from 'react';
import {Layout, Form, Card, Input, Upload, Button, InputNumber, message} from 'antd';
import { Header,Navbar,Footer, displayNotification} from '../../miscellanous';
import { UserContext } from '../../contexts';
import { Redirect, useHistory } from 'react-router';
import { EMPLOYEE_MODES, PATHS,REQUEST_STATUS } from '../../strings';
import { InboxOutlined } from '@ant-design/icons';
import { MovieService } from '../../services';
import '../Panel/Panel.css';

const {Content} = Layout;


const AddMovie = () =>
{
    const {accessToken, role} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        document.title=process.env.REACT_APP_PANEL_PAGE;
     }, []);

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };

      const OnFileUploaded = file =>
      {
          console.log(file);
      }

    const OnFinish = async values => 
    {
        console.log(values);
        const {status,error} = await MovieService.addMovie(values.title,values.length,values.abstract,values.description,values.poster.file.originFileObj,values.trailer);
        if(status === REQUEST_STATUS.SUCCESS)
        {
            displayNotification('success','Success','New movie has been added successfully');
            history.push(EMPLOYEE_MODES.find(({key})=>key==='view-movies').path);
        }
        else
        {
            console.log(error);
            displayNotification('error','Error',`${error.response.data.message}`);
            history.push(EMPLOYEE_MODES.find(({key})=>key==='view-movies').path);
        }
    }

    if(!accessToken)
    {
        return <Redirect to={PATHS.HOMEPAGE} />;
    }
    else
    {
        return(
            <Layout>
                <Header type="Panel"/>
                <Navbar type={role}/>
                <Content className="content-layout">
                    <Card title="Add new movie" style={{width: 500}}>
                        <Form style={{maxWidth: 400, margin: 25}} name="basic" onFinish={OnFinish} initialValues={{'abstract':'','description':'','trailer':''}}>
                            <Form.Item 
                                label="Title"
                                name="title"
                                rules={[{ required: true, message: 'Please put the title!' }]}    
                            >
                            <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Duration(mins)"
                                name="length"
                                rules={[{ required: true, message: 'Please put the duration of the movie!' }]}  
                            >
                            <InputNumber min={1} max={512}/>
                            </Form.Item>
                            <Form.Item 
                                label="Abstract"
                                name="abstract"
                            >
                            <Input.TextArea maxLength={80} autoSize/>
                            </Form.Item>
                            <Form.Item 
                                label="Description"
                                name="description"
                            >
                            <Input.TextArea autoSize/>
                            </Form.Item>
                            <Form.Item 
                                label="Trailer Link"
                                name="trailer"    
                            >
                            <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Poster image"
                                name='poster'
                                rules={[{ required: true, message: 'Poster file is required!' }]}
                                valuePropName="file"
                                help="Extension must be of either .png or .jpg"
                            >
                        <Upload.Dragger name="files" multiple={false} maxCount={1} customRequest={dummyRequest} onChange={OnFileUploaded} beforeUpload={(file)=>
                        {
                            if(!(file.type === 'image/png' || file.type === 'image/jpeg'))
                                message.error('File must be of .png or .jpg extension',3);
                            console.log(file.type);
                            return (file.type === 'image/png' || file.type==='image/jpeg') ? true : Upload.LIST_IGNORE;
                        }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Upload.Dragger>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add Movie
                            </Button>
                        </Form.Item>
                        </Form>
                    </Card>
                </Content>
                <Footer/>
            </Layout>
        );
    }
}

export default AddMovie;