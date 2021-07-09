import React, { useState, FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from "recharts";
import { format as d3Format } from "d3-format";
import { getEnglishName } from "../utils/iso636_1";
import { DecorationSpec } from "./styles";

const BarGraph = ({ title, data, labels, open }) => {
    const [barProps, setBarProps] = useState(
        labels.reduce(
            (a, { key }) => {
                a[key] = false;
                return a;
            },
            { hover: null }
        )
    );
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
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                    <XAxis dataKey="Language" tick={<XAxisLanguageTick />} />
                    <YAxis type="number" tick={<YAxisNumberTick />} />
                    <Tooltip labelFormatter={langNameFormatter} />
                    {open ? <Legend onClick={selectBar} /> : ""}
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
            </ResponsiveContainer>
        </div>
    );
};

export default BarGraph;
