import React, { useState } from "react";
import styled from "styled-components";
import { Logo } from "./containers/Logo";

const Container = styled.div`
  .selected > .show-wrapper {
    background: red;
  }
  .show-wrapper {
    display: flex;
    justify-content: space-evenly;
    border: 2px solid white;
    margin: 43px;
    padding: 20px;
  }
  .name {
    margin-bottom: 22px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  .header {
    font-size: 30px;
    font-weight: 500;
  }
  * {
    margin-top: 15px;
  }
  .error {
    color: red;
  }
`;

const Button = styled.div`
  border: 2px solid white;
  padding: 1rem;
  width: 100px;
  text-align: center;
  background: black;
  cursor: pointer;
`;

const Input = styled.input`
  border: 2px solid white;
  width: 270px;
  height: 41px;
  background: black;
  color: white;
  text-align: center;
`;

const Creator = () => {
  const [artistSearch, setAritstSearch] = useState("");
  const [artists, setArtists] = useState([] as any);
  const [selected, setSelected] = useState();
  const [error, setError] = useState("");
  const search = async () => {
    fetch(process.env.REACT_APP_SERVER + "/search", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist: artistSearch })
    })
      .then(r => r.json())
      .then(data => {
        console.log(data);
        if (data.error && data.error.message === "The access token expired") {
          fetch(process.env.REACT_APP_SERVER + "/new_token")
            .then(r => r.json())
            .then(data => {
              if (data.message === "new_token") {
                search();
              }
            });
        } else {
          if (data.artists.items.length === 0) setError("nothing found");
          setArtists(data.artists.items);
        }
      });
  };

  const pick = () => {
    fetch(process.env.REACT_APP_SERVER + "/pick", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected })
    })
      .then(r => r.json())
      .then(data => {
        if (data.message === "search_again") {
          search().then(() => pick());
        }
      })
      .catch(error => search());
  };
  return (
    <Container>
      <Logo />
      <SearchBox>
        <div className="header">You have been chosen to create a show</div>
        <div className="header">SEARCH FOR AN ARTIST</div>
        <Input
          onChange={e => setAritstSearch(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") search();
          }}
        />
        <div className="error">{error}</div>
        <Button onClick={search}>SEARCH</Button>
      </SearchBox>
      <div>
        {artists.length > 0 &&
          artists.map((i: any) => (
            <div className={selected === i.id ? "selected" : ""} key={i.name}>
              <div className="show-wrapper" onClick={() => setSelected(i.id)}>
                <div>
                  <div className="name">{i.name}</div>
                  {selected === i.id && <Button onClick={pick}>CHOOSE</Button>}
                </div>
                <img
                  width="100px"
                  height="100px"
                  src={i.images.length > 0 ? i.images[0].url : ""}
                />
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Creator;
