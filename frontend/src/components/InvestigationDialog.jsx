import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider,
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

    const report = JSON.parse(investigation.report_json);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                Investigation #{investigation.id}
            </DialogTitle>

            <DialogContent dividers>

                <Typography variant="h5" gutterBottom>
                    {investigation.title}
                </Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                    Uploaded Product Image
                </Typography>

                {investigation.image_path && (
                    <img
                        src={`http://127.0.0.1:8000/${investigation.image_path}`}
                        alt="Product"
                        style={{
                            width: "100%",
                            maxHeight: 350,
                            objectFit: "contain",
                            borderRadius: 8,
                            border: "1px solid #ddd",
                            marginBottom: 20,
                        }}
                    />
                )}


                {/* Compliance */}

                <Typography variant="h5" gutterBottom>
                    Compliance Analysis
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>

                    <Grid item xs={4}>
                        <Card>
                            <CardContent>

                                <Typography variant="body2">
                                    Violation
                                </Typography>

                                <Chip
                                    label={
                                        report.compliance.violation
                                            ? "YES"
                                            : "NO"
                                    }
                                    color={
                                        report.compliance.violation
                                            ? "error"
                                            : "success"
                                    }
                                    sx={{ mt: 1 }}
                                />

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card>
                            <CardContent>

                                <Typography variant="body2">
                                    Risk Score
                                </Typography>

                                <Chip
                                    label={report.risk.severity}
                                    color={
                                        report.risk.severity === "High"
                                            ? "error"
                                            : report.risk.severity === "Medium"
                                                ? "warning"
                                                : "success"
                                    }
                                />

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card>
                            <CardContent>

                                <Typography variant="body2">
                                    Severity
                                </Typography>

                                <Typography variant="h3">
                                    {report.risk.severity}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card>
                            <CardContent>

                                <Typography variant="body2">
                                    Marketplace Action
                                </Typography>

                                <Chip
                                    label={report.risk.marketplace_action}
                                    color={
                                        report.risk.marketplace_action
                                            .toLowerCase()
                                            .includes("reject")
                                            ? "error"
                                            : "success"
                                    }
                                />

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="h6">
                    Reason
                </Typography>

                <Typography paragraph>
                    {report.compliance.reason}
                </Typography>

                <Typography variant="h6" sx={{ mt: 3 }}>
                    Evidence
                </Typography>

                <ul>
                    {report.compliance.evidence?.map((item, index) => (
                        <li key={index}>
                            <Typography>{item}</Typography>
                        </li>
                    ))}
                </ul>

                <br />

                {/* Risk */}

                <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                    Risk Assessment
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>

                    <Grid item xs={4}>
                        <Card>
                            <CardContent>

                                <Typography variant="body2">
                                    Category
                                </Typography>

                                <Typography variant="h6">
                                    {report.risk.risk_category}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card>
                            <CardContent>

                                <Typography variant="body2">
                                    Severity
                                </Typography>

                                <Chip
                                    label={report.risk.severity}
                                    color={
                                        report.risk.severity === "Critical"
                                            ? "error"
                                            : report.risk.severity === "High"
                                                ? "warning"
                                                : "success"
                                    }
                                    sx={{ mt: 1 }}
                                />

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card>
                            <CardContent>

                                <Typography variant="body2">
                                    Marketplace Action
                                </Typography>

                                <Chip
                                    label={report.risk.marketplace_action}
                                    color="error"
                                    sx={{ mt: 1 }}
                                />

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="h6">
                    Business Impact
                </Typography>

                <Typography paragraph>
                    {report.risk.business_impact}
                </Typography>

                <br />

                {/* Timeline */}

                <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                    AI Investigation Timeline
                </Typography>

                <Timeline position="right">

                    {report.explanation.timeline.map((step) => (

                        <TimelineItem key={step.step}>

                            <TimelineSeparator>

                                <TimelineDot color="primary">
                                    <AutoAwesomeIcon fontSize="small" />
                                </TimelineDot>

                                <TimelineConnector />

                            </TimelineSeparator>

                            <TimelineContent>

                                <Typography variant="h6">
                                    {step.event}
                                </Typography>

                                <Typography color="text.secondary">
                                    {step.description}
                                </Typography>

                            </TimelineContent>

                        </TimelineItem>

                    ))}

                </Timeline>

            </DialogContent>
        </Dialog>
    );
}