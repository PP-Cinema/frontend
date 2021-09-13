import { useHistory, useLocation } from "react-router"
import React,{ useEffect, useState } from "react";
import { ArticleService } from "../../services";
import { Layout, Button, Space, Typography, Card } from "antd";
import { Header,Navbar,Footer } from "../../miscellanous";
import { ArrowLeftOutlined } from "@ant-design/icons";
import '../Home/Home.css';

const {Content} = Layout;
const {Title, Text, Paragraph} = Typography;


const ArticlePage = () =>
{
    const location = useLocation();
    const [article,setArticle] = useState({});
    const history = useHistory();
    const getArticle = async() =>
    {
        const {data} = await ArticleService.getArticle(location.state.articleId);
        console.log(data);
        setArticle(data);
    }

    useEffect(()=>{getArticle()},[location.state.articleId]);
    useEffect(() => {
        document.title=process.env.REACT_APP_MAIN_PAGE;
     }, []);

    return(
        <Layout className = "layout">
            <Header type="Home"/>
            <Navbar type="Home"/>
            <Content style = {{ padding: '0 50px', display:'flex',alignItems:'flex-start',justifyContent:'center', paddingTop: 50, paddingBottom: 50 }}>
                <Space size='large'>
                    <Button icon={<ArrowLeftOutlined/>} style={{justifySelf:'flex-start', alignSelf:'flex-start'}} size='large' shape='circle' type='default' onClick={()=>history.goBack()}/>
                    <div className='content-layout'>
                        <Card
                            title={<Title level={1} >{article.title}</Title>}
                            extra={<Text strong>{`Date: ${new Date(Date.parse(article.date)).toLocaleDateString('en-US',{ year: 'numeric', month: 'long', day: 'numeric' })}`}</Text>}
                            style={{minWidth:1200,minHeight:1000}}
                            headStyle={{textAlign:'left'}}
                            bordered={false}
                        >
                            <Paragraph style={{fontSize:'large'}}>
                                {article.abstract}
                            </Paragraph>
                            <div style={{
                                minHeight: 600,
                                maxHeight: 1000,
                                overflowY: 'auto',
                                marginTop: 16,
                                marginBottom: 8,
                                border: '10px inset #eee',
                            }}>
                                <object
                                    width="80%"
                                    style={{ height: '100vh' }}
                                    data={article.filePath}
                                    type="application/pdf">
                                    <embed src={article.filePath} type="application/pdf" />
                                </object>
                            </div>
                        </Card>
                    </div>
                </Space>
            </Content>
            <Footer className="footer"/>
        </Layout>
    );

};

export default ArticlePage; 