import React from 'react'
import { Navbar } from '../components/Navbar'
import { Col, Container, Row } from '../components/grid/grid'
import { SingleNote } from '../components/notes/SingleNote'
import { Sidebar } from '../components/Sidebar'
import Main from '../components/includes/Main'

export const Book = () => {
    return (
        <div id="bookpage">
            <Navbar />
            <Main>
                <Container>
                    <Row>
                        <Col colNumber={3}>
                            <Sidebar />
                        </Col>
                        <Col colNumber={9}>
                            <SingleNote />
                        </Col>
                    </Row>
                </Container>
            </Main>
        </div>
    )
}
