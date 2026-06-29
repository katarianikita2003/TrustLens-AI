import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    AreaChart,
    Dot,
} from "recharts";

export default function InvestigationTrend({ investigations }) {

    const counts = {};

    investigations.forEach((item) => {

        const date = new Date(item.created_at)
            .toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
            });

        counts[date] = (counts[date] || 0) + 1;

    });

    const data = Object.entries(counts).map(([date, value]) => ({
        date,
        investigations: value,
    }));

    return (

        <ResponsiveContainer
            width="100%"
            height={340}
        >

            <AreaChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 0,
                    bottom: 10,
                }}
            >

                <defs>

                    <linearGradient
                        id="trendGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="#1976d2"
                            stopOpacity={0.35}
                        />

                        <stop
                            offset="95%"
                            stopColor="#1976d2"
                            stopOpacity={0.02}
                        />

                    </linearGradient>

                </defs>

                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    vertical={false}
                />

                <XAxis
                    dataKey="date"
                    tick={{
                        fontSize: 12,
                    }}
                />

                <YAxis
                    allowDecimals={false}
                    tick={{
                        fontSize: 12,
                    }}
                />

                <Tooltip
                    formatter={(value) => [
                        `${value}`,
                        "Investigations",
                    ]}
                    labelFormatter={(label) =>
                        `Date: ${label}`
                    }
                    contentStyle={{
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        boxShadow:
                            "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                />

                <Area
                    type="monotone"
                    dataKey="investigations"
                    stroke="none"
                    fill="url(#trendGradient)"
                />

                <Line
                    type="monotone"
                    dataKey="investigations"
                    stroke="#1976D2"
                    strokeWidth={3}
                    animationDuration={900}
                    dot={{
                        r: 5,
                        strokeWidth: 2,
                        fill: "#1976D2",
                        stroke: "#fff",
                    }}
                    activeDot={{
                        r: 8,
                    }}
                />

            </AreaChart>

        </ResponsiveContainer>

    );

}