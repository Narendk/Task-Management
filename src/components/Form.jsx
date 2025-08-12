import { useState, useEffect } from "react";

const Form = ({ onSubmit, initialData }) => {
    const [values, setValues] = useState({
        name: "",
        status: "InProgress",
        priority: "Low",
        date: "",
    });

    useEffect(() => {
        if (initialData) {
            setValues({
                name: initialData.name || "",
                status: initialData.status || "InProgress",
                priority: initialData.priority || "Low",
                date: initialData.date || "",
            });
        } else {
            // clear when switching to add mode
            setValues({ name: "", status: "InProgress", priority: "Low", date: "" });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // send plain data object to parent
        onSubmit(values);
    };

    return (
        <section className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="flex-col p-5 bg-white dark:bg-gray-800 shadow-2xl rounded-lg"
            >
                <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {initialData ? "Edit Task" : "Add Task"}
                </h1>

                <div className="flex flex-wrap">
                    <div className="m-3">
                        <label className="font-medium text-gray-800 dark:text-gray-200">
                            Task Name
                        </label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            className="border border-gray-400 outline-red-500 px-1 py-2 mt-1 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                            required
                        />
                    </div>

                    <div className="m-3">
                        <label className="font-medium text-gray-800 dark:text-gray-200">
                            Task Status
                        </label>
                        <br />
                        <select
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            className="border border-gray-400 text-center outline-red-500 px-12 py-2 mt-1 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                        >
                            <option>InProgress</option>
                            <option>Done</option>
                            <option>Cancelled</option>
                        </select>
                    </div>

                    <div className="m-3">
                        <label className="font-medium text-gray-800 dark:text-gray-200">
                            Task Priority
                        </label>
                        <br />
                        <select
                            name="priority"
                            value={values.priority}
                            onChange={handleChange}
                            className="border border-gray-400 text-center outline-red-500 px-14 py-2 mt-1 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                        >
                            <option>Low</option>
                            <option>Middle</option>
                            <option>High</option>
                        </select>
                    </div>

                    <div className="m-3">
                        <label className="font-medium text-gray-800 dark:text-gray-200">Date</label>
                        <br />
                        <input
                            name="date"
                            type="date"
                            value={values.date}
                            onChange={handleChange}
                            className="border border-gray-400 outline-red-500 px-6 py-2 mt-1 rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
                            required
                        />
                    </div>
                </div>

                <div className="m-3">
                    <button
                        type="submit"
                        className="bg-red-500 font-semibold rounded-lg px-12 py-2 text-white hover:bg-red-600 transition"
                    >
                        {initialData ? "Update Task" : "Add New Task"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
