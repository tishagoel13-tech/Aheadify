import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function login() {
        setLoading(true);

        try {

            console.log("Opening Google Popup...");

            const result = await signInWithPopup(auth, provider);

            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            navigate("/dashboard");

        }

        catch (err) {

            console.error(err);
            alert(err.message);

        }

        finally{

setLoading(false);

}

    }

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-100">

            <div className="bg-white p-10 rounded-2xl shadow-lg text-center">

                <h1 className="text-4xl font-bold mb-6">

                    Aheadify 🚀

                </h1>

                <button

                    onClick={login}

                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl"

                >

                    {
loading
?
"Connecting..."
:
"Continue with Google"
}

                </button>

            </div>

        </div>

    );

}