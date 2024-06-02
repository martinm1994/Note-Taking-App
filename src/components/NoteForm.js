import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd'; 

const { TextArea } = Input;

const NoteForm = ({ addNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const storedTitle = localStorage.getItem('title');
        const storedContent = localStorage.getItem('content');

        if (storedTitle !== null) {
            setTitle(storedTitle || '');
        }
        if (storedContent !== null) {
            setContent(storedContent || '');
        }
    }, []);

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
    };

    const handleContentChange = (e) => {
        const value = e.target.value;
        setContent(value);
    };

    const onFinish = () => {
        const newNote = {
            id: Date.now(),
            title,
            content
        };
        addNote(newNote);
        setTitle('');
        setContent('');
    };

    return (
        <Form onFinish={onFinish} layout='vertical'>
            <Form.Item label='Title'>
                <Input value={title} onChange={handleTitleChange} />
            </Form.Item>
            <Form.Item label='Content'>
                <TextArea rows={4} value={content} onChange={handleContentChange} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Add note
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NoteForm;
