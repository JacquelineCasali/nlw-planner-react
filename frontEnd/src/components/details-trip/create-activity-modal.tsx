import { CiCalendarDate } from "react-icons/ci";
import { GoTag } from "react-icons/go";
import { RiCloseFill } from "react-icons/ri";
import Button from "../button/button";
import { FormEvent } from "react";
import { api } from "../../db/axios";
import { useParams } from "react-router-dom";

interface CreateAactivityModalProps {
    closeCreateActivityModal:()=>void
    
}
export default function CreateAactivityModal({closeCreateActivityModal}:CreateAactivityModalProps) {
  const { tripId } = useParams();
 async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const title=data.get('title')?.toString();
    const occurs_at=data.get('occurs_at')?.toString();
      await api.post(`/trips/${tripId}/activities`,{
      title,
      occurs_at
    })
    window.document.location.reload()
  }
  return (
   
   
   <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cadastrar Atividade</h2>

          <RiCloseFill
            onClick={closeCreateActivityModal}
            size={20}
            className="text-zinc-400 cursor-pointer"
          />
        </div>

        <p className="text-sm text-zinc-400 ">
          Todos convidados podem visualizar as atividades.
        </p>
      </div>

      <form onSubmit={createActivity} className="space-y-3">
        <div className=" h-14 px-3  flex  items-center  bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
          <GoTag size={20} className=" text-zinc-400 " />

          <input
            name="title"
            placeholder="Qual a sua atividade?"
            className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className=" flex-1 h-14 px-3 flex  items-center  bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            {/* flex-1 espaço desponivel */}
            <CiCalendarDate size={25} className=" text-zinc-400" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="20 de agosto"
              className=" bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none  "
            />
          </div>
        </div>
        <Button 
        type="submit"
        variant="green" size="full"> Salvar atividade</Button>
      </form>
    </div>
  </div>
  )
}
