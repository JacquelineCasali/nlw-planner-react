import "../App.css";


export default function Error() {
  return (
    <>
      <section className=" flex text-base py-64  items-center justify-center flex-col">
        <span className="text-9xl  font-bold text-red-700">404</span>{" "}
        <br />
        <strong className="text-xl    font-bold text-red-700">
          Página Não Localizada!
        </strong>
      </section>
  
    </>
  );
}
