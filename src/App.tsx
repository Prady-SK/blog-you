import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { BlogPost } from "./types";
import "./App.css";
import BlogTable from "./components/blog-table/BlogTable";
import blogData from "./data/blog-data";

const App: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const storedPosts = localStorage.getItem("localBlogData");
    return storedPosts ? JSON.parse(storedPosts) : blogData;
  });

  useEffect(() => {
    localStorage.setItem("localBlogData", JSON.stringify(blogPosts));
  }, [blogPosts]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Blog Management Dashboard
      </Typography>
      <BlogTable blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
    </Container>
  );
};

export default App;
