import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import Box from "@mui/material/Box";

import PieRiskChart from "./charts/PieRiskChart";
import RiskBarChart from "./charts/RiskBarChart";
import InvestigationTrend from "./charts/InvestigationTrend";

export default function DashboardCharts({ investigations }) {

    return (
        <>

            {/* First Row */}

            <Grid
                container
                spacing={3}
                sx={{ mb: 3 }}
            >

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card
                        elevation={3}
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: 6,
                            },
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                mb={2}
                            >

                                <DonutLargeIcon color="primary" />

                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                >
                                    Product Safety Overview
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    Distribution of compliant vs violating listings.
                                </Typography>

                            </Box>

                            <PieRiskChart
                                investigations={investigations}
                            />

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>

                    <Card
                        elevation={3}
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: 6,
                            },
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                mb={2}
                            >

                                <BarChartIcon color="warning" />

                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                >
                                    Risk Distribution
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    Risk score assigned by the AI investigation pipeline.
                                </Typography>

                            </Box>

                            <RiskBarChart
                                investigations={investigations}
                            />

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            {/* Second Row */}

            <Grid
                container
                spacing={3}
                sx={{ mb: 5 }}
            >

                <Grid size={{ xs: 12 }}>

                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                mb={2}
                            >

                                <TimelineIcon color="success" />

                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                >
                                    Investigation Trend
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    Historical investigation volume over time.
                                </Typography>

                            </Box>

                            <InvestigationTrend
                                investigations={investigations}
                            />

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </>
    );
}