function tomoePath(cx, cy, r, angle) {
  const big = r;
  const small = r / 2;
  const d =
    `M 0,${-big} ` +
    `A ${big},${big} 0 1,1 0,${big} ` +
    `A ${small},${small} 0 1,0 0,0 ` +
    `A ${small},${small} 0 1,1 0,${-big} Z`;
  return `<path d="${d}" fill="#0a0202" transform="translate(${cx},${cy}) rotate(${angle})"/>`;
}

function svgDefs() {
  return `<defs>
    <radialGradient id="irisRed" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff3030"/>
      <stop offset="60%" stop-color="#c41e1e"/>
      <stop offset="100%" stop-color="#6b0a0a"/>
    </radialGradient>
    <radialGradient id="irisPurple" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="60%" stop-color="#6b2d8a"/>
      <stop offset="100%" stop-color="#2e0d52"/>
    </radialGradient>
    <radialGradient id="rinneRed" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff4040"/>
      <stop offset="50%" stop-color="#c41e1e"/>
      <stop offset="100%" stop-color="#3a0505"/>
    </radialGradient>
    <filter id="glowR" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;
}

function eyeBase(fill = 'url(#irisRed)') {
  return `
    <circle cx="100" cy="100" r="92" fill="#0a0202" stroke="#1a0505" stroke-width="2"/>
    <circle cx="100" cy="100" r="80" fill="${fill}"/>
    <circle cx="100" cy="100" r="80" fill="none" stroke="#3a0505" stroke-width="1.5"/>
  `;
}

function pupil(r = 18) {
  return `
    <circle cx="100" cy="100" r="${r}" fill="#050202"/>
    <circle cx="100" cy="100" r="${r}" fill="none" stroke="#2a0808" stroke-width="1"/>
    <circle cx="${100 - r * 0.3}" cy="${100 - r * 0.3}" r="${r * 0.18}" fill="#ff5555" opacity="0.4"/>
  `;
}

export function sharinganSVGString(stageIdx) {
  const defs = svgDefs();

  switch (stageIdx) {
    case 0: {
      const tomoes = tomoePath(100, 55, 10, 0);
      return `${defs}${eyeBase()}<g class="tomoe-rotate" filter="url(#glowR)">${tomoes}</g>${pupil(20)}`;
    }
    case 1: {
      let tomoes = '';
      [{a: 0, r: 45}, {a: 180, r: 45}].forEach(p => {
        const x = 100 + p.r * Math.sin(p.a * Math.PI / 180);
        const y = 100 - p.r * Math.cos(p.a * Math.PI / 180);
        tomoes += tomoePath(x, y, 10, p.a);
      });
      return `${defs}${eyeBase()}<g class="tomoe-rotate" filter="url(#glowR)">${tomoes}</g>${pupil(20)}`;
    }
    case 2: {
      let tomoes = '';
      [0, 120, 240].forEach(a => {
        const x = 100 + 48 * Math.sin(a * Math.PI / 180);
        const y = 100 - 48 * Math.cos(a * Math.PI / 180);
        tomoes += tomoePath(x, y, 11, a);
      });
      return `${defs}${eyeBase()}<g class="tomoe-rotate" filter="url(#glowR)">${tomoes}</g>${pupil(20)}`;
    }
    case 3: {
      const blade = `<path d="M 100,100 Q 130,60 100,28 Q 88,55 100,100 Z" fill="#0a0202"/>`;
      let blades = '';
      [0, 120, 240].forEach(a => {
        blades += `<g transform="rotate(${a} 100 100)">${blade}</g>`;
      });
      return `${defs}${eyeBase()}<g class="tomoe-rotate" filter="url(#glowR)">${blades}<circle cx="100" cy="100" r="14" fill="#0a0202"/></g><circle cx="100" cy="100" r="8" fill="#050202"/>`;
    }
    case 4: {
      const blade = `<path d="M 100,100 Q 132,55 100,22 Q 88,55 100,100 Z" fill="#0a0202"/>`;
      let blades = '';
      [0, 60, 120, 180, 240, 300].forEach(a => {
        blades += `<g transform="rotate(${a} 100 100)">${blade}</g>`;
      });
      return `${defs}${eyeBase()}<g class="tomoe-rotate" filter="url(#glowR)">${blades}</g><circle cx="100" cy="100" r="12" fill="#0a0202"/><circle cx="100" cy="100" r="6" fill="#050202"/>`;
    }
    case 5: {
      let rings = '';
      [70, 56, 42, 28].forEach(r => {
        rings += `<circle cx="100" cy="100" r="${r}" fill="none" stroke="#0a0202" stroke-width="2.5" opacity="0.85"/>`;
      });
      return `${defs}${eyeBase('url(#irisPurple)')}${rings}<circle cx="100" cy="100" r="10" fill="#0a0202"/><circle cx="100" cy="100" r="6" fill="#050202"/><circle cx="94" cy="94" r="2" fill="#d8b4fe" opacity="0.5"/>`;
    }
    case 6: {
      let rings = '';
      [70, 50, 32].forEach(r => {
        rings += `<circle cx="100" cy="100" r="${r}" fill="none" stroke="#0a0202" stroke-width="2" opacity="0.9"/>`;
      });
      let t1 = '', t2 = '', t3 = '';
      [0, 120, 240].forEach(a => {
        const x = 100 + 60 * Math.sin(a * Math.PI / 180);
        const y = 100 - 60 * Math.cos(a * Math.PI / 180);
        t1 += tomoePath(x, y, 8, a);
      });
      [60, 180, 300].forEach(a => {
        const x = 100 + 41 * Math.sin(a * Math.PI / 180);
        const y = 100 - 41 * Math.cos(a * Math.PI / 180);
        t2 += tomoePath(x, y, 6.5, a);
      });
      [0, 120, 240].forEach(a => {
        const x = 100 + 22 * Math.sin(a * Math.PI / 180);
        const y = 100 - 22 * Math.cos(a * Math.PI / 180);
        t3 += tomoePath(x, y, 5, a);
      });
      return `${defs}${eyeBase('url(#rinneRed)')}${rings}<g class="tomoe-rotate" filter="url(#glowR)">${t1}</g><g class="tomoe-rotate-reverse" filter="url(#glowR)">${t2}</g><g class="tomoe-rotate" filter="url(#glowR)">${t3}</g><circle cx="100" cy="100" r="4" fill="#050202"/>`;
    }
    default:
      return `${defs}${eyeBase()}${pupil(20)}`;
  }
}
