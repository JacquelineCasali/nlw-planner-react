// import { useEffect, useState } from "react";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { api } from "../../db/axios";
// import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../db/axios";
import { format } from "date-fns";
import { FaRegCheckCircle } from "react-icons/fa";

interface Activity {
  id: string;
  title: string;
  occursAt: string;
}

export default function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/activities`)
      .then((response) => setActivities(response.data));
  }, [tripId]);
  console.log(activities);

  return (
    <div className="space-y-8">
      {activities.length > 0 ? (
        <div className="space-y-5">
          {activities.map((category) => {
            return (
              <div key={category.occursAt} className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                  <span className="font-semibold text-xl text-zinc-300">
                    Dia {format(category.occursAt, "d")}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {format(category.occursAt, "EEEE", { locale: ptBR })}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <FaRegCheckCircle className="text-lime-300" size={20} />
                    <span className="text-zinc-100">{category.title}</span>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {" "}
                      {format(category.occursAt, "HH:mm")}h
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-zinc-500 text-sm">
          Nenhuma atividade cadastrada nessa data.
        </p>
      )}
    </div>
  );
}
