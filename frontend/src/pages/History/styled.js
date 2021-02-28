import styled from 'styled-components';

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #E6FFE6;
  height: 100vh;

  @media(max-width: 960px) {
    height: 150vh;
  }
`;

export const AppTitle = styled.h1`
  color: #004D00;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;

  @media(max-width: 960px) {
    font-size: 1.2rem;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #85E085;
  border-radius: 1.5rem;
  padding: 2rem 3rem;
  margin: 1rem;

  @media(max-width: 960px) {
    padding: 1rem .9rem;
  }
`;

export const LastPatientContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  min-width: 676px;

  @media(max-width: 960px) {
    flex-direction: column;
    min-width: 300px;
  }
`

export const LastPatientContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #FFF;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 1rem;
  max-width: 40rem;
  overflow-y: auto;
  max-height: 40rem;
  width: 50%;
  margin: 0 .5rem;

  @media(max-width: 960px) {
    height: 4rem;
    width: 100%;
    margin: 0 1rem;
    min-width: 100px;
    max-width: 15rem;
    max-height: 20rem;

    &:first-child {
      margin-bottom: 1rem;
    }
  }
`

export const LastPatientContentTitle = styled.h3`
  color: #008000;
  font-weight: bold;
  font-size: 1.3rem;
`

export const LastPatientContentValue = styled.h2`
  color: #829882;
  font-weight: bold;

  &.room {
    font-size: 2rem;
  }

  @media(max-width: 960px) {
    font-size: 1rem;

    &.room {
      font-size: 1.5rem;
    }
  }
`

export const HistoryContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  background-color: #FFF;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 1rem;
  min-width: 300px;
  max-width: 40rem;
  overflow-y: auto;
  max-height: 40rem;

  @media(max-width: 960px) {
    min-width: 100px;
    max-width: 15rem;
    max-height: 20rem;
  }
`

export const HistoryContentTitle =  styled.h1`
  color: #004D00;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;

  @media(max-width: 960px) {
    font-size: 1.2rem;
    margin-bottom: .5rem;
  }
`

export const ButtonArea = styled.div`
  display: flex;
  align-items: center;

  @media(max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`

export const Button = styled.button`
  height: 3rem;
  width: 16rem;
  border: 2px solid #000;
  background: #008000;
  font-weight: bold;
  font-size: 1.1rem;
  color: #fff;
  border-radius: 1rem;
  margin: 1rem .5rem 0 .5rem;
  cursor: pointer;

  &:hover {
    background-color: #006600;
  }

  @media(max-width: 960px) {
    font-size: .9rem;
    margin: 0.5rem 0;
    height: 2.8rem;
    width: 14rem;
  }
`;