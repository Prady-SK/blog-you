import React from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import { BlogPost } from "../../types";
import { blogTableCMS } from "../../cms/blogTable";

interface Props {
  sortConfig: { key: keyof BlogPost; order: "asc" | "desc" };
  onSortChange: (key: keyof BlogPost) => void;
}

const BlogTableHead: React.FC<Props> = ({ sortConfig, onSortChange }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            active={sortConfig.key === "title"}
            direction={sortConfig.key === "title" ? sortConfig.order : "asc"}
            onClick={() => onSortChange("title")}
          >
            {blogTableCMS.tableHeaders.title}
          </TableSortLabel>
        </TableCell>
        <TableCell>{blogTableCMS.tableHeaders.author}</TableCell>
        <TableCell>
          <TableSortLabel
            active={sortConfig.key === "date"}
            direction={sortConfig.key === "date" ? sortConfig.order : "asc"}
            onClick={() => onSortChange("date")}
          >
            {blogTableCMS.tableHeaders.date}
          </TableSortLabel>
        </TableCell>
        <TableCell>{blogTableCMS.tableHeaders.status}</TableCell>
        <TableCell>{blogTableCMS.tableHeaders.actions}</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default BlogTableHead;
