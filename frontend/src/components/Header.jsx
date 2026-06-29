import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Chip,
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function Header() {

    return (

        <AppBar
            position="static"
            elevation={2}
            sx={{
                background:
                    "linear-gradient(90deg,#0f172a,#1e3a8a)",
            }}
        >

            <Toolbar
                sx={{
                    minHeight: 80,
                    justifyContent: "space-between",
                }}
            >

                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                >

                    <SecurityIcon
                        sx={{
                            fontSize: 38,
                        }}
                    />

                    <Box>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            TrustLens AI
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                opacity: 0.9,
                            }}
                        >
                            Marketplace Trust & Safety Investigation Platform
                        </Typography>

                    </Box>

                </Box>

                <Chip
                    icon={<VerifiedUserIcon />}
                    label="AI Powered"
                    color="success"
                    variant="filled"
                />

            </Toolbar>

        </AppBar>

    );

}