import {
  TextField,
  Button,
  Grid,
  IconButton,
  MenuItem, // ⬅️ add
  useMediaQuery,
  Paper, // ⬅️ add
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ⬅️ add
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // ⬅️ add
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"; // ⬅️ add
import { blogTableCMS } from "../../cms/blogTable";
import { BlogPost } from "../../types";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onAddPost: () => void;
  sortConfig: { key: keyof BlogPost; order: "asc" | "desc" }; // ⬅️ add this
  onSortChange: (key: keyof BlogPost) => void; // ⬅️ add this
  onToggleOrder: () => void; // ⬅️ add this
}

const BlogTableToolbar: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  onAddPost,
  sortConfig,
  onSortChange,
  onToggleOrder,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        {isMobile && (
          <Grid
            size={{ xs: 12 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              select
              size="small"
              label="Sort by"
              value={sortConfig.key}
              onChange={(e) => onSortChange(e.target.value as keyof BlogPost)}
              sx={{ minWidth: 120, mr: 1 }}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </TextField>

            <IconButton onClick={onToggleOrder}>
              {sortConfig.order === "asc" ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
            </IconButton>
          </Grid>
        )}

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
