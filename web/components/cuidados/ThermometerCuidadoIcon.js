/** Termómetro outline con nivel interior y líneas de calor (colores vía currentColor). */
export default function ThermometerCuidadoIcon({ className = "size-7" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Contorno: tubo + bulbo (proporción similar a Lucide Thermometer) */}
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      <path d="M9.5 3.5h5" opacity="0.35" />

      {/* Nivel interior (sube en hover vía CSS) */}
      <g className="cuidado-thermo-level" fill="currentColor" stroke="none">
        <rect x="10.75" y="12" width="2.5" height="6.5" rx="1.25" />
        <circle cx="12" cy="18.2" r="2.1" />
      </g>

      {/* Líneas de calor a la derecha */}
      <g className="cuidado-thermo-heat" stroke="currentColor" strokeWidth="1.5">
        <line className="cuidado-thermo-heat__line" x1="17.2" y1="6" x2="20" y2="6" />
        <line className="cuidado-thermo-heat__line" x1="17.2" y1="9" x2="20.5" y2="9" />
        <line className="cuidado-thermo-heat__line" x1="17.2" y1="12" x2="19.5" y2="12" />
      </g>
    </svg>
  )
}
