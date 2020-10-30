import React from "react";
// import { render } from "react-dom";
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

class SearchResult extends React.Component {
  render = () => {
    const searchResultItems = this.props.items.map((item) => {
      return (
        <TableRow id={item.id} key={item.id}>
          <TableCell key={`${item.id}:name`}>{item.name}</TableCell>
          <TableCell key={`${item.id}:artist`}>
            {item.artists[0].name}
          </TableCell>
          <TableCell key={`${item.id}:album`}>
            {item.album.name}
            <img
              src={`${item.album.images[0].url}`}
              className="albumPhoto"
            ></img>
          </TableCell>
          <TableCell key={`${item.id}:duration`}>
            {Math.round((item.duration_ms * 10) / 1000 / 60) / 10} minutes
          </TableCell>
          <TableCell key="overflow">
            <OverflowMenu flipped>
              <OverflowMenuItem
                itemText="Queue"
                onClick={() => {
                  this.props.addToQueueHandler(item.uri);
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
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}
                    >
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
}

class SearchPane extends React.Component {
  // https://medium.com/@selvaganesh93/how-to-clean-up-subscriptions-in-react-components-using-abortcontroller-72335f19b6f7
  abortController = new AbortController();
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  searchQueryOnChangeHandler = async (searchQuery) => {
    let oldState = this.state;
    let newItems = [];
    if (searchQuery) {
      let requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${this.props.accessToken}` },
        redirect: "follow",
        signal: this.abortController.signal,
      };

      let response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
        requestOptions
      );
      let responseObj = JSON.parse(await response.text());
      newItems = responseObj.tracks.items;
    }
    let newState = { ...oldState, ...{ items: newItems } };
    this.setState(newState);
  };

  render = () => {
    return (
      <>
        <MySearch
          searchQueryOnChangeHandler={this.searchQueryOnChangeHandler}
        ></MySearch>
        <SearchResult
          {...this.state}
          addToQueueHandler={this.props.addToQueueHandler}
        ></SearchResult>
      </>
    );
  };
}
export { SearchPane };
