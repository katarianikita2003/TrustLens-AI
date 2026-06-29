import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

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

                    <Card sx={{ height: "100%" }}>

                        <CardContent>

                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                Product Safety
                            </Typography>

                            <PieRiskChart
                                investigations={investigations}
                            />

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>

                    <Card sx={{ height: "100%" }}>

                        <CardContent>

                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                Risk Distribution
                            </Typography>

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

                    <Card>

                        <CardContent>

                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                Investigation Trend
                            </Typography>

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