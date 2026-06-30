import {useState} from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {db} from "../firebase";

import {
collection,
query,
where,
getDocs
} from "firebase/firestore";


export default function Rescue(){

const [message,setMessage]=useState("");

const [loading,setLoading] = useState(false);

async function generateRescue(){
setLoading(true);

const user =
JSON.parse(localStorage.getItem("user")) || {};



const q=query(

collection(db,"tasks"),

where("uid","==",user.uid),

where("completed","==",false)

);



const snapshot =
await getDocs(q);



const tasks =
snapshot.docs.map(doc=>doc.data().title);

if(tasks.length===0){

setMessage(
"🎉 You are on track! No rescue needed."
);

return;

}

const res =
await api.post("/rescue",{

tasks

});



setMessage(res.data.rescue);


setLoading(false);
}



return(

<div className="min-h-screen bg-slate-100 flex">


<Sidebar/>


<div className="flex-1">

<Navbar/>


<div className="p-10">


<h1 className="text-4xl font-bold">

🚨 AI Rescue Mode

</h1>



<p className="mt-3 text-gray-500">

Behind schedule? Let AI fix your plan.

</p>



<button

onClick={generateRescue}

className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl"

>

{
loading
?
"Analyzing..."
:
"Generate Rescue Plan"
}

</button>



{message &&

<div className="mt-8 bg-white p-6 rounded-2xl shadow">


<h2 className="text-2xl font-bold mb-4">

AI Advice

</h2>


<p className="whitespace-pre-wrap">

{message}

</p>


</div>

}


</div>


</div>


</div>


)

}