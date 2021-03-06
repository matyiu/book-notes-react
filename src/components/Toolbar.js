import React, { useState } from 'react';
import { AddNoteForm } from './notes/AddNoteForm';
import { Container, Row, Col } from './grid/grid';
import SearchNotes from './inputs/SearchNotes';
import AddNote from './inputs/AddNote';
import styled from 'styled-components';
import { Select } from './inputs/Select';

const ColFlex = styled(Col)`
    display: flex;

    > *:first-child {
        margin-right: 13px;
    }
`;

const RowSpaceBetween = styled(Row)`
    justify-content: space-between;
`;

export const Toolbar = (props) => {
    const { onOrder, onFilter } = props;

    const [ openForm, setOpenForm ] = useState(false);

    const handleClosedCreateForm = () => setOpenForm(false);
    const handleCreateForm = () => setOpenForm(true);

    return (
        <div className="toolbar">
            <Container>
                <RowSpaceBetween>
                    <ColFlex>
                        <AddNote />
                        <SearchNotes />
                    </ColFlex>
                    <Col>
                        <Select options={[
                            {
                                content: "Lorem",
                            },
                            {
                                content: "Ipsum",
                            },
                            {
                                content: "Dolor",
                            },
                            {
                                content: "Sit",
                            },
                        ]} />
                    </Col>
                </RowSpaceBetween>
            </Container>
            {openForm && <AddNoteForm callbackClose={handleClosedCreateForm} />}
        </div>
    );
};