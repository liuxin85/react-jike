import * as echarts from "echarts";
import { useEffect, useRef } from "react";
type EChartsOption = echarts.EChartsOption;

function Home() {
  const chartRef = useRef(null);
  useEffect(() => {
    //保证dom可用

    // 1. 获取渲染图标的dom节点
    // const chartDom = document.getElementById("main")!;
    const chartDom = chartRef.current;

    // 2. 图表初始化生成图表的实例对象
    const myChart = echarts.init(chartDom);

    // 3. 图表参数
    const option: EChartsOption = {
      xAxis: {
        type: "category",
        data: ["vue", "react", "angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };
    // 4. 使用图标参数完成图表的渲染
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div
        //  id="main"
        ref={chartRef}
        style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
}

export default Home;
