import React from 'react';

const TodoItem = ({title,description,isCompleted,deleted,update,id}) => {
    return (
        <div className="todo">
            <div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <div>
                <input onChange={()=> update(id) } type="checkbox" checked={isCompleted} />
                <button onClick={()=> deleted(id)} className="btn">Delete</button>
            </div>
        </div>
    );
};

export default TodoItem;