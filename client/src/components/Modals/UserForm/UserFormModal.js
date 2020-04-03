import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

const formSchema = {
  id: '',
  firstName: '', 
  lastName: '',
  age: null,
  gender: 'Male',
  maritalStatus: 'Single',
  kids: ['', '']
};

const UserFormModal = ({show, handleClose, onSave, user}) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const handleKidsChange = (value, index) => {
    let clone = [...formData.kids];
    clone[index] = value;
    let notAllFilled = clone.some(kid => kid === '');
    if (notAllFilled) {
      let length = clone.length;
      if (length > 2 && clone[length -2] === '' && clone[length - 1] === '') {
        clone.pop();
      }
    } else {
      clone.push('');
    }
    setFormData({...formData, kids: clone});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let kids = formData.kids.filter(kid => {
      return kid !== '';
    });
    onSave({...formData, kids});
  }

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setEditMode(true);
      let userKids = [...user.kids];
      if (userKids.length === 0) {
        userKids.push('');
      }
      userKids.push('');
      setFormData({...formData, ...user, kids: userKids});
    } else {
      setFormData(formSchema);
    }
  }, [user]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? 'Edit Member' : 'New Member'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="userForm.id">
            <Form.Label column sm="4">ID</Form.Label>
            <Col sm="8">
              <Form.Control required pattern="^[0-9]*$" type="text" defaultValue={user.id} onChange={(e) => {
                setFormData({...formData, id: e.target.value});
              }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="userForm.firstName">
            <Form.Label column sm="4">First name</Form.Label>
            <Col sm="8">
              <Form.Control required pattern="^[A-Za-z]+$" minLength="1" maxLength="20" type="text" defaultValue={user.firstName} onChange={(e) => {
                setFormData({...formData, firstName: e.target.value});
              }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="userForm.lastName">
            <Form.Label column sm="4">Last name</Form.Label>
            <Col sm="8">
              <Form.Control required pattern="^[A-Za-z]+$" minLength="1" maxLength="20" type="text" defaultValue={user.lastName} onChange={(e) => {
                setFormData({...formData, lastName: e.target.value});
              }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="userForm.age">
            <Form.Label column sm="4">Age</Form.Label>
            <Col sm="8">
              <Form.Control required type="number" min="0" max="120" defaultValue={user.age} onChange={(e) => {
                setFormData({...formData, age: e.target.value});
              }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="userForm.gender">
            <Form.Label column sm="4">Gender</Form.Label>
            <Col sm="8">
              <Form.Control as="select" defaultValue={user.gender} onChange={(e) => {
                setFormData({...formData, gender: e.target.value});
              }} >
                <option value="Male" >Male</option>
                <option value="Female" >Female</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="userForm.status">
            <Form.Label column sm="4">Marital Status</Form.Label>
            <Col sm="8">
              <Form.Control as="select" defaultValue={user.maritalStatus} onChange={(e) => {
                setFormData({...formData, maritalStatus: e.target.value});
              }} >
                <option value="Single" >Single</option>
                <option value="Married" >Married</option>
                <option value="Divorced" >Divorced</option>
                <option value="Widower" >Widower</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <div className="seperator"></div>

          <Form.Group as={Row} className="form-kids">
            <Form.Label column sm="12">Kids:</Form.Label>
            <Col sm="8">
              {formData.kids && formData.kids.map((kid, index) => 
                  <Form.Control type="text" pattern="^[A-Za-z]+$" defaultValue={kid} key={`${kid}_${index}`} onChange={(e) => {
                    handleKidsChange(e.target.value, index);
                  }} />
                ) 
              }
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit" className="float-right">
            Save
          </Button>

        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default UserFormModal;
