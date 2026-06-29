import {
    Grid,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

export default function DashboardAnalytics({ investigations }) {

    const total = investigations.length;

    const violations = investigations.filter(i => i.violation).length;

    const averageRisk =
        total === 0
            ? 0
            : Math.round(
                investigations.reduce(
                    (sum, i) => sum + i.risk_score,
                    0
                ) / total
            );

    const safe = total - violations;

    return (

        <>
            <Typography
                variant="h4"
                fontWeight="bold"
                color="white"
                sx={{ mb: 1 }}
            >
                AI Trust & Safety Dashboard
            </Typography>

            <Typography
                color="grey.400"
                sx={{ mb: 4 }}
            >
                Monitor product investigations, compliance risks and policy violations.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 5 }}>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >
                        <CardContent>
                            <Typography color="text.secondary">
                                Total Investigations
                            </Typography>

                            <Typography
                                variant="h3"
                                fontWeight="bold"
                            >
                                {total}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >
                        <CardContent>
                            <Typography color="text.secondary">
                                Violations
                            </Typography>

                            <Typography
                                variant="h3"
                                color="error"
                            >
                                {violations}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >
                        <CardContent>
                            <Typography color="text.secondary">
                                Average Risk
                            </Typography>

                            <Typography
                                variant="h3"
                                color="warning.main"
                            >
                                {averageRisk}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 3,
                            height: "100%",
                        }}
                    >
                        <CardContent>
                            <Typography color="text.secondary">
                                Safe Products
                            </Typography>

                            <Typography
                                variant="h3"
                                color="success.main"
                            >
                                {safe}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </>
    );
}