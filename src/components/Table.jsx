import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Table = ({ tasks, onDelete, onEdit }) => {
    const [search, setSearch] = useState("");

    // Filter tasks based on search text
    const filteredTasks = tasks.filter((task) =>
        Object.values(task)
            .join(" ") // join all fields
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <section className="mt-14">
            {/* Search Bar */}
            <div className="flex justify-center w-full">
                <div className="border border-black w-3/4 bg-white dark:bg-gray-800 transition-colors duration-300">
                    <div className="flex items-center justify-between p-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full outline-none bg-white text-black 
              dark:bg-gray-800 dark:text-white 
              transition-colors duration-300"
                        />
                        <FaSearch
                            className="text-xl text-gray-500 dark:text-gray-300 
              transition-colors duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* Task Table */}
            <table className="w-full mt-12 border">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                        <th className="border border-gray-300 p-2">Task Name</th>
                        <th className="border border-gray-300 p-2">Task Status</th>
                        <th className="border border-gray-300 p-2">Task Priority</th>
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="text-center p-4 text-gray-500 dark:text-gray-400"
                            >
                                No tasks found.
                            </td>
                        </tr>
                    ) : (
                        filteredTasks.map((task) => (
                            <tr key={task.id} className="text-center">
                                <td className="border border-gray-300 p-2">{task.name}</td>
                                <td className="border border-gray-300 p-2">{task.status}</td>
                                <td className="border border-gray-300 p-2">{task.priority}</td>
                                <td className="border border-gray-300 p-2">{task.date}</td>
                                <td className="border border-gray-300 p-2 space-x-2">
                                    <button
                                        onClick={() => onEdit(task)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(task.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default Table;
