import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {logout} from "../../JS/actions/user"

const Dashbord = () => {
    const dispatch =useDispatch();
    const history=useHistory();
    return (
        <div>
            <button onClick={()=>{
            dispatch(logout());
            history.push("/");
            }} >Logout</button>
            Dashboard</div>
    )
}


export default Dashbord
