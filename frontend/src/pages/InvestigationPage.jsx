import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../services/api";
import DecisionBanner from "../components/DecisionBanner";

import {
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

export default function InvestigationPage() {
    const { id } = useParams();

    const [investigation, setInvestigation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInvestigation = async () => {
            try {
                const { data } = await api.get(`/investigations/${id}`);
                setInvestigation(data);
            } catch (error) {
                console.error("Failed to load investigation:", error);
            } finally {
                setLoading(false);
            }
        };

        loadInvestigation();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ mt: 8, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!investigation) {
        return (
            <Container sx={{ mt: 8 }}>
                <Typography variant="h4">
                    Investigation Not Found
                </Typography>
            </Container>
        );
    }

    /* -------------------------------------------------------------------------- */
    /*                                Report Data                                 */
    /* -------------------------------------------------------------------------- */

    const report = investigation?.report ?? {};

    const compliance = report.compliance ?? {};
    const risk = report.risk ?? {};
    const explanation = report.explanation ?? {};
    const imageAnalysis = report.image_analysis ?? {};

    const retrievedPolicies = compliance.retrieved_policies ?? [];
    const evidence = compliance.evidence ?? [];
    const timeline = explanation.timeline ?? [];

    /* -------------------------------------------------------------------------- */
    /*                               Agent Pipeline                               */
    /* -------------------------------------------------------------------------- */

    const agentSteps = [
        {
            name: "Vision Agent",
            details:
                imageAnalysis.detected_object ??
                "No image analysis available",
        },
        {
            name: "Policy Retrieval Agent",
            details: `${retrievedPolicies.length} policies retrieved`,
        },
        {
            name: "Compliance Agent",
            details: compliance.violation
                ? "Violation Detected"
                : "No Violation",
        },
        {
            name: "Risk Agent",
            details: `Risk Score: ${risk.risk_score ?? "-"}`,
        },
        {
            name: "Explanation Agent",
            details: "Reason Generated",
        },
        {
            name: "Report Generator",
            details: "Investigation Saved",
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>

            {/* ------------------------------------------------------------------ */}
            {/* Header */}
            {/* ------------------------------------------------------------------ */}

            <Button
                component={Link}
                to="/"
                variant="outlined"
                sx={{ mb: 4 }}
            >
                ← Back to Dashboard
            </Button>

            <Typography
                variant="h3"
                fontWeight={700}
                gutterBottom
            >
                Investigation #{investigation.id}
            </Typography>

            <Typography
                variant="h5"
                color="primary"
                sx={{ mb: 3 }}
            >
                {investigation.title}
            </Typography>

            {/* ------------------------------------------------------------------ */}
            {/* Final AI Decision */}
            {/* ------------------------------------------------------------------ */}

            <DecisionBanner
                violation={compliance.violation}
                confidence={compliance.confidence}
                severity={compliance.severity}
                riskScore={risk.risk_score}
                action={risk.marketplace_action}
            />

            {/* ====================================================================== */}
            {/* Evidence */}
            {/* ====================================================================== */}

            <Paper
                elevation={2}
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                >
                    📷 Evidence
                </Typography>

                <Grid container spacing={4}>

                    {/* Product Image */}

                    <Grid item xs={12} md={5}>

                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            gutterBottom
                        >
                            Uploaded Product Image
                        </Typography>

                        <img
                            src={`http://127.0.0.1:8000/${investigation.image_path}`}
                            alt={investigation.title}
                            style={{
                                width: "100%",
                                borderRadius: 12,
                                border: "1px solid #ddd",
                                cursor: "pointer",
                                objectFit: "cover",
                            }}
                        />

                    </Grid>

                    {/* Vision AI */}

                    <Grid item xs={12} md={7}>

                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            gutterBottom
                        >
                            Vision AI Analysis
                        </Typography>

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            Detected Object
                                        </Typography>

                                        <Typography variant="h6">
                                            {imageAnalysis.detected_object}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            Confidence
                                        </Typography>

                                        <Typography variant="h6">
                                            {imageAnalysis.confidence}%
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            Vision Risk
                                        </Typography>

                                        <Chip
                                            label={imageAnalysis.risk}
                                            color={
                                                imageAnalysis.risk === "High"
                                                    ? "error"
                                                    : imageAnalysis.risk === "Medium"
                                                        ? "warning"
                                                        : "success"
                                            }
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <CardContent>

                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                            gutterBottom
                                        >
                                            AI Reasoning
                                        </Typography>

                                        <Typography>
                                            {imageAnalysis.reason}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>

            </Paper>

            {/* ====================================================================== */}
            {/* AI Agent Execution */}
            {/* ====================================================================== */}

            <Paper
                elevation={2}
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 3,
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                >
                    🤖 AI Agent Execution
                </Typography>

                <Grid container spacing={2}>

                    {agentSteps.map((agent) => (

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={agent.name}
                        >

                            <Card
                                variant="outlined"
                                sx={{
                                    height: "100%",
                                    transition: "0.2s",
                                    "&:hover": {
                                        boxShadow: 4,
                                    },
                                }}
                            >

                                <CardContent>

                                    <Stack spacing={2}>

                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
                                            {agent.name}
                                        </Typography>

                                        <Chip
                                            label="Completed"
                                            color="success"
                                            size="small"
                                            sx={{
                                                width: "fit-content",
                                            }}
                                        />

                                        <Divider />

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {agent.details}
                                        </Typography>

                                    </Stack>

                                </CardContent>

                            </Card>

                        </Grid>

                    ))}

                </Grid>

            </Paper>

            {/* ====================================================================== */}
            {/* AI Investigation Report */}
            {/* ====================================================================== */}

            <Card
                sx={{
                    mt: 4,
                    borderRadius: 3,
                }}
            >
                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight={600}
                        gutterBottom
                    >
                        📄 AI Investigation Report
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {/* Executive Summary */}

                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Executive Summary
                    </Typography>

                    <Typography paragraph>
                        {compliance.reason}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    {/* Marketplace Decision */}

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={4}>
                            <Card variant="outlined">
                                <CardContent>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Severity
                                    </Typography>

                                    <Chip
                                        label={risk.severity}
                                        color={
                                            risk.severity === "High"
                                                ? "error"
                                                : risk.severity === "Medium"
                                                    ? "warning"
                                                    : "success"
                                        }
                                        sx={{ mt: 1 }}
                                    />

                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card variant="outlined">
                                <CardContent>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Marketplace Action
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        sx={{ mt: 1 }}
                                    >
                                        {risk.marketplace_action}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card variant="outlined">
                                <CardContent>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Business Impact
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 1 }}
                                    >
                                        {risk.business_impact}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* Evidence Used */}

                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        Evidence Used
                    </Typography>

                    <Stack spacing={1}>

                        {evidence.map((item, index) => (

                            <Chip
                                key={index}
                                label={item}
                                variant="outlined"
                                sx={{
                                    justifyContent: "flex-start",
                                    width: "fit-content",
                                }}
                            />

                        ))}

                    </Stack>

                </CardContent>
            </Card>

            {/* ====================================================================== */}
            {/* Retrieved Marketplace Policies */}
            {/* ====================================================================== */}

            <Card
                sx={{
                    mt: 4,
                    borderRadius: 3,
                }}
            >

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight={600}
                        gutterBottom
                    >
                        📚 Retrieved Marketplace Policies
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={2}>

                        {retrievedPolicies.map((policy, index) => (

                            <Grid
                                item
                                xs={12}
                                key={index}
                            >

                                <Card
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 2,
                                    }}
                                >

                                    <CardContent>

                                        <Stack spacing={2}>

                                            <Typography
                                                variant="h6"
                                            >
                                                {policy.title}
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                            >
                                                {policy.content}
                                            </Typography>

                                            <Chip
                                                label="Retrieved by RAG"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    width: "fit-content",
                                                }}
                                            />

                                        </Stack>

                                    </CardContent>

                                </Card>

                            </Grid>

                        ))}

                    </Grid>

                </CardContent>

            </Card>

            {/* ====================================================================== */}
            {/* Investigation Metadata */}
            {/* ====================================================================== */}

            <Paper
                elevation={2}
                sx={{
                    p: 4,
                    mt: 4,
                    mb: 4,
                    borderRadius: 3,
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                >
                    ℹ️ Investigation Metadata
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography color="text.secondary">
                            Investigation ID
                        </Typography>

                        <Typography variant="h6">
                            #{investigation.id}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography color="text.secondary">
                            Policy Category
                        </Typography>

                        <Typography variant="h6">
                            {investigation.category}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography color="text.secondary">
                            Created
                        </Typography>

                        <Typography variant="h6">
                            {new Date(investigation.created_at).toLocaleString()}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography color="text.secondary">
                            Violation
                        </Typography>

                        <Chip
                            label={compliance.violation ? "Yes" : "No"}
                            color={compliance.violation ? "error" : "success"}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography color="text.secondary">
                            Severity
                        </Typography>

                        <Chip
                            label={risk.severity}
                            color={
                                risk.severity === "High"
                                    ? "error"
                                    : risk.severity === "Medium"
                                        ? "warning"
                                        : "success"
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Typography color="text.secondary">
                            AI Agents Executed
                        </Typography>

                        <Typography variant="h6">
                            {agentSteps.length}
                        </Typography>
                    </Grid>

                </Grid>

            </Paper>

            {/* ====================================================================== */}
            {/* Investigation Timeline */}
            {/* ====================================================================== */}

            <Card
                sx={{
                    mt: 4,
                    mb: 6,
                    borderRadius: 3,
                }}
            >

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight={600}
                        gutterBottom
                    >
                        🕒 Investigation Timeline
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Stack spacing={3}>

                        {timeline.map((step) => (

                            <Paper
                                key={step.step}
                                variant="outlined"
                                sx={{
                                    p: 2.5,
                                    borderRadius: 2,
                                }}
                            >

                                <Typography
                                    variant="subtitle1"
                                    fontWeight={700}
                                >
                                    Step {step.step} • {step.event}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    {step.description}
                                </Typography>

                            </Paper>

                        ))}

                    </Stack>

                </CardContent>

            </Card>

        </Container>

    );

}