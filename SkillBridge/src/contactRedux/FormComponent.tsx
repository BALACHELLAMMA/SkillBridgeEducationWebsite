// FormComponent.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from './Store';

const FormComponent: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: any) => state.formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can dispatch an action here to handle the form submission
    // For example, dispatch(submitForm(formData));
    console.log('Form submitted with data:', formData);
  };
  console.log(formData);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <br />
      {/* Add more form fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
