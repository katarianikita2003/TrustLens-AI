import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";

export default function RiskBarChart({ investigations }) {

    const data = investigations.map((item) => ({
        name: item.title.length > 18
            ? item.title.substring(0, 18) + "..."
            : item.title,
        risk: item.risk_score,
    }));

    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis domain={[0, 100]} />

                <Tooltip />

                <Bar
                    dataKey="risk"
                    radius={[6, 6, 0, 0]}
                >
                    {data.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={
                                entry.risk >= 80
                                    ? "#ef5350"
                                    : entry.risk >= 50
                                    ? "#fb8c00"
                                    : "#66bb6a"
                            }
                        />

                    ))}
                </Bar>

            </BarChart>
        </ResponsiveContainer>
    );
}