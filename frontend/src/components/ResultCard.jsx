import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
} from "@mui/material";

export default function ResultCard({ result }) {
  if (!result) return null;

  const compliance = result.compliance;
  const risk = result.risk;

  return (
    <Grid
      container
      spacing={3}
      sx={{
        maxWidth: 1000,
        margin: "20px auto",
      }}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Violation
            </Typography>

            <Chip
              label={
                compliance.violation
                  ? "YES"
                  : "NO"
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

      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Risk Score
            </Typography>

            <Typography variant="h3">
              {compliance.risk_score}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Confidence
            </Typography>

            <Typography variant="h3">
              {(compliance.confidence).toFixed(0)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">
              Risk Assessment
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>Category:</strong>{" "}
              {risk.risk_category}
            </Typography>

            <Typography>
              <strong>Severity:</strong>{" "}
              {risk.severity}
            </Typography>

            <Typography>
              <strong>Action:</strong>{" "}
              {risk.marketplace_action}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              {risk.business_impact}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}