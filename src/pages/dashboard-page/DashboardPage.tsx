import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { BlogPost } from "../../types";
import BlogTable from "../../components/blog-table/BlogTable";
import { CustomThemeContext } from "../../contexts/ThemeContext";
import blogData from "../../data/blog-data";

const DashboardPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const storedPosts = localStorage.getItem("localBlogData");
    return storedPosts ? JSON.parse(storedPosts) : blogData;
  });

  const theme = useTheme();
  const { toggleColorMode } = useContext(CustomThemeContext);

  useEffect(() => {
    localStorage.setItem("localBlogData", JSON.stringify(blogPosts));
  }, [blogPosts]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4">Blog Management Dashboard</Typography>
          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
        <BlogTable blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
      </Container>
    </Box>
  );
};

export default DashboardPage;
