import type { MouseEvent } from "react";

export type PackagesProps = {
  id?: string;
  quoteTargetId?: string;
};

const PACKAGE_CARDS = [
  {
    id: "grupo-completo",
    badge: "Máximo Impacto Orquestal",
    title: "Grupo Completo",
    price: "Desde $10,000 MXN",
    priceLabel: "Precio base local · Solo en Ocozocoautla",
    description:
      "Ideal para bodas, carnavales y fiestas patronales de gran formato.",
    addon: null as string | null,
    features: [
      "Alineación completa en escena con marimba tradicional, sección de alientos y percusión",
      "Repertorio completo: vals, boleros, zapateados zoques, cumbias, mambos y corridos",
      "Sonoridad orquestal potente para salones y eventos masivos",
    ],
    ctaLabel: "Cotizar Grupo Completo",
    featured: true,
  },
  {
    id: "medio-grupo",
    badge: "Formato Versátil",
    title: "Medio Grupo",
    price: "Desde $7,000 MXN",
    priceLabel: "Precio base local · Solo en Ocozocoautla",
    description:
      "Ideal para recepciones íntimas, XV años, serenatas de gala y reuniones familiares.",
    addon: null as string | null,
    features: [
      "Ensamble de marimba en vivo con 2 saxofones incluidos y base rítmica",
      "Repertorio versátil: boleros, valses, cumbias, zapateados zoques y rancheras",
      "Tarifa base aplicable exclusivamente dentro de Ocozocoautla, Chiapas",
    ],
    ctaLabel: "Cotizar Medio Grupo",
    featured: false,
  },
] as const;

/**
 * Sección de paquetes y cobertura comercial con tarifas base locales reales
 * y aclaración de viáticos por zonas.
 */
export function Packages({
  id = "paquetes",
  quoteTargetId = "cotizar-inicio",
}: PackagesProps) {
  const handleScrollToQuote = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(quoteTargetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="packages-section shell"
      id={id}
      aria-labelledby="packages-heading"
    >
      <div className="section-title">
        <p className="eyebrow">Modalidades y Tarifas Base en Ocozocoautla</p>
        <h2 id="packages-heading">Paquetes y Qué Incluye</h2>
        <span>
          Todos los precios mostrados aplican exclusivamente para eventos locales
          en Ocozocoautla de Espinosa, Chiapas · Música 100% en vivo bajo la
          dirección de Heriberto &ldquo;Tito&rdquo; Gómez
        </span>
      </div>

      <div className="packages-grid">
        {PACKAGE_CARDS.map((pkg) => (
          <article
            key={pkg.id}
            className={`package-card ${pkg.featured ? "is-featured" : ""}`}
          >
            <div className="package-card-top">
              <span className="package-badge">{pkg.badge}</span>
              <h3>{pkg.title}</h3>
              <div className="package-price-box">
                <strong>{pkg.price}</strong>
                <span>{pkg.priceLabel}</span>
              </div>
              <p className="package-description">{pkg.description}</p>

              {pkg.addon && (
                <div className="package-addon" role="note">
                  <strong>Mejora opcional:</strong> {pkg.addon}
                </div>
              )}
            </div>

            <ul className="package-features">
              {pkg.features.map((feature) => (
                <li key={feature}>
                  <svg
                    aria-hidden="true"
                    className="icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={`#${quoteTargetId}`}
              className="package-cta-btn"
              onClick={handleScrollToQuote}
            >
              <span>{pkg.ctaLabel}</span>
              <svg
                aria-hidden="true"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
          </article>
        ))}
      </div>

      <aside
        className="packages-coverage-note"
        aria-label="Viáticos y cobertura por zonas"
      >
        <div className="packages-coverage-icon" aria-hidden="true">
          <svg
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </div>
        <div className="packages-coverage-copy">
          <h3>
            Importante: Tarifas Exclusivas para Ocozocoautla y Viáticos de
            Traslado
          </h3>
          <p>
            Todos los precios base mostrados (<strong>$10,000 MXN</strong>{" "}
            Grupo Completo y <strong>$7,000 MXN</strong> Medio Grupo con 2
            saxofones) aplican única y exclusivamente para eventos locales
            dentro de <strong>Ocozocoautla de Espinosa, Chiapas</strong>.
          </p>
          <p>
            Cualquier salida fuera de Ocozocoautla —hacia otros municipios (ej.{" "}
            <strong>Cristóbal Obregón</strong>,{" "}
            <strong>Tuxtla Gutiérrez</strong>) o estados (ej.{" "}
            <strong>Agua Dulce, Veracruz</strong>)— requiere cotización
            adicional de flete y viáticos según la distancia.
          </p>
        </div>
      </aside>
    </section>
  );
}

export default Packages;
