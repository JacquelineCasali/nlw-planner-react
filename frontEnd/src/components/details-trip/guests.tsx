import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuCircleDashed } from "react-icons/lu";
import { RiUserSettingsLine } from "react-icons/ri";
import ConfirmPartcipacaoModal from "./confirm-participacao-modal";
import Button from "../button/button";
import { useParams } from "react-router-dom";
import { api } from "../../db/axios";


interface Participant {
  id: string;
  name: string | null;
  email: string;
  isConfirmed: boolean;
}
export default function Guests() {

  const { tripId } = useParams();

  const [participants, setParticipants] = useState<Participant[]>([]);
  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((res) => setParticipants(res.data))
      .catch((err) => console.log(err));
  }, [tripId]);
  console.log(participants);

    const [isComfirmModalOpen, setIsComfirmModalOpen] =
    useState(false);
    function openComfirmModal() {
        setIsComfirmModalOpen(true);
    }
  
    function closeComfirmModal() {
        setIsComfirmModalOpen(false);
    }


    

    return (
    <div className="space-y-6">
    <h2 className="font-semibold text-xl">Convidados</h2>
{participants.length>0?(
 <div className="space-y-5">
 {participants.map((participant,index)=>(
  
     <div key={participant.id} className="flex items-center justify-between gap-4">
     <div className="space-y-1.5 ">
       <span className="block font-medium text-zinc-100">
         {participant.name ?? `Convidado${index}`}
       </span>
       <span className="block text-sm text-zinc-400 truncate ">
       {participant.email}
       </span>
     </div>
{participant.isConfirmed?(
<FaRegCheckCircle className="text-green-400 shrink-0" size={15} />
):(  <LuCircleDashed className=" text-zinc-400 shrink-0 " size={15} /> )}
    
   
   </div>
   )
) }



</div>
):(
  <p className="text-zinc-500 text-sm">
         Nenhum convidado cadastrado nessa viagem.
     </p>
)}
   

    <Button
variant="cinza" size="full"
onClick={openComfirmModal}
       >
      <RiUserSettingsLine size={20} className="text-zinc-200" />
      Gerenciar convidados
    </Button>




{isComfirmModalOpen&&(
    <ConfirmPartcipacaoModal
  
    closeConfirmModal={closeComfirmModal}/>
)}


  </div>
  )
}
