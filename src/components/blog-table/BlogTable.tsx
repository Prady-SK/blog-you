import React, { useState, useMemo } from "react";
import {
  TablePagination,
  Paper,
  useMediaQuery,
  Box,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { BlogPost } from "../../types";
import { useNavigate } from "react-router-dom";
import BlogTableToolbar from "./BlogTableToolbar";
import BlogTableHead from "./BlogTableHead";
import BlogTableBody from "./BlogTableBody";
import PostCardList from "./PostCardList";
import PostDialog from "../post-dialog/PostDialog";
import DeleteDialog from "./DeleteDialog";

interface BlogTableProps {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const BlogTable: React.FC<BlogTableProps> = ({ blogPosts, setBlogPosts }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [sortConfig, setSortConfig] = useState<{
    key: keyof BlogPost;
    order: "asc" | "desc";
  }>({
    key: "date",
    order: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleSort = (key: keyof BlogPost) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <Box sx={{ mt: { xs: 0, md: 3 }, borderRadius: 2 }}>
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: {
            xs: 1,
            md: 3,
          },
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <BlogTableToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddPost={() => {
              setEditingPost(undefined);
              setDialogOpen(true);
            }}
            sortConfig={sortConfig}
            onSortChange={handleSort}
            onToggleOrder={() =>
              setSortConfig((prev) => ({
                ...prev,
                order: prev.order === "asc" ? "desc" : "asc",
              }))
            }
          />
        </Box>

        {isMobile ? (
          <PostCardList
            posts={filteredPosts.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            onEdit={(post) => {
              setEditingPost(post);
              setDialogOpen(true);
            }}
            onDelete={(post) => {
              setDeletingPost(post);
              setDeleteDialogOpen(true);
            }}
            navigate={navigate}
          />
        ) : (
          <Box>
            <table style={{ width: "100%", borderSpacing: 0 }}>
              <BlogTableHead
                sortConfig={sortConfig}
                onSortChange={handleSort}
              />
              <BlogTableBody
                posts={filteredPosts.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )}
                onEdit={(post) => {
                  setEditingPost(post);
                  setDialogOpen(true);
                }}
                onDelete={(post) => {
                  setDeletingPost(post);
                  setDeleteDialogOpen(true);
                }}
                navigate={navigate}
              />
            </table>
          </Box>
        )}
      </Paper>

      {filteredPosts.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
            mt: 2,
          }}
        >
          <TablePagination
            sx={{
              ".MuiTablePagination-toolbar": { px: 0 },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                { fontSize: "0.85rem" },
            }}
            component="div"
            count={filteredPosts.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      )}
      <PostDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        initialData={editingPost}
        onSave={(post) => {
          if (editingPost) {
            setBlogPosts((prev) =>
              prev.map((p) => (p.id === post.id ? post : p))
            );
          } else {
            setBlogPosts((prev) => [post, ...prev]);
          }
        }}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          if (deletingPost) {
            setBlogPosts((prev) =>
              prev.filter((p) => p.id !== deletingPost.id)
            );
          }
          setDeleteDialogOpen(false);
        }}
        postTitle={deletingPost?.title || ""}
      />
    </Box>
  );
};

export default BlogTable;
