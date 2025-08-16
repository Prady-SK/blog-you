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
  TextField,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { BlogPost } from "../../types";
import PostDialog from "../post-dialog/PostDialog";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(
    undefined
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);

  const handleSorting = (key: keyof BlogPost) => {
    setSortConfig((prev) => ({
      key,
      order: prev?.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const filteredPosts = [...blogPosts]
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
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
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ padding: 2 }}>
          All Blog Posts
        </Typography>
        <Box sx={{ padding: 2 }}>
          <TextField
            label="Search by Title or Author"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <Box sx={{ padding: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditingPost(undefined);
              setDialogOpen(true);
            }}
          >
            Add New Post
          </Button>
        </Box>
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
                  direction={
                    sortConfig.key === "date" ? sortConfig.order : "asc"
                  }
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
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setEditingPost(post);
                      setDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setDeletingPost(post);
                      setDeleteDialogOpen(true);
                    }}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PostDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        initialData={editingPost}
        onSave={(post) => {
          if (editingPost) {
            // Edit existing
            setBlogPosts((prev) =>
              prev.map((p) => (p.id === post.id ? post : p))
            );
          } else {
            // Add new
            setBlogPosts((prev) => [post, ...prev]);
          }
        }}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{deletingPost?.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (deletingPost) {
                setBlogPosts((prev) =>
                  prev.filter((p) => p.id !== deletingPost.id)
                );
              }
              setDeleteDialogOpen(false);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogTable;
