export default function DeadlineCard({deadlines}) {

  

  return (
    <div className="bg-white rounded-3xl shadow p-6">

      <h2 className="text-2xl font-bold mb-5">

        Upcoming Deadlines

      </h2>

      <div className="space-y-4">
        {
!deadlines?.length && (

<p className="text-gray-500">
No upcoming deadlines
</p>

)
}

        {deadlines?.map((item, index) => (

          <div
            key={index}
className="bg-slate-100 rounded-xl p-4 hover:shadow transition"          >

            {item}

          </div>

        ))}

      </div>

    </div>
  );
}