import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { BlogPost } from "../../types";

interface PostDialogProps {
  open: boolean;
  handleClose: () => void;
  onSave: (post: BlogPost) => void;
  initialData?: BlogPost;
}

interface FormValues {
  title: string;
  author: string;
  content: string;
  status: "Draft" | "Published";
}

const PostDialog: React.FC<PostDialogProps> = ({
  open,
  handleClose,
  onSave,
  initialData,
}) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: "",
      author: "",
      content: "",
      status: "Draft",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        title: "",
        author: "",
        content: "",
        status: "Draft",
      });
    }
  }, [initialData, open, reset]);

  const onSubmit = (data: FormValues) => {
    const post: BlogPost = initialData
      ? { ...initialData, ...data }
      : {
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          ...data,
        };
    onSave(post);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Post" : "Add New Post"}</DialogTitle>
      <DialogContent>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="author"
          control={control}
          rules={{ required: "Author is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Author"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="content"
          control={control}
          rules={{ required: "Content is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Content"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Status"
              select
              fullWidth
              margin="normal"
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Published">Published</MenuItem>
            </TextField>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
