import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import Pagination2 from "./Pagination2";
import Response from "./Response";

const LIMIT = 5;

const totalPagesCalculator = (total, limit) => {
  const pages = [];
  for(let x = 1; x<= parseInt(total)/limit; x++){
    pages.push(x);
  }

  return pages;
}



const Pagination = () => {

    const { SearchBar, ClearSearchButton } = Search;
    const [users, setUsers] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
// https://jsonplaceholder.typicode.com/users
  useMemo(() => 
  {
  axios.get('http://localhost:8000/api/pagination', {
      params: {
        page: activePage,
        size: LIMIT
      }
    }).then(({data}) => {
        console.log(data)
        console.log(data.records)
       setUsers(data.records);
      setTotalUsers(data.total);
      console.log(data)
    }).catch(error => {
      console.log(error.response);
    })
  }, [activePage])
   
  const columns = [
            { dataField: 'id', text: 'Id', sort: true },
            { dataField: 'title', text: 'Title', sort: true },
            { dataField: 'image', text: 'Image', sort: true }
          ];
    
  return (
    <div className="app">
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {activePage !== 1 && <li className="page-item" onClick={() => setActivePage(activePage - 1)}>
          <a className="page-link" href="javascript:void(null)">Previous</a>
        </li>}
       {totalPagesCalculator(totalUsers, LIMIT).map(page => (
          <li className={`page-item ${activePage === page ? 'active' : ''}`} key={page}>
            <a 
            className="page-link" href="javascript:void(null)" 
            onClick={() => setActivePage(page)}
            >{page}</a>
          </li>
       ))}
      {activePage !== totalPagesCalculator(totalUsers, LIMIT).length &&  <li className="page-item" onClick={() => setActivePage(activePage + 1)}>
          <a className="page-link" href="javascript:void(null)">Next</a>
        </li>}
      </ul>
    </nav>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>title</th>
          <th>date</th>
          <th>Image</th>
       </tr>
      </thead>
      <tbody>
       {users.map(user => (
          <tr key={user._id}>
            <td>{user.title }</td>
            <td>{user.date}</td>
            <td>{user.image}</td>
            
          </tr>
       ))}
      
      </tbody>
    </table>
    <Pagination2/>
  </div>
  )
}
export default Pagination

