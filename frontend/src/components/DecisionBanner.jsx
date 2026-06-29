import {
    Paper,
    Grid,
    Typography,
    Chip,
    Box,
    Stack,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ShieldIcon from "@mui/icons-material/Shield";

export default function DecisionBanner({
    violation,
    confidence,
    severity,
    riskScore,
    action,
}) {

    const isViolation = Boolean(violation);

    const confidenceValue = Math.round(confidence ?? 0);

    let borderColor = "#2e7d32";
    let iconColor = "success";

    if (isViolation) {
        borderColor = "#d32f2f";
        iconColor = "error";
    }
    else if (severity === "Medium") {
        borderColor = "#ed6c02";
        iconColor = "warning";
    }

    const title = isViolation
        ? "POLICY VIOLATION DETECTED"
        : "COMPLIANT LISTING";

    const subtitle = isViolation
        ? "The AI investigation detected one or more marketplace policy violations. Manual moderation or enforcement is recommended."
        : "The listing successfully passed all compliance, policy retrieval, vision AI, and risk assessment checks.";

    const statusChipColor = isViolation ? "error" : "success";

    return (

        <Paper
            elevation={4}
            sx={{
                mb: 4,
                p: 4,
                borderLeft: `10px solid ${borderColor}`,
                borderRadius: 3,
            }}
        >

            <Grid
                container
                spacing={3}
                alignItems="center"
            >

                <Grid item>

                    {isViolation ? (

                        <CancelIcon
                            color={iconColor}
                            sx={{
                                fontSize: 70,
                            }}
                        />

                    ) : (

                        <CheckCircleIcon
                            color={iconColor}
                            sx={{
                                fontSize: 70,
                            }}
                        />

                    )}

                </Grid>

                <Grid item xs>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        {subtitle}
                    </Typography>

                </Grid>

                <Grid item>

                    <Chip
                        icon={<ShieldIcon />}
                        label={
                            isViolation
                                ? "High Priority"
                                : "Verified Safe"
                        }
                        color={statusChipColor}
                        sx={{
                            fontWeight: 700,
                            px: 1,
                            height: 36,
                        }}
                    />

                </Grid>

            </Grid>

            <Stack
                direction="row"
                spacing={1.5}
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 4 }}
            >

                <Chip
                    label={`Risk Score: ${riskScore}/100`}
                    color={
                        riskScore >= 80
                            ? "error"
                            : riskScore >= 50
                                ? "warning"
                                : "success"
                    }
                />

                <Chip
                    icon={<WarningAmberIcon />}
                    label={`Severity: ${severity}`}
                    color={
                        severity === "Critical"
                            ? "error"
                            : severity === "High"
                                ? "warning"
                                : "success"
                    }
                />

                <Chip
                    label={`AI Confidence: ${confidenceValue}%`}
                    color="primary"
                />

                <Chip
                    label={`Marketplace Action: ${action}`}
                    color={
                        action === "Approve"
                            ? "success"
                            : action === "Review"
                                ? "warning"
                                : "error"
                    }
                />

            </Stack>

        </Paper>

    );

}