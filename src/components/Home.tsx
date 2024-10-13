import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Card, Button, Typography } from 'antd';

const { Title, Text } = Typography;

function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const [syncStatus, setSyncStatus] = useState('');

  useEffect(() => {
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateCurrentTime = async () => {
    try {
      const time = await invoke('get_current_time');
      setCurrentTime(time);
    } catch (error) {
      console.error('Error getting current time:', error);
    }
  };

  const handleSync = async () => {
    setSyncStatus('正在同步...');
    try {
      const syncedTime = await invoke('sync_time', { ntpServer: 'pool.ntp.org' });
      setCurrentTime(syncedTime);
      setSyncStatus('同步成功');
    } catch (error) {
      console.error('Error syncing time:', error);
      setSyncStatus('同步失败');
    }
  };

  return (
    <Card title={<Title level={2}>时间同步</Title>}>
      <Text strong>当前时间：</Text>
      <Text>{new Date(currentTime).toLocaleString()}</Text>
      <br />
      <br />
      <Button type="primary" onClick={handleSync}>
        同步时间
      </Button>
      {syncStatus && <Text type="secondary" style={{ marginLeft: 8 }}>{syncStatus}</Text>}
    </Card>
  );
}

export default Home;