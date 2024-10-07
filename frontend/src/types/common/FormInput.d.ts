export interface FormInputProps {
    placeholder: string;
    label: string;
    formType: string;
    value: string;
    setValue: (value: string) => void;
}