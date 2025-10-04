import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

function Employees(){

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/employees').then((response) => {
        setEmployees(response.data.employees)
      }).catch((error) => {
      
      })
    }, [])

    return(
        <>
        <Header/>
        { (employees) ? employees.map((emp) => (
            <h4 className="mb-3">{emp.firstName} {emp.lastName}</h4>
        )) : '' } 
        <Footer/>
        </>
    )
}

export default Employees;