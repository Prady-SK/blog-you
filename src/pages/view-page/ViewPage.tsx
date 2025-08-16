import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BlogPost } from "../../types";
import { viewPostCMS } from "../../cms/viewPost";

const ViewPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const storedPosts = localStorage.getItem("localBlogData");
  const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : [];

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
          p: 3,
        }}
      >
        <Typography variant="h6" color="error">
          {viewPostCMS.notFoundMessage}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          {viewPostCMS.backToDashboard}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        p: 3,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        sx={{ mb: 2, borderRadius: 2, textTransform: "none" }}
      >
        {viewPostCMS.backButton}
      </Button>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 2,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={600}>
          {post.title}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{ color: theme.palette.text.secondary, mb: 2 }}
        >
          {viewPostCMS.authorPrefix} {post.author} | {post.date} | {post.status}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: 1.7,
            color: theme.palette.text.primary,
          }}
        >
          {post.content}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ViewPage;
