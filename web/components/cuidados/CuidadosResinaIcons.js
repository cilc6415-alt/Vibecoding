import { useId } from "react"

const INK = "#1C1C1C"
const PINK = "#C94A8A"
const TRAZO = 2.4

function Marco({ className, children }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      {children}
    </svg>
  )
}

export function IconoMano({ className }) {
  const rawId = useId().replace(/:/g, "")
  const clip0 = `${rawId}c0`
  const clip1 = `${rawId}c1`
  const clip2 = `${rawId}c2`

  return (
    <svg viewBox="0 0 206 218" className={className} aria-hidden overflow="visible">
      <defs>
        <clipPath id={clip0}>
          <path
            d="M544.795 354.462 614.1 284.334 742.964 411.686 673.658 481.814Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </clipPath>
        <clipPath id={clip1}>
          <path
            d="M544.795 354.462 614.1 284.334 742.964 411.686 673.658 481.814Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </clipPath>
        <clipPath id={clip2}>
          <path
            d="M528.176 366.552 625.678 267.893 762.652 403.259 665.15 501.919Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </clipPath>
      </defs>
      <g className="resina-cloth">
        <g transform="translate(-538 -265)">
          <path
            d="M538.878 349.613C582.059 324.268 593.127 298.19 618.976 270.797 645.834 313.793 675.489 344.876 703.746 381.916L617.265 463.73C591.136 425.691 579.473 392.421 538.878 349.613Z"
            fill="#C94A8A"
            fillRule="evenodd"
          />
          <g clipPath={`url(#${clip0})`}>
            <g clipPath={`url(#${clip1})`}>
              <g clipPath={`url(#${clip2})`}>
                <path
                  d="M35.3999 33.2325C39.0121 33.2325 41.9019 36.1223 41.9019 39.7345L41.9019 67.9099C41.9019 68.6324 42.6243 69.3548 43.3468 69.3548 44.0692 69.3548 44.7917 68.6324 44.7917 67.9099L44.7917 25.2856C44.7917 21.6734 47.6814 18.7836 51.2937 18.7836 54.9059 18.7836 57.7957 21.6734 57.7957 25.2856L57.7957 67.9099C57.7957 68.6324 58.5181 69.3548 59.2406 69.3548 59.963 69.3548 60.6855 68.6324 60.6855 67.9099L60.6855 16.4718 60.6855 16.4718C60.6855 13.004 63.5753 10.1142 67.1875 10.1142 70.7997 10.1142 73.6895 13.004 73.6895 16.4718L73.6895 16.4718 73.6895 67.9099C73.6895 68.6324 74.412 69.3548 75.1344 69.3548 75.8568 69.3548 76.5793 68.6324 76.5793 67.9099L76.5793 25.2856C76.5793 21.6734 79.4691 18.7836 83.0813 18.7836 86.6935 18.7836 89.5833 21.6734 89.5833 25.2856L89.5833 67.9099 89.5833 84.5262 95.5074 57.7957C96.3743 53.8945 100.276 51.4382 104.177 52.3051 108.078 53.172 110.534 57.0732 109.667 60.9745L100.998 99.9865C100.565 101.431 99.6976 102.876 98.2527 104.032L82.3589 116.314 82.3589 127.151 40.457 127.151 40.457 119.926C40.457 109.667 28.8978 108.945 28.8978 89.5833 28.8978 88.8609 28.8978 39.7345 28.8978 39.7345 28.8978 36.1223 31.7876 33.2325 35.3999 33.2325Z"
                  stroke="#000000"
                  strokeWidth="3.12878"
                  fill="#FFFFFF"
                  transform="matrix(0.702922 -0.711267 0.987484 0.975899 528.176 366.552)"
                />
              </g>
            </g>
          </g>
          <path
            d="M546.24 439.079 559.898 433.195 563.457 419.874 569.655 432.192 584.224 435.171 570.566 441.054 567.007 454.376 560.81 442.058Z"
            fill="#C94A8A"
            fillRule="evenodd"
          />
          <path
            d="M546.24 284.829 559.898 278.946 563.457 265.624 569.655 277.942 584.224 280.921 570.566 286.805 567.007 300.126 560.81 287.808Z"
            fill="#C94A8A"
            fillRule="evenodd"
          />
          <path
            d="M663.498 308.302 677.156 302.419 680.715 289.097 686.913 301.415 701.482 304.394 687.825 310.277 684.265 323.599 678.068 311.281Z"
            fill="#C94A8A"
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  )
}

export function IconoMatraz({ className }) {
  return (
    <Marco className={className}>
      <path
        d="M18.5 8h11M21.2 8v6.8L12.2 33.8A7.2 7.2 0 0 0 18.8 43h10.4a7.2 7.2 0 0 0 6.6-9.2L26.8 14.8V8"
        stroke={INK}
        strokeWidth={TRAZO}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g className="resina-ban" stroke={PINK} strokeWidth="2.5" strokeLinecap="round">
        <circle cx="26" cy="24" r="6" />
        <path d="M21.8 28.2 30.2 19.8" />
      </g>
    </Marco>
  )
}

export function IconoEscudo({ className }) {
  return (
    <Marco className={className}>
      <path
        d="M24 7 36.5 12.2v8.6c0 8-5.2 13.4-12.5 16.2C16.7 34.2 11.5 28.8 11.5 20.8v-8.6L24 7Z"
        stroke={INK}
        strokeWidth={TRAZO}
        strokeLinejoin="round"
      />
      <path
        d="M8.5 22.5c-1.8.8-2.2 2.4-.4 3.2M39.5 22.5c1.8.8 2.2 2.4.4 3.2"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        className="resina-check"
        pathLength="1"
        d="M17.2 24.6 21.6 29.2 31.2 18.6"
        stroke={PINK}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Marco>
  )
}

export function IconoSol({ className }) {
  return (
    <Marco className={className}>
      <circle cx="24" cy="24" r="8" stroke={INK} strokeWidth={TRAZO} />
      <circle cx="24" cy="24" r="3.6" fill={PINK} />
      <g className="resina-rays" stroke={PINK} strokeWidth="2.4" strokeLinecap="round">
        <path d="M24 7v4.2M24 36.8V41M7 24h4.2M36.8 24H41M12.2 12.2l3 3M32.8 32.8l3 3M35.8 12.2l-3 3M15.2 32.8l-3 3" />
      </g>
    </Marco>
  )
}

export function IconoLlave({ className }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden overflow="visible">
      <g fill="none" stroke="#000000" strokeWidth="26" strokeMiterlimit="10">
        <path d="M68.5,301.33H15.91c-3.27,0-5.92-2.65-5.92-5.92V133.65c0-3.27,2.65-5.92,5.92-5.92H68.5c3.27,0,5.92,2.65,5.92,5.92v161.76C74.43,298.68,71.77,301.33,68.5,301.33z" />
        <path d="M450.94,307.5c-0.64-15.19-1.03-26.99-4.43-41.97c-3.39-14.96-8.37-27.16-13.28-36.72c-6.85-13.33-14.22-22.85-24.27-29.44c-1.08-0.71-2.12-1.34-2.92-1.82c-5.14-3.1-14.85-8.42-28.07-12.61c-19.11-6.06-35.13-6.99-47.15-7.61c-13.5-0.7-25.36-0.16-35,0.76c-0.26,1.94-0.53,3.88-0.79,5.82c-0.46-0.94-1-1.85-1.5-2.77v-5.09h-3.06c-8.84-13.46-22.18-24.28-38.17-30.89V93.57c37.92,10.21,73.7,9.13,91.4-1.61c4.31-2.61,11.4-8.13,13.15-18.78v-9.63c-1.75-10.64-8.81-16.16-13.15-18.78c-17.89-10.83-54.24-11.82-92.8-1.27c-8.18-9.01-20.69-14.78-34.73-14.78c-13.97,0-26.42,5.71-34.61,14.64c-38.67-10.46-75.03-9.44-92.92,1.42c-4.36,2.65-11.39,8.16-13.15,18.78v9.63c1.76,10.63,8.82,16.15,13.15,18.78c17.69,10.75,53.41,11.87,91.4,1.78v51.41c-16.02,6.61-29.38,17.43-38.23,30.9H74.43v76.96h67.41c14.92,22.72,42.62,38,74.35,38c31.73,0,59.4-15.29,74.32-38h3.03v-5.05c0.63-1.15,1.27-2.29,1.83-3.47c7.98-1.48,18.12-2.27,29.48-0.53c9.04,1.39,22.34,3.43,32.46,13.12c7.18,6.87,9.44,14.41,11.8,22.3c1.14,3.79,2.5,9.54,2.95,31.48c0.2,9.79,0.12,17.92,0,23.61c26.29,0.19,52.58,0.39,78.86,0.58C451.24,328.12,451.41,318.69,450.94,307.5z" />
      </g>
      <g className="resina-drop">
        <path
          fill="#C94A8A"
          d="M465.15,473.43c-6.92,17.04-28.36,27.24-47.68,28.32c-19.08,1.07-40.92-6.48-51.96-23.25c-7.61-11.55-8.87-25.63-4.8-36.95c1.7-4.73,2.85-4.88,10.24-15.65c13.07-19.09,25.24-41.67,27.07-45.09c6.67-12.45,9.22-18.56,12.88-18.31c3.29,0.22,4.01,5.34,10.33,17.63c4.39,8.52,8.39,14.51,15.34,24.91c4.3,6.43,4.02,5.51,12.44,17.42c15.11,21.36,16.61,25.14,17.48,28.87C467.13,454.07,469.2,463.48,465.15,473.43z"
        />
      </g>
    </svg>
  )
}

export function IconoTermometro({ className }) {
  return (
    <Marco className={className}>
      <path
        d="M19.5 9a4.6 4.6 0 0 1 9.2 0v14.6a8 8 0 1 1-9.2 0V9Z"
        stroke={INK}
        strokeWidth={TRAZO}
        strokeLinejoin="round"
      />
      <g className="resina-level">
        <rect x="22.2" y="21" width="4" height="11" rx="2" fill={PINK} />
        <circle cx="24.2" cy="34.6" r="3.6" fill={PINK} />
      </g>
      <g className="resina-heat" stroke={PINK} strokeWidth="2.3" strokeLinecap="round">
        <path d="M34 12.5h5" className="resina-heat__line" />
        <path d="M34 17h6.2" className="resina-heat__line" />
        <path d="M34 21.5h4.2" className="resina-heat__line" />
      </g>
    </Marco>
  )
}
