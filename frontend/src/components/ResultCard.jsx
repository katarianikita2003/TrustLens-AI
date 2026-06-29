import {
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Stack,
    Divider,
} from "@mui/material";

export default function ResultCard({ result }) {

    if (!result) return null;

    const compliance = result.compliance;
    const risk = result.risk;

    const violation = compliance.violation;

    const confidence = Math.round(compliance.confidence);

    return (

        <Grid
            container
            spacing={3}
            sx={{
                maxWidth: 1200,
                mx: "auto",
                mt: 2,
                mb: 4,
            }}
        >

            {/* Investigation Summary */}

            <Grid item xs={12}>

                <Card
                    elevation={3}
                    sx={{
                        borderLeft: violation
                            ? "8px solid #d32f2f"
                            : "8px solid #2e7d32",
                    }}
                >

                    <CardContent>

                        <Stack
                            direction={{
                                xs: "column",
                                md: "row",
                            }}
                            justifyContent="space-between"
                            alignItems={{
                                xs: "flex-start",
                                md: "center",
                            }}
                            spacing={2}
                        >

                            <div>

                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                >
                                    AI Investigation Completed
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    The multi-agent pipeline finished analyzing
                                    the submitted listing and generated the
                                    compliance assessment below.
                                </Typography>

                            </div>

                            <Chip
                                label={
                                    violation
                                        ? "Violation Detected"
                                        : "Listing Approved"
                                }
                                color={
                                    violation
                                        ? "error"
                                        : "success"
                                }
                                sx={{
                                    fontWeight: 700,
                                    px: 1,
                                }}
                            />

                        </Stack>

                    </CardContent>

                </Card>

            </Grid>

            {/* Summary Cards */}

            <Grid item xs={12} md={4}>

                <Card elevation={2}>

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Compliance Status
                        </Typography>

                        <Chip
                            sx={{ mt: 2 }}
                            label={
                                violation
                                    ? "Violation"
                                    : "Approved"
                            }
                            color={
                                violation
                                    ? "error"
                                    : "success"
                            }
                        />

                    </CardContent>

                </Card>

            </Grid>

            <Grid item xs={12} md={4}>

                <Card elevation={2}>

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Risk Score
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                            sx={{ mt: 1 }}
                        >
                            {risk.risk_score}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            out of 100
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

            <Grid item xs={12} md={4}>

                <Card elevation={2}>

                    <CardContent>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            AI Confidence
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                            sx={{ mt: 1 }}
                        >
                            {confidence}%
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Overall investigation confidence
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>

            {/* Detailed Risk Assessment */}

            <Grid item xs={12}>

                <Card elevation={2}>

                    <CardContent>

                        <Typography
                            variant="h5"
                            fontWeight={600}
                            gutterBottom
                        >
                            Risk Assessment
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Grid
                            container
                            spacing={3}
                        >

                            <Grid item xs={12} md={6}>

                                <Typography gutterBottom>

                                    <strong>Risk Category:</strong>{" "}
                                    {risk.risk_category}

                                </Typography>

                                <Typography gutterBottom>

                                    <strong>Severity:</strong>{" "}

                                    <Chip
                                        size="small"
                                        label={risk.severity}
                                        color={
                                            risk.severity === "Critical"
                                                ? "error"
                                                : risk.severity === "High"
                                                    ? "warning"
                                                    : "success"
                                        }
                                        sx={{ ml: 1 }}
                                    />

                                </Typography>

                                <Typography gutterBottom>

                                    <strong>Marketplace Action:</strong>{" "}

                                    <Chip
                                        size="small"
                                        label={risk.marketplace_action}
                                        color={
                                            risk.marketplace_action === "Approve"
                                                ? "success"
                                                : risk.marketplace_action === "Review"
                                                    ? "warning"
                                                    : "error"
                                        }
                                        sx={{ ml: 1 }}
                                    />

                                </Typography>

                            </Grid>

                            <Grid item xs={12} md={6}>

                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Business Impact
                                </Typography>

                                <Typography>

                                    {risk.business_impact}

                                </Typography>

                            </Grid>

                        </Grid>

                    </CardContent>

                </Card>

            </Grid>

        </Grid>

    );

}