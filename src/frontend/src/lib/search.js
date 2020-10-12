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
} from "carbon-components-react";
import styles from "./search.css";
const searchResultProps = {
  rows: [
    {
      id: "a",
      name: "Load Balancer 3",
      protocol: "HTTP",
      port: 3000,
      rule: "Round robin",
    },
    {
      id: "b",
      name: "Load Balancer 1",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
    },
    {
      id: "c",
      name: "Load Balancer 2",
      protocol: "HTTP",
      port: 80,
      rule: "DNS delegation",
    },
  ],
  headers: [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "protocol",
      header: "Protocol",
    },
    {
      key: "port",
      header: "Port",
    },
    {
      key: "rule",
      header: "Rule",
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
          this.props.searchQueryOnChange(
            document.getElementById("search").value
          );
        }}
      />
    );
  };
}

class SearchResult extends React.Component {
  render = () => {
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
            <Table {...getTableProps()} isSortable>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}
                      isSortable
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    );
  };
}

class SearchPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  searchQueryOnChange = async (searchQuery) => {
    let oldState = this.state;
    let newItems = [];
    if (searchQuery) {
      let requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${this.props.access_token}` },
        redirect: "follow",
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
        <MySearch searchQueryOnChange={this.searchQueryOnChange}></MySearch>
        <SearchResult {...this.state}></SearchResult>
      </>
    );
  };
}
export { SearchPane };
