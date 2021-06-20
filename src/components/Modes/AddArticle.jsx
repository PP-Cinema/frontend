import React, {useContext} from 'react';
import {Layout, Form, Card, Input, Upload, Button} from 'antd';
import { Header,Navbar,Footer, displayNotification} from '../../miscellanous';
import { UserContext } from '../../contexts';
import { Redirect, useHistory } from 'react-router';
import { PATHS,REQUEST_STATUS } from '../../strings';
import { InboxOutlined } from '@ant-design/icons';
import { ArticleService } from '../../services';
const {Content} = Layout;




const AddArticle = () => 
{

    const {accessToken, role} = useContext(UserContext);
    
    const history = useHistory();

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };

    const OnFinish = async values =>
    {
 
        const {status,error} = await ArticleService.addArticle(values.title,values.abstract,values.article.file.originFileObj);
        if(status === REQUEST_STATUS.SUCCESS)
        {
            displayNotification('success','Success','New article has been added successfully!');
            history.push(PATHS.EMPLOYEES);
        }
        else
        {
            console.log(error);
            displayNotification('error', 'Error', `${error}`);
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
                        <Input.TextArea/>
                        </Form.Item>
                        <Form.Item
                            label="Article pdf"
                            name='article'
                            rules={[{ required: true, message: 'File is required!' }]}
                            valuePropName="file"
                            help="Needs to be a .pdf file"
                        >
                        <Upload.Dragger name="files" multiple={false} maxCount={1} onChange={OnFileUploaded} customRequest={dummyRequest}>
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