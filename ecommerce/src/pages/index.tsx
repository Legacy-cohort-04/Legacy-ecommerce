import React from 'react'
import { useRouter } from 'next/navigation'

const index = () => {
const navi = useRouter()
  return (
    <div onClick={()=> navi.push("/home") } >salem</div>
  )
}

export default index