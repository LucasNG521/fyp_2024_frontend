import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValue = !isNaN(value) && !isNaN(parseFloat(value)) ? parseFloat(value) : value;
    setValues({
      ...values,
      [name]: updatedValue
    });
  };

  return [values, handleChange, setValues];
}

export default useForm;
