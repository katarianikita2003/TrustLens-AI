import { useState } from "react";
import api from "../services/api";

import {
    Paper,
    TextField,
    Typography,
    Button,
    CircularProgress,
    Box,
    Stack,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function ProductForm({
    onResult,
    loading,
    setLoading,
}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const analyzeProduct = async () => {

        if (!title.trim()) {
            alert("Please enter a product title.");
            return;
        }

        if (!description.trim()) {
            alert("Please enter a product description.");
            return;
        }

        setLoading(true);

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);

            if (image) {
                formData.append("image", image);
            }

            const response = await api.post(
                "/analyze",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            onResult(response.data);

            setTitle("");
            setDescription("");
            setImage(null);

        } catch (err) {

            console.error(err);

            alert(
                "Unable to analyze the product. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Paper
            elevation={3}
            sx={{
                maxWidth: 900,
                mx: "auto",
                mt: 5,
                p: 4,
                borderRadius: 3,
            }}
        >

            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                mb={3}
            >

                <AutoAwesomeIcon
                    color="primary"
                    sx={{
                        fontSize: 36,
                    }}
                />

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Create Investigation
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Submit a marketplace listing for AI-powered compliance investigation.
                    </Typography>

                </Box>

            </Stack>

            <TextField
                fullWidth
                label="Product Title"
                placeholder="Example: Apple iPhone 15 Pro"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                sx={{ mb: 3 }}
            />

            <TextField
                fullWidth
                multiline
                rows={5}
                label="Product Description"
                placeholder="Describe the product, materials, purpose, seller claims, or any other relevant information..."
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
                sx={{ mb: 3 }}
            />

            <Paper
                variant="outlined"
                sx={{
                    p: 3,
                    textAlign: "center",
                    borderStyle: "dashed",
                    borderWidth: 2,
                    borderColor: "primary.main",
                    bgcolor: "#fafafa",
                    mb: 3,
                }}
            >

                <Button
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    variant="contained"
                >
                    Upload Product Evidence

                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(
                                e.target.files[0]
                            )
                        }
                    />

                </Button>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >
                    Supported formats: JPG, PNG, WEBP
                </Typography>

                {image && (

                    <Box mt={3}>

                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            style={{
                                maxWidth: 250,
                                maxHeight: 220,
                                borderRadius: 10,
                                border:
                                    "1px solid #ddd",
                            }}
                        />

                        <Typography
                            mt={2}
                            fontWeight={600}
                        >
                            {image.name}
                        </Typography>

                    </Box>

                )}

            </Paper>

            <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={analyzeProduct}
                disabled={loading}
                sx={{
                    py: 1.5,
                    fontSize: 17,
                    fontWeight: 600,
                }}
            >

                {loading ? (

                    <CircularProgress
                        size={26}
                        color="inherit"
                    />

                ) : (

                    "Start AI Investigation"

                )}

            </Button>

        </Paper>

    );

}