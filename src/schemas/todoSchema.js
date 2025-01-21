import * as Yup from "yup"

// # TODO: put schemas here if needed and create different for create, update, etc if needed
export const todoValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().max(500, "Description must be under 500 characters"),
})
