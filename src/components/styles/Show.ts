import styled from "styled-components";

export const Container = styled.div`
  border: 6px solid white;
  position: relative;
  background: darkblue;
  margin: 2rem auto;
`;

export const Img = styled.img`
  width: 100%;
  display: block;
  margin: auto;
  opacity: 0.7;
`;

export const InfoTainer = styled.div`
  position: absolute;
  top: 40px;
  left: 30px;
  letter-spacing: 6px;
  div {
    margin: 10px 0;
  }
`;

export const Button = styled.div`
  margin: 30px 0 !important;

  div {
    border: 3px white solid;
    background: #1f1f1e;
    width: 50px;
    margin: 1rem 0;
    text-align: center;
    padding: 1rem;
    font-weight: 500;
    letter-spacing: 3px;
    cursor: pointer;
  }
`;
