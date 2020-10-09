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

class SearchResult extends React.Component {
  // We need a function to get from search API
  fetchSearchApi = () => {};

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
          <TableContainer
            title={"d"}
            description={this.props.searchQuery}
            {...getTableContainerProps()}
          >
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

export { SearchResult };
