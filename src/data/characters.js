function adjustColor(hex, amount) {
  const num = parseInt(hex.slice(1), 16);
  let r = ((num >> 16) & 0xff) + amount;
  let g = ((num >> 8) & 0xff) + amount;
  let b = (num & 0xff) + amount;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

export function characterPortraitSVG(ch) {
  const color = ch.color;
  const darkColor = adjustColor(color, -50);
  const lightColor = adjustColor(color, 30);
  const bgId = 'bg-' + ch.id;

  const bg = `
    <defs>
      <radialGradient id="${bgId}" cx="50%" cy="35%" r="75%">
        <stop offset="0%" stop-color="${lightColor}"/>
        <stop offset="55%" stop-color="${color}"/>
        <stop offset="100%" stop-color="${darkColor}"/>
      </radialGradient>
    </defs>
    <rect width="100" height="100" fill="url(#${bgId})"/>`;

  const icons = {
    madara: `
      <path d="M 10,15 Q 0,5 8,0 L 30,8 Q 38,2 50,4 Q 62,2 70,8 L 92,0 Q 100,5 90,15 L 95,40 Q 100,55 88,62 L 92,80 Q 88,95 75,92 L 70,100 L 60,90 L 50,95 L 40,90 L 30,100 L 25,92 Q 12,95 8,80 L 12,62 Q 0,55 5,40 Z" fill="#000" opacity="0.85"/>
      <circle cx="50" cy="52" r="22" fill="#0a0202"/>
      <circle cx="50" cy="52" r="19" fill="#c41e1e"/>
      <circle cx="50" cy="52" r="19" fill="none" stroke="#3a0505" stroke-width="0.8"/>
      <g transform="translate(50,52)">
        <g transform="rotate(0)"><path d="M 0,-11 A 11,11 0 0,1 -9.5,5.5 A 5.5,5.5 0 0,0 0,0 A 5.5,5.5 0 0,1 0,-11 Z" fill="#000"/></g>
        <g transform="rotate(120)"><path d="M 0,-11 A 11,11 0 0,1 -9.5,5.5 A 5.5,5.5 0 0,0 0,0 A 5.5,5.5 0 0,1 0,-11 Z" fill="#000"/></g>
        <g transform="rotate(240)"><path d="M 0,-11 A 11,11 0 0,1 -9.5,5.5 A 5.5,5.5 0 0,0 0,0 A 5.5,5.5 0 0,1 0,-11 Z" fill="#000"/></g>
      </g>
      <circle cx="50" cy="52" r="4" fill="#0a0202"/>`,
    itachi: `
      <circle cx="72" cy="28" r="12" fill="#1a0808" opacity="0.7"/>
      <circle cx="72" cy="28" r="9" fill="#3a0808" opacity="0.6"/>
      <path d="M 28,55 Q 20,40 25,32 Q 30,28 38,32 L 42,28 Q 48,25 54,30 L 60,28 Q 70,32 72,42 L 78,48 Q 82,55 78,62 L 70,68 Q 60,72 50,70 L 38,72 Q 28,68 28,55 Z" fill="#000" opacity="0.92"/>
      <circle cx="55" cy="44" r="5" fill="#c41e1e"/>
      <g transform="translate(55,44) scale(0.4)">
        <g transform="rotate(0)"><path d="M 0,-8 A 8,8 0 0,1 -7,4 A 4,4 0 0,0 0,0 A 4,4 0 0,1 0,-8 Z" fill="#000"/></g>
        <g transform="rotate(120)"><path d="M 0,-8 A 8,8 0 0,1 -7,4 A 4,4 0 0,0 0,0 A 4,4 0 0,1 0,-8 Z" fill="#000"/></g>
        <g transform="rotate(240)"><path d="M 0,-8 A 8,8 0 0,1 -7,4 A 4,4 0 0,0 0,0 A 4,4 0 0,1 0,-8 Z" fill="#000"/></g>
      </g>
      <path d="M 28,52 L 18,55 L 26,58 Z" fill="#000"/>`,
    pain: `
      <ellipse cx="50" cy="52" rx="32" ry="36" fill="#1a1a1a" opacity="0.4"/>
      <path d="M 18,30 Q 15,10 30,8 Q 40,2 50,5 Q 60,2 70,8 Q 85,10 82,30 L 78,42 Q 70,38 65,32 L 60,35 Q 50,30 40,35 L 35,32 Q 30,38 22,42 Z" fill="#c2410c" opacity="0.85"/>
      <g transform="translate(38,52)"><circle r="8" fill="#0a0202"/><circle r="7" fill="#9d6dc2"/><circle r="5.5" fill="none" stroke="#0a0202" stroke-width="0.8"/><circle r="4" fill="none" stroke="#0a0202" stroke-width="0.8"/><circle r="2.5" fill="none" stroke="#0a0202" stroke-width="0.8"/><circle r="1" fill="#0a0202"/></g>
      <g transform="translate(62,52)"><circle r="8" fill="#0a0202"/><circle r="7" fill="#9d6dc2"/><circle r="5.5" fill="none" stroke="#0a0202" stroke-width="0.8"/><circle r="4" fill="none" stroke="#0a0202" stroke-width="0.8"/><circle r="2.5" fill="none" stroke="#0a0202" stroke-width="0.8"/><circle r="1" fill="#0a0202"/></g>
      <circle cx="50" cy="42" r="1.2" fill="#c0c0c0"/>
      <circle cx="50" cy="46" r="1.2" fill="#c0c0c0"/>
      <circle cx="44" cy="68" r="1.2" fill="#c0c0c0"/>
      <circle cx="50" cy="72" r="1.2" fill="#c0c0c0"/>
      <circle cx="56" cy="68" r="1.2" fill="#c0c0c0"/>`,
    nagato: `
      <path d="M 10,50 Q 5,15 25,8 Q 50,2 75,8 Q 95,15 90,50 L 92,80 Q 88,95 75,90 Q 60,98 50,92 Q 40,98 25,90 Q 12,95 8,80 Z" fill="#7a1a1a" opacity="0.7"/>
      <circle cx="50" cy="52" r="36" fill="#0a0202"/>
      <circle cx="50" cy="52" r="33" fill="#9d6dc2"/>
      <circle cx="50" cy="52" r="27" fill="none" stroke="#0a0202" stroke-width="2"/>
      <circle cx="50" cy="52" r="20" fill="none" stroke="#0a0202" stroke-width="2"/>
      <circle cx="50" cy="52" r="13" fill="none" stroke="#0a0202" stroke-width="2"/>
      <circle cx="50" cy="52" r="6" fill="none" stroke="#0a0202" stroke-width="2"/>
      <circle cx="50" cy="52" r="2" fill="#0a0202"/>
      <circle cx="42" cy="44" r="3" fill="#e9d5ff" opacity="0.35"/>`,
    obito: `
      <circle cx="50" cy="52" r="34" fill="#1a0a05"/>
      <circle cx="50" cy="52" r="32" fill="#c2410c"/>
      <g transform="translate(58 48)" fill="none" stroke="#1a0808" stroke-width="2.2" stroke-linecap="round">
        <path d="M 0,0 m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0"/>
        <path d="M -6,-2 a 7,7 0 1,1 0,4"/>
        <path d="M -11,-4 a 12,12 0 1,1 0,9"/>
        <path d="M -16,-7 a 17,17 0 1,1 0,15"/>
        <path d="M -22,-11 a 23,23 0 1,1 0,23"/>
      </g>
      <circle cx="58" cy="48" r="3.5" fill="#c41e1e"/>
      <circle cx="58" cy="48" r="1" fill="#0a0202"/>`,
    sasuke: `
      <path d="M 52,8 L 38,42 L 50,40 L 35,75 L 58,48 L 46,50 L 64,18 Z" fill="#b9c2ff" opacity="0.95"/>
      <g stroke="#b9c2ff" stroke-width="1" stroke-linecap="round" opacity="0.6">
        <line x1="20" y1="20" x2="28" y2="28"/><line x1="80" y1="20" x2="72" y2="28"/>
        <line x1="20" y1="80" x2="28" y2="72"/><line x1="80" y1="80" x2="72" y2="72"/>
      </g>
      <g transform="translate(70 70)">
        <circle r="14" fill="#0a0202"/><circle r="12" fill="#c41e1e"/>
        <g><g transform="rotate(0)"><path d="M 0,-7 A 7,7 0 0,1 -6,3.5 A 3.5,3.5 0 0,0 0,0 A 3.5,3.5 0 0,1 0,-7 Z" fill="#000"/></g>
        <g transform="rotate(120)"><path d="M 0,-7 A 7,7 0 0,1 -6,3.5 A 3.5,3.5 0 0,0 0,0 A 3.5,3.5 0 0,1 0,-7 Z" fill="#000"/></g>
        <g transform="rotate(240)"><path d="M 0,-7 A 7,7 0 0,1 -6,3.5 A 3.5,3.5 0 0,0 0,0 A 3.5,3.5 0 0,1 0,-7 Z" fill="#000"/></g></g>
        <circle r="2" fill="#0a0202"/>
      </g>`,
    orochimaru: `
      <path d="M 25,75 Q 8,75 8,55 Q 8,38 28,38 Q 50,38 50,52 Q 50,62 38,62 Q 30,62 30,55 Q 30,48 40,48 Q 60,48 65,32 Q 70,18 85,18 Q 95,18 95,28" fill="none" stroke="#d4d4d4" stroke-width="8" stroke-linecap="round"/>
      <path d="M 25,75 Q 8,75 8,55 Q 8,38 28,38 Q 50,38 50,52 Q 50,62 38,62 Q 30,62 30,55 Q 30,48 40,48 Q 60,48 65,32 Q 70,18 85,18 Q 95,18 95,28" fill="none" stroke="#7a8a4a" stroke-width="6" stroke-linecap="round" stroke-dasharray="1.5,3" opacity="0.6"/>
      <ellipse cx="93" cy="28" rx="6" ry="5" fill="#d4d4d4"/>
      <ellipse cx="95" cy="27" rx="2" ry="2.5" fill="#facc15"/>`,
    kakashi: `
      <rect x="20" y="15" width="60" height="70" rx="8" fill="#1a1a1a" opacity="0.6"/>
      <circle cx="50" cy="42" r="8" fill="#c41e1e"/>
      <circle cx="50" cy="42" r="6" fill="#c41e1e"/>
      <circle cx="50" cy="42" r="4" fill="none" stroke="#0a0202" stroke-width="0.8"/>
      <circle cx="50" cy="42" r="2.5" fill="none" stroke="#0a0202" stroke-width="0.8"/>
      <circle cx="50" cy="42" r="1.2" fill="#0a0202"/>
      <rect x="25" y="58" width="50" height="8" rx="2" fill="#888" opacity="0.6"/>
      <circle cx="36" cy="35" r="6" fill="#666" opacity="0.8"/>`,
    jiraiya: `
      <path d="M 15,20 Q 10,5 30,5 Q 50,0 70,5 Q 90,5 85,20 L 90,45 Q 95,60 80,65 L 85,80 Q 80,95 65,90 L 50,95 L 35,90 Q 20,95 15,80 L 20,65 Q 5,60 10,45 Z" fill="#d97706" opacity="0.7"/>
      <circle cx="50" cy="50" r="28" fill="#1a1a1a" opacity="0.5"/>
      <text x="50" y="60" text-anchor="middle" font-size="28" fill="#dc2626" font-weight="900" opacity="0.9">蝦</text>
      <circle cx="38" cy="45" r="4" fill="#222"/>
      <circle cx="62" cy="45" r="4" fill="#222"/>`,
    naruto: `
      <circle cx="50" cy="50" r="40" fill="#f97316" opacity="0.3"/>
      <path d="M 20,35 Q 10,20 20,10 L 35,15 Q 50,8 65,15 L 80,10 Q 90,20 80,35 L 85,55 Q 90,70 75,75 L 50,80 L 25,75 Q 10,70 15,55 Z" fill="#f97316" opacity="0.6"/>
      <circle cx="38" cy="48" r="5" fill="#00bfff" opacity="0.9"/>
      <circle cx="62" cy="48" r="5" fill="#00bfff" opacity="0.9"/>
      <path d="M 35,58 Q 38,55 41,58" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 59,58 Q 62,55 65,58" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>`,
    gaara: `
      <circle cx="50" cy="50" r="40" fill="#8B7355" opacity="0.3"/>
      <text x="50" y="40" text-anchor="middle" font-size="32" fill="#dc2626" font-weight="900">愛</text>
      <circle cx="38" cy="58" r="6" fill="#2a2a2a"/>
      <circle cx="62" cy="58" r="6" fill="#2a2a2a"/>
      <circle cx="38" cy="57" r="3" fill="#4a0a0a"/>
      <circle cx="62" cy="57" r="3" fill="#4a0a0a"/>`,
    hashirama: `
      <path d="M 15,30 Q 10,10 30,8 Q 50,2 70,8 Q 90,10 85,30 L 88,55 Q 90,70 75,75 L 50,80 L 25,75 Q 10,70 12,55 Z" fill="#166534" opacity="0.6"/>
      <circle cx="50" cy="50" r="20" fill="#0a1a0a" opacity="0.8"/>
      <text x="50" y="58" text-anchor="middle" font-size="22" fill="#22c55e" font-weight="900">木</text>
      <circle cx="36" cy="43" r="4" fill="#166534" opacity="0.9"/>
      <circle cx="64" cy="43" r="4" fill="#166534" opacity="0.9"/>`,
    tobirama: `
      <path d="M 15,30 Q 10,10 30,8 Q 50,2 70,8 Q 90,10 85,30 L 88,55 Q 90,70 75,75 L 50,80 L 25,75 Q 10,70 12,55 Z" fill="#1e3a5f" opacity="0.6"/>
      <circle cx="50" cy="50" r="20" fill="#0a0a1a" opacity="0.8"/>
      <text x="50" y="58" text-anchor="middle" font-size="22" fill="#60a5fa" font-weight="900">水</text>
      <circle cx="36" cy="43" r="4" fill="#1e3a5f" opacity="0.9"/>
      <circle cx="64" cy="43" r="4" fill="#1e3a5f" opacity="0.9"/>`,
    minato: `
      <path d="M 15,30 Q 10,10 30,8 Q 50,2 70,8 Q 90,10 85,30 L 88,55 Q 90,70 75,75 L 50,80 L 25,75 Q 10,70 12,55 Z" fill="#f59e0b" opacity="0.4"/>
      <path d="M 35,15 L 50,8 L 65,15" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      <circle cx="38" cy="48" r="5" fill="#60a5fa" opacity="0.9"/>
      <circle cx="62" cy="48" r="5" fill="#60a5fa" opacity="0.9"/>
      <text x="50" y="72" text-anchor="middle" font-size="18" fill="#f59e0b" font-weight="900">波</text>`,
    lee: `
      <circle cx="50" cy="50" r="38" fill="#2d6a4f" opacity="0.2"/>
      <ellipse cx="50" cy="45" rx="22" ry="28" fill="#1a1a1a" opacity="0.5"/>
      <circle cx="38" cy="42" r="6" fill="#1a1a1a"/>
      <circle cx="62" cy="42" r="6" fill="#1a1a1a"/>
      <path d="M 35,60 Q 50,68 65,60" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
      <text x="50" y="82" text-anchor="middle" font-size="14" fill="#22c55e" font-weight="700">青春</text>`,
    guy: `
      <circle cx="50" cy="50" r="38" fill="#166534" opacity="0.3"/>
      <ellipse cx="50" cy="45" rx="22" ry="28" fill="#1a1a1a" opacity="0.5"/>
      <circle cx="38" cy="42" r="7" fill="#1a1a1a"/>
      <circle cx="62" cy="42" r="7" fill="#1a1a1a"/>
      <path d="M 30,62 Q 50,74 70,62" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
      <text x="50" y="82" text-anchor="middle" font-size="12" fill="#22c55e" font-weight="700">YOSH!</text>`,
    neji: `
      <path d="M 15,30 Q 10,10 30,8 Q 50,2 70,8 Q 90,10 85,30 L 88,55 Q 90,70 75,75 L 50,80 L 25,75 Q 10,70 12,55 Z" fill="#1e1e5a" opacity="0.5"/>
      <circle cx="38" cy="48" r="7" fill="#c0c0f0" opacity="0.9"/>
      <circle cx="62" cy="48" r="7" fill="#c0c0f0" opacity="0.9"/>
      <circle cx="38" cy="48" r="3" fill="#5555cc"/>
      <circle cx="62" cy="48" r="3" fill="#5555cc"/>
      <text x="50" y="72" text-anchor="middle" font-size="14" fill="#9999ff" font-weight="700">天</text>`,
    killerbee: `
      <circle cx="50" cy="50" r="38" fill="#1a1a3a" opacity="0.3"/>
      <path d="M 20,30 Q 15,10 35,8 Q 50,3 65,8 Q 85,10 80,30" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
      <circle cx="38" cy="50" r="6" fill="#111"/>
      <circle cx="62" cy="50" r="6" fill="#111"/>
      <circle cx="38" cy="50" r="3" fill="#f59e0b"/>
      <circle cx="62" cy="50" r="3" fill="#f59e0b"/>
      <text x="50" y="74" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">ラップ</text>`,
    shisui: `
      <path d="M 15,30 Q 10,10 30,8 Q 50,2 70,8 Q 90,10 85,30 L 88,55 Q 90,70 75,75 L 50,80 L 25,75 Q 10,70 12,55 Z" fill="#1a0a0a" opacity="0.7"/>
      <circle cx="38" cy="48" r="8" fill="#0a0202"/>
      <circle cx="38" cy="48" r="7" fill="#c41e1e"/>
      <g transform="translate(38,48)"><g transform="rotate(0)"><path d="M 0,-5 A 5,5 0 0,1 -4,2.5 A 2.5,2.5 0 0,0 0,0 A 2.5,2.5 0 0,1 0,-5 Z" fill="#000"/></g><g transform="rotate(120)"><path d="M 0,-5 A 5,5 0 0,1 -4,2.5 A 2.5,2.5 0 0,0 0,0 A 2.5,2.5 0 0,1 0,-5 Z" fill="#000"/></g><g transform="rotate(240)"><path d="M 0,-5 A 5,5 0 0,1 -4,2.5 A 2.5,2.5 0 0,0 0,0 A 2.5,2.5 0 0,1 0,-5 Z" fill="#000"/></g></g>
      <circle cx="62" cy="48" r="8" fill="#0a0202"/>
      <circle cx="62" cy="48" r="7" fill="#c41e1e"/>
      <g transform="translate(62,48)"><g transform="rotate(0)"><path d="M 0,-5 A 5,5 0 0,1 -4,2.5 A 2.5,2.5 0 0,0 0,0 A 2.5,2.5 0 0,1 0,-5 Z" fill="#000"/></g><g transform="rotate(120)"><path d="M 0,-5 A 5,5 0 0,1 -4,2.5 A 2.5,2.5 0 0,0 0,0 A 2.5,2.5 0 0,1 0,-5 Z" fill="#000"/></g><g transform="rotate(240)"><path d="M 0,-5 A 5,5 0 0,1 -4,2.5 A 2.5,2.5 0 0,0 0,0 A 2.5,2.5 0 0,1 0,-5 Z" fill="#000"/></g></g>`,
    hiruzen: `
      <path d="M 15,30 Q 10,10 30,8 Q 50,2 70,8 Q 90,10 85,30 L 88,55 Q 90,70 75,75 L 50,80 L 25,75 Q 10,70 12,55 Z" fill="#92400e" opacity="0.5"/>
      <circle cx="50" cy="48" r="20" fill="#0a0a0a" opacity="0.8"/>
      <text x="50" y="56" text-anchor="middle" font-size="22" fill="#ef4444" font-weight="900">火</text>
      <circle cx="36" cy="40" r="4" fill="#92400e" opacity="0.9"/>
      <circle cx="64" cy="40" r="4" fill="#92400e" opacity="0.9"/>
      <path d="M 35,68 Q 50,75 65,68" fill="none" stroke="#92400e" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`,
    asuma: `
      <circle cx="50" cy="50" r="36" fill="#3f3f46" opacity="0.25"/>
      <ellipse cx="50" cy="46" rx="24" ry="30" fill="#1a1a1a" opacity="0.5"/>
      <circle cx="38" cy="43" r="5" fill="#111"/>
      <circle cx="62" cy="43" r="5" fill="#111"/>
      <line x1="55" y1="62" x2="70" y2="56" stroke="#d4d4aa" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 68,54 Q 72,50 70,46 Q 74,43 72,40" fill="none" stroke="#d4d4aa" stroke-width="1.2" stroke-linecap="round" opacity="0.65"/>
      <path d="M 35,62 Q 50,68 65,62" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round"/>`,
    zabuza: `
      <circle cx="50" cy="50" r="38" fill="#1e3a5f" opacity="0.25"/>
      <ellipse cx="50" cy="46" rx="26" ry="30" fill="#1a2a1a" opacity="0.5"/>
      <circle cx="38" cy="40" r="7" fill="#111"/>
      <circle cx="62" cy="40" r="7" fill="#111"/>
      <circle cx="38" cy="40" r="4" fill="#0a1a2a"/>
      <circle cx="62" cy="40" r="4" fill="#0a1a2a"/>
      <rect x="24" y="52" width="52" height="10" rx="3" fill="#ccc" opacity="0.5"/>
      <rect x="47" y="12" width="6" height="52" rx="2" fill="#777" opacity="0.6"/>`,
  };

  const clans = {
    uchiha:   `<g transform="translate(85 87) scale(0.28)" opacity="0.55"><path d="M 0,-16 A 16,16 0 0,1 0,16 L 0,4 A 4,4 0 0,0 0,-4 Z" fill="#fff"/><path d="M 0,-16 A 16,16 0 0,0 0,16 L 0,4 A 4,4 0 0,1 0,-4 Z" fill="#7a0a0a"/></g>`,
    akatsuki: `<g transform="translate(85 87) scale(0.22)" opacity="0.65"><path d="M -16,-8 Q -22,-20 -8,-22 Q 0,-30 8,-22 Q 22,-20 16,-8 Q 22,4 8,8 Q 0,16 -8,8 Q -22,4 -16,-8 Z" fill="#dc2626" stroke="#fff" stroke-width="2"/></g>`,
    snake:    `<g transform="translate(85 87)" opacity="0.6"><path d="M -6,3 Q -6,-3 0,-3 Q 6,-3 6,2 Q 6,6 2,6 Q -2,6 -2,3" fill="none" stroke="#a3e635" stroke-width="1.5"/></g>`,
    leaf:     `<g transform="translate(85 87) scale(0.25)" opacity="0.55"><circle r="12" fill="none" stroke="#22c55e" stroke-width="2"/><path d="M 0,-8 L 0,8 M -6,-4 L 6,4" stroke="#22c55e" stroke-width="1.5"/></g>`,
    sand:     `<g transform="translate(85 87) scale(0.25)" opacity="0.55"><circle r="12" fill="none" stroke="#b45309" stroke-width="2"/><path d="M 0,-8 L 0,8" stroke="#b45309" stroke-width="1.5"/></g>`,
    cloud:    `<g transform="translate(85 87) scale(0.25)" opacity="0.55"><circle r="12" fill="none" stroke="#f59e0b" stroke-width="2"/><path d="M -6,0 L 6,0 M 0,-6 L 0,6" stroke="#f59e0b" stroke-width="1.5"/></g>`,
    mist:     `<g transform="translate(85 87) scale(0.25)" opacity="0.55"><circle r="12" fill="none" stroke="#60a5fa" stroke-width="2"/><path d="M -8,0 Q -4,-4 0,0 Q 4,4 8,0" stroke="#60a5fa" stroke-width="1.5" fill="none" stroke-linecap="round"/></g>`,
  };

  const icon = icons[ch.id] || `<text x="50" y="60" text-anchor="middle" font-family="serif" font-size="38" font-weight="900" fill="#fff" opacity="0.8">${ch.kanji}</text>`;
  const crest = clans[ch.clan] || '';

  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    ${bg}
    ${icon}
    ${crest}
    <rect width="100" height="100" fill="none" stroke="rgba(0,0,0,0.6)" stroke-width="2"/>
  </svg>`;
}

export const CHARACTERS = {
  madara:     { id: 'madara',     name: 'Мадара Учиха',       jp: 'うちはマダラ',       title: 'Призрак клана Учиха',         kanji: '魔', clan: 'uchiha',   color: '#c41e1e', image: '/characters/madara.png' },
  itachi:     { id: 'itachi',     name: 'Итачи Учиха',        jp: 'うちはイタチ',       title: 'Тень Конохи',                 kanji: '炎', clan: 'uchiha',   color: '#8b0a0a', image: '/characters/itachi.jpg' },
  naruto:     { id: 'naruto',     name: 'Наруто Узумаки',     jp: 'うずまきナルト',     title: 'Хокагэ Конохи',               kanji: '渦', clan: 'leaf',     color: '#f97316', image: '/characters/naruto.jpg' },
  sasuke:     { id: 'sasuke',     name: 'Саске Учиха',        jp: 'うちはサスケ',       title: 'Последний из Учиха',          kanji: '雷', clan: 'uchiha',   color: '#3a2a5a', image: '/characters/sasuke.jpg' },
  jiraiya:    { id: 'jiraiya',    name: 'Джирайя',            jp: '自来也',             title: 'Великий Жаб-Саннин',          kanji: '蝦', clan: 'leaf',     color: '#c2410c', image: '/characters/jiraiya.jpg' },
  kakashi:    { id: 'kakashi',    name: 'Какаши Хатакэ',      jp: 'はたけカカシ',       title: 'Копирующий ниндзя',           kanji: '写', clan: 'leaf',     color: '#4a4a4a', image: '/characters/kakashi.jpg' },
  orochimaru: { id: 'orochimaru', name: 'Орочимару',          jp: '大蛇丸',             title: 'Змей-Саннин',                 kanji: '蛇', clan: 'snake',    color: '#3a5a2a', image: '/characters/orochimaru.jpg' },
  pain:       { id: 'pain',       name: 'Пейн · Тендо',       jp: 'ペイン',             title: 'Бог Амэгакурэ',               kanji: '痛', clan: 'akatsuki', color: '#5a3a8a', image: '/characters/pain.jpg' },
  obito:      { id: 'obito',      name: 'Обито Учиха',        jp: 'うちはオビト',       title: 'Маска тьмы',                  kanji: '影', clan: 'uchiha',   color: '#7a1f3a', image: '/characters/obito.jpg' },
  guy:        { id: 'guy',        name: 'Майто Гай',          jp: 'マイト・ガイ',       title: 'Прекрасный Синий Зверь',      kanji: '青', clan: 'leaf',     color: '#15803d', image: '/characters/guy.jpg' },
  lee:        { id: 'lee',        name: 'Рок Ли',             jp: 'ロック・リー',       title: 'Яркий Маяк Молодости',        kanji: '努', clan: 'leaf',     color: '#166534', image: '/characters/lee.jpg' },
  hashirama:  { id: 'hashirama',  name: 'Хаширама Сенджу',    jp: 'センジュハシラマ',   title: 'Первый Хокагэ',               kanji: '木', clan: 'leaf',     color: '#15803d', image: '/characters/hashirama.jpg' },
  tobirama:   { id: 'tobirama',   name: 'Тобирама Сенджу',    jp: 'センジュトビラマ',   title: 'Второй Хокагэ',               kanji: '水', clan: 'leaf',     color: '#1d4ed8', image: '/characters/tobirama.jpg' },
  minato:     { id: 'minato',     name: 'Минато Намикадзэ',   jp: 'なみかぜミナト',     title: 'Жёлтая Молния Конохи',        kanji: '波', clan: 'leaf',     color: '#ca8a04', image: '/characters/minato.jpg' },
  shisui:     { id: 'shisui',     name: 'Шисуй Учиха',        jp: 'うちはシスイ',       title: 'Шисуй Мираж',                 kanji: '幻', clan: 'uchiha',   color: '#7c1f1f', image: '/characters/shisui.jpg' },
  nagato:     { id: 'nagato',     name: 'Нагато',             jp: '長門',               title: 'Истинный Пейн',               kanji: '輪', clan: 'akatsuki', color: '#6b2d8a', image: '/characters/nagato.jpg' },
  hiruzen:    { id: 'hiruzen',    name: 'Хирузен Сарутоби',   jp: 'さるとびヒルゼン',   title: 'Третий Хокагэ · Профессор',   kanji: '火', clan: 'leaf',     color: '#92400e', image: '/characters/hiruzen.jpg' },
  asuma:      { id: 'asuma',      name: 'Асума Сарутоби',     jp: 'さるとびアスマ',     title: 'Наставник Команды 10',         kanji: '煙', clan: 'leaf',     color: '#52525b', image: '/characters/asuma.jpg' },
  gaara:      { id: 'gaara',      name: 'Гаара',              jp: '我愛羅',             title: 'Казекагэ Суны',               kanji: '愛', clan: 'sand',     color: '#78350f', image: '/characters/gaara.jpg' },
  zabuza:     { id: 'zabuza',     name: 'Забуза Момочи',      jp: 'ももちザブザ',       title: 'Демон Тумана',                kanji: '霧', clan: 'mist',     color: '#1e3a5f', image: '/characters/zabuza.jpg' },
  killerbee:  { id: 'killerbee',  name: 'Киллер Би',          jp: 'キラービー',         title: 'Рэпер-Биджудайки',            kanji: '蜂', clan: 'cloud',    color: '#b45309', image: '/characters/killerbee.jpg' },
  neji:       { id: 'neji',       name: 'Нэджи Хьюга',        jp: 'ヒュウガネジ',       title: 'Гений клана Хьюга',           kanji: '天', clan: 'leaf',     color: '#3730a3', image: '/characters/neji.jpg' },
};
