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
import { Checkbox } from "@mui/material";

const axios = require("axios").default;

function AddEmployee() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post("http://localhost:9000/employee", data).then(() => {
      window.location.href = "/employee";
    });
  };
  const [list, setList] = useState([]);

  useEffect(() => {
    findCategories();
  }, []);

  const findCategories = () => {
    axios
      .get("http://localhost:9000/employees")
      .then(function (response) {
        setList(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
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
                  <MDTypography variant="h5">Add Employee</MDTypography>
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
                        defaultValue=""
                        {...register("name", {
                          required: true,
                          minLength: 5,
                        })}
                      />
                      {errors.name?.type === "required" && "Name is required"}
                      <br />
                      <br />
                      <MDInput
                        type="img_photo"
                        label="Url Image Photo"
                        fullWidth
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("img_photo", {
                          required: true,
                          minLength: 5,
                        })}
                      />
                      <br />
                      <br />
                      <MDInput
                        type="img_photo"
                        label="Url Image Cedula Front"
                        fullWidth
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("img_cedula_front", {
                          required: true,
                          minLength: 5,
                        })}
                      />
                      <br />
                      <br />
                      <MDInput
                        type="img_photo"
                        label="Url Image Cedula Back"
                        fullWidth
                        className={
                          errors.name?.type === "required"
                            ? "onErrorField"
                            : "onOKField"
                        }
                        defaultValue=""
                        {...register("img_cedula_back", {
                          required: true,
                          minLength: 5,
                        })}
                      />
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
                        {...register("phone", {
                          required: true,
                          minLength: 10,
                        })}
                      />
                      {errors.name?.type === "required" &&
                        "Number Phone is required"}
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
                    </Form.Group>
                    <Form.Label>
                      <h6>Activo</h6>
                    </Form.Label>
                    <Checkbox
                      id="checkbox-1"
                      name="checkboxes"
                      label="Checkbox 1"
                      defaultChecked
                      {...register("status", {
                        required: false,
                      })}
                    />
                    <br />
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ marginRight: "30px" }}
                    >
                      Agregar
                    </Button>
                    <Link to="/employee">
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

export default AddEmployee;
