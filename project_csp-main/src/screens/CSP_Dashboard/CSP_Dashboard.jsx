import { useState, useEffect } from "react";
import techmain from "../../resources/techmain.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cspDashboard,
  attributeList,
} from "../../redux/features/packages/packagesSlice";
import "../LandingPage/landingPage.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [dashboardValue, setdashboardValue] = useState({
    packageTitle: "",
    packageDes: "",
    packagePrice: "",
    attribute: [],
  });
  console.log(dashboardValue)
  const [attributeValu, setAttributeValue] = useState(
    {
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

  const onChange = (e) => {
    setdashboardValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  const onChang = (e) => {
    setAttributeValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  const addAttribute = (e) => {
    setAttributeValue((prev) => [...prev, {}]);
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(cspDashboard(dashboardValue));
    setdashboardValue({
      // packageTitle: '',
      // packageDes: '',
      // packagePrice: '',
    });

  };

  const addValueInState = () => {
    
   let prevArrState=[...dashboardValue.attribute,attributeValu]
    setdashboardValue((prev)=>({...prev,['attribute']:prevArrState}));
    setAttributeValue({
      attributeTitle:"",
      attributeValue:""
    })

  };

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
                  onChange={onChange}
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
                  value={dashboardValue.packagePrice}
                  name="packagePrice"
                  onChange={onChange}
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
                  value={dashboardValue.packageDes}
                  name="packageDes"
                  onChange={onChange}
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
                  <select value={attributeValu.attributeTitle} onChange={onChang}  name="attributeTitle" className="btn btn-secondary btn-sm mt-2"> 
    
                
                  {packages.map((item,i) => {
                    return (
                      <>
                        <option key={i} value={item.attribute_name}>{item.attribute_name}</option> 
                          
                        
                      </>
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
                    value={attributeValu.attributeValue}
                    name="attributeValue"
                    onChange={onChang}
                    aria-label=".form-control-sm example"
                  />

                </div>
                
              </div>
              


              <div className="col-11 justify-content-end d-flex">
                <button
                  className=" btn btn-secondary  rounded-pill"
                  onClick={addValueInState}
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
                {dashboardValue?.attribute.map((item,i) => {
                    return (
                      <tr key={i}>
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
