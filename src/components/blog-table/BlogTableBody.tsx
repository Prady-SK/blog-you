import React from "react";
import { TableBody, TableRow, TableCell, Button, Stack } from "@mui/material";
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
      {posts.map((post) => (
        <TableRow
          key={post.id}
          hover
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <TableCell>{post.title}</TableCell>
          <TableCell>{post.author}</TableCell>
          <TableCell>{post.date}</TableCell>
          <TableCell>{post.status}</TableCell>
          <TableCell>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
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
