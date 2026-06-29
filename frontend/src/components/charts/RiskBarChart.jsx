import { useState } from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
    LabelList,
} from "recharts";

import {
    Box,
    Pagination,
    Typography,
} from "@mui/material";

const PAGE_SIZE = 10;

export default function RiskBarChart({ investigations }) {

    const [page, setPage] = useState(1);

    const totalPages = Math.max(
        1,
        Math.ceil(investigations.length / PAGE_SIZE)
    );

    // Keep original investigation order
    const data = investigations
        .slice(
            (page - 1) * PAGE_SIZE,
            page * PAGE_SIZE
        )
        .map((item) => ({
            name:
                item.title.length > 16
                    ? item.title.substring(0, 16) + "..."
                    : item.title,
            risk: item.risk_score,
        }));

    return (

        <>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 1 }}
                >
                    Showing{" "}
                    {(page - 1) * PAGE_SIZE + 1}
                    {" - "}
                    {Math.min(page * PAGE_SIZE, investigations.length)}
                    {" of "}
                    {investigations.length}
                    {" Investigations"}
                </Typography>

                <Pagination
                    count={totalPages}
                    page={page}
                    color="primary"
                    shape="rounded"
                    size="medium"
                    showFirstButton
                    showLastButton
                    onChange={(event, value) => setPage(value)}
                />

            </Box>

            <ResponsiveContainer
                width="100%"
                height={360}
            >

                <BarChart
                    data={data}
                    margin={{
                        top: 25,
                        right: 20,
                        left: 0,
                        bottom: 40,
                    }}
                    barGap={6}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="name"
                        angle={-25}
                        textAnchor="end"
                        interval={0}
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <YAxis
                        domain={[0, 100]}
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `${value}/100`,
                            "Risk Score",
                        ]}
                        contentStyle={{
                            borderRadius: 10,
                            border: "1px solid #ddd",
                            boxShadow:
                                "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                    />

                    <Bar
                        dataKey="risk"
                        radius={[8, 8, 0, 0]}
                        animationDuration={700}
                    >

                        <LabelList
                            dataKey="risk"
                            position="top"
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                            }}
                        />

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={
                                    entry.risk >= 80
                                        ? "#EF5350"
                                        : entry.risk >= 50
                                            ? "#FB8C00"
                                            : "#66BB6A"
                                }
                            />

                        ))}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </>

    );

}