import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function Settings() {


const navigate = useNavigate();


const user =
JSON.parse(localStorage.getItem("user")) || {};



async function logout(){


await signOut(auth);

localStorage.removeItem("user");

navigate("/login");


}



return (

<div className="min-h-screen bg-slate-100 flex">


<Sidebar/>


<div className="flex-1">


<Navbar/>


<div className="p-10">


<h1 className="text-4xl font-bold mb-8">

⚙️ Settings

</h1>



<div className="bg-white rounded-3xl shadow p-8">


<div className="flex items-center gap-5">


<img

src={
user.photoURL ||
"https://i.pravatar.cc/100"
}

className="w-20 h-20 rounded-full"

/>


<div>

<h2 className="text-2xl font-bold">

{user.displayName}

</h2>


<p className="text-gray-500">

{user.email}

</p>


</div>


</div>



<button

onClick={logout}

className="mt-8 bg-red-600 text-white px-6 py-3 rounded-xl"

>

Logout

</button>


</div>


</div>


</div>


</div>

)

}