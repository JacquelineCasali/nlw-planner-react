
import { FormEvent } from 'react';
import { RiAddLine, RiAtLine, RiCloseFill } from 'react-icons/ri';
import Button from '../button/button';
//  no typscrept usa o mesmo nome do componente
interface InviteGuestsModalProps {
    closeModal:()=>void
    emailsToInvite:string[]
    addToEmailInvite:(event: FormEvent<HTMLFormElement>)=>void
    removeEmailInvite:(email:string)=>void
}


export default function InviteGuestsModal({addToEmailInvite,closeModal,emailsToInvite,removeEmailInvite}:InviteGuestsModalProps) {

 
    return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Selecionar convidados
          </h2>

          <RiCloseFill
            onClick={closeModal}
            size={20}
            className="text-zinc-400 cursor-pointer"
          />
        </div>

        <p className="text-sm text-zinc-400 ">
          Os convidados irão receber e-mails para confirmar a
          participação na viagem.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email) => {
          return (
            <div
              key={email}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="text-zinc-300">{email}</span>
              <RiCloseFill
                onClick={() => removeEmailInvite(email)}
                size={16}
                className="text-zinc-400 cursor-pointer"
              />
            </div>
          );
        })}
      </div>

      <div className="w-full h-px bg-zinc-800" />

      <form
        onSubmit={addToEmailInvite}
        className="flex items-center gap-2 p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg"
        action=""
      >
        <RiAtLine size={25} className=" text-zinc-400" />

        <input
          type="email"
          name="email"
          placeholder="Digite o email do convidado"
          className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
        />
 
        <Button
          type="submit">
        Convidar
          <RiAddLine size={20} className="text-lime-950" />

        </Button>
      </form>
    </div>
  </div>
  )
}
