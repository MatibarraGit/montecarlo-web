import Image from "next/image";
import { HeartHandshake, Truck, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    text: "Te asesoramos producto por producto, como lo hacemos desde hace años.",
  },
  {
    icon: Truck,
    title: "Entrega en el día",
    text: "Envíos propios en la zona, asegurando el estado de los productos.",
  },
  {
    icon: ShieldCheck,
    title: "Cambios y garantías",
    text: "Productos con periodo de prueba y garantía oficial.",
  },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="content-wrapper mt-16 scroll-mt-32">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="text-secondary text-xs font-bold tracking-widest uppercase">
            Sobre nosotros
          </span>
          <h2 className="mt-2 text-3xl uppercase sm:text-4xl">
            MONTECARLO HOGAR | Mayorista y Minorista de electrodomésticos
          </h2>
          <p className="text-muted-foreground mt-4">
            Somos una empresa en la que
            miles de familias encuentran todo para su casa: electrodomésticos, muebles, colchones, rodados, artículos de ferretería, bazar, línea blanca, climatización, y más!
          </p>
          <p className="text-muted-foreground mt-3">
            Trabajamos con marcas líderes, precios claros y financiación propia. Elegís online y
            coordinamos la entrega por WhatsApp en minutos.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-border bg-card shadow-elevated rounded-xl border p-4">
                <Icon className="text-secondary size-6" aria-hidden />
                <h3 className="mt-2 text-base">{title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <Image
          src="/sucursal-35-2.png"
          alt="Equipo de Montecarlo Hogar atendiendo en el salón de ventas"
          width={1600}
          height={1200}
          sizes="(max-width: 1024px) 100vw, 620px"
          className="shadow-elevated aspect-4/3 w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  );
}
