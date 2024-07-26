
import { FormEvent} from 'react'
import { RiCloseFill, RiMailLine, RiUser3Line } from 'react-icons/ri'
import Button from '../button/button'





interface ConfirmTripModalProps {
    closeConfirmModal:()=>void
    createTrip:(event: FormEvent<HTMLFormElement>)=>void
    setOwnerName:(name:string)=>void
    setOwnerEmail:(email:string)=>void


  }


export default function ConfirmTripModal({closeConfirmModal,createTrip,setOwnerName,
  setOwnerEmail}:ConfirmTripModalProps) {



  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Confirmar criação da viagem
                  </h2>

                  <RiCloseFill
                    onClick={closeConfirmModal}
                    size={20}
                    className="text-zinc-400 cursor-pointer"
                  />
                </div>

                <p className="text-sm text-zinc-400 ">
                  Para concluir a criação da viagem para{" "}
                  <span className="font-semibold text-zinc-100">
                  Florianópolis, Brasil{" "}
                  </span>
                  nas datas de{" "}
                  <span className="font-semibold text-zinc-100">
                    16 a 27 de Agosto de 2024
                  </span>{" "}
                  preencha seus dados abaixo:
                </p>
              </div>

              <form onSubmit={createTrip} className="space-y-3">
              
           
                <div className=" h-14 px-3  flex  items-center  bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
                  <RiUser3Line size={20} className=" text-zinc-400 " />

                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                    onChange={event=>setOwnerName(event.target.value)}
            
                   
                 
                 
                 />
                </div>
                <div className=" h-14 px-3 flex  items-center  bg-zinc-950 border border-zinc-800 rounded-lg gap-2">
                  <RiMailLine size={25} className=" text-zinc-400 " />
                  <input
                    type="email"
                    name="email"
                    placeholder="Seu e-mail pessoal"
                    className=" bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                 
                    onChange={event=>setOwnerEmail(event.target.value)}
                 />
                </div>
       

<Button
    type="submit" size='full'
>  Confirmar criação da viagem</Button>

              </form>
            </div>
          </div>
  )
}
