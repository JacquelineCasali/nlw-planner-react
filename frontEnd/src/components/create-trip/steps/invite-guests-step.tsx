
import { AiOutlineUserAdd } from 'react-icons/ai'
import { GrLinkNext } from 'react-icons/gr'
import Button from '../../button/button'

interface InviteGuestsStepProps {
  openModal:()=>void
  emailsToInvite:string[]
  openConfirmModal:()=>void
}

export default function  InviteGuestsStep({openModal,openConfirmModal,emailsToInvite}:InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
    <button
      type="button"
      onClick={openModal}
      className="flex items-center gap-2 flex-1 text-left"
    >
      <AiOutlineUserAdd size={20} className=" text-zinc-400" />
      {/*  vendo se o usuario condvidou alguem  */}
      {emailsToInvite.length > 0 ? (
        <span className="text-zinc-100 text-lg flex-1">
          {emailsToInvite.length} pessoa(s) convidada(s)
        </span>
      ) : (
        <span className="text-zinc-400 text-lg flex-1">
          Quem estará na viagem?
        </span>
      )}
    </button>

    <div className="w-px h-6 bg-zinc-800" />



    <Button
     onClick={openConfirmModal}
    >
      Confirmar viagem
      <GrLinkNext size={20} />
    </Button>
  </div>
  )
}
