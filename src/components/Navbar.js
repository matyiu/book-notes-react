import React from 'react';
import { Navbar as B4Navbar, Form, FormControl, Button, Container, Row, Col, InputGroup } from "react-bootstrap";

export const Navbar = () => {
    return (
        <B4Navbar bg="light" expand="lg">
            <Container>
                <Row style={{ width: "100%" }}>
                    <Col xs="4">
                        <B4Navbar.Brand href="/">BooNote</B4Navbar.Brand>
                    </Col>
                    <Col xs="8">
                        <B4Navbar.Toggle aria-controls="navbar-nav" />
                        <B4Navbar.Collapse id="navbar-nav" className="justify-content-end">
                            <Form inline>
                                <InputGroup>
                                    <FormControl type="text" placeholder="Search" />
                                    <InputGroup.Append>
                                        <Button variant="outline-success">Search</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </B4Navbar.Collapse>
                    </Col>
                </Row>
            </Container>
        </B4Navbar>
    );
};