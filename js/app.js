// ── LIVE CLOCK ──
function updateClock() {
  const el = document.getElementById('live-time');
  if (!el) return;
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  const s = now.getSeconds().toString().padStart(2, '0');
  el.textContent = `LIVE · ${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ── TABS ──
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    if (target === 'signals')   renderSignals();
    if (target === 'portfolio') renderPortfolio();
    if (target === 'risk')      renderRisk();
  });
});

// ── HELPERS ──
function sigClass(signal) {
  if (signal === 'BUY')  return 'sig-buy';
  if (signal === 'SELL') return 'sig-sell';
  return 'sig-hold';
}
function badgeClass(signal) {
  if (signal === 'BUY')  return 'badge-buy';
  if (signal === 'SELL') return 'badge-sell';
  return 'badge-hold';
}
function confClass(signal) {
  if (signal === 'BUY')  return 'conf-buy';
  if (signal === 'SELL') return 'conf-sell';
  return 'conf-hold';
}
function riskClass(risk) {
  if (risk === 'LOW')  return 'risk-low';
  if (risk === 'MED')  return 'risk-med';
  return 'risk-high';
}
function changeHTML(change) {
  if (change >= 0) return `<span class="change-pos">+${change.toFixed(2)}%</span>`;
  return `<span class="change-neg">${change.toFixed(2)}%</span>`;
}
function confColor(signal) {
  if (signal === 'BUY')  return 'var(--up)';
  if (signal === 'SELL') return 'var(--dn)';
  return 'var(--brown-light)';
}

// ── SIGNAL CARD ──
function buildSigCard(s) {
  const upside = (((s.target - s.price) / s.price) * 100).toFixed(1);
  const tfClass = s.tf === 'SHORT' ? 'tf-short' : 'tf-long';

  return `
    <div class="sig-card ${sigClass(s.signal)}" data-ticker="${s.ticker}">
      <div class="sig-top">
        <div>
          <div class="ticker">${s.ticker}</div>
          <div class="company">${s.name}</div>
        </div>
        <span class="sig-badge ${badgeClass(s.signal)}">${s.signal}</span>
      </div>
      <div class="price-row">
        <span class="price">$${s.price.toFixed(2)}</span>
        ${changeHTML(s.change)}
      </div>
      <div class="levels">
        <div class="level">
          <div class="level-label">ENTRY</div>
          <div class="level-val">$${s.entry}</div>
        </div>
        <div class="level">
          <div class="level-label">TARGET</div>
          <div class="level-val" style="color:var(--up)">$${s.target}</div>
        </div>
        <div class="level">
          <div class="level-label">STOP</div>
          <div class="level-val" style="color:var(--dn)">$${s.stop}</div>
        </div>
      </div>
      <div class="conf-bar">
        <div class="conf-fill ${confClass(s.signal)}" style="width:${s.conf}%"></div>
      </div>
      <div class="conf-row">
        <span class="conf-label">CONVICTION</span>
        <span class="conf-val" style="color:${confColor(s.signal)}">${s.conf}%</span>
      </div>
      <div class="meta-row">
        <span class="tf-tag ${tfClass}">${s.tf}-TERM</span>
        <span class="risk-tag ${riskClass(s.risk)}">RISK: ${s.risk}</span>
      </div>
    </div>`;
}

// ── SIGNALS TAB ──
function renderSignals() {
  const buys  = STOCKS.filter(s => s.signal === 'BUY');
  const sells = STOCKS.filter(s => s.signal === 'SELL');
  const holds = STOCKS.filter(s => s.signal === 'HOLD');
  const pct   = ((PORTFOLIO.current / PORTFOLIO.goal) * 100).toFixed(1);

  document.getElementById('main-content').innerHTML = `

    <div class="goal-banner">
      <div class="goal-row">
        <span class="goal-label">GOAL TRACKER — $1M BY JAN 2027</span>
        <span class="goal-pct">${pct}% COMPLETE</span>
      </div>
      <div>
        <span class="goal-current">$${PORTFOLIO.current.toLocaleString()}</span>
        <span class="goal-target">→ $1,000,000</span>
      </div>
      <div class="goal-track">
        <div class="goal-fill" style="width:${pct}%"></div>
      </div>
      <div class="goal-stats">
        <div class="goal-stat">
          <div class="goal-stat-v" style="color:var(--up)">+${PORTFOLIO.ytdReturn}%</div>
          <div class="goal-stat-l">YTD RETURN</div>
        </div>
        <div class="goal-stat">
          <div class="goal-stat-v" style="color:var(--brown-light)">${PORTFOLIO.requiredMonthly}%</div>
          <div class="goal-stat-l">REQ. MONTHLY</div>
        </div>
        <div class="goal-stat">
          <div class="goal-stat-v" style="color:var(--stone-blue-light)">${PORTFOLIO.monthsLeft}mo</div>
          <div class="goal-stat-l">REMAINING</div>
        </div>
        <div class="goal-stat">
          <div class="goal-stat-v" style="color:var(--white)">${PORTFOLIO.cash}%</div>
          <div class="goal-stat-l">CASH</div>
        </div>
      </div>
    </div>

    <div class="summary-row">
      <div class="sum-box">
        <div class="sum-val" style="color:var(--up)">${buys.length} BUY</div>
        <div class="sum-label">ACTIVE SIGNALS</div>
      </div>
      <div class="sum-box">
        <div class="sum-val" style="color:var(--dn)">${sells.length} SELL</div>
        <div class="sum-label">EXIT NOW</div>
      </div>
      <div class="sum-box">
        <div class="sum-val" style="color:var(--brown-light)">${holds.length} HOLD</div>
        <div class="sum-label">MAINTAIN</div>
      </div>
      <div class="sum-box">
        <div class="sum-val" style="color:var(--stone-blue-light)">${PORTFOLIO.winRate}%</div>
        <div class="sum-label">WIN RATE</div>
      </div>
    </div>

    ${sells.length ? `
      <div class="section-label label-sell">
        <span class="urgent-dot"></span>URGENT — EXIT SIGNALS
      </div>
      <div class="signals-grid">${sells.map(buildSigCard).join('')}</div>
    ` : ''}

    <div class="section-label label-buy">HIGH CONVICTION BUYS</div>
    <div class="signals-grid">${buys.map(buildSigCard).join('')}</div>

    <div class="section-label label-hold">HOLD — MAINTAIN POSITION</div>
    <div class="signals-grid">${holds.map(buildSigCard).join('')}</div>
  `;

  bindCards();
}

// ── PORTFOLIO TAB ──
function renderPortfolio() {
  const pct = ((PORTFOLIO.current / PORTFOLIO.goal) * 100).toFixed(1);

  const rows = STOCKS.map(s => {
    const upside = (((s.target - s.price) / s.price) * 100).toFixed(1);
    const alloc  = s.signal !== 'SELL' ? s.pos : 0;
    const dollar = Math.round(PORTFOLIO.current * (alloc / 100));
    const upsideColor = parseFloat(upside) > 0 ? 'var(--up)' : 'var(--dn)';

    return `
      <tr>
        <td>
          <div class="ticker-cell">${s.ticker}</div>
          <div class="name-cell">${s.name}</div>
        </td>
        <td><span class="sig-badge ${badgeClass(s.signal)}">${s.signal}</span></td>
        <td class="price-cell">$${s.price.toFixed(2)}</td>
        <td style="font-family:'Courier New',monospace;font-size:12px;font-weight:700;color:${upsideColor}">
          ${parseFloat(upside) > 0 ? '+' : ''}${upside}%
        </td>
        <td style="font-family:'Courier New',monospace;color:var(--white);font-weight:700;font-size:12px">
          ${alloc > 0 ? alloc + '%' : '—'}
        </td>
        <td style="font-family:'Courier New',monospace;color:var(--stone-blue-light);font-size:12px;font-weight:700">
          ${dollar ? '$' + dollar.toLocaleString() : '—'}
        </td>
      </tr>`;
  }).join('');

  document.getElementById('main-content').innerHTML = `

    <div class="goal-banner">
      <div class="goal-row">
        <span class="goal-label">PORTFOLIO VALUE</span>
        <span class="goal-pct">${pct}% TO TARGET</span>
      </div>
      <div>
        <span class="goal-current">$${PORTFOLIO.current.toLocaleString()}</span>
        <span class="goal-target">/ $1,000,000</span>
      </div>
      <div class="goal-track">
        <div class="goal-fill" style="width:${pct}%"></div>
      </div>
      <div style="font-size:12px;color:var(--grey-text);margin-top:4px">
        Need <strong style="color:var(--brown-light)">${PORTFOLIO.requiredMonthly}% per month</strong>
        to reach goal. Currently running at
        <strong style="color:var(--up)">+${PORTFOLIO.ytdReturn}% YTD</strong>.
      </div>
    </div>

    <div class="section-label" style="color:var(--grey-text)">POSITION SIZING RECOMMENDATIONS</div>

    <div class="table-wrap">
      <table class="port-table">
        <thead>
          <tr>
            <th>TICKER</th>
            <th>SIGNAL</th>
            <th>PRICE</th>
            <th>UPSIDE</th>
            <th>ALLOC %</th>
            <th>$ SIZE</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <div class="strategy-note">
      Maintain <strong>${PORTFOLIO.cash}% cash</strong> reserve for high-conviction entries.
      Concentrate heaviest in LOW RISK / HIGH CONF signals.
      Never exceed 10% in a single position.
      Stop-losses are non-negotiable — set them on entry.
    </div>
  `;
}

// ── RISK TAB ──
function renderRisk() {
  document.getElementById('main-content').innerHTML = `

    <div class="summary-row">
      <div class="sum-box">
        <div class="sum-val" style="color:var(--brown-light)">MED</div>
        <div class="sum-label">MARKET REGIME</div>
      </div>
      <div class="sum-box">
        <div class="sum-val" style="color:var(--white)">18.4</div>
        <div class="sum-label">VIX LEVEL</div>
      </div>
      <div class="sum-box">
        <div class="sum-val" style="color:var(--up)">67%</div>
        <div class="sum-label">BULL MOMENTUM</div>
      </div>
      <div class="sum-box">
        <div class="sum-val" style="color:var(--stone-blue-light)">TECH</div>
        <div class="sum-label">LEAD SECTOR</div>
      </div>
    </div>

    <div class="risk-grid">

      <div class="risk-card">
        <div class="risk-title">MARKET CONDITIONS</div>
        ${[
          ['Trend Strength', 'BULLISH',    'var(--up)'],
          ['Breadth',        'NARROWING',  'var(--brown-light)'],
          ['Volume',         'ABOVE AVG',  'var(--up)'],
          ['Momentum',       'HIGH',       'var(--up)'],
          ['Regime',         'RISK-ON',    'var(--up)'],
        ].map(([n,v,c]) => `
          <div class="risk-item">
            <span class="risk-name">${n}</span>
            <span class="risk-score" style="color:${c}">${v}</span>
          </div>`).join('')}
      </div>

      <div class="risk-card">
        <div class="risk-title">SECTOR ROTATION</div>
        ${[
          ['Technology',  'OVERWEIGHT',  'var(--up)'],
          ['Healthcare',  'NEUTRAL',     'var(--grey-text)'],
          ['Energy',      'UNDERWEIGHT', 'var(--dn)'],
          ['Financials',  'NEUTRAL',     'var(--grey-text)'],
          ['Consumer',    'NEUTRAL',     'var(--grey-text)'],
        ].map(([n,v,c]) => `
          <div class="risk-item">
            <span class="risk-name">${n}</span>
            <span class="risk-score" style="color:${c}">${v}</span>
          </div>`).join('')}
      </div>

      <div class="risk-card">
        <div class="risk-title">DOWNSIDE RISKS</div>
        ${[
          ['Fed Policy',    'MODERATE',  'var(--brown-light)'],
          ['Earnings Miss', 'LOW',       'var(--up)'],
          ['Geopolitical',  'MODERATE',  'var(--brown-light)'],
          ['Liquidity',     'ADEQUATE',  'var(--up)'],
          ['Valuation',     'STRETCHED', 'var(--dn)'],
        ].map(([n,v,c]) => `
          <div class="risk-item">
            <span class="risk-name">${n}</span>
            <span class="risk-score" style="color:${c}">${v}</span>
          </div>`).join('')}
      </div>

      <div class="risk-card">
        <div class="risk-title">POSITION ALERTS</div>
        <div class="alert-box alert-sell">
          <div class="alert-label" style="color:var(--dn)">⚠ URGENT</div>
          TSLA breaking down. Exit immediately at market open.
        </div>
        <div class="alert-box alert-hold">
          <div class="alert-label" style="color:var(--brown-light)">⚡ WATCH</div>
          NVDA approaching target. Consider taking 50% profits at $168.
        </div>
      </div>

    </div>
  `;
}

// ── MODAL ──
function openModal(ticker) {
  const s = STOCKS.find(x => x.ticker === ticker);
  if (!s) return;

  const actionClass = s.signal === 'BUY' ? 'action-buy' : s.signal === 'SELL' ? 'action-sell' : 'action-hold';
  const actionText  = s.signal === 'BUY' ? 'BUY NOW — ENTER POSITION' : s.signal === 'SELL' ? 'SELL IMMEDIATELY — EXIT' : 'HOLD — MAINTAIN POSITION';
  const upside      = (((s.target - s.price) / s.price) * 100).toFixed(1);

  document.getElementById('modal-container').innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <div>
            <span class="modal-ticker">${s.ticker}</span>
            <span style="font-size:11px;color:var(--grey-text);margin-left:10px">${s.name}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="sig-badge ${badgeClass(s.signal)}">${s.signal}</span>
            <button class="modal-close" id="modal-close">×</button>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-reason">${s.reason}</div>
          <div class="modal-grid">
            <div class="modal-stat">
              <div class="modal-stat-v">$${s.price.toFixed(2)}</div>
              <div class="modal-stat-l">CURRENT</div>
            </div>
            <div class="modal-stat">
              <div class="modal-stat-v" style="color:var(--up)">$${s.target}</div>
              <div class="modal-stat-l">TARGET</div>
            </div>
            <div class="modal-stat">
              <div class="modal-stat-v" style="color:var(--dn)">$${s.stop}</div>
              <div class="modal-stat-l">STOP LOSS</div>
            </div>
            <div class="modal-stat">
              <div class="modal-stat-v">${s.conf}%</div>
              <div class="modal-stat-l">CONVICTION</div>
            </div>
            <div class="modal-stat">
              <div class="modal-stat-v" style="color:${s.tf === 'SHORT' ? 'var(--stone-blue-light)' : '#9090c0'}">${s.tf}</div>
              <div class="modal-stat-l">TIMEFRAME</div>
            </div>
            <div class="modal-stat">
              <div class="modal-stat-v" style="color:${s.risk === 'LOW' ? 'var(--up)' : s.risk === 'MED' ? 'var(--brown-light)' : 'var(--dn)'}">${s.risk}</div>
              <div class="modal-stat-l">RISK</div>
            </div>
          </div>
          <button class="modal-action ${actionClass}">${actionText}</button>
        </div>
      </div>
    </div>`;

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
}

function closeModal() {
  document.getElementById('modal-container').innerHTML = '';
}

// ── BIND CARD CLICKS ──
function bindCards() {
  document.querySelectorAll('[data-ticker]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.ticker));
  });
}

// ── INIT ──
renderSignals();