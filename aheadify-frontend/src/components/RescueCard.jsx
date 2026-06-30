import { AlertTriangle } from "lucide-react";

export default function RescueCard({message,onClick}) {
  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-3xl p-6 shadow">

      <div className="flex justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Rescue Mode
          </h2>

          <p className="mt-3">

{message || 
"Generate your AI recovery plan"}

</p>

        </div>

        <AlertTriangle size={45} />

      </div>

      <button

onClick={onClick}

className="bg-white text-red-500 mt-6 px-5 py-3 rounded-xl font-semibold"

>

View Recovery Plan

</button>

    </div>
  );
}