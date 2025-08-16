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
import { dashboardCMS } from "../../cms/dashboard";

const DashboardPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem("localBlogData");
    return stored ? JSON.parse(stored) : blogData;
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
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            {dashboardCMS.title}
          </Typography>
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
