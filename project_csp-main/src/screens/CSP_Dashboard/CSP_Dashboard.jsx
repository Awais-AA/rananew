import { useEffect, useReducer, useState } from "react";
import updateDashboardValue from "./updateDashboardValue";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  attributeList
} from "../../redux/features/packages/packagesSlice";
import techmain from "../../resources/techmain.jpg";
import "../LandingPage/landingPage.css";
const initialState={
  packageTitle: "",
  packageDes: "",
  packagePrice: "",
  attribute: [],
}


export default function Dashboard() {


  const [dashboardValue,dispatchValue]=useReducer(updateDashboardValue,initialState);
  const navigate = useNavigate();



  const [attribute, setAttribute] = useState(
    {
      attributeId:"",
      attributeTitle: "",
      attributeValue: "",
    },
  );

  // const {user} = useSelector(state=>state.user)
  const { packages } = useSelector((state) => state.packages);
 


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attributeList());
  }, [dispatch]);

  const onChange = (value) => {
    setAttribute((prevValue) => ({
      ...prevValue,
      ...value
      
    }));
    if(value?.attributeTitle){
     packages.forEach((item)=>{
        if(value.attributeTitle===item.attribute_name){
          const attributeId="attributeId"
          setAttribute((prevValue) => ({
            ...prevValue,
            [attributeId]:item.attribute_id,
            
          }));
          
           
        }
        return
      })
     

    }

  };


  // const submit = (e) => {
  //   e.preventDefault();
  //   dispatch(cspDashboard(dashboardValue));
  //   setdashboardValue({
  //     packageTitle: '',
  //     packageDes: '',
  //     packagePrice: '',
  //   });

  // };

 

  const summary = () => {
    navigate("/csp-summary");
  };
  const editProfile = () => {
    navigate("/csp-editProfile");
  };

  const Message = () => {
    navigate("/csp-message");
  };

  return (
    <>
      <div className="container-lg">
        <div>
          <img
            className="w-100 img-fluid"
            src={techmain}
            alt="no responding"
            style={{ height: "500px" }}
          />
        </div>
        <div>
          <nav aria-label="breadcrumb ">
            <ol className="breadcrumb pt-3">
              <li className="breadcrumb-item" style={{ fontSize: "small" }}>
                <a href="/">Home</a>
              </li>
              <li
                className="breadcrumb-item active"
                style={{ fontSize: "small" }}
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
          </nav>
        </div>

        <div>{/* <h1>{user?.userName}</h1> */}</div>
        <div className="col-12 d-flex">
          <div className="col-2">
            <div className=" col-12 side_menu">
              <div className="col-9">
                <div className="col mt-3">
                  <button
                    className="btn btn-dark rounded-0 w-100"
                    onClick={summary}
                  >
                    Summary
                  </button>
                </div>
                <div className="col mt-3">
                  <button
                    className="btn btn-dark rounded-0 w-100"
                    onClick={editProfile}
                  >
                    Edit Profile
                  </button>
                </div>
                <div className="col mt-3">
                  <button
                    className="btn btn-dark rounded-0 w-100"
                    onClick={Message}
                  >
                    Messages
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-10 text-muted">
            <div className="row mt-3">
              <h4>Add New Package</h4>
            </div>
            <div className="row mb-3 mt-3">
              <div className="col-3 ">
                <small>
                  <h6>Title</h6>
                </small>
              </div>
              <div className="col-8">
                <input
                  className="form-control form-control-sm"
                  value={dashboardValue.packageTitle}
                  name="packageTitle"
                  onChange={(e)=>{dispatchValue({packageTitle:e.target.value,type:"package"})}}
                  type="text"
                  aria-label=".form-control-sm example"
                />
                <div style={{ display: "none", color: "red" }} id="error">
                  {" "}
                  <small>
                    <p> Please fill the Credentials</p>{" "}
                  </small>{" "}
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-3 ">
                <small>
                  <h6>Price</h6>
                </small>
              </div>
              <div className="col-8 ">
                <input
                  className="form-control form-control-sm"
                  name="packagePrice"
                  value={dashboardValue.packagePrice}
                  
                  onChange={(e)=>{dispatchValue({packagePrice:e.target.value,type:"package"})}}
                  type="number"
                  aria-label=".form-control-sm example"
                />
                <div style={{ display: "none", color: "red" }} id="error1">
                  {" "}
                  <small>
                    <p> Please fill the Credentials</p>{" "}
                  </small>{" "}
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-3 ">
                <small>
                  <h6>Description</h6>
                </small>
              </div>
              <div className="col-8 ">
                {" "}
                <textarea
                  className="form-control"
                  name="packageDes"
                  value={dashboardValue.packageDes}
                  
                  onChange={(e)=>{dispatchValue({packageDes:e.target.value,type:"package"})}}
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                ></textarea>
                <div style={{ display: "none", color: "red" }} id="error2">
                  {" "}
                  <small>
                    <p> Please fill the Credentials</p>{" "}
                  </small>{" "}
                </div>
              </div>
            </div>

            <div className="col-12 mt-5 text-muted">
              <div className="row mt-3">
                <h5>Add Package Attributes</h5>
              </div>
              <div className="row mb-3 mt-3">
                <small>
                  <select value={attribute.attributeTitle} onChange={(e)=>{onChange({attributeTitle:e.target.value})}}  name="attributeTitle" className="btn btn-secondary btn-sm mt-2"> 
                
                  {packages.map((item) => {
                    
                    return (
                      
                        <option key={item.attribute_id} value={item.attribute_name}>{item.attribute_name}</option> 
                          
                        
                      
                    );
                  })}
                

                </select> 
  </small>
              </div>

             

              <div className="row mb-3">
                <div className="col-3 ">
                  <small>
                    <h6>Value</h6>
                  </small>
                  
                </div>
                <div className="col-8 ">
                  <input
                    className="form-control form-control-sm"
                    value={attribute.attributeValue}
                    name="attributeValue"
                    onChange={(e)=>{
                    onChange({attributeValue:e.target.value}); 
                    }}
                    aria-label=".form-control-sm example"
                  />

                </div>
                
              </div>
              


              <div className="col-11 justify-content-end d-flex">
                <button
                  className=" btn btn-secondary  rounded-pill"
                  onClick={()=>{dispatchValue({...attribute,type:"attribute"})
                  setAttribute({
                    attributeId:"",
                    attributeTitle:"",
                    attributeValue:""
                  })}}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="col-11 mt-5">
              <table className="table table-bordered text-muted text-center">
                <thead>
                  <tr>
                    <th scope="col">Attribute</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody className="border">
                {dashboardValue?.attribute.map((item) => {
                    return (
                      <tr key={item.attribute_id}>
                        <td>{item.attributeTitle}</td>
                        <td>{item.attributeValue}</td> 
                          
                        
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
