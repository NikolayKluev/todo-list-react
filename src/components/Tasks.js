import { useMemo } from "react";

const ToDo = ({ todos }) => {

    const renderedTodos = useMemo(() => {
        return todos.map((todo, index) => (
            <div key={index}>
                <h3>{todo.name}</h3>
                <p>{todo.description}</p>
                <p>{todo.priority}</p>
                <button>Удалить</button>
            </div>
        ));
    }, [todos]);

    return <div className="todo-list">{renderedTodos}</div>;

}

export default ToDo;