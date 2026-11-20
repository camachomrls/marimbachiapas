import { useEffect, useState, type FormEvent } from "react";
import { CustomSelect } from "./CustomSelect";

const WHATSAPP_NUMBER = "5219681065475";

const EVENT_TYPE_OPTIONS = [
  "Bodas y Aniversarios",
  "XV Años",
  "Carnaval Zoque y Fiestas Tradicionales",
  "Serenatas de Gala",
  "Graduaciones y Bautizos",
  "Eventos Empresariales",
  "Otro evento social",
] as const;

const HOURS_OPTIONS = [
  "Por definir",
  "1 hora",
  "2 horas",
  "3 horas",
  "4 horas",
  "5 horas o más",
] as const;

export type QuoteFormProps = {
  id?: string;
  initialEventType?: string;
  embedded?: boolean;
};

/**
 * Mini-formulario de cotización sin backend que construye un mensaje estructurado
 * y abre WhatsApp en una nueva pestaña.
 */
export function QuoteForm({
  id = "cotizar",
  initialEventType,
  embedded = false,
}: QuoteFormProps) {
  const [eventType, setEventType] = useState<string>(
    initialEventType || EVENT_TYPE_OPTIONS[0],
  );
  const [date, setDate] = useState<string>("");
  const [municipality, setMunicipality] = useState<string>("");
  const [hours, setHours] = useState<string>(HOURS_OPTIONS[0]);

  useEffect(() => {
    if (initialEventType) {
      setEventType(initialEventType);
    }
  }, [initialEventType]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanMunicipality = municipality.trim();
    const message = [
      "Hola Heriberto (Tito) Gómez, me gustaría solicitar una cotización para la Marimba Orquesta Chiapas:",
      "",
      `• Tipo de evento: ${eventType}`,
      `• Fecha: ${date}`,
      `• Municipio: ${cleanMunicipality}`,
      `• Horas de servicio: ${hours}`,
      "",
      "¿Me podrían confirmar disponibilidad y presupuesto, por favor?",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formCard = (
    <div
      className={`quote-form-container quote-form-card ${embedded ? "is-embedded" : ""}`}
    >
      <div className="quote-form-header">
        <p className="eyebrow">Cotización Inmediata</p>
        <h3>Solicita disponibilidad y presupuesto por WhatsApp</h3>
        <p>
          Indícanos los datos básicos de tu celebración y te enviamos la
          cotización directa sin compromiso.
        </p>
      </div>

      <form className="quote-form-body" onSubmit={handleSubmit}>
        <div className="quote-form-grid">
          <div className="quote-form-field">
            <label id={`${id}-event-type-label`} htmlFor={`${id}-event-type`}>
              Tipo de evento
            </label>
            <CustomSelect
              id={`${id}-event-type`}
              labelId={`${id}-event-type-label`}
              options={EVENT_TYPE_OPTIONS}
              value={eventType}
              onChange={setEventType}
              placeholder="Selecciona..."
            />
          </div>

          <div className="quote-form-field">
            <label htmlFor={`${id}-date`}>Fecha del evento</label>
            <input
              id={`${id}-date`}
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="quote-form-field">
            <label htmlFor={`${id}-municipality`}>Municipio</label>
            <input
              id={`${id}-municipality`}
              name="municipality"
              type="text"
              placeholder="Ej. Ocozocoautla, Tuxtla Gutiérrez..."
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value)}
              required
            />
          </div>

          <div className="quote-form-field">
            <label id={`${id}-hours-label`} htmlFor={`${id}-hours`}>
              Horas de servicio
            </label>
            <CustomSelect
              id={`${id}-hours`}
              labelId={`${id}-hours-label`}
              options={HOURS_OPTIONS}
              value={hours}
              onChange={setHours}
              placeholder="Por definir"
            />
          </div>
        </div>

        <div className="quote-form-actions">
          <button type="submit" className="quote-submit-btn btn-whatsapp">
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
              <path d="M20 11.5a8 8 0 0 1-11.7 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
              <path d="M9 8.2c.4 3.2 2.2 5 5.5 5.4" />
            </svg>
            <span>Solicitar Cotización por WhatsApp</span>
          </button>
          <small className="quote-form-note">
            Atención directa con Heriberto &ldquo;Tito&rdquo; Gómez · Cel: 968 106 5475
          </small>
        </div>
      </form>
    </div>
  );

  if (embedded) {
    return formCard;
  }

  return (
    <section
      className="quote-form-section shell"
      id={id}
      aria-label="Formulario de cotización por WhatsApp"
    >
      {formCard}
    </section>
  );
}

export default QuoteForm;
