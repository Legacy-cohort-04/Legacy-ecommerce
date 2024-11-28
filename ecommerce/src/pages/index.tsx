import React from 'react'
import { useRouter } from 'next/navigation'


const index = () => {
const navi = useRouter()
  return (
    <div onClick={()=> navi.push("/profile/profile")}>salm</div>
  )
}

export default index