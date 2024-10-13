import React, { useState } from 'react';
import { Card, Input, Switch, Button, Form, message } from 'antd';

function Settings() {
  const [form] = Form.useForm();

  const handleSave = (values) => {
    console.log('Settings saved:', values);
    // 这里应该实现保存设置的逻辑
    // 可以使用Tauri API来保存设置到本地存储
    message.success('设置已保存');
  };

  return (
    <Card title="设置">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          ntpServer: 'pool.ntp.org',
          autoStart: false,
        }}
      >
        <Form.Item
          name="ntpServer"
          label="NTP服务器"
          rules={[{ required: true, message: '请输入NTP服务器地址' }]}
        >
          <Input placeholder="输入NTP服务器地址" />
        </Form.Item>
        <Form.Item name="autoStart" valuePropName="checked" label="开机自启动">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存设置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Settings;