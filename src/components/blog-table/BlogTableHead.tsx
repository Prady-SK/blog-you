import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { BlogPost } from "../../types";
import { blogTableCMS } from "../../cms/blogTable";

interface Props {
  sortConfig: { key: keyof BlogPost; order: "asc" | "desc" };
  onSortChange: (key: keyof BlogPost) => void;
}

const BlogTableHead: React.FC<Props> = ({ sortConfig, onSortChange }) => {
  const createSortHandler = (key: keyof BlogPost) => () => {
    onSortChange(key);
  };

  const headCellStyle = {
    fontWeight: 600,
    color: "text.primary",
    py: 1.5,
  } as const;

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={headCellStyle}>
          <TableSortLabel
            active={sortConfig.key === "title"}
            direction={sortConfig.key === "title" ? sortConfig.order : "asc"}
            onClick={createSortHandler("title")}
            sx={{ fontWeight: "inherit" }}
          >
            <Typography variant="body2" fontWeight={600}>
              {blogTableCMS.tableHeaders.title}
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell sx={headCellStyle}>
          <Typography variant="body2" fontWeight={600}>
            {blogTableCMS.tableHeaders.author}
          </Typography>
        </TableCell>

        <TableCell sx={headCellStyle}>
          <TableSortLabel
            active={sortConfig.key === "date"}
            direction={sortConfig.key === "date" ? sortConfig.order : "asc"}
            onClick={createSortHandler("date")}
          >
            <Typography variant="body2" fontWeight={600}>
              {blogTableCMS.tableHeaders.date}
            </Typography>
          </TableSortLabel>
        </TableCell>

        <TableCell sx={headCellStyle}>
          <Typography variant="body2" fontWeight={600}>
            {blogTableCMS.tableHeaders.status}
          </Typography>
        </TableCell>

        <TableCell sx={headCellStyle}>
          <Typography variant="body2" fontWeight={600}>
            {blogTableCMS.tableHeaders.actions}
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default BlogTableHead;
