import { Link } from "react-router-dom";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider,
    Button,
} from "@mui/material";

import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
} from "@mui/lab";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function InvestigationDialog({
    open,
    onClose,
    investigation,
}) {
    if (!investigation) return null;

    const report =
        typeof investigation.report_json === "string"
            ? JSON.parse(investigation.report_json)
            : investigation.report_json;

    const compliance = report?.compliance ?? {};
    const risk = report?.risk ?? {};
    const explanation = report?.explanation ?? {};
    const imageAnalysis = report?.image_analysis ?? {};

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 600,
                }}
            >
                <AutoAwesomeIcon color="primary" />
                Investigation #{investigation.id}
            </DialogTitle>

            <DialogContent dividers>

                <Typography
                    variant="h4"
                    fontWeight={600}
                    gutterBottom
                >
                    {investigation.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Investigation Summary
                </Typography>

                <Grid
                    container
                    spacing={4}
                    alignItems="flex-start"
                >

                    {/* LEFT */}

                    <Grid
                        item
                        xs={12}
                        md={5}
                    >

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Evidence
                        </Typography>

                        {investigation.image_path && (
                            <img
                                src={`http://127.0.0.1:8000/${investigation.image_path}`}
                                alt="Product"
                                style={{
                                    width: "100%",
                                    borderRadius: 12,
                                    border: "1px solid #ddd",
                                    objectFit: "cover",
                                }}
                            />
                        )}

                    </Grid>

                    {/* RIGHT */}

                    <Grid
                        item
                        xs={12}
                        md={7}
                    >

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Compliance Summary
                        </Typography>

                        <Grid
                            container
                            spacing={2}
                        >

                            <Grid item xs={6}>
                                <Card variant="outlined">
                                    <CardContent>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Decision
                                        </Typography>

                                        <Chip
                                            sx={{ mt: 1 }}
                                            label={
                                                compliance.violation
                                                    ? "Violation"
                                                    : "Compliant"
                                            }
                                            color={
                                                compliance.violation
                                                    ? "error"
                                                    : "success"
                                            }
                                        />

                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6}>
                                <Card variant="outlined">
                                    <CardContent>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Risk Score
                                        </Typography>

                                        <Typography variant="h4">
                                            {risk.risk_score}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6}>
                                <Card variant="outlined">
                                    <CardContent>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Severity
                                        </Typography>

                                        <Chip
                                            sx={{ mt: 1 }}
                                            label={risk.severity}
                                            color={
                                                risk.severity === "High"
                                                    ? "error"
                                                    : risk.severity === "Medium"
                                                        ? "warning"
                                                        : "success"
                                            }
                                        />

                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={6}>
                                <Card variant="outlined">
                                    <CardContent>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Marketplace Action
                                        </Typography>

                                        <Chip
                                            sx={{ mt: 1 }}
                                            label={risk.marketplace_action}
                                            color={
                                                risk.marketplace_action === "Approve"
                                                    ? "success"
                                                    : risk.marketplace_action === "Review"
                                                        ? "warning"
                                                        : "error"
                                            }
                                        />

                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            AI Reasoning
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            {compliance.reason}
                        </Typography>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 4 }} />
                {/* Investigation Evidence */}

                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ mt: 4 }}
                >
                    Supporting Evidence
                </Typography>

                <Grid
                    container
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    {compliance.evidence?.map((item, index) => (
                        <Grid
                            item
                            xs={12}
                            key={index}
                        >
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {item}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* AI Investigation Timeline */}

                <Typography
                    variant="h5"
                    gutterBottom
                >
                    Investigation Timeline
                </Typography>

                <Timeline position="right">

                    {explanation.timeline?.map((step, index) => (

                        <TimelineItem key={step.step}>

                            <TimelineSeparator>

                                <TimelineDot
                                    color={
                                        index === explanation.timeline.length - 1
                                            ? "success"
                                            : "primary"
                                    }
                                >
                                    <AutoAwesomeIcon fontSize="small" />
                                </TimelineDot>

                                {index !== explanation.timeline.length - 1 && (
                                    <TimelineConnector />
                                )}

                            </TimelineSeparator>

                            <TimelineContent>

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                >
                                    {step.event}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {step.description}
                                </Typography>

                            </TimelineContent>

                        </TimelineItem>

                    ))}

                </Timeline>

            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    py: 2,
                    justifyContent: "space-between",
                }}
            >

                <Button
                    onClick={onClose}
                >
                    Close
                </Button>

                <Button
                    component={Link}
                    to={`/investigation/${investigation.id}`}
                    variant="contained"
                    onClick={onClose}
                >
                    View Full Investigation →
                </Button>

            </DialogActions>

        </Dialog>
    );
}