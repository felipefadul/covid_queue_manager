import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E6FFE6;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #85E085;
  border-radius: 1.5rem;
  padding: 2rem 3rem 3rem 3rem;
  margin: 1rem;

  @media(max-width: 960px) {
    padding: 1.5rem 2.5rem 2.5rem 2.5rem;
  }
`;

export const AppTitle = styled.h1`
  color: #004D00;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;

  @media(max-width: 960px) {
    font-size: 1.5rem;
  }
`;

export const Button = styled.button`
  height: 3rem;
  width: 16rem;
  margin-top: 1rem;
  border: 2px solid #000;
  background: #008000;
  font-weight: bold;
  font-size: 1.1rem;
  color: #fff;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #006600;
  }
`;