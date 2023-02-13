import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showPackages } from "../../redux/features/packages/packagesSlice";
import { API, cx } from "../SearchBar/searchAPIkey";
import "./landingPage.css";

import maindigital from "../../resources/maindigital.jpg";
import tech from "../../resources/tech.jpg";
import tech2 from "../../resources/tech2.jpg";
import tech3 from "../../resources/tech3.jpg";
import tech4 from "../../resources/tech4.png";

export default function LandingPage() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { packages } = useSelector((state) => state.packages);


  const onchange = (e) => {
    setItem(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      let data = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${API}&cx=${cx}&q=${item}`
      );

      setResult(data);
      setItem("");
    } catch (error) {
      console.log(error);
    }
  };

  const closeWindow = () => {
    console.log("this is cloase");
    setResult("");
  };

  
  useEffect(() => {
    dispatch(showPackages());
   
  }, [dispatch]);

  const pkgDetails = (e) => {
    e.preventDefault();
    navigate("/package-details");
  };

  const filter = () => {
    console.log("logging");
    document.getElementById("btn-filter").style.display = "flex";
  };

  return (
    <>
      <div className="col-12 mt-0">
        <img
          className="img-fluid w-100"
          src={maindigital}
          alt=""
          style={{ height: "500px" }}
        />
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="col-md-12 ">
            <div className="row justify-content-center">
              <div className="row justify-content-center mt-5">
                <div className="col-6 Search_bar  ">
                  <form action="">
                    <div className="search">
                      <input
                        type="text"
                        htmlFor=""
                        className="form-control"
                        placeholder="Have a question? Ask Now"
                        value={item}
                        onChange={onchange}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-2 Filter_btn">
                  <button
                    className="btn btn-dark  w-100 rounded-5"
                    onClick={submit}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Search
                  </button>
                </div>

                <div className="col-2 col-sm Search_btn">
                  <button
                    className="btn btn-dark w-100 rounded-5"
                    onClick={filter}
                  >
                    Add Filter
                  </button>
                </div>

                {/* {Add Filter Button Results} */}

                <div
                  className="form-check text-center mt-4 filter border"
                  id="btn-filter"
                  style={{ width: "600px", display: "none" }}
                >
                  <div style={{ width: "30px" }}>
                    <div className="col mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">Processor</label>
                    </div>
                    <div className="col mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">Memory</label>
                    </div>
                    <div className="col mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">Disk</label>
                    </div>
                  </div>
                  <div style={{ width: "30px" }}>
                    <div className="col mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">Bandwidth</label>
                    </div>
                    <div className="col mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">Uplink</label>
                    </div>
                    <div className="col mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">Addon</label>
                    </div>
                  </div>
                  <div style={{ width: "30px" }}>
                    <div className="col mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">Basic</label>
                    </div>
                    <div className="col mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">DataCenter</label>
                    </div>
                    <div className="col mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">Mobility</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Search Window */}
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl">
                  <div className="modal-content w-100">
                    <div className="modal-header">
                      <button
                        type="button"
                        onClick={closeWindow}
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body w-100">
                      {/* {Search Results} */}


                      {result?.data?.items.map((item, index) => {
                        return (
                          <div>
                            <div className="col-12 border-bottom pt-3"key={index}>
                              <a href={item.displayLink}>{item.displayLink}</a>
                              <a href={item.formattedUrl}>
                                <h4 style={{ color: "#1e57bf" }}>
                                  {item.title}
                                </h4>
                              </a>
                              <p>
                                <small>{item.snippet}</small>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-9 mt-5">
                <div className="row ">
                  <div className="col">
                    <img
                      className="img-fluid"
                      src={tech}
                      alt=""
                      style={{ width: "250" }}
                    />
                  </div>
                  <div className="col text-center">
                    <img
                      className="img-fluid"
                      src={tech2}
                      alt=""
                      style={{ width: "250" }}
                    />
                  </div>
                  <div className="col text-end">
                    <img
                      className="img-fluid"
                      src={tech3}
                      alt=""
                      style={{ width: "250" }}
                    />
                  </div>
                </div>
              </div>

              <div className=" col-9  package_heading mt-5 mb-3">
                <h3>Featured Packages</h3>
              </div>

              <div className="col-10  featured_packages">
                <div className="row">
                  {/* {Dynamically showing Feature Package  Details} */}
                  {packages?.map((items) => {
                    return (
                      <>
                        {/* {Dynamic Featued Package Details} */}
                        <div className="col-3 pe-0 mt-4" >
                          <div 
                            className="card text-center border"
                            onClick={pkgDetails}
                            style={{ width: "15rem" }}
                          >
                            <div className="hexagon">
                              <div className="shape">
                                <img
                                  className="img-fluid "
                                  src={tech4}
                                  alt="nopic"
                                />
                              </div>
                            </div>
                            <div className="card-body"key={items.pack_id}>
                              <h5 className="card-title">{items.pack_title}</h5>

                              <a href="/" onClick={pkgDetails}>
                                {items.pack_description}
                              </a>
                              <br />
                              <p style={{ color: "orange" }}>
                                <small>${items.pack_price}</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className=" col-9 Rank_provider_heading mt-5 mb-3">
                <h3>Top Rank Provider</h3>
              </div>

              <div className="col-10  top_ranks">
                <div className="row packages_cards card">
                  {/* {1st Rank Provider Details} */}

                  <div className="col pe-0">
                    <div
                      className=" card border text-center m-0 "
                      style={{ width: "15rem" }}
                      onClick={pkgDetails}
                    >
                      <div className="hexagon">
                        <div className="shape">
                          <img className="img-fluid " src={tech4} alt="nopic" />
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">Package</h5>

                        <a href="/" onClick={pkgDetails}>
                          Add to Package
                        </a>
                        <br />
                        <p style={{ color: "orange" }}>
                          <small>$1000</small>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* {2nd Rank Provider Details} */}
                  {/* <div className="col pe-0">
                                        <div className=" card text-center m-0 " style={{ width: "15rem" }}>
                                            <div className="hexagon">
                                                <div className="shape">
                                                    <img className="img-fluid " src={tech4} alt="nopic" />
                                                </div>
                                                </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{items.title}</h5>

                                                <a href="/">{items.des}</a><br />
                                                <p style={{ color: "orange" }}><small>${items.price}</small></p>
                                            </div>
                                        </div>
                                                       </div> */}

                  {/* {3rd Rank Provider Details} */}
                  {/* <div className="col pe-0">
                                        <div className=" card text-center m-0 " style={{ width: "15rem" }}>
                                            <div className="hexagon">
                                                <div className="shape">
                                                    <img className="img-fluid " src={tech4} alt="nopic" />
                                                </div>
                                                </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{items.title}</h5>

                                                <a href="/">{items.des}</a><br />
                                                <p style={{ color: "orange" }}><small>${items.price}</small></p>
                                            </div>
                                        </div>
                                                       </div> */}

                  {/* {4th Rank Provider Details} */}
                  {/* <div className="col pe-0">
                                        <div className=" card text-center m-0 " style={{ width: "15rem" }}>
                                            <div className="hexagon">
                                                <div className="shape">
                                                    <img className="img-fluid " src={tech4} alt="nopic" />
                                                </div>
                                                </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{items.title}</h5>

                                                <a href="/">{items.des}</a><br />
                                                <p style={{ color: "orange" }}><small>${items.price}</small></p>
                                            </div>
                                        </div>
                                                       </div>  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
