import {
    Grid,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ShieldIcon from "@mui/icons-material/Shield";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/material/Box";

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
                TrustLens Investigation Console
            </Typography>

            <Typography
                color="grey.400"
                sx={{ mb: 4 }}
            >
                AI-powered marketplace compliance, policy retrieval and risk investigation dashboard.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 5 }}>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                            },
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        Total Investigations
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        fontWeight={700}
                                    >
                                        {total}
                                    </Typography>

                                </Box>

                                <FolderSpecialIcon
                                    color="primary"
                                    sx={{
                                        fontSize: 40
                                    }}
                                />

                            </Box>

                        </CardContent>

                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                            },
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        Violations
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        color="error"
                                        fontWeight={700}
                                    >
                                        {violations}
                                    </Typography>
                                </Box>

                                <ReportProblemIcon
                                    color="error"
                                    sx={{
                                        fontSize: 40
                                    }}
                                />

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                            },
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        Average Risk
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        color="warning"
                                        fontWeight={700}
                                    >
                                        {averageRisk}
                                    </Typography>

                                </Box>

                                <TrendingUpIcon
                                    color="warning"
                                    sx={{
                                        fontSize: 40
                                    }}
                                />

                            </Box>

                        </CardContent>

                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                            },
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Box>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        Safe Products
                                    </Typography>

                                    <Typography
                                        variant="h3"
                                        color="success"
                                        fontWeight={700}
                                    >
                                        {safe}
                                    </Typography>

                                </Box>

                                <ShieldIcon
                                    color="success"
                                    sx={{
                                        fontSize: 40
                                    }}
                                />

                            </Box>

                        </CardContent>

                    </Card>
                </Grid>

            </Grid>
        </>
    );
}