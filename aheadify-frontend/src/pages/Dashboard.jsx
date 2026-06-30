import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import AISchedule from "../components/AISchedule";
import RescueCard from "../components/RescueCard";
import DeadlineCard from "../components/DeadlineCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";

import { db } from "../firebase";
export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || {};
    useEffect(() => {

        async function fetchTasks() {

            const q = query(
                collection(db, "tasks"),
                where("uid", "==", user.uid)
            );


            const snapshot = await getDocs(q);


            const data = snapshot.docs.map(doc => ({

                id: doc.id,

                ...doc.data()

            }));


            setTasks(data);

        }


        fetchTasks();


    }, []);
    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1">

                <Navbar />

                <div className="p-8">

                    {/* Welcome */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800">
                            Welcome back 👋
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Here's your productivity overview for today.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <StatsCard
                            title="Total Tasks"
                            value={tasks.length}
                            color="bg-indigo-500"
                        />

                        <StatsCard
                            title="Completed"
                            value={
                                tasks.filter(
                                    (task) => task.completed
                                ).length
                            }
                            color="bg-emerald-500"
                        />

                        <StatsCard
                            title="Upcoming"
                            value={
                                tasks.filter(
                                    (task) => !task.completed
                                ).length
                            }
                            color="bg-amber-500"
                        />

                        <StatsCard
                            title="Rescue Alerts"
                            value="2"
                            color="bg-red-500"
                        />

                    </div>

                    {/* Placeholder Sections */}
                    <div className="grid lg:grid-cols-3 gap-6 mt-8">

                        <div className="lg:col-span-2 space-y-5">

                            {
                                tasks.map((task) => (

                                    <TaskCard

key={task.id}

task={task}

/>

                                ))
                            }

                            <RescueCard

message={
tasks.filter(
task=>!task.completed
).length > 0

?
"You have unfinished tasks. Let AI create a recovery plan."

:

"All tasks completed 🎉"

}

onClick={()=>navigate("/rescue")}

/>

                        </div>

                        <div className="space-y-5">

                            <AISchedule schedule={tasks}/>

                            <DeadlineCard

deadlines={
    tasks.map(
        task =>
        `${task.title} • ${task.day}`
    )
}

/>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}