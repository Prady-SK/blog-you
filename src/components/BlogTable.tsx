import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
} from "@mui/material";
import { BlogPost } from "../types";

interface BlogTableProps {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const BlogTable: React.FC<BlogTableProps> = ({ blogPosts, setBlogPosts }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof BlogPost;
    order: "asc" | "desc";
  }>({
    key: "date",
    order: "desc",
  });

  const handleSorting = (key: keyof BlogPost) => {
    setSortConfig((prev) => ({
      key,
      order: prev?.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const sortedPosts = [...blogPosts].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: 2 }}>
        All Blog Posts
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "title"}
                direction={
                  sortConfig.key === "title" ? sortConfig.order : "asc"
                }
                onClick={() => handleSorting("title")}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell>Author</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "date"}
                direction={sortConfig.key === "date" ? sortConfig.order : "asc"}
                onClick={() => handleSorting("date")}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPosts.map((post) => (
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
