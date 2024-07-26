import "../App.css";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import InviteGuestsModal from "../components/create-trip/invite-guests-modal";
import ConfirmTripModal from "../components/create-trip/confirm-trip-modal";
import DestinationAndDateStep from "../components/create-trip/steps/destination-and-date";
import InviteGuestsStep from "../components/create-trip/steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../db/axios";
function Home() {
  const navegate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isOpenModal, setModal] = useState(false);
  const [isConfirmOpenModal, setIsConfirmModal] = useState(false);
 
//  informações para criar a viagem 
const [destination, setDestination] = useState('')
const [ownerName, setOwnerName] = useState('')
const [ownerEmail, setOwnerEmail] = useState('')
const [eventStartAndEndDates ,setEventStartAndEndDates] = useState<DateRange | undefined>()
 
 
 
  const [emailsToInvite, setEmailToInvite] = useState([
   'diego@rocketseat.com.br',
     'john@acme.com'
  ]);
  const [warning, setWarning] = useState(false);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }
  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }
  function openConfirmModal() {
    setIsConfirmModal(true);
  }

  function closeConfirmModal() {
    setIsConfirmModal(false);
  }
  function addToEmailInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    if (!email) {
      return;
    }
    if (emailsToInvite.includes(email)) {
      setWarning(true);
      // tempo limite
      setTimeout(() => {
        setWarning(false);
      }, 2000);

      return;
    }

    setEmailToInvite([...emailsToInvite, email]);
    //limpar o formulario
    event.currentTarget.reset();
  }

  function removeEmailInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailToInvite(newEmailList);
  }

 async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();


// validação 
// destino nao existir nao cadastra
if(!destination){
  return
}
if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to){
  return
}
// sem convidados 
if(emailsToInvite.length===0){
return
}

if(!ownerName|| !ownerEmail){
  return
}

const response= await api.post('/trips',{

   destination,
    starts_at: eventStartAndEndDates.from,
    ends_at: eventStartAndEndDates.to,
    emails_to_invite: emailsToInvite,
    owner_name: ownerName,
    owner_email: ownerEmail
  })


const {id}=response.data
    
   navegate(`/trips/${id}`);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet title="Planner" />
      </HelmetProvider>

      <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10 ">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="logo" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>
          <div className="space-y-4">
         
<DestinationAndDateStep
closeGuestsInput={closeGuestsInput}
isGuestsInputOpen={isGuestsInputOpen}
openGuestsInput={openGuestsInput}
setDestination={setDestination}
setEventStartAndEndDates={setEventStartAndEndDates}
eventStartAndEndDates={eventStartAndEndDates}
/>
            {isGuestsInputOpen && (
       <InviteGuestsStep
       emailsToInvite={emailsToInvite}
       openConfirmModal={openConfirmModal}
       openModal={openModal}
       
       />  
            )}
          </div>
          <p className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
            <br />
            com nossos{" "}
            <a className="text-zinc-300 underline" href="#">
              termos de uso
            </a>{" "}
            e{" "}
            <a className="text-zinc-300 underline" href="#">
              {" "}
              políticas de privacidade.{" "}
            </a>
          </p>
        </div>

        {isOpenModal && (
          <InviteGuestsModal
          emailsToInvite={emailsToInvite}
      
            addToEmailInvite={addToEmailInvite}
            closeModal={closeModal}
            removeEmailInvite={removeEmailInvite}
          />
        )}
        {isConfirmOpenModal && (
          <ConfirmTripModal
            closeConfirmModal={closeConfirmModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}



          />
        )}
      </div>
      {warning && (
        <div
          className=" w-64 absolute justify-center
     top-28 right-0 bg-red-600 text-zinc-300 p-2 ml-2 rounded-md text-lg"
        >
          Email já foi convidado
        </div>
      )}
    </>
  );
}

export default Home;
