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
      {posts.map((post, index) => (
        <TableRow
          key={post.id}
          hover
          sx={{
            cursor: "pointer",
            backgroundColor: index % 2 === 0 ? "transparent" : "action.hover",
            "&:hover": {
              backgroundColor: "action.selected",
            },
            transition: "background-color 0.2s ease",
          }}
          onClick={() => navigate(`/post/${post.id}`)}
        >
          {/* Title */}
          <TableCell sx={{ fontWeight: 500, color: "text.primary" }}>
            {post.title}
          </TableCell>

          {/* Author */}
          <TableCell sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
            {post.author}
          </TableCell>

          {/* Date */}
          <TableCell sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
            {post.date}
          </TableCell>

          {/* Status with color chip */}
          <TableCell>
            <Chip
              label={post.status}
              size="small"
              color={post.status === "Published" ? "success" : "default"}
              sx={{ fontSize: "0.75rem", fontWeight: 500, height: 22 }}
            />
          </TableCell>

          {/* Actions */}
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
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "white",
                  },
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
                  "&:hover": { backgroundColor: "error.light", color: "white" },
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
      ))}
    </TableBody>
  );
};

export default BlogTableBody;
