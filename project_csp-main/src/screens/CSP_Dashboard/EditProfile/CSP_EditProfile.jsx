// import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {editProfileCSP} from '../../../redux/features/auth/authSlice'



import tech4 from '../../../resources/tech4.png'

const CSPeditProfile = () => {



    const {user}=useSelector(state=>state.auth)
    console.log(user)


    const [cspEditValue, setcspEditValue] = useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: user?.userEmail,    
      })

         const dispatch = useDispatch()

      
    //   useEffect(()=>{
    //     console.log(data?.state?.user)
    //     if(data?.state?.user){
    //         setcspEditValue(data.state.user)
    //         console.log('render');
    //     }

    //   },[data])


     

      
    const onChange = (e) => {
        console.log(cspEditValue);
  
        setcspEditValue((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }))
      }



      const submit =(e)=>{
        e.preventDefault();
        dispatch(editProfileCSP(cspEditValue))

            //    setResult(data)

               setcspEditValue( {
                firstName: '',
                lastName: '',
                phoneNo: '',
                
               })
           

      }





  return (
   <>

   <form>
   <div className="container rounded bg-white mt-5 mb-5"> 
    <div className="row justify-content-center">
       <div className="col-md-3 border-right">
         <div className="d-flex flex-column align-items-center text-center p-3 py-5">
             <img className="rounded-circle mt-5 img-fluid" src={tech4} alt='img' style={{width:'200px'}}/>
             <h2 className="font-weight-bold mt-3">{user?.userName}</h2>
             <span> </span></div>
              </div>
               <div className="col-md-5 border-right"> 
                   <div className="p-3 py-5"> 
                       <div className="d-flex justify-content-between align-items-center mb-3"> 
                           <h4 className="text-right">Profile Settings</h4>
                            </div>
                            


                             <div className="row mt-2"> 
                                 <div className="col-md-6">
                                     <label className="labels">Name</label>
                                     <input type="text" className="form-control" value={cspEditValue.firstName} name='firstName' onChange={onChange} placeholder="Name" />
                                     </div>
                                      <div className="col-md-6">
                                          <label className="labels">Surname</label>
                                          <input type="text" className="form-control" value={cspEditValue.lastName} name='lastName' onChange={onChange} placeholder="Surname" />
                                          </div>
                                           </div> <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <label className="labels">Contact Number</label>
                                                    <input type="number" className="form-control" value={cspEditValue.phoneNo} name='phoneNo' onChange={onChange} placeholder="Contact Number" />
                                                    </div>
                                                     {/* <div className="col-md-12 mt-3">
                                                         <label className="labels">Address</label>
                                                         <input type="text" className="form-control" value={cspEditValue.address} name='address' onChange={onChange} placeholder="Address" />
                                                         </div> */}
                                                          <div className="col-md-12 mt-3">
                                                              <label className="labels">Email</label>
                                                              <input type="email" disabled className="form-control" value={cspEditValue.email} name='email' placeholder={user?.userEmail} onChange={onChange} />
                                                              </div>
                                                              
                                                                   </div>
                                                                    {/* <div className="row mt-3"> 
                                                                        <div className="col-md-6">
                                                                            <label className="labels">Country</label>
                                                                            <input type="text" className="form-control" value={cspEditValue.country} name='country' onChange={onChange} placeholder="Country" />
                                                                            </div>
                                                                             <div className="col-md-6">
                                                                                 <label className="labels">State/Region</label>
                                                                                 <input type="text" className="form-control" value={cspEditValue.region} name='region' onChange={onChange} placeholder="State"/>
                                                                                 </div>
                                                                                  </div>   */}


                                                                                  <div className="mt-5 text-center">
                                                                                      <button className="btn btn-secondary profile-button" type="button" onClick={submit}>Save Profile</button>
                                                                                      </div>
                                                                                       </div>
                                                                                        </div>
                                                                                        
                                                                                                            </div>
</div>
</form>
   </>
  )
}

export default CSPeditProfile