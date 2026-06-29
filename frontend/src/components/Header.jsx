import { AppBar, Toolbar, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <SecurityIcon sx={{ mr: 2 }} />

        <Typography variant="h6">
          TrustLens AI
        </Typography>
      </Toolbar>
    </AppBar>
  );
}