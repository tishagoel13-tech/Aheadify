import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function TaskCard({task}) {


async function toggleTask(){

    try{

        const ref = doc(
            db,
            "tasks",
            task.id
        );


        await updateDoc(ref,{

            completed: !task.completed

        });

    }

    catch(err){

        console.log(err);

    }

}


return (

<div className="bg-white p-5 rounded-2xl shadow">


<div className="flex items-center gap-3">


<input

type="checkbox"
className="cursor-pointer w-5 h-5"
checked={task.completed}

onChange={toggleTask}

/>


<h2 className={`text-xl font-semibold ${
    task.completed 
    ? "line-through text-gray-400"
    : ""
}`}>

{task.title}

</h2>


</div>


<p className="text-gray-500 mt-2">

{task.day}

</p>


</div>

);

}