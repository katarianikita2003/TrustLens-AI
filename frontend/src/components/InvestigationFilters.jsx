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
    Stack,
    Typography,
    InputAdornment,
    Chip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
    exportCSV,
    exportPDF,
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

    const categories = [
        "all",
        ...new Set(
            investigations
                .map((i) => i.risk_category)
                .filter(Boolean)
        ),
    ];

    return (

        <Card
            elevation={2}
            sx={{
                mb: 4,
                borderRadius: 3,
            }}
        >

            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 3 }}
                >

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >

                        <FilterListIcon color="primary" />

                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            Investigation Filters
                        </Typography>

                    </Stack>

                    <Chip
                        color="primary"
                        label={`${investigations.length} Investigations`}
                    />

                </Stack>

                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                >

                    {/* Search */}

                    <Grid item xs={12} md={3}>

                        <TextField
                            fullWidth
                            label="Search Product"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>

                    {/* Violation */}

                    <Grid item xs={12} sm={6} md={2}>

                        <FormControl fullWidth>

                            <InputLabel>
                                Status
                            </InputLabel>

                            <Select
                                value={violation}
                                label="Status"
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
                                    Approved
                                </MenuItem>

                            </Select>

                        </FormControl>

                    </Grid>

                    {/* Category */}

                    <Grid item xs={12} sm={6} md={2}>

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

                                {categories.map((cat) => (

                                    <MenuItem
                                        key={cat}
                                        value={cat}
                                    >
                                        {cat === "all"
                                            ? "All Categories"
                                            : cat}
                                    </MenuItem>

                                ))}

                            </Select>

                        </FormControl>

                    </Grid>

                    {/* Sort */}

                    <Grid item xs={12} sm={6} md={2}>

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
                                    Newest First
                                </MenuItem>

                                <MenuItem value="oldest">
                                    Oldest First
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

                    {/* Buttons */}

                    <Grid item xs={12} md={3}>

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",
                            }}
                            spacing={1}
                            justifyContent="flex-end"
                        >

                            <Button
                                variant="contained"
                                startIcon={<DownloadIcon />}
                                onClick={() =>
                                    exportCSV(investigations)
                                }
                            >
                                CSV
                            </Button>

                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<PictureAsPdfIcon />}
                                onClick={() =>
                                    exportPDF(investigations)
                                }
                            >
                                PDF
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<RestartAltIcon />}
                                onClick={resetFilters}
                            >
                                Reset
                            </Button>

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}