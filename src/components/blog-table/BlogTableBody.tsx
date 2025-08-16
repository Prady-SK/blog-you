import React from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { BlogPost } from "../../types";
import { blogTableCMS } from "../../cms/blogTable";

interface Props {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
  navigate: (path: string) => void;
}

const BlogTableBody: React.FC<Props> = ({
  posts,
  onEdit,
  onDelete,
  navigate,
}) => {
  return (
    <TableBody>
      {posts.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={5}
            align="center"
            sx={{ py: 3, color: "text.secondary" }}
          >
            {blogTableCMS.noPostsMessage}
          </TableCell>
        </TableRow>
      ) : (
        posts.map((post, index) => (
          <TableRow
            key={post.id}
            hover
            onClick={() => navigate(`/post/${post.id}`)}
            sx={{
              cursor: "pointer",
              backgroundColor: index % 2 ? "action.hover" : "transparent",
              "&:hover": { backgroundColor: "action.selected" },
              transition: "background-color 0.2s ease",
            }}
          >
            <TableCell sx={{ fontWeight: 500 }}>{post.title}</TableCell>

            <TableCell sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
              {post.author}
            </TableCell>

            <TableCell sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
              {post.date}
            </TableCell>

            <TableCell>
              <Chip
                label={post.status}
                size="small"
                color={post.status === "Published" ? "success" : "default"}
                sx={{ fontSize: "0.75rem", fontWeight: 500, height: 22 }}
              />
            </TableCell>

            <TableCell>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderRadius: 1,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(post);
                  }}
                >
                  {blogTableCMS.editButton}
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderRadius: 1,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    "&:hover": { bgcolor: "error.main", color: "white" },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(post);
                  }}
                >
                  {blogTableCMS.deleteButton}
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  );
};

export default BlogTableBody;
