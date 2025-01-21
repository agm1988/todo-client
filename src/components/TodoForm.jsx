import React from "react"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import InputField from "./InputField"
import Button from "@mui/material/Button"
import { initialTodo } from "../constants"
import { parseError } from "../lib/utils/common"
import SelectField from "./SelectField"
import { TODO_STATUSES } from "../dictionaries/todoDict"
import { TODO_STATUSES_MAPPING } from "../mappings/todoMapping"
import { todoValidationSchema } from "../schemas/todoSchema";

const TodoForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues || initialTodo,
    validationSchema: todoValidationSchema,
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
        id="todoTitle"
        label="Title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && formik.errors.title}
        helperText={formik.touched.title && formik.errors.title}
      />

      <InputField
        id="todoDescription"
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
        id="todoStatus"
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
