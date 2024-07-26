
// import { FormEvent } from 'react'
import { RiCloseFill, RiMailLine, RiUser3Line } from 'react-icons/ri'
import Button from '../button/button'





interface ConfirmPartcipacaoModalProps {
    closeConfirmModal:()=>void
   
  }


export default function ConfirmPartcipacaoModal({closeConfirmModal}:ConfirmPartcipacaoModalProps) {
 


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Confirmar participação
                  </h2>

                  <RiCloseFill
                    onClick={closeConfirmModal}
                    size={20}
                    className="text-zinc-400 cursor-pointer"
                  />
                </div>

                <p className="text-sm text-zinc-400 ">
                 Você foi convidado para participar de uma viagem para {" "}
                  <span className="font-semibold text-zinc-100">
                    Florianópolis, Brasil{" "}
                  </span>
                  nas datas de{" "}
                  <span className="font-semibold text-zinc-100">
                    16 a 27 de Agosto de 2024
                  </span>{" "}
                    </p>



              </div>
              <p className="text-sm text-zinc-400 ">Para confirmar sua presença na viagem, preencha os dados abaixo:</p>


              <form className="space-y-3">
              
           
                <div className=" h-14 px-3  flex  items-center  bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
                  <RiUser3Line size={20} className=" text-zinc-400 " />

                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                    // onChange={event=>setName(event.target.value)}
                 
                 />
                </div>
                <div className=" h-14 px-3 flex  items-center  bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
                  <RiMailLine size={25} className=" text-zinc-400 " />
                  <input
                    type="email"
                    name="email"
                    // value={email}
                    placeholder="Seu e-mail pessoal"
                    className=" bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                  />
               
               
                </div>
         

              <Button 
              type='submit'
              size='full'> Confirmar minha presença</Button>
              </form>
            </div>
          </div>
  )
}
