import React, { useState } from 'react';
import { AddNoteForm } from './notes/AddNoteForm';
import { Container, Row, Col } from './grid/grid';
import SearchNotes from './inputs/SearchNotes';
import AddNote from './inputs/AddNote';
import styled from 'styled-components';

const ColFlex = styled(Col)`
    display: flex;

    > *:first-child {
        margin-right: 13px;
    }
`;

export const Toolbar = (props) => {
    const { onOrder, onFilter } = props;

    const [ openForm, setOpenForm ] = useState(false);

    const handleClosedCreateForm = () => setOpenForm(false);
    const handleCreateForm = () => setOpenForm(true);

    return (
        <div className="toolbar">
            <Container>
                <Row>
                    <ColFlex>
                        <AddNote />
                        <SearchNotes />
                    </ColFlex>
                </Row>
            </Container>
            {openForm && <AddNoteForm callbackClose={handleClosedCreateForm} />}
        </div>
    );
};