import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  overflow: hidden;
  border: 3px solid white;
  width: 333px;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 17% 1fr 1fr;
  padding: 1rem;
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition: opacity 1s;
  img {
    position: absolute;
    z-index: -10;
    width: 100%;
    opacity: 0.5;
  }
`;

export const Info = styled.div`
  grid-column: 1/3;
  letter-spacing: 3px;
  div {
    margin-top: 10px;
  }
`;

export const TicketContainer = styled.div`
  display: flex;
  grid-column: 1 / span 2;
  margin: 18px 10px 0;
  justify-content: space-around;
`;

export const Separator = styled.div`
  font-weight: 900;
  font-size: 1.8rem;
  grid-column: 1/3;
`;

export const Quantity = styled.div``;

export const Dropdown = styled.div`
  margin-top: -2px;
  cursor: pointer;
  text-align: center;
  li {
    list-style: none;
  }
  &.closed {
    li {
      display: none;
    }
  }

  .open {
    li {
      display: block;
    }
  }

  li.clicker {
    display: block;
  }

  li.selected {
    background: red;
  }
`;

export const Button = styled.div`
  cursor: pointer;
  grid-column: 1/3;
  padding: 1rem;
  border: 2px solid white;
  text-align: center;
  height: 25%;
  width: 40%;
  margin: 0 75px;
  background: #1f1f1e;
`;
