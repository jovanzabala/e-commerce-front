import React, { useEffect } from "react";
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
import { Checkbox } from "@mui/material";

const axios = require("axios").default;

function EditEmployee() {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:9000/employee/" + id)
      .then(function (response) {
        let body = response.data;
        onFillBody(body);
      })
      .catch(function (error) {});
  }, [id]);

  const onFillBody = (body) => {
    setValue("_id", body._id);
    setValue("name", body.name);
    setValue("img_photo", body.img_photo);
    setValue("img_cedula_front", body.img_cedula_front);
    setValue("img_cedula_back", body.img_cedula_back);
    setValue("phone", body.phone);
    setValue("address", body.address);
    setValue("status", body.status);
  };

  const onSubmit = (data) => {
    console.log(data);
    axios.put("http://localhost:9000/employee", data).then(() => {
      window.location.href = "/employee";
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
                  <MDTypography variant="h5">Edit Employee</MDTypography>
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
                        defaultValue="img_photo"
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
                        defaultValue="img_cedula_front"
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
                        defaultValue="img_cedula_back"
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
                        defaultValue="phone"
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
                        defaultValue="address"
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
                      Update
                    </Button>
                    <Link to="/employee">
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

export default EditEmployee;
