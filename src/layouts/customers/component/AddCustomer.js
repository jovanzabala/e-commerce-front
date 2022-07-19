import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import MDInput from "components/MDInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";

const axios = require("axios").default;

function AddCustomer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post("http://localhost:9000/customer", data).then(() => {
      window.location.href = "/customer";
    });
  };
  const [list, setList] = useState([]);

  useEffect(() => {
    findCategories();
  }, []);

  const findCategories = () => {
    axios
      .get("http://localhost:9000/categories")
      .then(function (response) {
        setList(response.data);
      })
      .catch(function (error) {});
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={2} mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Card>
                <MDBox p={2}>
                  <MDTypography variant="h5">Add Customer</MDTypography>
                </MDBox>
                <MDBox pt={2} px={2}>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <MDInput
                        type="name"
                        label="Customer Name"
                        fullWidth
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("name", {
                          required: true,
                          minLength: 3,
                        })}
                      />
                      {errors.name?.type === "required" && "Name is required"}
                      <br />
                      <br />
                      <MDInput
                        type="Long"
                        label="Latitude"
                        width="500%"
                        style={{ marginRight: "30px" }}
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("lat", {
                          required: true,
                          minLength: 9,
                        })}
                      />
                      <MDInput
                        type="Long"
                        label="Longitude"
                        width="500%"
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("long", {
                          required: true,
                          minLength: 9,
                        })}
                      />
                      <br />
                      <br />
                      <MDInput
                        type="img"
                        label="Url Image"
                        fullWidth
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("img", {
                          required: true,
                          minLength: 5,
                        })}
                      />
                      <br />
                      <br />
                      <MDInput
                        type="address"
                        label="Address"
                        fullWidth
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("address", {
                          required: true,
                          minLength: 5,
                        })}
                      />
                      {errors.name?.type === "required" &&
                        "Address is required"}
                      <br />
                      <br />
                      <MDInput
                        type="name"
                        label="Contact Name"
                        fullWidth
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("contact_name", {
                          required: true,
                          minLength: 5,
                        })}
                      />
                      {errors.name?.type === "required" &&
                        "Contact Name is required"}
                      <br />
                      <br />
                      <MDInput
                        type="number"
                        label="Number Phone"
                        fullWidth
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("contact_phone", {
                          required: true,
                          minLength: 10,
                        })}
                      />
                      {errors.name?.type === "required" &&
                        "Number Phone is required"}
                      <br />
                      <br />
                      <Box sx={{ minWidth: 240 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Category
                          </InputLabel>
                          <Select
                            {...register("category")}
                            style={{ height: "40px !important" }}
                            label="Categories"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {(list || [])
                              .filter((word) => word.status === "true")
                              .map((item, i) => {
                                return (
                                  <MenuItem key={i} value={item}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </Box>
                      <br />
                      <br />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ marginRight: "30px" }}
                    >
                      Agregar
                    </Button>
                    <Link to="/customer">
                      <Button variant="primary">Cancel</Button>
                    </Link>
                  </Form>
                  <br />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </>
  );
}

export default AddCustomer;
