import React from "react"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import * as Yup from "yup"
import InputField from "./InputField"
import Button from "@mui/material/Button"
import { initialTodo } from "../constants"
import { parseError } from "../lib/utils/common"
import SelectField from "./SelectField"
import { TODO_STATUSES } from "../dictionaries/todoDict"
import { TODO_STATUSES_MAPPING } from "../mappings/todoMapping"

const TodoForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().max(500, "Description must be under 500 characters"),
  })

  const formik = useFormik({
    initialValues: initialValues || initialTodo,
    validationSchema,
    onSubmit: async (values, { setErrors, setStatus }) => {
      try {
        // Call the parent's onSubmit function
        await onSubmit(values)
        setStatus(null) // Clear any previous errors
      } catch (exception) {
        const { error, message } = parseError(exception)

        setErrors(error)
        setStatus(message)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputField
        label="Title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && formik.errors.title}
        helperText={formik.touched.title && formik.errors.title}
      />

      <InputField
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && formik.errors.description}
        helperText={formik.touched.description && formik.errors.description}
        multiline
        rows={4}
      />

      <SelectField
        label="Status"
        name="status"
        value={formik.values.status}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.status && formik.errors.status}
        helperText={formik.touched.status && formik.errors.status}
        options={TODO_STATUSES.map(todoStatus => (
          {
            value: todoStatus,
            label: TODO_STATUSES_MAPPING[todoStatus]?.label
          }
        )) }
      />

      <Button type="submit" variant="contained" color="primary">
        {formik.values.id ? "Update Todo" : "Create Todo"}
      </Button>
    </form>
  )
}

TodoForm.propTypes = {
  initialValues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string
  })),
  onSubmit: PropTypes.func.isRequired
}

export default TodoForm
