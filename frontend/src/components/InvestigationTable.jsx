import { useState } from "react";
import { Link } from "react-router-dom";

import InvestigationDialog from "./InvestigationDialog";

import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Chip,
    Avatar,
    Button,
    Stack,
    Tooltip,
    TableContainer,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import LaunchIcon from "@mui/icons-material/Launch";

export default function InvestigationTable({
    investigations,
}) {

    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    if (!investigations || investigations.length === 0) {

        return (
            <Paper
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    mt: 4,
                    p: 6,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                >
                    No Investigations Found
                </Typography>

                <Typography color="text.secondary">
                    Submit a product to start your first AI investigation.
                </Typography>

            </Paper>
        );

    }

    return (

        <Paper
            elevation={3}
            sx={{
                maxWidth: 1200,
                mx: "auto",
                mt: 4,
                mb: 5,
                borderRadius: 3,
                overflow: "hidden",
            }}
        >

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    p: 3,
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Investigation Queue
                </Typography>

                <Chip
                    color="primary"
                    label={`${investigations.length} Investigations`}
                />

            </Stack>

            <TableContainer>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                <strong>ID</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Product</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Status</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Risk</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Category</strong>
                            </TableCell>

                            <TableCell>
                                <strong>Created</strong>
                            </TableCell>

                            <TableCell align="center">
                                <strong>Actions</strong>
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {investigations.map((item) => (

                            <TableRow
                                key={item.id}
                                hover
                                sx={{
                                    transition: "0.2s",
                                    "&:hover": {
                                        backgroundColor: "#f8fbff",
                                    },
                                }}
                            >

                                <TableCell>
                                    #{item.id}
                                </TableCell>

                                <TableCell>

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                    >

                                        <Avatar
                                            src={
                                                item.image_path
                                                    ? `http://127.0.0.1:8000/${item.image_path}`
                                                    : undefined
                                            }
                                            alt={item.title}
                                            sx={{
                                                width: 46,
                                                height: 46,
                                            }}
                                        />

                                        <Typography
                                            fontWeight={600}
                                        >
                                            {item.title}
                                        </Typography>

                                    </Stack>

                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={
                                            item.violation
                                                ? "Violation"
                                                : "Approved"
                                        }
                                        color={
                                            item.violation
                                                ? "error"
                                                : "success"
                                        }
                                        size="small"
                                    />

                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={item.risk_score}
                                        color={
                                            item.risk_score >= 80
                                                ? "error"
                                                : item.risk_score >= 50
                                                    ? "warning"
                                                    : "success"
                                        }
                                        size="small"
                                    />

                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={item.risk_category}
                                        variant="outlined"
                                        size="small"
                                    />

                                </TableCell>

                                <TableCell>

                                    {new Date(
                                        item.created_at
                                    ).toLocaleString()}

                                </TableCell>

                                <TableCell
                                    align="center"
                                >

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="center"
                                    >

                                        <Tooltip title="Quick Preview">

                                            <Button
                                                size="small"
                                                variant="outlined"
                                                startIcon={
                                                    <VisibilityIcon />
                                                }
                                                onClick={() => {

                                                    setSelected(item);
                                                    setOpen(true);

                                                }}
                                            >
                                                Preview
                                            </Button>

                                        </Tooltip>

                                        <Tooltip title="Open Full Investigation">

                                            <Button
                                                component={Link}
                                                to={`/investigation/${item.id}`}
                                                size="small"
                                                variant="contained"
                                                endIcon={
                                                    <LaunchIcon />
                                                }
                                            >
                                                Open
                                            </Button>

                                        </Tooltip>

                                    </Stack>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

            <InvestigationDialog
                open={open}
                onClose={() => setOpen(false)}
                investigation={selected}
            />

        </Paper>

    );

}