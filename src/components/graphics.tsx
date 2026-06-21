type GraphicProps = {
  className?: string;
};

/**
 * Layered SVG scene standing in for landscape photography of Elk Island:
 * lake, aspen parkland, rolling hills, and a wood bison silhouette.
 */
export function ElkIslandScene({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 800 500"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efe4cb" />
          <stop offset="100%" stopColor="#ddc9a3" />
        </linearGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4d7a82" />
          <stop offset="100%" stopColor="#2d4b52" />
        </linearGradient>
        <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5a3f" />
          <stop offset="100%" stopColor="#3a4a32" />
        </linearGradient>
        <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f3b2a" />
          <stop offset="100%" stopColor="#211d17" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="url(#sky)" />

      {/* far tree line */}
      <path
        d="M0 260 Q40 235 80 255 Q120 230 160 252 Q200 222 240 250 Q280 228 320 254 Q360 230 400 252 Q440 224 480 250 Q520 232 560 254 Q600 226 640 252 Q680 234 720 254 Q760 230 800 252 V500 H0 Z"
        fill="url(#hillFar)"
        opacity="0.85"
      />

      {/* lake */}
      <path d="M0 330 Q200 300 400 330 Q600 358 800 326 V430 H0 Z" fill="url(#lake)" />
      <path
        d="M40 340 Q200 318 360 340 M460 348 Q620 326 760 344"
        stroke="#efe4cb"
        strokeOpacity="0.25"
        strokeWidth="2"
        fill="none"
      />

      {/* near hills */}
      <path
        d="M0 380 Q120 345 260 372 Q380 392 520 360 Q650 332 800 366 V500 H0 Z"
        fill="url(#hillNear)"
      />

      {/* wood bison silhouette */}
      <g transform="translate(560 372) scale(1.05)" fill="#211d17" opacity="0.92">
        <path d="M0 38c-3-10-2-18 4-23-4-3-6-8-4-13 3 2 6 3 9 2 2-6 7-10 14-10 8 0 13 5 14 12 5-2 10-1 13 3 5-3 11-2 14 3 4-2 8 0 9 4 4 0 7 3 7 7-1 4-5 6-9 5-1 5-5 8-10 7 0 5-4 8-9 7-2 6-8 9-14 7-3 6-9 9-15 7-7 7-17 8-23-1-7 1-13-1-20-7-1 4-4 5-7 4 1 4-1 7-5 6 0 4-3 7-7 6-2 2-5 2-7 0-1-4 1-9 5-12-2-3-2-6 0-9-2-3-2-7 1-10 3 2 7 4 10 4Z" />
        <path d="M0 38 5 52M70 23 73 37" stroke="#211d17" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* foreground reeds */}
      <g stroke="#2f3b2a" strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <path d="M40 420 Q36 395 44 372" fill="none" />
        <path d="M58 424 Q56 398 66 376" fill="none" />
        <path d="M76 420 Q70 400 80 380" fill="none" />
      </g>
    </svg>
  );
}

/**
 * Stylized sock silhouette filled with a landscape-inspired pattern,
 * standing in for product photography of The Elk Island Sock.
 */
export function SockIllustration({ className }: GraphicProps) {
  return (
    <svg viewBox="0 0 360 480" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sockBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efe4cb" />
          <stop offset="45%" stopColor="#ddc9a3" />
          <stop offset="100%" stopColor="#c98552" />
        </linearGradient>
        <linearGradient id="sockCuff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f3b2a" />
          <stop offset="100%" stopColor="#4a5a3f" />
        </linearGradient>
        <clipPath id="sockClip">
          <path d="M120 10h120c8 0 14 6 14 14v150c0 16 6 30 18 42l40 40c20 20 28 46 28 78v40c0 60-40 96-96 96H160c-46 0-78-30-78-78V230c0-20-6-32-20-46-16-16-24-34-24-58V24c0-8 6-14 14-14Z" />
        </clipPath>
      </defs>

      <path
        d="M120 10h120c8 0 14 6 14 14v150c0 16 6 30 18 42l40 40c20 20 28 46 28 78v40c0 60-40 96-96 96H160c-46 0-78-30-78-78V230c0-20-6-32-20-46-16-16-24-34-24-58V24c0-8 6-14 14-14Z"
        fill="url(#sockBody)"
        stroke="#211d17"
        strokeOpacity="0.08"
      />

      <g clipPath="url(#sockClip)">
        {/* landscape band printed on the sock */}
        <rect x="0" y="0" width="360" height="170" fill="url(#sockCuff)" />
        <path d="M0 150 Q90 120 180 148 Q270 174 360 144 V210 H0 Z" fill="#4d7a82" />
        <path d="M0 215 Q100 188 200 214 Q280 236 360 206 V480 H0 Z" fill="#2d4b52" opacity="0.9" />
        <path d="M0 260 Q120 232 240 258 Q300 270 360 252 V480 H0 Z" fill="#3a4a32" opacity="0.85" />
        <circle cx="270" cy="130" r="16" fill="#efe4cb" opacity="0.9" />
      </g>

      {/* heel/toe reinforcement stitch lines */}
      <path d="M150 420c10 18 30 28 50 26" stroke="#211d17" strokeOpacity="0.25" strokeWidth="2" fill="none" />
      <path d="M120 250c-14 8-22 20-22 36" stroke="#211d17" strokeOpacity="0.2" strokeWidth="2" fill="none" />
    </svg>
  );
}

/** Mountain-ridge divider used between sections. */
export function RidgeDivider({ className }: GraphicProps) {
  return (
    <svg viewBox="0 0 1440 80" className={className} preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 60 L120 30 L240 55 L360 18 L480 48 L600 12 L720 44 L840 22 L960 52 L1080 16 L1200 46 L1320 24 L1440 50 V80 H0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Soft topographic line pattern used as a section backdrop accent. */
export function TopoPattern({ className }: GraphicProps) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="200" cy="200" r="40" />
        <circle cx="200" cy="200" r="80" />
        <circle cx="200" cy="200" r="120" />
        <circle cx="200" cy="200" r="160" />
        <circle cx="200" cy="200" r="200" />
      </g>
    </svg>
  );
}
