import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function InvestigationTrend({ investigations }) {

    const counts = {};

    investigations.forEach((item) => {

        const date = new Date(item.created_at)
            .toLocaleDateString();

        counts[date] = (counts[date] || 0) + 1;

    });

    const data = Object.keys(counts).map(date => ({
        date,
        investigations: counts[date],
    }));

    return (

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="investigations"
                    stroke="#1976d2"
                    strokeWidth={3}
                />

            </LineChart>

        </ResponsiveContainer>

    );

}