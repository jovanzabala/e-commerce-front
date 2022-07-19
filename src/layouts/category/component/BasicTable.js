import { useEffect, useState } from "react";
import MDButton from "components/MDButton";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green, red } from "@mui/material/colors";

const BasicTable = ({ content, onDelete }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(content);
  }, [content]);

  const columns = [
    { field: "name", headerName: "Name", width: 170 },
    { field: "description", headerName: "Description", width: 700 },
    {
      headerName: "status",
      //width: 170,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "true" ? (
              <CheckCircleIcon sx={{ color: green[500] }} />
            ) : (
              <DoDisturbOnIcon sx={{ color: red[500] }} />
            )}
          </>
        );
      },
    },

    {
      field: "action",
      width: 170,
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/edit/" + params.id}>
              <MDButton
                variant="contained"
                color="success"
                style={{ marginRight: "20px" }}
              >
                Edit
              </MDButton>
            </Link>
            <MDButton
              onClick={() => onDelete(params.id)}
              variant="outlined"
              color="error"
            >
              Delete
            </MDButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={list}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default BasicTable;
