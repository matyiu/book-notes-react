import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { ButtonDialog } from './ButtonDialog';
import { Select } from './Select';

export const FilterNotes = (props) => {
    const { onOrder } = props;

    // State
    const [ orderBy, setOrderBy ] = useState('Alphabetically');
    const [ orderType, setOrderType ] = useState('Descending');

    // Event Handlers
    const handleOrderByChange = (e) => {
        setOrderBy(e.target.value);
        onOrder(e.target.value, orderType);
    }
    const handleOrderTypeChange = (e) => {
        setOrderType(e.target.value);
        onOrder(orderBy, e.target.value);
    }

    return (
        <ButtonDialog 
            className="btn btn-outline-primary"
            btnText="Filter"
        >
            <Form>
                <Form.Row>
                    <Col xs="12">
                        <h3>Sort</h3>
                    </Col>
                    <Col className="d-flex flex-wrap justify-content-between">
                        <Select onChange={handleOrderByChange} options={[
                            {
                                content: "Created",
                            },
                            {
                                content: "Alphabetically",
                            },
                        ]} value={orderBy} />
                        <Select onChange={handleOrderTypeChange} options={[
                            {
                                content: "Ascending",
                            },
                            {
                                content: "Descending",
                            },
                        ]} value={orderType} />
                    </Col>
                </Form.Row>
            </Form>
        </ButtonDialog>
    );
}