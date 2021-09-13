import React, {useContext,useEffect} from 'react';
import {Layout, Form, Card, Input, Upload, Button,message} from 'antd';
import { Header,Navbar,Footer, displayNotification} from '../../miscellanous';
import { UserContext } from '../../contexts';
import { Redirect, useHistory } from 'react-router';
import { EMPLOYEE_MODES, PATHS,REQUEST_STATUS } from '../../strings';
import { InboxOutlined } from '@ant-design/icons';
import { ArticleService } from '../../services';
import '../Panel/Panel.css';

const {Content} = Layout;




const AddArticle = () => 
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

    const OnFinish = async values =>
    {
 
        const {status,error} = await ArticleService.addArticle(values.title,values.abstract,values.poster.file.originFileObj,values.article.file.originFileObj);
        if(status === REQUEST_STATUS.SUCCESS)
        {
            displayNotification('success','Success','New article has been added successfully!');
            history.push(EMPLOYEE_MODES.find(({key})=>key==='view-articles').path);
        }
        else
        {
            console.log(error);
            displayNotification('error', 'Error', `${error.response.data.message}`);
            history.push(EMPLOYEE_MODES.find(({key})=>key==='view-articles').path);
        }
    }

    const OnFileUploaded = file =>
    {
        console.log(file);
    }

    if(!accessToken)
    {
        return (<Redirect to={PATHS.HOMEPAGE}/>);
    }


    return(
        <Layout>
            <Header type="Panel"/>
            <Navbar type={role}/>
            <Content className="content-layout">
                <Card title="Add new article" style={{width: 500}}>
                    <Form style={{maxWidth: 400, margin: 25}} name="basic" onFinish={OnFinish}>
                        <Form.Item 
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please put the title!' }]}
                        >
                        <Input/>
                        </Form.Item>
                        <Form.Item 
                            label="Abstract"
                            name="abstract"
                            rules={[{ required: true, message: 'Please put the abstract!' }]}
                        >
                        <Input.TextArea maxLength={256} autoSize/>
                        </Form.Item>
                        <Form.Item
                            label="Article pdf"
                            name='article'
                            rules={[{ required: true, message: 'File is required!' }]}
                            valuePropName="file"
                            help="Extension must be of .pdf"
                        >
                        <Upload.Dragger name="files" multiple={false} maxCount={1} onChange={OnFileUploaded} customRequest={dummyRequest} beforeUpload={(file)=> 
                        {
                            if(file.type !=='application/pdf')
                                message.error('File extension needs to be .pdf',3);
                            return file.type === 'application/pdf' ? true : Upload.LIST_IGNORE;
                        }
                        }>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Upload.Dragger>
                        </Form.Item>
                        <Form.Item
                            label="Article picture"
                            name='poster'
                            rules={[{ required: true, message: 'File is required!' }]}
                            valuePropName="file"
                            help="Extension must be of .png or .jpeg"
                        >
                        <Upload.Dragger name="files" multiple={false} maxCount={1} onChange={OnFileUploaded} customRequest={dummyRequest} beforeUpload={(file)=> 
                        {
                            if(!(file.type === 'image/png' || file.type === 'image/jpeg'))
                                message.error('File must be of .png or .jpg extension',3);
                            console.log(file.type);
                            return (file.type === 'image/png' || file.type==='image/jpeg') ? true : Upload.LIST_IGNORE;
                        }
                        }>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Upload.Dragger>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add Article
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
            <Footer/>
        </Layout>
    );

}

export default AddArticle;