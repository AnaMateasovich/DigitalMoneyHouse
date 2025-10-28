import Image from "next/image";
import './globals.css'
import CardHero from "@/components/home/CardHero";
import HeroTextResponsive from "@/components/home/HeroTextResponsive";

export default function Home() {

  const tabletCardsClass = `md:absolute  md:left-1/2 md:-translate-x-1/2 md:mb-10 md:bottom-0 md:w-4/5 md:self-center md:px-0`

  const desktopCardsClass = "lg:flex-row  lg:mb-6 lg:w-4/5 lg:items-center lg:justify-center lg:gap-6"

  return (
    <main className="relative w-full sm:min-h-[calc(100vh-140px)]">
      <Image src="/home.jpg" alt="Home image" fill priority className="object-cover absolute " />I
      <Image src="/heroMobile.png" alt="Home image" fill priority className="object-cover absolute sm:hidden" />

      <div className="absolute bottom-0 inset-0 bg-black/20"></div>
      <HeroTextResponsive />

      <div className={`w-full flex flex-col items-center justify-center gap-4 mt-20 relative z-10 px-6 mb-6  ${tabletCardsClass} ${desktopCardsClass}`}>
        <CardHero title="Transferí dinero" body="Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual" />
        <CardHero title="Pago de servicios" body="Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-primary)] min-h-2/4 rounded-t-[2rem] z-0  md:min-h-[300px] lg:min-h-[180px]"></div>
    </main>


  );
}
