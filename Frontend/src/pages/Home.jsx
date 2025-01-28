import {useEffect, useState} from "react";
import axios from "axios";
import {baseApiUrl} from "../main.jsx";
import {toast} from "react-hot-toast";
import TodoItem from "../components/TodoItem.jsx";

const Home = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const addTask = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${baseApiUrl}/tasks/new`, {
                title,
                description,
            }, {
                headers:{
                    "Content-Type": "application/json",
                },
                withCredentials:true,
            })
            toast.success(response.data.message);
            setRefreshing((prevState)=> !prevState);
            setTitle("");
            setDescription("");
        }catch(error){
            toast.error(error.response.data.message);
        }
    }

    const updateTask = (id)=>{
        axios.put(`${baseApiUrl}/tasks/${id}`,{
            withCredentials: true
        }).then((res)=>{
            toast.success(res.data.message);
            setRefreshing((prevState)=> !prevState);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }

    const deleteTask =  (id)=>{
        axios.delete(`${baseApiUrl}/tasks/${id}`,{
            withCredentials: true
        }).then((res)=>{
            toast.success(res.data.message);
            setRefreshing((prevState)=> !prevState);
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }

    useEffect( () => {
         axios.get(`${baseApiUrl}/tasks/all`,{
            withCredentials: true
        }).then((res)=>{
             setTasks(res.data.tasks);
         }).catch((error) => {
             toast.error(error.response.data.message);
         })
    }, [refreshing]);
    return (
        <div className="container">
            <div className="login">
                <section>
                    <form onSubmit={addTask}>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text"
                               placeholder="Title"/>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text"
                               placeholder="Description"/>
                        <button type="submit">Add</button>
                    </form>
                </section>
            </div>
            <div className="todosContainer">
                {
                    tasks.map((task)=>
                        <TodoItem key={task._id} title={task.title} description={task.description} isCompleted={task.isComplete} deleted={deleteTask} update={updateTask} id={task._id}/>
                    )
                }
            </div>
        </div>
    );
};

export default Home;