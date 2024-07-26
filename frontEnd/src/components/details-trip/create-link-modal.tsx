
import { GoTag } from "react-icons/go";
import { IoLinkSharp } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";
import Button from "../button/button";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";
import { api } from "../../db/axios";

interface CreateLinkModalProps {
  closeCreateLinkModal:()=>void

}
export default function CreateLinkModal({closeCreateLinkModal}:CreateLinkModalProps) {
  
  const { tripId } = useParams();
 async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const title=data.get('title')?.toString();
    const url=data.get('url')?.toString();
      await api.post(`/trips/${tripId}/links`,{
      title,
      url
    })
    window.document.location.reload()
  }
  
  
  return (
 
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cadastrar link</h2>
    
          <RiCloseFill
            onClick={closeCreateLinkModal}
            size={20}
            className="text-zinc-400 cursor-pointer"
          />
        </div>
    
        <p className="text-sm text-zinc-400 ">
          Todos convidados podem visualizar as atividades.
        </p>
      </div>
    
      <form 
      onSubmit={createLink}
      className="space-y-3">
        <div className=" h-14 px-3  flex  items-center  bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
          <GoTag size={20} className=" text-zinc-400 " />
    
          <input
            name="title"
            placeholder="Titulo do link"
            className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className=" flex-1 h-14 px-3 flex  items-center  bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
            {/* flex-1 espaço desponivel */}
            <IoLinkSharp size={25} className=" text-zinc-400" />
            <input
              type="link"
              name="url"
              placeholder="Url"
              className=" bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none  "
            />
          </div>
        </div>
  

<Button
 type="submit"
size="full"
>Salvar link</Button>

      </form>
    </div>
    </div>

  )
}
