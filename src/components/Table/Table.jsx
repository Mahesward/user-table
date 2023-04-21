import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteData } from '../../redux/dataReducers';
import './Table.css';

function Table() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableData = useSelector((state) => state.data.value);

  return (
    <div id="wrapper">
      <table id="keywords" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.address}</td>
              <td>{user.country}</td>
              <td>{user.state}</td>
              <td>{user.city}</td>
              <td className="">
                <button type="button" onClick={() => navigate(`edit-data/${user.id}`)} className="edit">
                  EDIT
                </button>
              </td>
              <td className="">
                <button type="button" onClick={() => dispatch(deleteData({ id: user.id }))} className="delete">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
