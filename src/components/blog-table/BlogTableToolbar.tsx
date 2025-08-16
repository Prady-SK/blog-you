import React from "react";
import { Grid, TextField, Button, styled, Paper } from "@mui/material";
import { blogTableCMS } from "../../cms/blogTable";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onAddPost: () => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const BlogTableToolbar: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  onAddPost,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
      <Grid size={{ xs: 12, sm: 4, md: 6 }}>
        <Item>
          <TextField
            label={blogTableCMS.searchPlaceholder}
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Item>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 4, md: 6 }}
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", md: "flex-end" },
          mt: { xs: 1, md: 0 },
        }}
      >
        <Item>
          <Button variant="contained" color="primary" onClick={onAddPost}>
            {blogTableCMS.addNewPost}
          </Button>
        </Item>
      </Grid>
    </Grid>
  );
};

export default BlogTableToolbar;
