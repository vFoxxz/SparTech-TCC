import styled from 'styled-components';

export const Container = styled.div`
  background-color: #171923;
  font-family: 'poppins';
  position: fixed;
  height: 100%;
  top: 0px;
  right: 0px;
  width: 300px;
  right: ${props => props.sidebar ? '50' : '50%'};
  animation: showSidebar .4s;
  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }
  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
  @font-face {
    font-family: 'poppins';
    src: url(../../../public/assets/fonts/Poppins-Light.ttf);
}
`;

export const Content = styled.div`
  margin-top: 100px;
`;