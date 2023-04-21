import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { accessToken, getAddress } from '../../config/axios.config';
import formSchema from '../../schemas/schema';
import { addData } from '../../redux/dataReducers';
import './editForm.css';

function EditForm() {
  const param = useParams();
  const dispatch = useDispatch();
  const userDataTable = useSelector((state) => state.data.value);
  const data = userDataTable.filter((userData) => userData.id === Number(param.id))?.[0];

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const formik = useFormik({
    initialValues: data,
    validationSchema: formSchema,
    onSubmit: () => {
      toast.success('Form Submitted Successfully');
      const newValue = userDataTable.map((user) => {
        if (user.id === formik.values.id) return formik.values;
        return user;
      });
      dispatch(addData(newValue));
    },
  });

  const getAuthToken = async () => {
    //* Request for authentication token for the countries, states and cities

    try {
      const authToken = await accessToken.get('/', {
        headers: {
          Accept: 'application/json',
          'api-token': import.meta.env.VITE_UNIVERSAL_ADDRESS_API,
          'user-email': import.meta.env.VITE_USER_EMAIL,
        },
      });

      const token = authToken.data.auth_token;
      return token;
    } catch (error) {
      toast.error('something went wrong');
      console.log(error);
      return null;
    }
  };

  const getCountries = async () => {
    try {
      const authToken = await getAuthToken();

      //* Getting Countries

      const res = await getAddress.get('/countries', {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json',
        },
      });
      setCountries(res.data);
    } catch (error) {
      toast.error('something went wrong');
      console.log(error);
    }
  };

  const getStates = async (val) => {
    try {
      const authToken = await getAuthToken();

      //* Getting States
      const res = await getAddress.get(`/states/${val}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json',
        },
      });

      setStates(res.data);
    } catch (error) {
      toast.error('something went wrong');
      console.log(error);
    }
  };

  const getCities = async (val) => {
    try {
      const authToken = await getAuthToken();

      //* Getting States
      const res = await getAddress.get(`/cities/${val}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json',
        },
      });

      setCities(res.data);
    } catch (error) {
      toast.error('something went wrong');
      console.log(error);
    }
  };

  useEffect(() => {
    setCountries([
      {
        country_name: formik.values.country,
        country_short_name: null,
        country_phone_code: 93,
      },
    ]);
    setStates([
      {
        state_name: formik.values.state,
        country_short_name: null,
      },
    ]);
    setCities([
      {
        city_name: formik.values.city,
        country_short_name: null,
      },
    ]);
  }, []);

  // useEffect(() => {
  //   getCountries();
  // }, []);

  return (
    <div>
      <div className="container">
        <h1 className="title">Contact Form</h1>
        <div className="form-container">
          <h4 className="data-form">ADD DATA</h4>
          <form id="contactForm" autoComplete="off" onSubmit={formik.handleSubmit}>
            <p className="name-field">
              <div className="label-error">
                <span> First Name</span>
                {formik.errors.firstName && <span className="error">{formik.errors.firstName}</span>}
              </div>
              <input
                type="text"
                name="firstName"
                id=""
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </p>

            <p className="company-field">
              <div className="label-error">
                <span> Last Name</span>
                {formik.errors.lastName && <span className="error">{formik.errors.lastName}</span>}
              </div>
              <input
                type="text"
                name="lastName"
                id=""
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </p>

            <p className="email-field">
              <div className="label-error">
                <span>Email</span>
                {formik.errors.email && <span className="error">{formik.errors.email}</span>}
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </p>

            <p className="phone-field">
              <div className="label-error">
                <span>Phone</span>
                {formik.errors.mobile && <span className="error">{formik.errors.mobile}</span>}
              </div>
              <input
                type="text"
                name="mobile"
                id="phone"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </p>

            <div className="country-field">
              <div className="label-error">
                <p>Country</p>
                {formik.errors.country && <span className="error">{formik.errors.country}</span>}
              </div>
              <select
                name="country"
                id=""
                className="input-box"
                onClick={() => getCountries()}
                onChange={(e) => {
                  formik.handleChange(e);
                  getStates(e.target.value);
                }}
                value={formik.values.country}
                onBlur={formik.handleBlur}
              >
                {countries.map((country) => (
                  <option
                    className="select-option"
                    value={country.country_name}
                    key={country.country_phone_code + country.country_short_name}
                  >
                    {country.country_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="state-field">
              <div className="label-error">
                <p>State</p>
                {formik.errors.state && <span className="error">{formik.errors.state}</span>}
              </div>
              <select
                name="state"
                id=""
                className="input-box"
                onChange={(e) => {
                  formik.handleChange(e);
                  getCities(e.target.value);
                }}
                value={formik.values.state}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.state}
              >
                {states.map((state) => (
                  <option className="select-option" value={state.state_name} key={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="city">
              <div className="label-error">
                <p>City</p>
                {formik.errors.city && <span className="error">{formik.errors.city}</span>}
              </div>
              <select
                name="city"
                id=""
                className="input-box"
                onChange={formik.handleChange}
                value={formik.values.city}
                onBlur={formik.handleBlur}
                defaultValue={formik.values.city}
              >
                {cities.map((city) => (
                  <option className="select-option" value={city.city_name} key={city.city_name}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>

            <p className="message-field full">
              <div className="label-error">
                <span>Address</span>
                {formik.errors.address && <span className="error">{formik.errors.address}</span>}
              </div>
              <textarea
                name="address"
                rows="5"
                id=""
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </p>

            <p className="submit-button">
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
