import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 

export const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState("");
    const username = "ddelgado";

    useEffect(() => {
        fetch(`https://playground.4geeks.com/todo/users/${username}`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error al obtener tareas");
                return response.json();
            })
            .then((data) => setTodos(data.todos || []))
            .catch((error) => console.error("Error:\n", error));
    }, []);

    //Agregamos una nueva Tarea
    
    const handleAgregarTarea = () => {
        if (newTask.trim() === "") return;

        const newTodo = {
            label: newTask,
            is_done: false,
        };

        fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("No se pudo crear la tarea");
                return res.json();
            })
            .then(() =>
                fetch(`https://playground.4geeks.com/todo/users/${username}`)
            )
            .then((res) => res.json())
            .then((data) => {
                setTodos(data.todos || []);
                setNewTask("");
            })
            .catch((err) => console.error("Error al crear tarea:", err));
    };

    const handleDelete = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al eliminar");
                return fetch(
                    `https://playground.4geeks.com/todo/users/${username}`
                );
            })
            .then((res) => res.json())
            .then((data) => setTodos(data.todos || []))
            .catch((err) => console.error("Error al eliminar tarea:", err));
    };

    return (
        <div
            className="container py-5"
            style={{ backgroundColor: "#367092d5", minHeight: "100vh" }}
        >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h2 className="text-center mb-4 text-primary">
                                Lista de Tareas con Fetch y React
                            </h2>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Escriba una nueva tarea"
                                    value={newTask}
                                    onChange={(e) =>
                                        setNewTask(e.target.value)
                                    }
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAgregarTarea}
                                >
                                    Añadir
                                </button>
                            </div>

                            {todos.length === 0 ? (
                                <p className="text-center text-muted">
                                    No tienes tareas
                                </p>
                            ) : (
                                <ul className="list-group">
                                    {todos.map((item, index) => (
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                            key={item.id || index}
                                        >
                                            <span>{item.label}</span>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
