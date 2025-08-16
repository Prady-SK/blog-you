import React, { useState, useMemo } from "react";
import { TableContainer, Paper, Table, TablePagination } from "@mui/material";
import { BlogPost } from "../../types";
import { useNavigate } from "react-router-dom";
import BlogTableToolbar from "./BlogTableToolbar";
import BlogTableHead from "./BlogTableHead";
import BlogTableBody from "./BlogTableBody";
import PostDialog from "../post-dialog/PostDialog";
import DeleteDialog from "./DeleteDialog";

interface BlogTableProps {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const BlogTable: React.FC<BlogTableProps> = ({ blogPosts, setBlogPosts }) => {
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
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <BlogTableToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddPost={() => {
            setEditingPost(undefined);
            setDialogOpen(true);
          }}
        />
        <Table>
          <BlogTableHead sortConfig={sortConfig} onSortChange={handleSort} />
          <BlogTableBody
            posts={filteredPosts.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            onEdit={(post: BlogPost) => {
              setEditingPost(post);
              setDialogOpen(true);
            }}
            onDelete={(post: BlogPost) => {
              setDeletingPost(post);
              setDeleteDialogOpen(true);
            }}
            navigate={navigate}
          />
        </Table>
      </TableContainer>

      <TablePagination
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
    </>
  );
};

export default BlogTable;
