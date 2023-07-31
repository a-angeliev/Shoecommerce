import React, { useEffect, useState } from "react";

import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Sector,
} from "recharts";
import * as summaryService from "../../services/summary";

import style from "./Summary.module.css";

export const Summary = () => {
    const [chartData, setChartData] = useState([]);
    const [numberOfOrders, setNumberOfOrders] = useState([
        { name: "Total Orders", value: 0 },
        { name: "Shipped Orders", value: 0 },
    ]);
    const [priceOfOrders, setPriceOfOrders] = useState([
        { name: "Total Price", value: 0 },
        { name: "Shipped Price", value: 0 },
    ]);

    const [stateOrders, setStateOrders] = useState({ activeIndex: 0 });
    const [statePrice, setStatePrice] = useState({ activeIndex: 0 });

    useEffect(() => {
        summaryService
            .getSummary()
            .then((res) => {
                setChartData(res.chart_data);
                setNumberOfOrders([
                    { name: "Total Orders", value: res.monthly_orders_number },
                    { name: "Shipped Orders", value: res.monthly_shipped_orders_number },
                ]);
                setPriceOfOrders([
                    { name: "Total Price", value: res.monthly_orders_price },
                    { name: "Shipped Price", value: res.monthly_shipped_orders_price },
                ]);
            })
            .catch((err) => console.log(err));
    }, []);

    const colors = ["#8884D8", "#82CA9D"];

    const renderActiveShape = (props, text) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } =
            props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill='#333'>{`${text} ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill='#999'>
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    return (
        <>
            <div className={style["summary-content"]}>
                <div className={style["summary-title"]}>
                    <h1>Summary</h1>
                </div>
                <div className={style["chart-section"]}>
                    <div className={style["bar-chart"]}>
                        <ResponsiveContainer width='100%' height='100%'>
                            <BarChart
                                width={500}
                                height={300}
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='date'></XAxis>
                                <YAxis></YAxis>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey='orders' stackId='a' fill='#8884d8' />
                                <Bar dataKey='total_price' stackId='a' fill='#82ca9d' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={style["circle-section"]}>
                        <div className={style["circle-chart"]}>
                            <ResponsiveContainer width='100%' height='100%'>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        activeIndex={stateOrders.activeIndex}
                                        activeShape={(props) => renderActiveShape(props, "Orders:")}
                                        data={numberOfOrders}
                                        cx='50%'
                                        cy='50%'
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill='#8884d8'
                                        dataKey='value'
                                        onMouseEnter={(_, index) => {
                                            setStateOrders({
                                                activeIndex: index,
                                            });
                                        }}>
                                        {numberOfOrders.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={style["circle-chart"]}>
                            <ResponsiveContainer width='100%' height='100%'>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        activeIndex={statePrice.activeIndex}
                                        activeShape={(props) => renderActiveShape(props, "$")}
                                        data={priceOfOrders}
                                        cx='50%'
                                        cy='50%'
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill='#8884d8'
                                        dataKey='value'
                                        onMouseEnter={(_, index) => {
                                            setStatePrice({
                                                activeIndex: index,
                                            });
                                        }}>
                                        {priceOfOrders.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
