import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { BlogPost } from "../../types";

const ViewPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const storedPosts = localStorage.getItem("localBlogData");
  const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : [];

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Post not found!
        </Typography>
        <Button onClick={() => navigate("/")} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button variant="outlined" onClick={() => navigate("/")} sx={{ mb: 2 }}>
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          By {post.author} | {post.date} | {post.status}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {post.content}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewPage;
