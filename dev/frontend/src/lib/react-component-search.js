import React, { useState, useEffect } from "react";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Search,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
import styles from "./react-component-search.css";
const searchResultProps = {
  rows: [],
  headers: [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "artist",
      header: "Artist",
    },
    {
      key: "album",
      header: "Album",
    },
    {
      key: "duration",
      header: "Duration",
    },
    {
      key: "overflow",
      header: "",
    },
  ],
};

class MySearch extends React.Component {
  shouldComponentUpdate = (newProps, newState) => false;

  render = () => {
    return (
      <Search
        id="search"
        placeHolderText={"Find a song"}
        size={"lg"}
        labelText="search"
        onChange={() => {
          this.props.searchQueryOnChangeHandler(
            document.getElementById("search").value
          );
        }}
      />
    );
  };
}

const SearchResult = (props) => {
  let { items, queue } = props;

  // We create hashmap of queue uris, so filtering songs not in queue is not O(nm) but rather O(n)
  let queueURI = {};
  if (queue.length > 0) {
    queueURI = queue.reduce((map, i) => {
      map[i.track.uri] = true;
      return map;
    }, {});
  }
  items = items.filter((i) => !(i.uri in queueURI));

  const searchResultItems = items.map((item) => {
    return (
      <TableRow id={item.id} key={item.id}>
        <TableCell key={`${item.id}:name`}>
          <img src={`${item.album.images[0].url}`} className="albumPhoto"></img>
          {item.name}
        </TableCell>
        <TableCell key={`${item.id}:artist`}>{item.artists[0].name}</TableCell>
        <TableCell key={`${item.id}:album`}>{item.album.name}</TableCell>
        <TableCell key={`${item.id}:duration`}>
          {Math.round((item.duration_ms * 10) / 1000 / 60) / 10} minutes
        </TableCell>
        <TableCell key="overflow">
          <OverflowMenu flipped>
            <OverflowMenuItem
              itemText="Queue"
              onClick={() => {
                props.addTrackToQueueHandler(item);
              }}
            ></OverflowMenuItem>
          </OverflowMenu>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <DataTable {...searchResultProps}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getTableContainerProps,
      }) => (
        <TableContainer {...getTableContainerProps()}>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{searchResultItems}</TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};

const SearchPane = (props) => {
  const { socket, spotifyID } = props;
  const abortController = new AbortController();

  const [accessToken, setAccessToken] = useState("");
  const [queue, setQueue] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    socket.on("setAccessToken", (accessToken) => {
      setAccessToken(accessToken);
    });
    return () => {
      abortController.abort();
    };
  }, [accessToken]);

  useEffect(() => {
    socket.on("setQueue", (queue) => {
      setQueue(queue);
    });
    return () => {};
  }, [queue]);

  const searchQueryOnChangeHandler = async (searchQuery) => {
    let newItems = [];
    if (searchQuery) {
      let requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
        redirect: "follow",
        signal: abortController.signal,
      };
      let response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
        requestOptions
      );
      let responseObj = JSON.parse(await response.text());
      newItems = responseObj.tracks.items;
    }
    setItems(newItems);
  };

  const addTrackToQueueHandler = (track) => {
    let { id, uri, name } = track;
    let albumImageURL = track.album.images[0].url;
    let artistName = track.artists[0].name;
    track = { id, uri, name, albumImageURL, artistName };
    socket.emit("addTrackToQueue", { spotifyID, track });
  };

  return (
    <>
      <MySearch
        searchQueryOnChangeHandler={searchQueryOnChangeHandler}
      ></MySearch>
      <SearchResult
        items={items}
        queue={queue}
        addTrackToQueueHandler={addTrackToQueueHandler}
      ></SearchResult>
    </>
  );
};

export default SearchPane;
