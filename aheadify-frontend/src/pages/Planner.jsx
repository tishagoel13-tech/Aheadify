import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { db } from "../firebase";
import CalendarButton from "../components/CalendarButton";
import {
    collection,
    addDoc
} from "firebase/firestore";
export default function Planner() {

    const [goal, setGoal] = useState("");
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState(null);
    const [saved, setSaved] = useState(false);
    const user = JSON.parse(localStorage.getItem("user")) || {};

    async function savePlan() {

        if(!user.uid){

        alert("Please login first");

        return;

    }

        if (!plan?.days?.length) {

            alert("Generate a plan first");

            return;

        }

        try {

            for (const day of plan.days) {

                for (const task of day.tasks) {

                    await addDoc(collection(db, "tasks"), {

                        uid: user.uid,

                        title: task,

                        day: day.day,

                        completed: false,

                        createdAt: new Date()

                    });

                }

            }

            alert("Plan Saved Successfully 🎉");
            setSaved(true);

        }

        catch (err) {

            console.log(err);

            alert("Failed to save tasks");

        }

    }

    async function generatePlan() {

        if (!goal) return;

        setLoading(true);

        try {

            const res = await api.post("/generate-plan", {
                goal,
            });

            setPlan(res.data);
            setSaved(false);

        } catch (err) {
            alert("Failed to generate AI Plan");
            console.log(err);
        }

        setLoading(false);
    }

    return (

        <div className="min-h-screen bg-slate-100 flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-10">

                    <h1 className="text-4xl font-bold mb-6">
                        AI Planner
                    </h1>

                    <textarea
                        className="w-full h-40 border rounded-xl p-5"
                        placeholder="Example: Build a React Flask AI Hackathon project in 4 days"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    />

                    <button
                        onClick={generatePlan}
                        className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-xl"
                    >
                        {loading ? "Generating..." : "Generate AI Plan"}
                    </button>

                    

                    <button

                    

                        onClick={savePlan}

                        disabled={saved}

                        className="ml-4 bg-emerald-600 text-white px-6 py-3 rounded-xl disabled:bg-gray-400"

                    >

                        {
                            saved
                                ?
                                "Plan Saved ✅"
                                :
                                "Save Plan"
                        }

                    </button>
                    <div className="mt-4">

                        <CalendarButton plan={plan} />

                    </div>

                    {plan && (

                        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

                            <h2 className="text-2xl font-bold mb-5">
                                AI Generated Plan
                            </h2>

                            {plan &&

                                <div className="mt-8 space-y-5">

                                    {plan.days.map((day, index) => (

                                        <div
                                            key={index}
                                            className="bg-white rounded-2xl shadow-lg p-6"
                                        >

                                            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                                                {day.day}
                                            </h2>

                                            <div className="space-y-3">

                                                {day.tasks.map((task, i) => (

                                                    <div
                                                        key={i}
                                                        className="flex items-center gap-3"
                                                    >

                                                        ✅

                                                        <p>{task}</p>

                                                    </div>

                                                ))}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            }

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}