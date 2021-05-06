// import fetch from 'isomorphic-unfetch';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';


const Note = ({ note }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting])

  const open = () => setIsConfirm(true);
  const close = () => setIsConfirm(false);

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "Delete"
      });
      router.push("/")
    } catch (error) {
      console.log(error);
    }

  }

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  }

  return (
    <div className="note-container">
      {isDeleting
        ? <Loader active />
        :
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color='red' onClick={open}>Delete</Button>
        </>
      }
      <Confirm
        open={isConfirm}
        onCancel={close}
        onConfirm={handleDelete}
      />
    </div>
  )
}

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return {
    note: data
  }
}

export default Note;
