
import { useState } from 'react';

// Hook to handle form state
export const useForm = <T extends Record<string, any>>(initialValues: T) => {
    const [values, setValues] = useState(initialValues);

    // Update form values on input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Reset form values to initial state
    const resetForm = () => setValues(initialValues);

    return { values, handleChange, resetForm };
};
