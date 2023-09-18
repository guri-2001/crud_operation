import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
        <div className='flex w-1/2 m-auto p-5 justify-between bg-slate-700 text-white text-2xl mt-5'>
            <Link href={"/"}>Home</Link>
            <Link href={"/addPost"}>Add Post</Link>
        </div>
    </div>
  )
}

export default Header