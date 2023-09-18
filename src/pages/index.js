import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';


export async function getStaticProps() {
  const mongoose = require('mongoose');
  const Note = require('../../models/Note');

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  }).then(() => { console.log("DB connected") });

  const notes = await Note.find().sort({ createdAt: 'desc' });
  console.log(notes);

  return {
    props: {
      notes: JSON.parse(JSON.stringify(notes))
    }
  }
}

export default function Home({ notes }) {

  const [visibility, setVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState('');

  const router = useRouter()


  const editForm = (title, content, noteId) => {
    setVisibility(visibility => !visibility)
    setTitle(title)
    setContent(content)
    setNoteId(noteId)
  }

  const updateNote = async (noteId) => {
    const noteObj = {
      title: title,
      content: content,
    }
    console.log(noteObj);
    await axios.put(`/api/updateNote?id=${noteId}`, noteObj)
      .then(() => {
        window.location.reload(false);
      })
  }

  const deleteNote = async (noteId) => {
    axios.delete(`/api/deleteNote?id=${noteId}`).then(() => {
      router.refresh()
    })
  }

  return (
    <>
      <div>
        <div >
          <ul >
            {
              notes.map((note) => {
                return (
                  <>
                    <div key={note._id} className='flex  w-1/2 m-auto bg-slate-50	 hover:shadow-xl transition-all py-2 px-3 rounded-sm justify-between text-2xl mt-8 mb-5'>
                      <div className='flex flex-col gap-3'>
                        <h2 className='text-3xl'>{note.title}</h2>
                        <p className='text-base'>
                          {note.content}
                        </p>
                      </div>
                      <div className='flex gap-4 mt-5 items-start'>
                        <button onClick={(title, content, noteId) => editForm(note.title, note.content, note._id)} className='hover:text-green-600' title='Edit' ><FiEdit /></   button>
                        <button onClick={() => deleteNote(note._id)} className='hover:text-rose-600' title='Delete'><MdDelete /></button>
                      </div>
                    </div>
                  </>
                )
              })
            }
            {
              visibility && <div>
                <h1 className='text-3xl text-center mb-5'>Update Notes</h1>
                <div className='w-1/2 m-auto bg-gray-700		p-4 text-white rounded-lg'>
                  <div>
                    <label>Title</label>
                    <input type='text' placeholder='Title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-2 text-black' />
                  </div>
                  <div>
                    <label>Content</label>
                    <textarea onChange={(e) => setContent(e.target.value)} type='text' placeholder='Content' id='content' value={content} className='w-full p-2 text-black'></textarea>
                  </div>
                  <div className='flex gap-3 mt-4 '>
                    <button type='submit' onClick={() => updateNote(noteId)} className='bg-green-500 p-1 px-3 rounded-lg text-black'>Update</button>
                    <button onClick={() => setVisibility(visibility => !visibility)} className='bg-rose-500 p-1 px-3 rounded-lg text-black'>Cancel</button>
                  </div>
                </div>
              </div>
            }
          </ul>
        </div>
      </div>
    </>
  )
}
