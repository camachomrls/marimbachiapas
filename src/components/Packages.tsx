import { useState } from "react";

export type PackagesProps = {
  idPrefix?: string;
};

const PACKAGE_CARDS = [
  {
    id: "grupo-completo",
    badge: "Máximo Impacto Orquestal",
    title: "Grupo Completo",
    price: "Aprox. desde $10,000 MXN",
    priceLabel: "Precio aproximado local · Solo en Ocozocoautla",
    description:
      "Ideal para bodas, carnavales y fiestas patronales de gran formato.",
    features: [
      "Alineación completa en escena con marimba tradicional, sección de alientos y percusión",
      "Repertorio completo: vals, boleros, zapateados zoques, cumbias, mambos y corridos",
      "Sonoridad orquestal potente para salones y eventos masivos",
    ],
    featured: true,
  },
  {
    id: "medio-grupo",
    badge: "Formato Versátil",
    title: "Medio Grupo",
    price: "Aprox. desde $7,000 MXN",
    priceLabel: "Precio aproximado local · Solo en Ocozocoautla",
    description:
      "Ideal para recepciones íntimas, XV años, serenatas de gala y reuniones familiares.",
    features: [
      "Ensamble de marimba en vivo con 2 saxofones incluidos y base rítmica",
      "Repertorio versátil: boleros, valses, cumbias, zapateados zoques y rancheras",
      "Tarifa aproximada aplicable únicamente dentro de Ocozocoautla, Chiapas",
    ],
    featured: false,
  },
] as const;

/**
 * Guía discreta y colapsable con la estética artesanal original de los paquetes,
 * integrada directamente dentro del bloque de cotización inmediata.
 */
export function Packages({ idPrefix = "quote" }: PackagesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `${idPrefix}-price-guide-panel`;

  return (
    <div className="price-guide">
      <button
        type="button"
        className={`price-guide-toggle ${isOpen ? "is-open" : ""}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="price-guide-toggle-main">
          <span className="price-guide-icon-badge" aria-hidden="true">
            <svg
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </span>
          <span className="price-guide-toggle-copy">
            <span className="price-guide-toggle-title">
              Ver modalidades y precios aproximados
            </span>
            <span className="price-guide-tag">Orientativo · No oficial</span>
          </span>
        </span>
        <svg
          aria-hidden="true"
          className={`icon price-guide-chevron ${isOpen ? "is-open" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          id={panelId}
          className="price-guide-panel"
          role="region"
          aria-label="Modalidades y referencia aproximada de precios"
        >
          <p className="price-guide-disclaimer">
            Los montos mostrados son únicamente aproximaciones orientativas (no
            son precios 100% oficiales ni definitivos). El presupuesto exacto se
            confirma directamente por WhatsApp según fecha, horas de servicio y
            lugar del evento.
          </p>

          <div className="packages-grid is-compact">
            {PACKAGE_CARDS.map((pkg) => (
              <article
                key={pkg.id}
                className={`package-card ${pkg.featured ? "is-featured" : ""}`}
              >
                <div className="package-card-top">
                  <span className="package-badge">{pkg.badge}</span>
                  <h4>{pkg.title}</h4>
                  <div className="package-price-box">
                    <strong>{pkg.price}</strong>
                    <span>{pkg.priceLabel}</span>
                  </div>
                  <p className="package-description">{pkg.description}</p>
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
              <h4>
                Importante: Referencias exclusivas para Ocozocoautla y viáticos
                de traslado
              </h4>
              <p>
                Las aproximaciones mostradas (<strong>$10,000 MXN</strong>{" "}
                Grupo Completo y <strong>$7,000 MXN</strong> Medio Grupo con 2
                saxofones) consideran únicamente eventos locales dentro de{" "}
                <strong>Ocozocoautla de Espinosa, Chiapas</strong>. Cualquier
                salida hacia otros municipios (ej.{" "}
                <strong>Cristóbal Obregón</strong>,{" "}
                <strong>Tuxtla Gutiérrez</strong>) o estados (ej.{" "}
                <strong>Agua Dulce, Veracruz</strong>) requiere cotización
                adicional de flete y viáticos según la distancia.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Packages;
