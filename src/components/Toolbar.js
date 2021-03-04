import React from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';

export const Toolbar = () => {
    return (
        <div className="toolbar">
            <Container>
                <Row>
                    <Col className="d-flex">
                        <Button className="mr-auto">Create Note</Button>
                        <Button variant="outline-primary">Filter</Button> {/* TODO: Filter component */}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};