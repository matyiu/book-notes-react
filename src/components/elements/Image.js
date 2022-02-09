import styled from 'styled-components'

export default styled.img`
    max-width: 100%;
    width: ${({ width }) => (width ? width + 'px' : '100%')};
    height: ${({ height }) => (height ? height + 'px' : 'auto')};
`
