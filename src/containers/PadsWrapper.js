import styled from 'styled-components';

const PadsWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-color: purple;

  @media (max-width: 650px) {
    width: 100%;
    height: 50%;
  }
`;

export default PadsWrapper;
