import * as yup from 'yup';

const mobileRegExp = /^\d{10}$/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const formSchema = yup.object().shape({
  firstName: yup.string().required('First Name is Required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().matches(emailRegExp, 'Invalid email address').required('Email is required'),
  mobile: yup.string().matches(mobileRegExp, 'Invalid mobile number').required('Mobile Number is required'),
  address: yup.string().required('Address is Required'),
  country: yup.string().required('Country is Required'),
  state: yup.string().required('State is Required'),
  city: yup.string().required('City is Required'),
});

export default formSchema;
