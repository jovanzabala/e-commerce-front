import React from "react";
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
function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post("http://localhost:9000/category", data).then(() => {
      window.location.href = "/category";
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
                  <MDTypography variant="h5">Add Category</MDTypography>
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
                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>
                          <MDTypography>Description</MDTypography>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          {...register("description", {
                            required: true,
                            minLength: 5,
                          })}
                        />
                      </Form.Group>
                      <br />
                      <Form.Label>
                        <MDTypography>Activo</MDTypography>
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
                      <Form.Group
                        className="mb-2"
                        controlId="exampleForm.ControlTextarea1"
                      ></Form.Group>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ marginRight: "30px" }}
                    >
                      Agregar
                    </Button>
                    <Link to="/category">
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

export default AddCategory;
