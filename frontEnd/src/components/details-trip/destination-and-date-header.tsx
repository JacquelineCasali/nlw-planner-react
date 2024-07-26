import { CiCalendarDate } from "react-icons/ci";
import { RiMapPinLine } from "react-icons/ri";
import Button from "../button/button";
import { LuSettings2 } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { api } from "../../db/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  startsAt: string;
  endsAt: string;
  is_confirmed: boolean;
}

export default function DestinationAndDateHeader() {
  const { tripId } = useParams();

  const [data, setData] = useState<Trip | undefined>();
  useEffect(() => {
    api
      .get(`/trips/${tripId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [tripId]);
  console.log(data);

  // d igual a dia
  // LLL mes
  const displayedDate = data
    ? format(data.startsAt, "d' de 'LLL")
        .concat(" até ")
        .concat(format(data.endsAt, "d' de 'LLL"))
    : null;

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <RiMapPinLine size={20} className=" text-zinc-400" />
        <span className=" text-zinc-100">{data?.destination}</span>
      </div>

      <div className="flex items-center gap-5 ">
        <div className="flex items-center gap-2 ">
          <CiCalendarDate size={25} className=" text-zinc-400" />
          <span className=" text-zinc-100">{displayedDate}</span>
        </div>
        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="cinza">
          Alterar local/data
          <LuSettings2 />
        </Button>
      </div>
    </div>
  );
}
