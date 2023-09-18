import axios from 'axios'
import React, { useState } from 'react'

const AddPost = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const newObj = {
            title: title,
            content: content,
        }

        console.log(newObj);
        const res = axios.post('/api/newNote', newObj)
        .then(() => {
            alert('New note Added successfully')
        })

        setTitle("")
        setContent("")
        alert('Added successfully')

    }

    return (
        <div>
            <div className='flex w-1/2 m-auto p-5 justify-between   mt-5'>
                <form className='w-full flex flex-col  gap-5' onSubmit={handleSubmit}>
                    <div>
                        <label className='text-2xl'>Title</label>
                        <input type="text" onChange={e => setTitle(e.target.value)} value={title} placeholder='Title' className='w-full p-2 border border-black rounded-5 focus:shadow-lg outline-0' style={{borderRadius:"5px"}}/>
                    </div>
                    <div>
                        <label className='text-2xl'>Content</label>
                        <textarea type="text" onChange={e => setContent(e.target.value)} value={content} placeholder='Content'className='w-full p-2 border border-black  focus:shadow-lg outline-0' style={{borderRadius:"5px"}}  ></textarea>
                    </div>
                    <div>
                        <button type='submit' className='w-full text-xl bg-green-400 px-3 py-2 mt-3 rounded-lg'  >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPost