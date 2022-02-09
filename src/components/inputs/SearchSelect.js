import React, { useEffect, useState } from 'react'
import { Select } from './Select'

export const SearchSelect = (props) => {
    const { options, value, createHandler, ...restProps } = props

    // Helper functions
    const getCurrentOptionContent = () => {
        if (typeof value === 'string') {
            const option = options.find(
                (option) => (option.value || option.content) === value
            )

            return option.content
        }

        return ''
    }

    // State
    const optionValue = getCurrentOptionContent()
    const [searchText, setSearchText] = useState(optionValue)
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [create, setCreate] = useState(false)

    const filterOptions = (search) => {
        return options.filter((option) => option.content.startsWith(search))
    }

    const handleSearchChange = (e) => {
        const search = e.target.value
        setFilteredOptions(filterOptions(search))
        setSearchText(search)
        setCreate(true)
    }

    const handleClose = () => {
        setSearchText(getCurrentOptionContent())
        setFilteredOptions(filterOptions(''))
        setCreate(false)
    }

    const handleCreateOption = () => {
        setCreate(false)
        createHandler(searchText)
    }

    useEffect(() => {
        setSearchText(getCurrentOptionContent())
    }, [value])

    useEffect(() => {
        setFilteredOptions(filterOptions(searchText))
    }, [options])

    return (
        <Select
            options={filteredOptions}
            onSearch={handleSearchChange}
            read={false}
            inputValue={searchText}
            onClose={handleClose}
            create={create}
            onCreate={handleCreateOption}
            value={value}
            {...restProps}
        />
    )
}
