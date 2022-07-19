import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import { Paper, Card } from "@mui/material";
import Swal from "sweetalert2";
import CustomerCard from "./customerCard";

const axios = require("axios").default;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Customer() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState([]);

  const getFilteredList = (query, list) => {
    if (!query) {
      return list;
    }
    return list.filter((customer) =>
      customer.name.toString().toLowerCase().includes(query)
    );
  };

  const filteredItems = getFilteredList(query, list);

  useEffect(() => {
    find();
  }, []);

  const find = () => {
    axios
      .get("http://localhost:9000/customers/")
      .then(function (response) {
        setList(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Do you want delete this customer?",
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
          .delete("http://localhost:9000/customer/" + id)
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
                  Customer
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
                    <Link to={"/add-customer"}>
                      <MDButton variant="gradient" color="info">
                        Add
                      </MDButton>
                    </Link>
                  </Grid>
                </Grid>
              </MDBox>

              <Grid container spacing={0}>
                <CustomerCard content={filteredItems} onDelete={onDelete} />
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Customer;
