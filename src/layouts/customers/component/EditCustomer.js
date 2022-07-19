import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import MDInput from "components/MDInput";
import { Box } from "@mui/system";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";

const axios = require("axios").default;

function EditCustomer() {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  const onFillBody = (body) => {
    setValue("_id", body._id);
    setValue("name", body.name);
    setValue("lat", body.lat);
    setValue("long", body.long);
    setValue("img", body.img);
    setValue("address", body.address);
    setValue("contact_name", body.contact_name);
    setValue("contact_phone", body.contact_phone);
    setValue("category", body.category.name);
  };

  const onSubmit = (data) => {
    console.log(data);
    axios.put("http://localhost:9000/customer", data).then(() => {
      window.location.href = "/customer";
    });
  };
  const [list, setList] = useState([]);

  const findCategories = () => {
    axios
      .get("http://localhost:9000/categories")
      .then(function (response) {
        setList(response.data);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    axios
      .get("http://localhost:9000/customer/" + id)
      .then(function (response) {
        let body = response.data;
        onFillBody(body);
        findCategories();
      })
      .catch(function (error) {});

    findCategories();
  }, [id]);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={2} mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Card>
                <MDBox p={2}>
                  <MDTypography variant="h5">Edit Customer</MDTypography>
                </MDBox>
                <MDBox pt={2} px={2}>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <MDInput
                        type="name"
                        label="Name"
                        fullWidth
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue="name"
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
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue="lat"
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
                        defaultValue="long"
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
                        defaultValue="img"
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
                        defaultValue="address"
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
                        defaultValue="contact_name"
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
                        defaultValue="number_phone"
                        {...register("contact_phone", {
                          required: true,
                          minLength: 10,
                        })}
                      />
                      {errors.name?.type === "required" &&
                        "Number Phone is required"}
                      <br />
                      <br />
                      <MDInput
                        fullWidth
                        label="Category"
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue="category"
                        {...register("category", {
                          required: true,
                          minLength: 10,
                        })}
                      />
                      <br />
                      <br />
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth="true">
                          <InputLabel id="demo-simple-select-label">
                            Select Category
                          </InputLabel>
                          <Select
                            {...register("category")}
                            style={{ height: "40px !important" }}
                            label=""
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
                      Update
                    </Button>
                    <Link to="/customer">
                      <Button variant="primary">Back</Button>
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

export default EditCustomer;
