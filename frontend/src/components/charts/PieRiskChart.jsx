import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#EF5350", // Violations
    "#66BB6A", // Safe
];

export default function PieRiskChart({
    investigations,
}) {

    const violations = investigations.filter(
        (i) => i.violation
    ).length;

    const safe = investigations.length - violations;

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

    const total = violations + safe;

    return (

        <ResponsiveContainer
            width="100%"
            height={340}
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={115}
                    paddingAngle={3}
                    cornerRadius={6}
                    animationDuration={900}
                    label={({ percent }) =>
                        `${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}

                    label={(props) => {

                        const {
                            cx,
                            cy,
                            viewBox,
                            percent,
                        } = props;

                        // Draw labels outside the slices
                        if (viewBox) {
                            return `${(percent * 100).toFixed(0)}%`;
                        }

                        return null;
                    }}
                >

                    {data.map((entry, index) => (

                        <Cell
                            key={entry.name}
                            fill={COLORS[index]}
                        />

                    ))}

                </Pie>

                <text
                    x="50%"
                    y="42%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="34"
                    fontWeight="bold"
                    fill="#1e293b"
                >
                    {total}
                </text>

                <text
                    x="50%"
                    y="51%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fill="#64748b"
                >
                    Investigations
                </text>

                <Tooltip
                    formatter={(value, name) => [
                        `${value} Product${value !== 1 ? "s" : ""}`,
                        name,
                    ]}
                    contentStyle={{
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                />

                <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{
                        paddingTop: 15,
                        fontSize: 14,
                    }}
                />

            </PieChart>

        </ResponsiveContainer>

    );

}