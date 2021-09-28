import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1440px;
    padding: 0 15px;
    margin: 0 auto;
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    margin: 0 -15px
`;

export const Col = styled.div`
    width: ${({ colNumber }) => colNumber ? (100 / 12) * colNumber + '%' : 'auto'};
    padding: 0 15px;
`;