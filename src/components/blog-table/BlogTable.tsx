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
  Grid,
  TablePagination,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSorting = (key: keyof BlogPost) => {
    setSortConfig((prev) => ({
      key,
      order: prev?.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPosts = useMemo(() => {
    return [...blogPosts]
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
  }, [blogPosts, searchTerm, sortConfig]);

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2, overflowX: "auto" }}>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          All Blog Posts
        </Typography>
        <Box mb={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Search by Title or Author"
                variant="outlined"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>

            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
                mt: { xs: 1, md: 0 },
              }}
            >
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
            </Grid>
          </Grid>
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
            {filteredPosts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
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
      <TablePagination
        component="div"
        count={filteredPosts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
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
