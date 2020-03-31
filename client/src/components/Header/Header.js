import React, {useState} from 'react';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

export default function Header({onSearch, createNewMemeber}) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Row>
      <Col sm={6}>
        <InputGroup className="mb-3">
          <FormControl onChange={e => setSearchTerm(e.currentTarget.value)} defaultValue={searchTerm} />
            <InputGroup.Append>
              <Button onClick={() => onSearch(searchTerm)} variant="primary">Search</Button>
            </InputGroup.Append>
        </InputGroup>
      </Col>
      <Col>
        <Button onClick={createNewMemeber} variant="primary" className="float-right">+ New Member</Button>
      </Col>
    </Row>
  )
}
