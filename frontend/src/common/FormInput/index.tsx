import { Form } from "react-bootstrap"
import { FormInputProps } from "../../types/common/FormInput.d";

function FormInput(props: FormInputProps) {
  const { label, placeholder, formType, value, setValue } = props;
  return (
    <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={formType}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
        />
    </Form.Group>
  );
}

export default FormInput