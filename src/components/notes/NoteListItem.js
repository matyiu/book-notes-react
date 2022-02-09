import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import fetchWrapper from '../../app/fetchWrapper'
import stateMap from '../../app/stateMap'
import { darkTheme } from '../../variables/colors'
import { fonts } from '../../variables/fonts'
import { Dropwdown } from '../elements/Dropdown'
import { Heading2 } from '../elements/Headings'
import More from '../icons/More'

const NoteListItem = styled.article`
    background: ${darkTheme.primary.input};
    box-shadow: ${darkTheme.shadow.default};
    margin-bottom: 45px;
    padding: 25px;
    color: ${darkTheme.white.text};
`

const NoteListItemMetadata = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Tag = styled.span`
    font-size: ${fonts.p.size}px;
    line-height: ${fonts.p.lineHeight}px;
    color: ${({ color }) => (color ? color : darkTheme.white.text)};
    margin-right: 15px;
`

const NoteListItemRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`

export { NoteListItemRow, Tag, NoteListItemMetadata }

export default (props) => {
    const { note, onRemove } = props

    let author = null
    if (Array.isArray(note.authors) && note.authors.length > 0) {
        author = note.authors[0].name + (note.authors.length >= 2 ? '...' : '')
    }

    return (
        <Link to={`/notes/${note.id}`}>
            <NoteListItem>
                <Heading2>{note.title}</Heading2>
                <NoteListItemMetadata>
                    <NoteListItemRow>
                        <Tag>{author}</Tag>
                        <Tag>{note.category && note.category.name}</Tag>
                    </NoteListItemRow>
                    <NoteListItemRow>
                        <Tag>{stateMap.get(Number(note.state))}</Tag>
                        <Dropwdown
                            input={
                                <More
                                    width="20"
                                    height="20"
                                    color={darkTheme.white.text}
                                />
                            }
                        >
                            <Button
                                onClick={onRemove}
                                className="note-action"
                                variant="link"
                            >
                                <i className="fas fa-trash"></i>
                            </Button>
                        </Dropwdown>
                    </NoteListItemRow>
                </NoteListItemMetadata>
            </NoteListItem>
        </Link>
    )
}
