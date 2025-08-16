import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { BlogPost } from "../types";

interface BlogTableProps {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const BlogTable: React.FC<BlogTableProps> = ({ blogPosts, setBlogPosts }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: 2 }}>
        All Blog Posts
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>{post.status}</TableCell>
              <TableCell>{/* Placeholder for Edit/Delete buttons */}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogTable;
