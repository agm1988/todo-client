import { render, fireEvent } from "@testing-library/react"
import TodoForm from "./TodoForm"

test("renders form and handles submit", () => {
  const onSubmit = jest.fn()
  const { getByLabelText, getByText } = render(
    <TodoForm onSubmit={onSubmit} />
  )

  fireEvent.change(getByLabelText(/title/i), { target: { value: "Test Todo" } })
  fireEvent.click(getByText(/create/i))

  expect(onSubmit).toHaveBeenCalled()
});
