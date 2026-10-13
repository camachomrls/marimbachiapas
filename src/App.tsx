import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  genreFilters,
  songsData,
  type Genre,
  type Song,
} from "./data/songsData";
import { videosData, type VideoItem } from "./data/videosData";

const BASE_WHATSAPP_NUMBER = "529681065475";
const DEFAULT_WHATSAPP_MSG =
  "Hola, me gustaría cotizar a la Marimba Orquesta Chiapas para un evento. ¿Me podrían dar más información, por favor?";

function getWhatsAppUrl(customText?: string) {
  const text = encodeURIComponent(customText || DEFAULT_WHATSAPP_MSG);
  return `https://wa.me/${BASE_WHATSAPP_NUMBER}?text=${text}`;
}

const FACEBOOK_URL = "https://www.facebook.com/heri.gomez.3154";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=2a.+OTE.+SUR+%23758+B.+San+Antonio,+Ocozocoautla+de+Espinosa,+Chiapas";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();
}

function Icon({
  name,
  className = "",
}: {
  name:
    | "arrow"
    | "calendar"
    | "chat"
    | "home"
    | "landline"
    | "location"
    | "menu"
    | "mobile"
    | "music"
    | "play"
    | "pause"
    | "search"
    | "facebook"
    | "close"
    | "volume";
  className?: string;
}) {
  const paths: Record<typeof name, ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M7 3v4m10-4v4M3 10h18m-14 4h3m-3 3h6" />
      </>
    ),
    chat: (
      <>
        <path d="M20 11.5a8 8 0 0 1-11.7 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
        <path d="M9 8.2c.4 3.2 2.2 5 5.5 5.4" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    landline: (
      <>
        <path d="M7 3h10v6H7zM5 10h14l2 4v7H3v-7z" />
        <path d="M8 14h8m-8 3h1m3 0h1m3 0h1" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    mobile: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
    music: (
      <>
        <path d="M9 18V5l10-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="16" cy="16" r="3" />
      </>
    ),
    play: <path d="m9 7 8 5-8 5Z" />,
    pause: (
      <>
        <path d="M8 5h3v14H8z" />
        <path d="M13 5h3v14h-3z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    facebook: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
    close: <path d="M18 6 6 18M6 6l12 12" />,
    volume: (
      <>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={`icon ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function Brand({ onNavigate }: { onNavigate?: (route: string) => void }) {
  return (
    <a
      className="brand"
      href="/"
      onClick={(e) => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate("/");
        }
      }}
      aria-label="Marimba Orquesta Chiapas, inicio"
    >
      <span className="brand-bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>
        Marimba Orquesta
        <strong>Chiapas</strong>
      </span>
    </a>
  );
}

function WhatsAppButton({
  short = false,
  customText,
  className = "",
}: {
  short?: boolean;
  customText?: string;
  className?: string;
}) {
  return (
    <a
      className={`whatsapp-button ${className}`}
      href={getWhatsAppUrl(customText)}
      target="_blank"
      rel="noreferrer"
      aria-label="Cotizar por WhatsApp con Marimba Orquesta Chiapas"
    >
      <Icon name="chat" />
      <span>{short ? "Cotizar" : "Cotizar por WhatsApp"}</span>
    </a>
  );
}

function Header({
  currentRoute,
  onNavigate,
}: {
  currentRoute: string;
  onNavigate: (route: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand onNavigate={onNavigate} />
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          <Icon name="menu" />
          <span className="sr-only">Abrir menú</span>
        </button>
        <nav
          className={`primary-nav ${open ? "is-open" : ""}`}
          id="primary-navigation"
          aria-label="Navegación principal"
        >
          <a
            className={currentRoute === "/" ? "active" : ""}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/");
            }}
          >
            Inicio
          </a>
          <a
            className={currentRoute === "/repertorio" ? "active" : ""}
            href="/repertorio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/repertorio");
            }}
          >
            Repertorio ({songsData.length})
          </a>
          <a
            className={
              currentRoute === "/reserva" ? "active nav-pill" : "nav-pill"
            }
            href="/reserva"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/reserva");
            }}
          >
            Contacto / Cotizar
          </a>
        </nav>
      </div>
    </header>
  );
}

function PageHero({
  title,
  subtitle,
  home = false,
  onNavigate,
}: {
  title: string;
  subtitle: string;
  home?: boolean;
  onNavigate?: (route: string) => void;
}) {
  return (
    <section className={`page-hero ${home ? "home-hero" : ""}`}>
      <div className="heritage-pattern" aria-hidden="true" />
      <div className="shell hero-inner">
        {!home ? (
          <p className="eyebrow">
            <span />
            Marimba Orquesta Chiapas · Del Mtro. Rogelio Gómez
            <span />
          </p>
        ) : (
          <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
            <span />
            Del Mtro. Rogelio Gómez · Ocozocoautla, Chiapas
            <span />
          </p>
        )}
        <h1>{title}</h1>
        <p>{subtitle}</p>

        {home && onNavigate && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.8rem",
              marginTop: "1.4rem",
              flexWrap: "wrap",
            }}
          >
            <WhatsAppButton />
            <button
              type="button"
              className="cream-button"
              onClick={() => onNavigate("/repertorio")}
            >
              <Icon name="music" />
              <span>Ver Repertorio ({songsData.length} Canciones)</span>
            </button>
          </div>
        )}
      </div>
      <div className="hero-wave" aria-hidden="true" />
    </section>
  );
}

const contactItems = [
  {
    icon: "mobile" as const,
    label: "Teléfono móvil",
    value: "Cel: 968 106 5475",
    href: "tel:+529681065475",
  },
  {
    icon: "landline" as const,
    label: "Teléfono fijo",
    value: "Casa: 968 688 3081",
    href: "tel:+529686883081",
  },
  {
    icon: "home" as const,
    label: "Dirección",
    value: "2a. Ote. Sur #758 B. San Antonio",
    href: MAPS_URL,
  },
  {
    icon: "location" as const,
    label: "Ubicación",
    value: "Ocozocoautla de Espinosa, Chiapas",
    href: MAPS_URL,
  },
];

function ContactPanel({ featured = false }: { featured?: boolean }) {
  return (
    <div className="contact-panel-wrap shell">
      <section
        className={`contact-panel ${featured ? "is-featured" : ""}`}
        aria-label="Información de contacto"
      >
        {contactItems.map((item) => (
          <a
            href={item.href}
            key={item.label}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </a>
        ))}
        {featured && (
          <div className="contact-panel-action">
            <p>
              Lleva la tradición, alegría y distinción de la marimba orquesta a
              tu celebración.
            </p>
            <WhatsAppButton />
          </div>
        )}
      </section>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <span>{description}</span>}
    </div>
  );
}

function VideoGallery() {
  return (
    <section className="videos-section shell" aria-labelledby="videos-heading">
      <SectionTitle
        eyebrow="Galería en Vivo"
        title="Melodías donde las maderas cantan"
        description="Disfruta de nuestras presentaciones en vivo y del auténtico sonido orquestal chiapaneco"
      />
      <div className="videos-grid" id="videos">
        {videosData.map((video) => (
          <article className="video-card" key={video.id}>
            <div className="video-iframe-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PresentationBanner({
  onNavigate,
}: {
  onNavigate: (route: string) => void;
}) {
  return (
    <section className="presentation-section shell">
      <div className="presentation-card">
        <div className="presentation-img-wrap">
          <img
            src="/marimbachis.jpg"
            alt="Marimba Orquesta Chiapas en presentación en vivo"
            loading="lazy"
          />
          <span className="presentation-badge">Mtro. Rogelio Gómez</span>
        </div>
        <div className="presentation-text">
          <p className="eyebrow">Auténtica Tradición Coiteca</p>
          <h2>El Sonido de Chiapas en tu Fiesta</h2>
          <p>
            Con años de trayectoria artística, la <strong>Marimba Orquesta Chiapas</strong>{" "}
            combina el brillo tradicional del teclado de hormiguillo con la fuerza
            de los metales y percusiones. Desde el majestuoso Carnaval Zoque de
            Ocozocoautla hasta elegantes recepciones en todo el estado, llevamos
            alegría y distinción a cada rincón.
          </p>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <WhatsAppButton short={false} />
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="facebook-btn"
            >
              <Icon name="facebook" />
              <span>Facebook Oficial</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniPlayerBar({
  currentSong,
  isPlaying,
  onTogglePlay,
  onClose,
}: {
  currentSong: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}) {
  return (
    <aside
      className="mini-player-bar"
      aria-label="Reproductor de audio en curso"
    >
      <div className="equalizer-anim" aria-hidden="true">
        {isPlaying ? (
          <>
            <span />
            <span />
            <span />
            <span />
          </>
        ) : (
          <span style={{ height: "4px" }} />
        )}
      </div>

      <div className="mini-player-track">
        <span className="mini-player-title">{currentSong.title}</span>
        <span className="mini-player-genre">
          {currentSong.genreLabel} · Marimba Orquesta Chiapas
        </span>
      </div>

      <div className="mini-player-controls">
        <button
          type="button"
          className="play-btn-interactive"
          style={{ width: "2.4rem", height: "2.4rem" }}
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pausar melodía" : "Reproducir melodía"}
        >
          <Icon name={isPlaying ? "pause" : "play"} />
        </button>

        <button
          type="button"
          className="mini-player-btn mini-player-close"
          onClick={onClose}
          aria-label="Cerrar reproductor"
          title="Detener y cerrar"
        >
          <Icon name="close" />
        </button>
      </div>
    </aside>
  );
}

function SongCardItem({
  song,
  index,
  isPlaying,
  isActive,
  onTogglePlay,
}: {
  song: Song;
  index: number;
  isPlaying: boolean;
  isActive: boolean;
  onTogglePlay: (song: Song) => void;
}) {
  const getBadgeClass = (genre: Genre) => {
    switch (genre) {
      case "Boleros":
        return "badge-boleros";
      case "Vals y rancheras":
        return "badge-vals";
      case "Cumbias y mambos":
        return "badge-cumbias";
      case "Zapateados":
        return "badge-zapateados";
      case "Corridos":
        return "badge-corridos";
    }
  };

  return (
    <article
      className={`repertoire-card ${isActive ? "is-active-track" : ""}`}
      id={`song-${song.id}`}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <span className={`category-badge ${getBadgeClass(song.genre)}`}>
          {song.genreLabel}
        </span>
        <span
          style={{
            fontSize: "0.6rem",
            color: "#9f7d67",
            fontWeight: 600,
          }}
        >
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="repertoire-copy">
        <h3>{song.title}</h3>
        <span>{song.description}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1.1rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid rgba(106, 62, 37, 0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <button
            type="button"
            className={`play-btn-interactive ${isActive && isPlaying ? "is-playing" : ""}`}
            onClick={() => onTogglePlay(song)}
            aria-label={
              isActive && isPlaying
                ? `Pausar ${song.title}`
                : `Escuchar ${song.title}`
            }
          >
            <Icon name={isActive && isPlaying ? "pause" : "play"} />
          </button>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 600,
                color: isActive && isPlaying ? "var(--green)" : "var(--brown)",
              }}
            >
              {isActive && isPlaying
                ? "Reproduciendo..."
                : isActive
                ? "Pausado"
                : "Escuchar audio"}
            </span>
            <small style={{ fontSize: "0.5rem", color: "#8a6f5e" }}>
              Audio en vivo
            </small>
          </div>
        </div>

        {isActive && isPlaying && (
          <div className="equalizer-anim" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </article>
  );
}

function HomePage({
  onNavigate,
  currentSong,
  isPlaying,
  onTogglePlay,
}: {
  onNavigate: (route: string) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: (song: Song) => void;
}) {
  // Top featured tracks from distinct genres
  const featuredSongs = useMemo(() => {
    return [
      songsData.find((s) => s.id === "popurri-fiesta-coiteca"),
      songsData.find((s) => s.id === "camino-verde"),
      songsData.find((s) => s.id === "quien-sera"),
    ].filter(Boolean) as Song[];
  }, []);

  return (
    <>
      <main>
        <PageHero
          home
          title="Marimba Orquesta Chiapas"
          subtitle="Del Mtro. Rogelio Gómez · Amenizamos todo tipo de eventos en Chiapas y sus alrededores"
          onNavigate={onNavigate}
        />

        <ContactPanel featured />

        <div className="cenefa-marqueteria" aria-hidden="true" />

        <PresentationBanner onNavigate={onNavigate} />

        {/* Featured Preview Tracks */}
        <section className="featured-section shell">
          <SectionTitle
            eyebrow="Selección Especial"
            title="Muestras Destacadas de Nuestro Repertorio"
            description="Escucha la calidad y virtuosismo con la que amenizamos tus momentos más memorables"
          />
          <div className="repertoire-grid">
            {featuredSongs.map((song, index) => (
              <SongCardItem
                key={song.id}
                song={song}
                index={index}
                isActive={currentSong?.id === song.id}
                isPlaying={isPlaying}
                onTogglePlay={onTogglePlay}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              type="button"
              className="text-action"
              style={{
                cursor: "pointer",
                background: "transparent",
                border: 0,
              }}
              onClick={() => onNavigate("/repertorio")}
            >
              <span>Explorar las {songsData.length} melodías completas</span>
              <Icon name="arrow" />
            </button>
          </div>
        </section>

        <div className="cenefa-marqueteria" aria-hidden="true" />

        {/* Live Video Showcase */}
        <VideoGallery />

        {/* Booking CTA Banner */}
        <section className="home-booking shell">
          <div>
            <p className="eyebrow">Celebremos juntos</p>
            <h2>La música perfecta para tu fecha especial.</h2>
          </div>
          <p>
            Bodas, XV años, carnavales, serenatas, fiestas patronales y eventos
            empresariales con la excelencia y calidez del Mtro. Rogelio Gómez.
          </p>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <WhatsAppButton />
            <button
              type="button"
              className="cream-button"
              onClick={() => onNavigate("/reserva")}
            >
              <span>Conocer opciones</span>
              <Icon name="arrow" />
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

function RepertoirePage({
  currentSong,
  isPlaying,
  onTogglePlay,
}: {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: (song: Song) => void;
}) {
  const [genre, setGenre] =
    useState<(typeof genreFilters)[number]>("Todo");
  const [query, setQuery] = useState("");

  const filteredSongs = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    return songsData.filter((song) => {
      const matchesGenre = genre === "Todo" || song.genre === genre;
      const matchesQuery =
        !normalizedQuery ||
        normalizeText(song.title).includes(normalizedQuery) ||
        normalizeText(song.genreLabel).includes(normalizedQuery) ||
        normalizeText(song.description).includes(normalizedQuery);
      return matchesGenre && matchesQuery;
    });
  }, [genre, query]);

  return (
    <main>
      <PageHero
        title="Repertorio Oficial"
        subtitle={`Catálogo completo de ${songsData.length} melodías para tu evento · Selecciona un género o busca tu canción favorita`}
      />

      <div className="cenefa-marqueteria" aria-hidden="true" />

      <section className="repertoire-section shell">
        <div className="repertoire-tools">
          <div className="filters" role="tablist" aria-label="Filtrar repertorio por género">
            {genreFilters.map((item) => {
              const count =
                item === "Todo"
                  ? songsData.length
                  : songsData.filter((s) => s.genre === item).length;
              return (
                <button
                  className={genre === item ? "active" : ""}
                  type="button"
                  key={item}
                  role="tab"
                  aria-selected={genre === item}
                  onClick={() => setGenre(item)}
                >
                  {item} ({count})
                </button>
              );
            })}
          </div>

          <label className="search-box">
            <span className="sr-only">Buscar melodía</span>
            <Icon name="search" />
            <input
              type="search"
              placeholder="Buscar melodía, son o autor..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Buscar melodía"
            />
          </label>
        </div>

        <div className="result-count" aria-live="polite">
          <span>{filteredSongs.length} melodías encontradas</span>
          <i />
          <span>Categoría: {genre}</span>
        </div>

        {filteredSongs.length ? (
          <div className="repertoire-grid">
            {filteredSongs.map((song, index) => (
              <SongCardItem
                key={song.id}
                song={song}
                index={index}
                isActive={currentSong?.id === song.id}
                isPlaying={isPlaying}
                onTogglePlay={onTogglePlay}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="music" />
            <h2>No encontramos esa melodía</h2>
            <p>
              Prueba con otro título o limpia el filtro para ver todo el
              repertorio disponible.
            </p>
            <button
              type="button"
              onClick={() => {
                setGenre("Todo");
                setQuery("");
              }}
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function BookingPage() {
  const eventTypes = [
    "Bodas y Aniversarios",
    "XV Años",
    "Carnaval Zoque y Fiestas Tradicionales",
    "Serenatas de Gala",
    "Graduaciones y Bautizos",
    "Eventos Empresariales",
  ];

  const [selectedEvent, setSelectedEvent] = useState<string>(eventTypes[0]);

  const customMessage = `Hola, me gustaría cotizar a la Marimba Orquesta Chiapas para un evento de: ${selectedEvent}. ¿Me podrían dar información de presupuesto y disponibilidad?`;

  return (
    <main>
      <PageHero
        title="Reserva la Marimba"
        subtitle="Tu fecha especial merece la auténtica música tradicional y orquesta en vivo"
      />

      <div className="cenefa-marqueteria" aria-hidden="true" />

      <section className="booking-section shell">
        <div className="booking-card">
          <div className="booking-main">
            <span className="presentation-badge" style={{ position: "static", display: "inline-block", marginBottom: "0.8rem" }}>
              Atención Directa e Inmediata
            </span>
            <h2>¿Tienes una fecha especial en puerta?</h2>
            <p>
              Haz que tu evento sea inolvidable con la música de la{" "}
              <strong>Marimba Orquesta Chiapas</strong> del{" "}
              <strong>Mtro. Rogelio Gómez</strong>. Cotiza directamente a través
              de WhatsApp para recibir presupuesto, disponibilidad y asesoría
              personalizada al instante.
            </p>

            <div style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontSize: "0.64rem",
                  fontWeight: 600,
                  color: "#8a5840",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.6rem",
                }}
              >
                Selecciona tu tipo de evento:
              </p>
              <div className="event-tags">
                {eventTypes.map((event) => (
                  <button
                    key={event}
                    type="button"
                    className={`event-chip-btn ${
                      selectedEvent === event ? "is-selected" : ""
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.8rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
              }}
            >
              <WhatsAppButton customText={customMessage} />
              <a
                href="tel:+529681065475"
                className="cream-button"
                style={{ background: "#f2dec4" }}
              >
                <Icon name="mobile" />
                <span>Llamar al Celular</span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="facebook-btn"
              >
                <Icon name="facebook" />
                <span>Facebook Oficial</span>
              </a>
            </div>
          </div>

          <aside className="booking-aside">
            <Icon name="calendar" />
            <p>Datos del Servicio</p>
            <dl>
              <div>
                <dt>Dirección Artística</dt>
                <dd>Mtro. Rogelio Gómez</dd>
              </div>
              <div>
                <dt>Horario de atención</dt>
                <dd>Lunes a domingo · 9:00 a 21:00 hrs</dd>
              </div>
              <div>
                <dt>Cobertura</dt>
                <dd>Ocozocoautla, Tuxtla Gutiérrez, Chiapas y alrededores</dd>
              </div>
              <div>
                <dt>Modalidades</dt>
                <dd>Marimba tradicional, ensamble y orquesta completa</dd>
              </div>
              <div>
                <dt>Respuesta</dt>
                <dd>Directa e inmediata vía WhatsApp</dd>
              </div>
            </dl>
          </aside>
        </div>

        <ContactPanel />
      </section>
    </main>
  );
}

function Footer({ onNavigate }: { onNavigate: (route: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="cenefa-marqueteria" aria-hidden="true" />
      <div className="shell footer-inner">
        <div>
          <Brand onNavigate={onNavigate} />
          <p style={{ marginTop: "0.5rem" }}>
            Del <strong>Mtro. Rogelio Gómez</strong>. Música tradicional y
            orquesta en vivo desde Ocozocoautla de Espinosa, Chiapas.
          </p>
        </div>

        <div>
          <p
            style={{
              fontWeight: 600,
              color: "#fff4da",
              marginBottom: "0.4rem",
              fontSize: "0.72rem",
            }}
          >
            Contacto Directo
          </p>
          <p>Celular: 968 106 5475 · Casa: 968 688 3081</p>
          <p>2a. Ote. Sur #758 B. San Antonio, Ocozocoautla, Chiapas</p>
        </div>

        <nav aria-label="Navegación secundaria">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/");
            }}
          >
            Inicio
          </a>
          <a
            href="/repertorio"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/repertorio");
            }}
          >
            Repertorio ({songsData.length})
          </a>
          <a
            href="/reserva"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/reserva");
            }}
          >
            Contacto / Cotizar
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
          >
            <Icon name="facebook" />
            <span>Facebook Oficial</span>
          </a>
        </nav>
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255, 240, 215, 0.12)",
          padding: "1rem 0",
          textAlign: "center",
          fontSize: "0.58rem",
          color: "#d9bda0",
        }}
      >
        © {new Date().getFullYear()} Marimba Orquesta Chiapas. Todos los
        derechos reservados.
      </div>
    </footer>
  );
}

function NotFound({ onNavigate }: { onNavigate: (route: string) => void }) {
  return (
    <main className="not-found">
      <Icon name="music" />
      <p className="eyebrow">Error 404</p>
      <h1>Esta melodía no está en el repertorio.</h1>
      <button
        type="button"
        className="cream-button"
        style={{ marginTop: "1rem" }}
        onClick={() => onNavigate("/")}
      >
        Volver al inicio
      </button>
    </main>
  );
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const raw = window.location.pathname.replace(/\/+$/, "") || "/";
    if (raw === "/cotizanos") return "/reserva";
    return raw;
  });

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and handle global single-audio manager
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handleError = () => {
      console.warn("Error reproduciendo audio:", audio.src);
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const handleTogglePlay = useCallback(
    (song: Song) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (currentSong?.id === song.id) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.error("Error al reanudar audio:", err));
        }
      } else {
        audio.pause();
        audio.currentTime = 0;
        audio.src = encodeURI(song.src);
        setCurrentSong(song);
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("Error al iniciar audio:", err));
      }
    },
    [currentSong, isPlaying],
  );

  const handleClosePlayer = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setCurrentSong(null);
    setIsPlaying(false);
  }, []);

  const handleNavigate = useCallback((route: string) => {
    const cleanRoute = route === "/cotizanos" ? "/reserva" : route;
    setCurrentRoute(cleanRoute);
    window.history.pushState({}, "", cleanRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const raw = window.location.pathname.replace(/\/+$/, "") || "/";
      setCurrentRoute(raw === "/cotizanos" ? "/reserva" : raw);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderCurrentPage = () => {
    if (currentRoute === "/") {
      return (
        <HomePage
          onNavigate={handleNavigate}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />
      );
    }
    if (currentRoute === "/repertorio") {
      return (
        <RepertoirePage
          currentSong={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />
      );
    }
    if (currentRoute === "/reserva" || currentRoute === "/cotizanos") {
      return <BookingPage />;
    }
    return <NotFound onNavigate={handleNavigate} />;
  };

  return (
    <>
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      {renderCurrentPage()}

      <Footer onNavigate={handleNavigate} />

      {/* Persistent Floating Mini-Player when a song is selected */}
      {currentSong && (
        <MiniPlayerBar
          currentSong={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={() => handleTogglePlay(currentSong)}
          onClose={handleClosePlayer}
        />
      )}

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton short className="floating-whatsapp" />
    </>
  );
}
