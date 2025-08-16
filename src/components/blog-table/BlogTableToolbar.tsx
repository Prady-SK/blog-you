import React from "react";
import { TextField, Button, Paper, Grid } from "@mui/material";
import { blogTableCMS } from "../../cms/blogTable";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onAddPost: () => void;
}

const BlogTableToolbar: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  onAddPost,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 0, // so edges align perfectly
        backgroundColor: "background.default",
        m: 0, // no margin
        p: 0, // no padding
      }}
    >
      <Grid
        container
        spacing={1} // small gap between elements only
        alignItems="center"
        sx={{
          m: 0, // no margin on grid
          width: "100%",
        }}
      >
        {/* Search Field */}
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          <TextField
            label={blogTableCMS.searchPlaceholder}
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        {/* Add Button */}
        <Grid
          size={{ xs: 12, sm: 4, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: 2,
              "&:hover": { boxShadow: 4 },
            }}
            onClick={onAddPost}
          >
            {blogTableCMS.addNewPost}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlogTableToolbar;
