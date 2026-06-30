import { Bell, Search } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function Navbar() {


const navigate = useNavigate();


const user =
JSON.parse(localStorage.getItem("user")) || {};



async function logout(){

try{

await signOut(auth);

localStorage.removeItem("user");

navigate("/");

}

catch(err){

console.log(err);

}

}



return (

<nav className="bg-white shadow px-8 py-4 flex justify-between items-center">


<div className="relative">


<Search

size={18}

className="absolute left-3 top-3 text-gray-400"

/>


<input

type="text"

placeholder="Search tasks..."

className="pl-10 pr-4 py-2 rounded-xl border outline-none w-80"

/>


</div>



<div className="flex items-center gap-5">


<Bell size={22}/>



<div className="flex items-center gap-3">


<img
src={user?.photoURL || "https://i.pravatar.cc/100"}
className="w-10 h-10 rounded-full"
/>


<div>


<p className="font-semibold">

{user?.displayName}

</p>


<button

onClick={logout}

className="text-sm text-red-500"

>

Logout

</button>


</div>


</div>


</div>


</nav>

)

}