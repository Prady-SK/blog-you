export const blogTableCMS = {
  searchPlaceholder: "Search by Title or Author",
  addNewPost: "Add New Post",
  tableHeaders: {
    title: "Title",
    author: "Author",
    date: "Date",
    status: "Status",
    actions: "Actions",
  },
  editButton: "Edit",
  deleteButton: "Delete",
  deleteDialogTitle: "Confirm Delete",
  deleteDialogMessage: (title: string) =>
    `Are you sure you want to delete "${title}"?`,
  cancel: "Cancel",
  confirmDelete: "Delete",
  noPostsMessage: "No posts found.",
};
