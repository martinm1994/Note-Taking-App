import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

const { Header, Content } = Layout;

function App() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Add currentPage state
  const [notesPerPage] = useState(5); // Add notesPerPage state

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    // Persist notes data in local storage
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>Notes</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Breadcrumb style={{ padding: '0 50px' }} items={[
          { text: 'Home', href: '/' },
          { text: 'Notes', href: '/notes' },
        ]} />

        <div className='site-layout-content'>
          <NoteForm addNote={addNote} />
          <NoteList 
            notes={notes}
            deleteNote={deleteNote}
            currentPage={currentPage}
            notesPerPage={notesPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </Content>
    </Layout>
  )
}

export default App;