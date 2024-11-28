import React from 'react'
import { useRouter } from 'next/navigation'


const index = () => {
const navi = useRouter()
  return (
<<<<<<< HEAD
    <div onClick={()=> navi.push("/Home/home") } >salem</div>
=======
    <div onClick={()=> navi.push("/profile/profile")}>salm</div>
>>>>>>> 7033b683f63cc2d0f382f8153f98d99463109c67
  )
}

export default index