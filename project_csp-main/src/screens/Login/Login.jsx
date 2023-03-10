import { useState,useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {loginUser} from '../../redux/features/auth/authSlice'
 


export const Login = () => {

  //Initial State for input values
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  //getting data from redux store
  const {user,isSuccess,isLoading,isError,message}=useSelector(state=>state.auth)
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
useEffect(() => {
  
  if(isError || message){
   if(message){
    document.getElementById('error3').style.display='block'
   }
  }


  if(isSuccess || user){
    if(user?.getUserType === 'service_provider'){
      navigate('/csp-dashboard')
    }
    if(user?.getUserType === 'service_user'){
navigate('/user-dashboard')
    }

 }
}, [isError, isLoading, isSuccess, message, navigate,user])


  
  const onChange = (e) => {
    setLoginValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };


  
  const submit = (e) =>{
    e.preventDefault();

    dispatch(loginUser(loginValue))


    setLoginValue({
      email: "",
      password: "",
    });

    

    
  

      


  }


    return (
     !(user) && <><form action="post" onSubmit={submit}>
          <div className="container-fluid">
            <div className="col-12">
              
              <div className="row border justify-content-center w-100">
                <div className="col-md-5 col-12  align-content-center">
                  <div className="col-md-12  ">
                    <div className="row justify-content-center">
                      <div className="col-md-12 text-center mt-5">
                        <h4 className="fw-bold">
                          <small>Login</small>
                        </h4>
                      </div>
                      <hr />

                      {/* main form  */}

                      <div className="col-md-10 email_part mt-4">
                        <div className="col mb-3 ">
                          <label htmlFor="l-name-Input">
                            <small>E-mail</small>
                          </label>
                          <input
                            className="form-control form-control-sm rounded-0"
                            value={loginValue.email}
                            name="email"
                            onChange={onChange}
                            type="email"
                            
                            placeholder="E-mail"
                            aria-label=".form-control-sm example"
                          />
                             
                        </div>
                        <div className="col mb-3 ">
                          <label htmlFor="l-name-Input">
                            <small>Password</small>
                          </label>
                          <input
                            className="form-control form-control-sm rounded-0"
                            value={loginValue.password}
                            name="password"
                            autoComplete="off"
                            onChange={onChange}
                            type="password"
                            
                            placeholder="Password"
                            aria-label=".form-control-sm example"
                          />
                          
                        </div>


                        <div style={{display:'none',color:'red'}} id='error3'> <small><p>{message}</p>
                                                </small> </div>
                       


                      </div>
                      {/*  main form */}

    


                      {/*  bottom buttons  */}
                      <div className="col-md-10 shipping_btns">
                        <div className="row pt-3 pb-5">
                          <div className="col ">
                            <a
                              href="/"
                              type="button "
                              className="btn btn-transparent p-0"
                              style={{ color: "red" }}
                            >
                              Return to Home
                            </a>
                          </div>
                          <div className="col text-end">
                            <button
                              type="submit"
                              className="btn btn-dark btn-sm rounded-5"
                            >
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* bottom buttons  */}
                  </div>
                </div>
                {/* payment Form  */}
              </div>
            </div>
          </div>
        </form>
      </>
    );
  };

