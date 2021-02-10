import styled from 'styled-components'

const MenuWrapper = styled.div`
    width: 50%;
    height: 100%;
    background-color: green;

    @media (max-width: 650px) {
        width: 100%;
        height: 50%;
    }
`

export default MenuWrapper;