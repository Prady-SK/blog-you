import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { BlogPost } from "./types";
import BlogTable from "./components/BlogTable";

const App: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "My First Blog",
      author: "Pradosh",
      content: "This is the first blog content",
      status: "Published",
      date: "2025-08-14",
    },
    {
      id: 2,
      title: "React Tips",
      author: "Pradosh",
      content: "Some useful React tips",
      status: "Draft",
      date: "2025-08-13",
    },
    {
      id: 3,
      title: "ABC of performance",
      author: "Shirgaonkar",
      content: "This is the ABC of performance enhancement in React",
      status: "Published",
      date: "2025-08-10",
    },
  ]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Blog Dashboard
      </Typography>
      <BlogTable blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
    </Container>
  );
};

export default App;
