import { useEffect, useState } from "react";
import { IoLinkSharp } from "react-icons/io5";
import { RiAddLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import CreateLinkModal from "./create-link-modal";
import Button from "../button/button";
import { api } from "../../db/axios";

interface Link {
  id: string;
  title:string
  url:string
}


export default function ImportantLinks() {
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }
  const { tripId } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((res) => setLinks(res.data))
      .catch((err) => console.log(err));
  }, [tripId]);
  console.log(links);


  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
{links.length>0?(
    <div className="space-y-5">

{links.map((link)=>(
   <div className="flex items-center justify-between gap-4">
   <div className="space-y-1.5 ">
     <span className="block font-medium text-zinc-100">
      {link.title}
     </span>
     <Link
       to={"#"}
       className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
     >
    {link.url}
     </Link>
   </div>

   <IoLinkSharp size={15} className="text-zinc-400 shrink-0 " />
 </div>
))}

   

 
  </div>
):(
  <p className="text-zinc-500 text-sm">
         Nenhum link foi cadastrado nessa viagem.
     </p>
)}
    
      <Button variant="cinza" size="full" 
        onClick={openCreateLinkModal}
        >
        <RiAddLine size={20} className="text-zinc-200" />
        Cadastrar novo link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  );
}
