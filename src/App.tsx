import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { BlogPost } from "./types";
import BlogTable from "./components/blog-table/BlogTable";
import blogData from "./data/blog-data";
import { useContext } from "react";
import { CustomThemeContext } from "./contexts/ThemeContext";
import { IconButton, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const App: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const storedPosts = localStorage.getItem("localBlogData");
    return storedPosts ? JSON.parse(storedPosts) : blogData;
  });
  const theme = useTheme(); // <-- get current theme
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
        <Typography variant="h4" gutterBottom>
          Blog Management Dashboard
        </Typography>
        <IconButton onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
        <BlogTable blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
      </Container>
    </Box>
  );
};

export default App;
