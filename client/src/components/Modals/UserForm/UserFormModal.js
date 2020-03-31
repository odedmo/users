import React, {useState, useEffect} from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

const UserFormModal = ({show, handleClose, onSave, user}) => {
  const [newUser, setNewUser] = useState(null);
  const [kids, setKids] = useState(['']);
  const [newKids, setNewKids] = useState(['']);
  const [formData, setFormData] = useState({
    id: user.id || '',
    firstName: user.firstName || '',
    lastName: user.lastName || ''
  })

  const save = () => {
    onSave(formData);
  };

  const onNewKidEdit = (e) => {
    const name = e.target.value;
    
    if (newKids.filter(kid => kid === '').length !== 2 && name !== '') {
      setNewKids((prevState) => {
        return [...prevState, '']
      });
    }
    
  }

  const onBlur = (e) => {
    const name = e.target.value;
    setNewKids((prevState) => {
      return [...prevState, name, '']
    });
  }

  useEffect(() => {
    setKids(user.kids || ['']);
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{user.id ? 'Edit Member' : 'New Member'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="userForm.id">
            <Form.Label column sm="4">ID</Form.Label>
            <Col sm="8">
              <Form.Control required type="text" defaultValue={user.id} onChange={(e) => {
                setFormData({...formData, id: e.target.value});
              }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="userForm.firstName">
            <Form.Label column sm="4">First name</Form.Label>
            <Col sm="8">
              <Form.Control required type="text" defaultValue={user.firstName} onChange={(e) => {
                setFormData({...formData, firstName: e.target.value});
              }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="userForm.lastName">
            <Form.Label column sm="4">Last name</Form.Label>
            <Col sm="8">
              <Form.Control required type="text" defaultValue={user.lastName} onChange={(e) => {
                setFormData({...formData, lastName: e.target.value});
              }} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="userForm.age">
            <Form.Label column sm="4">Age</Form.Label>
            <Col sm="8">
              <Form.Control required type="text" defaultValue={user.age} onChange={(e) => {
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

          <Form.Group as={Row} controlId="userForm.kids" className="form-kids">
            <Form.Label column sm="12">Kids:</Form.Label>
            <Col sm="8">
              {kids.map((kid, i) => <Form.Control required type="text" defaultValue={kid} key={`${kid}_${i}`} />) }
              <Form.Control required type="text" onChange={onNewKidEdit} onBlur={onBlur} />
              {/* {newKids.map((kid,i) => <Form.Control required type="text" defaultValue={kid} key={`${kid}_${i}`} onChange={onNewKidEdit} onBlur={onBlur} />)} */}
            </Col>
          </Form.Group>

          {/* <Button variant="primary" type="submit">
            Submit
          </Button> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button variant="primary" onClick={save} >
          {user.id ? 'Save' : 'Add Member'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserFormModal;
