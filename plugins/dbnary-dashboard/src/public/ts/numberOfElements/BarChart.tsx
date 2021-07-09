import React, { useState, FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label } from "recharts";
import { format as d3Format } from "d3-format";
import { getEnglishName } from "../utils/iso636_1";
import { DecorationSpec } from "./styles";

const BarGraph = ({ title, data, labels }) => {
    const [barProps, setBarProps] = useState(
        labels.reduce(
            (a, { key }) => {
                a[key] = false;
                return a;
            },
            { hover: null }
        )
    );

    const handleLegendMouseEnter = (e) => {
        if (!barProps[e.dataKey]) {
            setBarProps({ ...barProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = (e) => {
        setBarProps({ ...barProps, hover: null });
    };

    const selectBar = (e) => {
        setBarProps({
            ...barProps,
            [e.dataKey]: !barProps[e.dataKey],
            hover: null
        });
    };

    const kbTickFormat = d3Format(".2s");

    const langNameFormatter = (label: any) => {
        return label instanceof Number ? <span>{label}</span> : <span>{getEnglishName(label)}</span>;
    };

    const XAxisLanguageTick: FC<any> = ({ x, y, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={12}
                    textAnchor="middle"
                    fill="#666"
                    fontSize="0.7rem"
                    fontFamily="Roboto, sans-serif, Helvetica, Arial"
                >
                    {payload.value}
                </text>
            </g>
        );
    };

    const YAxisNumberTick: FC<any> = (props) => {
        const { x, y, payload } = props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    textAnchor="end"
                    fill="#666"
                    fontSize="0.7rem"
                    fontFamily="Roboto, sans-serif, Helvetica, Arial"
                >
                    {kbTickFormat(payload.value)}
                </text>
            </g>
        );
    };

    return (
        <div>
            <h3>{title}</h3>
            <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="Language" tick={<XAxisLanguageTick />} />
                <YAxis type="number" tick={<YAxisNumberTick />} />
                <Tooltip labelFormatter={langNameFormatter} />
                <Legend onClick={selectBar} />
                {labels.map((label) => (
                    <Bar
                        key={label.key}
                        dataKey={label.key}
                        fill={label.color}
                        stackId={"a"}
                        hide={barProps[label.key] === true}
                        fillOpacity={Number(barProps.hover === label.key || !barProps.hover ? 1 : 0.6)}
                    />
                ))}
            </BarChart>
        </div>
    );
};

export default BarGraph;
