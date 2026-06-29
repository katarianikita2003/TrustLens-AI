import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#ef5350",
    "#66bb6a",
];

export default function PieRiskChart({
    investigations,
}) {

    const violations = investigations.filter(
        i => i.violation
    ).length;

    const safe =
        investigations.length - violations;

    const data = [
        {
            name: "Violations",
            value: violations,
        },
        {
            name: "Safe",
            value: safe,
        },
    ];

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                >

                    {data.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={COLORS[index]}
                        />

                    ))}

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    );

}