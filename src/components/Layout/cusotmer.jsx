import { DataGrid } from "@mui/x-data-grid";

const rows = [
  { id: 1, name: "Ahmed", age: 25 },
  { id: 2, name: "Ali", age: 30 },
];

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "age", headerName: "Age", width: 100 },
];

export default function Customer() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}