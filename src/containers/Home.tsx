import React, { useState } from "react";
import Show from "../components/Show";
import styled from "styled-components";
import { State } from "../reducers/socket";
import { connect } from "react-redux";
import { OnSale } from "../reducers/shows";

const Container = styled.div`
  display: flex;
  margin: 2rem;
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition: opacity 1s;
`;

interface Props {
  dispatch: any;
  history: any;
  state: any;
}

function Home({ dispatch, history, state }: Props) {
  const [opacity, setOpacity] = useState(1);
  const purchaseFlow = (id: number) => {
    setOpacity(0);
    dispatch({ type: "PICK_SHOW", payload: { showId: id } });
    setTimeout(() => history.push(`/purchase/${id}`), 1000);
  };

  return (
    <Container opacity={opacity}>
      {state.shows.onsale &&
        state.shows.onsale.map((s: OnSale) => {
          const { artist, venue, date, id, img } = s;
          return (
            <Show
              key={artist + id}
              artist={artist}
              date={date}
              venue={venue}
              id={id}
              img={img}
              purchaseFlow={purchaseFlow}
            />
          );
        })}
    </Container>
  );
}

const mapStateToProps = (state: State) => ({ state });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Home);
