import { fmtMonthYear } from "../utils/formatters";

export default function Header({ viewDate, onChangeMonth, onExport }) {
  return (
    <header>
      <div className="logo">
        <div className="logo-mark">
          <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
            <rect x="4" y="4" width="32" height="32" rx="9" stroke="url(#gld)" strokeWidth="1.2" />
            <path d="M13 20h14M20 13v14" stroke="url(#gld2)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 15l12 10M26 15L14 25" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" strokeLinecap="round" />
            <defs>
              <linearGradient id="gld" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c9a84c" /><stop offset="1" stopColor="#f5e0a0" />
              </linearGradient>
              <linearGradient id="gld2" x1="13" y1="13" x2="27" y2="27" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f5e0a0" /><stop offset="1" stopColor="#c9a84c" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          <div className="logo-text">Vault</div>
          <div className="logo-sub">Personal Finance</div>
        </div>
      </div>

      <div className="header-right">
        <div className="header-month">
          <button className="hdr-btn" onClick={() => onChangeMonth(-1)}>←</button>
          <span style={{ minWidth: 130, textAlign: "center" }}>{fmtMonthYear(viewDate)}</span>
          <button className="hdr-btn" onClick={() => onChangeMonth(1)}>→</button>
        </div>
        <button className="export-btn" onClick={onExport}>↓ Export CSV</button>
      </div>
    </header>
  );
}