import {
    Card,
    CardContent,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Stack
} from "@mui/material";
import {
    exportCSV,
    exportPDF
} from "../services/exportService";

export default function InvestigationFilters({
    investigations,
    search,
    setSearch,
    violation,
    setViolation,
    category,
    setCategory,
    sort,
    setSort,
    resetFilters,
}) {

    return (

        <Card sx={{ mb: 3 }}>

            <CardContent>

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Search Product"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>

                        <FormControl fullWidth>

                            <InputLabel>
                                Violation
                            </InputLabel>

                            <Select
                                value={violation}
                                label="Violation"
                                onChange={(e) =>
                                    setViolation(e.target.value)
                                }
                            >

                                <MenuItem value="all">
                                    All
                                </MenuItem>

                                <MenuItem value="yes">
                                    Violations
                                </MenuItem>

                                <MenuItem value="no">
                                    Safe
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>

                        <FormControl fullWidth>

                            <InputLabel>
                                Category
                            </InputLabel>

                            <Select
                                value={category}
                                label="Category"
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                            >

                                <MenuItem value="all">
                                    All
                                </MenuItem>

                                <MenuItem value="Dangerous Goods">
                                    Dangerous Goods
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>

                        <FormControl fullWidth>

                            <InputLabel>
                                Sort
                            </InputLabel>

                            <Select
                                value={sort}
                                label="Sort"
                                onChange={(e) =>
                                    setSort(e.target.value)
                                }
                            >

                                <MenuItem value="newest">
                                    Newest
                                </MenuItem>

                                <MenuItem value="oldest">
                                    Oldest
                                </MenuItem>

                                <MenuItem value="highrisk">
                                    Highest Risk
                                </MenuItem>

                                <MenuItem value="lowrisk">
                                    Lowest Risk
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 3 }}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        gap={2}
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                        >

                            <Button
                                variant="contained"
                                onClick={() => exportCSV(investigations)}
                            >
                                EXPORT CSV
                            </Button>

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => exportPDF(investigations)}
                            >
                                EXPORT PDF
                            </Button>

                        </Stack>

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={resetFilters}
                        >
                            Reset Filters
                        </Button>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}