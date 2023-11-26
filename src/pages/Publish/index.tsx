import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { createArticleAPI, getChannelAPI } from "@/apis/article";

const { Option } = Select;

const Publish = () => {
  const [channelList, setChannelList] = useState([]);
   const [imageList, setImageList] = useState([]);

  useEffect(() => {
    // 1. 封装函数 在函数内部调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    // 2. 调用函数
    getChannelList();
  }, []);

  // 提交表单
  const onFinish = (formValue) => {
    console.log(formValue);
    const { title, content, channel_id } = formValue;
    // 1. 按照接口文档的格式处理收集到的表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: 0,
        images: [],
      },
      channel_id,
    };

    // 2. 调用接口提交
    createArticleAPI(reqData);
  };
    const onUploadChange = (info) => {
      setImageList(info.fileList);
    };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[{ title: <Link to={"/"}>首页</Link> }, { title: "发布文章" }]} />
        }>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value 属性用户选中后会自动收集起来作为接口提交的字段 */}
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Upload
              name="image"
              listType="picture-card"
              showUploadList
              action={"http://geek.itheima.net/v1_0/upload"}
              onChange={onUploadChange}>
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}>
            {/* 富文本编辑器 */}
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
