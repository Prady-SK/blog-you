import React from "react";
import {
  Paper,
  Typography,
  Stack,
  IconButton,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BlogPost } from "../../types";
import { blogTableCMS } from "../../cms/blogTable";

interface Props {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
  navigate: (path: string) => void;
}

const PostCardList: React.FC<Props> = ({
  posts,
  onEdit,
  onDelete,
  navigate,
}) => {
  if (posts.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center", color: "text.secondary" }}>
        <Typography variant="body1">{blogTableCMS.noPostsMessage}</Typography>
      </Box>
    );
  }
  return (
    <Stack spacing={2} sx={{ p: 0 }}>
      {posts.map((post) => (
        <Paper
          key={post.id}
          sx={{
            borderRadius: 3,
            boxShadow: 2,
            p: 2,
            backgroundColor: "background.paper",
            transition:
              "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 4,
              cursor: "pointer",
            },
          }}
          onClick={() => navigate(`/post/${post.id}`)}
        >
          {/* Title */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              mb: 0.5,
            }}
          >
            {post.title}
          </Typography>

          {/* Meta Info */}
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            spacing={1}
            sx={{ mb: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              {post.author}
            </Typography>
            <Typography variant="body2" color="text.disabled">
              • {post.date}
            </Typography>
            <Chip
              label={post.status}
              size="small"
              color={post.status === "Published" ? "success" : "default"}
              sx={{
                fontSize: "0.75rem",
                height: 22,
              }}
            />
          </Stack>

          <Divider sx={{ my: 1 }} />

          {/* Action Buttons */}
          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              color="primary"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                "&:hover": { backgroundColor: "primary.light", color: "white" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(post);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                "&:hover": { backgroundColor: "error.light", color: "white" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(post);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export default PostCardList;
