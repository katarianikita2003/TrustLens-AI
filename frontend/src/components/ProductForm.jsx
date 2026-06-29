import { useState } from "react";
import api from "../services/api";

import {
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

export default function ProductForm({ onResult,
  loading,
  setLoading, }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const analyzeProduct = async () => {

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
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onResult(response.data);

    } catch (err) {

      console.error(err);
      alert("Backend Error");

    } finally {

      setLoading(false);

    }

  };

  return (
    <Paper
      sx={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 4,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
      >
        Analyze Product
      </Typography>

      <TextField
        label="Product Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <TextField
        label="Description"
        fullWidth
        rows={5}
        multiline
        margin="normal"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <Button
        variant="outlined"
        component="label"
        sx={{ mt: 2 }}
      >
        Upload Product Image

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

      </Button>

      {image && (

        <Typography sx={{ mt: 1 }}>

          Selected:

          {" "}

          {image.name}

        </Typography>

      )}

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={analyzeProduct}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress
            size={24}
            color="inherit"
          />
        ) : (
          "Analyze"
        )}
      </Button>
    </Paper>
  );
}