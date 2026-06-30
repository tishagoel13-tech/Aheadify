import { Clock3 } from "lucide-react";


export default function AISchedule({schedule}) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Suggested Schedule
      </h2>

      <div className="space-y-5">

{
schedule?.length === 0 && (

<p className="text-gray-500">
No schedule available. Generate a plan first.
</p>

)
}


{schedule?.map((item, index) => (

          <div
            key={index}
            className="flex gap-4 items-center"
          >

            <div className="bg-indigo-100 p-3 rounded-xl">

              <Clock3
                size={20}
                className="text-indigo-600"
              />

            </div>

            <div>

              <p className="font-semibold">
                {item.title}
              </p>

              <p className="text-gray-500">
                {item.day}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}