import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Chip,
} from "@mui/material";
import { useState } from "react";
import InvestigationDialog from "./InvestigationDialog";


export default function InvestigationTable({ investigations }) {
    if (!investigations || investigations.length === 0) return null;

    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    return (
        <Paper
            sx={{
                maxWidth: 1100,
                margin: "30px auto",
                padding: 3,
            }}
        >
            <Typography
                variant="h5"
                gutterBottom
            >
                Previous Investigations
            </Typography>

            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Violation</TableCell>
                        <TableCell>Risk Score</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Created</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {investigations.map((item) => (

                        <TableRow
                            key={item.id}
                            hover
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                                setSelected(item);
                                setOpen(true);
                            }}
                        >

                            <TableCell>{item.id}</TableCell>

                            <TableCell>{item.title}</TableCell>

                            <TableCell>

                                <Chip
                                    label={item.violation ? "YES" : "NO"}
                                    color={item.violation ? "error" : "success"}
                                    size="small"
                                />

                            </TableCell>

                            <TableCell>
                                {item.risk_score}
                            </TableCell>

                            <TableCell>
                                {item.risk_category}
                            </TableCell>

                            <TableCell>
                                {new Date(item.created_at).toLocaleString()}
                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>
            <InvestigationDialog
                open={open}
                onClose={() => setOpen(false)}
                investigation={selected}
            />

        </Paper>
    );
}