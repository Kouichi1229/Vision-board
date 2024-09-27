import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { FloatButton } from 'antd';
import { PictureOutlined, FileImageOutlined, FileTextOutlined, CloseOutlined } from '@ant-design/icons';
import '../styles/Board.css';

const Board = () => {
  const [items, setItems] = useState([]);
  const fileInputRef = useRef(null);
  
  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setItems([...items, { type: 'image', content: url, x: 0, y: 0 }]);
    }
  };

  const addNote = () => {
    const text = prompt('Enter note text:');
    if (text) {
      setItems([...items, { type: 'note', content: text, x: 0, y: 0 }]);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setItems([...items, { type: 'image', content: e.target.result, x: 0, y: 0 }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleDrag = (index, e, data) => {
    const newItems = [...items];
    newItems[index].x = data.x;
    newItems[index].y = data.y;
    setItems(newItems);
  };

  return (
    <div className="board">
      {items.map((item, index) => (
        <Draggable
          key={index}
          position={{x: item.x, y: item.y}}
          onStop={(e, data) => handleDrag(index, e, data)}
        >
          <div className="board-item">
            {item.type === 'image' ? (
              <img src={item.content} alt="Vision item" />
            ) : (
              <p>{item.content}</p>
            )}
            <button className="delete-button" onClick={() => deleteItem(index)}>
              <CloseOutlined />
            </button>
          </div>
        </Draggable>
      ))}
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<PictureOutlined />}
      >
        <FloatButton icon={<FileImageOutlined />} onClick={addImage} tooltip="Add Web Image" />
        <FloatButton icon={<FileImageOutlined />} onClick={triggerFileInput} tooltip="Upload Local Image" />
        <FloatButton icon={<FileTextOutlined />} onClick={addNote} tooltip="Add Note" />
      </FloatButton.Group>
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileUpload} 
        accept="image/*"
      />
    </div>
  );
};

export default Board;