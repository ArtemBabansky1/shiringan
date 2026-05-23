export function miniSharinganSVG(stageIdx) {
  const isPurple = stageIdx === 5;
  const baseColor = isPurple ? '#6b2d8a' : '#c41e1e';
  let content = '';

  if (stageIdx <= 2) {
    const n = stageIdx + 1;
    let tomoes = '';
    for (let i = 0; i < n; i++) {
      const a = i * (360 / n);
      const r = 11;
      const x = 16 + r * Math.sin(a * Math.PI / 180);
      const y = 16 - r * Math.cos(a * Math.PI / 180);
      tomoes += `<circle cx="${x}" cy="${y}" r="3" fill="#0a0202"/>`;
    }
    content = `<circle cx="16" cy="16" r="13" fill="${baseColor}"/><circle cx="16" cy="16" r="13" fill="none" stroke="#3a0505" stroke-width="1"/>${tomoes}<circle cx="16" cy="16" r="3.5" fill="#0a0202"/>`;
  } else if (stageIdx === 3) {
    content = `<circle cx="16" cy="16" r="13" fill="${baseColor}"/>
      <path d="M 16,16 Q 22,7 16,3 Q 13,7 16,16 Z" fill="#0a0202"/>
      <path d="M 16,16 Q 25,19 28,13 Q 22,11 16,16 Z" fill="#0a0202" transform="rotate(120 16 16)"/>
      <path d="M 16,16 Q 25,19 28,13 Q 22,11 16,16 Z" fill="#0a0202" transform="rotate(240 16 16)"/>
      <circle cx="16" cy="16" r="2.5" fill="#0a0202"/>`;
  } else if (stageIdx === 4) {
    let blades = '';
    [0, 60, 120, 180, 240, 300].forEach(a => {
      blades += `<path d="M 16,16 Q 22,7 16,3 Q 13,7 16,16 Z" fill="#0a0202" transform="rotate(${a} 16 16)"/>`;
    });
    content = `<circle cx="16" cy="16" r="13" fill="${baseColor}"/>${blades}<circle cx="16" cy="16" r="2" fill="#0a0202"/>`;
  } else if (stageIdx === 5) {
    content = `<circle cx="16" cy="16" r="13" fill="${baseColor}"/>
      <circle cx="16" cy="16" r="10" fill="none" stroke="#0a0202" stroke-width="1.2"/>
      <circle cx="16" cy="16" r="7" fill="none" stroke="#0a0202" stroke-width="1.2"/>
      <circle cx="16" cy="16" r="4" fill="none" stroke="#0a0202" stroke-width="1.2"/>
      <circle cx="16" cy="16" r="1.8" fill="#0a0202"/>`;
  } else if (stageIdx === 6) {
    content = `<circle cx="16" cy="16" r="13" fill="${baseColor}"/>
      <circle cx="16" cy="16" r="10" fill="none" stroke="#0a0202" stroke-width="1"/>
      <circle cx="16" cy="16" r="7" fill="none" stroke="#0a0202" stroke-width="1"/>
      <circle cx="16" cy="16" r="4" fill="none" stroke="#0a0202" stroke-width="1"/>
      <circle cx="16" cy="5.5" r="1.8" fill="#0a0202"/>
      <circle cx="25" cy="20" r="1.5" fill="#0a0202"/>
      <circle cx="7" cy="20" r="1.5" fill="#0a0202"/>`;
  }

  return `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}
