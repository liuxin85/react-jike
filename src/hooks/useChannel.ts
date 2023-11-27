// 封装获取频道列表的逻辑
import { useState, useEffect } from "react";
import { getChannelAPI } from "@/apis/article";

function useChannel() {
  //1. 获取频道列表所有的逻辑

  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    // 1. 封装函数 在函数内部调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    // 2. 调用函数
    getChannelList();
  }, []);

  // 2. 把组件中要用到的数据return出去
  return { channelList };
}

export { useChannel };
