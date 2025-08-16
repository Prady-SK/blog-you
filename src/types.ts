export interface BlogPost {
  id: number;
  title: string;
  author: string;
  content: string;
  status: "Draft" | "Published";
  date: string;
}

