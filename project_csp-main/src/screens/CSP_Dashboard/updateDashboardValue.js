const updateDashboardValue=(prev,next)=>{
    switch(next.type){
      case 'package':
        {
          const {type,...others}=next
          const value={...prev,...others}
          return value
  
        }
  
      case 'attribute':
        {
          const {type,...others}=next
          
          const value={...prev,["attribute"]:([...prev.attribute,others])}
          return value
        }
  
      default:
        return
  
    }
  
  
  }
  export default updateDashboardValue