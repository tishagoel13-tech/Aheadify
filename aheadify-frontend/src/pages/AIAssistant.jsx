import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";


export default function AIAssistant(){

    const [prompt,setPrompt] = useState("");

    const [response,setResponse] = useState("");

    const [loading,setLoading] = useState(false);



    async function askAI(){

        if(!prompt) return;

        setResponse("");

        setLoading(true);


        try{


            const res = await api.post(
    "/assistant",
    {
        question: prompt
    }
);


            setResponse(
    res.data.response
);


        }


        catch(err){

            console.log(err);

            setResponse(
                "AI connection failed"
            );

        }


        setLoading(false);

    }



    return(

        <div className="min-h-screen bg-slate-100 flex">


            <Sidebar/>


            <div className="flex-1">


                <Navbar/>


                <div className="p-10">


                    <h1 className="text-4xl font-bold mb-6">

                        🤖 AI Assistant

                    </h1>



                    <textarea

                    className="w-full h-40 p-5 rounded-xl border"

                    placeholder="Ask Gemini anything..."

                    value={prompt}

                    onChange={
                        (e)=>setPrompt(e.target.value)
                    }

                    />



                    <button

onClick={askAI}

disabled={loading}

className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-xl disabled:bg-gray-400"

>

                    {
                        loading
                        ?
                        "Thinking..."
                        :
                        "Ask Gemini"
                    }


                    </button>



                    {response &&

                    <div className="mt-8 bg-white p-6 rounded-2xl shadow">


                        <h2 className="text-2xl font-bold mb-4">

                        Gemini Response

                        </h2>



                        <pre className="whitespace-pre-wrap">

                        {response}

                        </pre>


                    </div>

                    }



                </div>


            </div>


        </div>


    )

}