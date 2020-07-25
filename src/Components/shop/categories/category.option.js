import React, { useEffect, useState, memo } from "react";

import Api from "../../../Services/api";

import { Field } from "formik";

import { Grid, MenuItem } from "@material-ui/core";
import { TextField } from "formik-material-ui";

function CategoriesOption() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getCategory() {
      const res = await Api.get("categories");
      setData(res.data);
    }
    getCategory();
  }, []);

  return (
    <Grid item lg={4} xs={6}>
      <Field
        component={TextField}
        type="text"
        name="category_id"
        label="escolha a categoria da sua loja"
        select
        variant="outlined"
        helperText="escolha uma opção"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      >
        {data.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.category_name}
          </MenuItem>
        ))}
      </Field>
    </Grid>
  );
}

export default memo(CategoriesOption);
