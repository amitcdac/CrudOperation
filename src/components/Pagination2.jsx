// App.js
import React,{ useEffect, useMemo, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import axios from 'axios';


const Pagination2=()=> {
    const [student, setStudent] = useState([]);
      useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users').
        then((res)=>setStudent(res.data))
      },[])
      
  const columns = [
    { dataField: 'id', text: 'Id', sort: true },
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'email', text: 'Email', sort: true }
  ];

  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

  const pagination = paginationFactory({
    page: 2,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  const { SearchBar, ClearSearchButton } = Search;

  return (
    <div className="App">
      <h5>React Bootstrap Table Next with Sorting, Pagination and Search</h5>

      <ToolkitProvider
        bootstrap4
        keyField='id'
        data={student}
        columns={columns}
        search
      >
        {
          props => (
            <div>
              <h6>Input something at below input field:</h6>
              <SearchBar {...props.searchProps} />
              <ClearSearchButton {...props.searchProps} />
              <hr />
              <BootstrapTable
                defaultSorted={defaultSorted}
                pagination={pagination}
                {...props.baseProps}
              />
            </div>
          )
        }
      </ToolkitProvider>

    </div>
  );
}

export default Pagination2;