import { CiCalendarDate } from "react-icons/ci";
import { GrLinkNext } from "react-icons/gr";
import { LuSettings2 } from "react-icons/lu";
import { RiCloseFill,  RiMapPinLine} from "react-icons/ri";
import Button from "../../button/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import {format} from 'date-fns';
import "react-day-picker/style.css";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates:DateRange|undefined
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates:(dates:DateRange| undefined)=>void
}
export default function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates
}: DestinationAndDateStepProps) {
  const [isDatePickOpen, setisDatePickOpen] = useState(false);
  //const [eventStartAndEndDates ,setEventStartAndEndDates] = useState<DateRange | undefined>()

  function openDatePick() {
    setisDatePickOpen(true);
  }

  function closeDatePicker() {
    setisDatePickOpen(false);
  }
  // d igual a dia 
  // LLL mes
 // const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from? format(eventStartAndEndDates.from,'d') : null
  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
  ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
  : null
  
  


  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <RiMapPinLine size={20} className=" text-zinc-400" />
        {/* disabled não deixa mexer se quem esta viajando aparece */}

        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        onChange={event=>setDestination(event.target.value)}
        
        />
      </div>

      <button
        onClick={openDatePick}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left w-[240px] "
      >
        <CiCalendarDate size={25} className=" text-zinc-400" />

        <span className=" text-lg text-zinc-400 w-40 flex-1 ">
          
          {displayedDate||  "Quando?"}
        </span>
      </button>


{/* modal data */}
      {isDatePickOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                   Selecione a data
                  </h2>

                  <RiCloseFill
                    onClick={closeDatePicker}
                    size={20}
                    className="text-zinc-400 cursor-pointer"
                  />
                </div>

              
              </div>

         <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>
            </div>
          </div>

      )}







      <div className="w-px h-6 bg-zinc-800" />
      {isGuestsInputOpen ? (
        <Button variant="cinza" onClick={closeGuestsInput}>
          Alterar local/data
          <LuSettings2 />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <GrLinkNext size={20} />
        </Button>
      )}
    </div>
  );
}
