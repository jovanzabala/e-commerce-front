import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicTable from "./component/BasicTable";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import MDTypography from "components/MDTypography";

const axios = require("axios").default;

function TableEmployee() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState([]);

  const getFilteredList = (query, list) => {
    if (!query) {
      return list;
    }
    return list.filter((category) =>
      category.name.toString().toLowerCase().includes(query)
    );
  };

  const filteredItems = getFilteredList(query, list);

  useEffect(() => {
    find();
  }, []);

  const find = () => {
    axios
      .get("http://localhost:9000/employees")
      .then(function (response) {
        setList(response.data);
      })
      .catch(function (error) {});
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Do you want delete this employee?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted",
          icon: "success",
          customClass: {
            icon: "no-border",
          },
          confirmButtonColor: "green",
        });
        axios
          .delete("http://localhost:9000/employee/" + id)
          .then(function (response) {
            find();
          })
          .catch(function (error) {
            //console.log(error);
          });
      }
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={6}>
        <Grid container spacing={12}>
          <Grid item xs={12}>
            <Card sx={{ m: "1rem", width: "100%" }}>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Employees
                </MDTypography>
                <br />
                <Grid container spacing={12}>
                  <Grid item xs={3}>
                    <MDBox>
                      <TextField
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "5px",
                        }}
                        label="Search..."
                        variant="standard"
                        color="warning"
                        focused
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={7}></Grid>
                  <Grid item xs={1}>
                    <Link to={"/add-category"}>
                      <MDButton variant="gradient" color="info">
                        Add
                      </MDButton>
                    </Link>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={4}>
                <BasicTable content={filteredItems} onDelete={onDelete} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TableEmployee;
