import {
    Paper,
    Grid,
    Typography,
    Chip,
    Box
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";

export default function DecisionBanner({
    violation,
    confidence,
    severity,
    riskScore,
    action
}) {

    const isViolation = violation === true;

    const color = isViolation ? "error" : "success";

    const title = isViolation
        ? "POLICY VIOLATION DETECTED"
        : "COMPLIANT LISTING";

    const subtitle = isViolation
        ? "This listing requires moderator attention."
        : "This listing passed all compliance checks.";

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                mb: 4,
                borderLeft: `8px solid ${
                    isViolation ? "#d32f2f" : "#2e7d32"
                }`
            }}
        >

            <Grid container spacing={3} alignItems="center">

                <Grid item>

                    {
                        isViolation
                            ? <CancelIcon color="error" sx={{ fontSize: 55 }} />
                            : <CheckCircleIcon color="success" sx={{ fontSize: 55 }} />
                    }

                </Grid>

                <Grid item xs>

                    <Typography variant="h5" fontWeight="bold">

                        {title}

                    </Typography>

                    <Typography color="text.secondary">

                        {subtitle}

                    </Typography>

                </Grid>

            </Grid>

            <Box
                mt={3}
                display="flex"
                gap={2}
                flexWrap="wrap"
            >

                <Chip
                    color={color}
                    label={`Risk Score: ${riskScore}`}
                />

                <Chip
                    color={color}
                    label={`Severity: ${severity}`}
                />

                <Chip
                    color={color}
                    label={`Confidence: ${confidence}%`}
                />

                <Chip
                    color={color}
                    label={`Action: ${action}`}
                />

            </Box>

        </Paper>

    );

}