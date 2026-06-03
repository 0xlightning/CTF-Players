/**
 * CTF-Players Web Terminal & Dashboard Controller
 * Handles UI rendering, theme switching, and the interactive terminal CLI.
 * Data is loaded from data.js (CTF_CATALOG & WRITEUP_CONTENT).
 */

// ──────────────────────────────────────────────
// Application State
// ──────────────────────────────────────────────
let state = {
  activeCtf: null,
  activeChallenge: null,
  activeTheme: "default",
  history: [],
  historyIndex: -1
};

// ──────────────────────────────────────────────
// Initialize Application
// ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCtfNavigation();
  updateDashboardStats();
  setupEventListeners();
  runBootSequence();
});

// ──────────────────────────────────────────────
// Boot Sequence Animation
// ──────────────────────────────────────────────
function runBootSequence() {
  const bootScreen = document.getElementById("boot-screen");
  const bootLogs = document.getElementById("boot-logs");
  const mainLayout = document.getElementById("main-layout");

  const logs = [
    "INITIALIZING SYSTEM SECURITY DIAGNOSTIC...",
    "ESTABLISHING SECURE CONNECTION TO 0XLIGHTNING DB...",
    "CRITICAL PROTOCOLS: [ACTIVE]",
    "UPLINK SPEED: 940.2 MBPS (AES-256 HANDSHAKE COMPLETED)",
    "LOADING DATABASE METRIC STRUCTURES...",
    "CATALOGING: DAM CTF (1 challenge)... SUCCESS",
    "CATALOGING: DARK CTF (1 challenge)... SUCCESS",
    "CATALOGING: DOWNUNDER CTF (7 challenges)... SUCCESS",
    "CATALOGING: SYSKRON CTF (7 challenges)... SUCCESS",
    "COMPILING CSS SYSTEM INTERFACES AND RADAR SCOPES...",
    "BOOT SEQUENCE COMPLETED. Welcome back, agent."
  ];

  let currentLogIdx = 0;

  function printLog() {
    if (currentLogIdx < logs.length) {
      const p = document.createElement("p");
      p.className = "mb-1 text-xs text-teal font-mono leading-relaxed";
      p.innerHTML = `<span class="text-cyan font-bold">[+]</span> ${logs[currentLogIdx]}`;
      bootLogs.appendChild(p);
      bootLogs.scrollTop = bootLogs.scrollHeight;
      currentLogIdx++;
      setTimeout(printLog, 120 + Math.random() * 150);
    } else {
      setTimeout(() => {
        gsap.to(bootScreen, {
          opacity: 0,
          duration: 0.8,
          onComplete: () => {
            bootScreen.classList.add("hidden");
            mainLayout.classList.remove("opacity-0");
            gsap.fromTo(mainLayout, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 });
            document.getElementById("terminal-cmd").focus();
          }
        });
      }, 500);
    }
  }

  // Skip boot button
  document.getElementById("skip-boot").addEventListener("click", () => {
    bootScreen.classList.add("hidden");
    mainLayout.classList.remove("opacity-0");
    document.getElementById("terminal-cmd").focus();
  });

  printLog();
}

// ──────────────────────────────────────────────
// Sidebar Navigation
// ──────────────────────────────────────────────
function renderCtfNavigation() {
  const sidebarCtfList = document.getElementById("sidebar-ctf-list");
  if (!sidebarCtfList) return;

  sidebarCtfList.innerHTML = "";

  Object.keys(CTF_CATALOG).forEach(ctfKey => {
    const ctf = CTF_CATALOG[ctfKey];

    const ctfHeader = document.createElement("div");
    ctfHeader.className = "mb-3";
    ctfHeader.innerHTML = `
      <div class="flex items-center justify-between px-3 py-1 bg-slate-900/60 border-l-2 border-cyan text-xs font-mono font-bold text-cyan mb-1 tracking-wider uppercase">
        <span>${ctf.name}</span>
        <span class="text-[10px] text-teal px-1.5 py-0.5 rounded bg-teal/10">${ctf.challenges.length} solved</span>
      </div>
      <ul class="space-y-1 pl-1" id="list-${ctfKey}"></ul>
    `;
    sidebarCtfList.appendChild(ctfHeader);

    const chalList = document.getElementById(`list-${ctfKey}`);
    ctf.challenges.forEach(challenge => {
      const li = document.createElement("li");
      li.innerHTML = `
        <button onclick="selectChallenge('${ctfKey}', '${challenge.key}')"
                class="w-full text-left px-3 py-2 rounded text-sm font-mono flex items-center justify-between group transition-all duration-200 hover:bg-cyan/10 border border-transparent hover:border-cyan/10 text-slate-300 hover:text-white"
                id="btn-${ctfKey}-${challenge.key}">
          <span class="truncate flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_6px_#0df2c9] group-hover:animate-pulse"></span>
            ${challenge.name}
          </span>
          <span class="text-[10px] font-bold text-teal group-hover:text-cyan border border-teal/30 group-hover:border-cyan/30 px-1 rounded bg-teal/5">
            ${challenge.points}
          </span>
        </button>
      `;
      chalList.appendChild(li);
    });
  });
}

// ──────────────────────────────────────────────
// Dashboard Stats
// ──────────────────────────────────────────────
function updateDashboardStats() {
  let totalSolved = 0;
  let totalPoints = 0;
  let categoryCounts = {};

  Object.keys(CTF_CATALOG).forEach(ctfKey => {
    const ctf = CTF_CATALOG[ctfKey];
    ctf.challenges.forEach(c => {
      if (c.solved) {
        totalSolved++;
        totalPoints += c.points;
        categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
      }
    });
  });

  document.getElementById("stat-total-solved").innerText = totalSolved.toString().padStart(2, "0");
  document.getElementById("stat-total-points").innerText = totalPoints.toString();
  document.getElementById("stat-ctfs-count").innerText = Object.keys(CTF_CATALOG).length.toString().padStart(2, "0");

  const categoryContainer = document.getElementById("stat-categories");
  if (categoryContainer) {
    categoryContainer.innerHTML = "";
    Object.keys(categoryCounts).forEach(cat => {
      const div = document.createElement("div");
      div.className = "flex items-center justify-between text-xs font-mono border-b border-slate-800 py-1.5";
      div.innerHTML = `
        <span class="text-slate-400 flex items-center gap-2">
          <span class="w-1 h-1 bg-cyan"></span>
          ${cat}
        </span>
        <span class="text-cyan font-bold">${categoryCounts[cat]} challenges</span>
      `;
      categoryContainer.appendChild(div);
    });
  }
}

// ──────────────────────────────────────────────
// Event Listeners
// ──────────────────────────────────────────────
function setupEventListeners() {
  // Terminal keyboard events
  const cmdInput = document.getElementById("terminal-cmd");
  if (cmdInput) {
    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = cmdInput.value.trim();
        if (command) {
          executeTerminalCommand(command);
          cmdInput.value = "";
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (state.history.length > 0 && state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          cmdInput.value = state.history[state.history.length - 1 - state.historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (state.historyIndex > 0) {
          state.historyIndex--;
          cmdInput.value = state.history[state.history.length - 1 - state.historyIndex];
        } else if (state.historyIndex === 0) {
          state.historyIndex = -1;
          cmdInput.value = "";
        }
      }
    });
  }

  // Dashboard logo button
  const homeBtn = document.getElementById("home-logo-btn");
  if (homeBtn) {
    homeBtn.addEventListener("click", showDashboardHome);
  }

  // Theme selector buttons
  document.querySelectorAll(".theme-selector-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setTheme(btn.getAttribute("data-theme"));
    });
  });
}

// ──────────────────────────────────────────────
// Theme Switching
// ──────────────────────────────────────────────
function setTheme(themeName) {
  const root = document.documentElement;
  state.activeTheme = themeName;

  root.classList.remove("theme-matrix", "theme-cyberpunk", "theme-amber");

  if (themeName === "matrix") {
    root.classList.add("theme-matrix");
  } else if (themeName === "cyberpunk") {
    root.classList.add("theme-cyberpunk");
  } else if (themeName === "amber") {
    root.classList.add("theme-amber");
  }

  appendTerminalLog(`System theme updated to: ${themeName.toUpperCase()}`, "info");

  document.querySelectorAll(".theme-selector-btn").forEach(btn => {
    if (btn.getAttribute("data-theme") === themeName) {
      btn.classList.add("border-cyan", "text-cyan");
      btn.classList.remove("border-transparent", "text-slate-400");
    } else {
      btn.classList.remove("border-cyan", "text-cyan");
      btn.classList.add("border-transparent", "text-slate-400");
    }
  });
}

// ──────────────────────────────────────────────
// Challenge Selection & Writeup Rendering
// ──────────────────────────────────────────────
function selectChallenge(ctfKey, chalKey) {
  const ctf = CTF_CATALOG[ctfKey];
  if (!ctf) return;

  const challenge = ctf.challenges.find(c => c.key === chalKey);
  if (!challenge) return;

  state.activeCtf = ctfKey;
  state.activeChallenge = challenge;

  // Highlight active item in sidebar
  document.querySelectorAll("#sidebar-ctf-list button").forEach(btn => {
    btn.classList.remove("bg-cyan/15", "border-cyan", "text-cyan");
    btn.classList.add("border-transparent", "text-slate-300");
  });

  const activeBtn = document.getElementById(`btn-${ctfKey}-${chalKey}`);
  if (activeBtn) {
    activeBtn.classList.add("bg-cyan/15", "border-cyan", "text-cyan");
    activeBtn.classList.remove("border-transparent", "text-slate-300");
  }

  // Switch view: hide home, show viewer
  document.getElementById("dashboard-home").classList.add("hidden");
  const viewer = document.getElementById("writeup-viewer");
  viewer.classList.remove("hidden");

  const viewerContent = document.getElementById("viewer-content");

  // Update viewer path display
  document.getElementById("viewer-path").innerText = `${ctf.name} / ${challenge.name}`;

  // Update right details panel
  const detailsPanel = document.getElementById("details-panel");
  detailsPanel.classList.remove("opacity-50");

  document.getElementById("detail-name").innerText = challenge.name;
  document.getElementById("detail-ctf").innerText = ctf.name;
  document.getElementById("detail-category").innerText = challenge.category;
  document.getElementById("detail-points").innerText = `${challenge.points} PTS`;

  const flagInput = document.getElementById("detail-flag");
  flagInput.value = challenge.flag;

  const copyBtn = document.getElementById("copy-flag-btn");
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(challenge.flag);
    const origText = copyBtn.innerText;
    copyBtn.innerText = "COPIED";
    copyBtn.classList.add("text-emerald", "border-emerald/40");
    setTimeout(() => {
      copyBtn.innerText = origText;
      copyBtn.classList.remove("text-emerald", "border-emerald/40");
    }, 1500);
  };

  // Look up writeup content directly — no fetch needed
  const contentKey = `${ctfKey}/${chalKey}`;
  const markdown = WRITEUP_CONTENT[contentKey];

  if (!markdown) {
    viewerContent.innerHTML = `
      <div class="text-center py-20 font-mono">
        <p class="font-bold text-lg text-red-400">Writeup not found.</p>
        <p class="text-xs text-slate-500 mt-2">No content found for key: ${escapeHtml(contentKey)}</p>
      </div>
    `;
    appendTerminalLog(`Writeup not found: ${contentKey}`, "error");
    return;
  }

  // Parse and render markdown instantly
  let html = "";
  if (typeof marked !== "undefined") {
    html = marked.parse(markdown);
  } else {
    html = `<pre class="text-slate-300">${escapeHtml(markdown)}</pre>`;
  }

  viewerContent.innerHTML = `<div class="markdown-body">${html}</div>`;

  // Syntax highlighting
  if (typeof Prism !== "undefined") {
    Prism.highlightAllUnder(viewerContent);
  }

  appendTerminalLog(`Loaded writeup: ${ctf.name} -> ${challenge.name}`, "success");
}

// ──────────────────────────────────────────────
// Dashboard Home View
// ──────────────────────────────────────────────
function showDashboardHome() {
  state.activeCtf = null;
  state.activeChallenge = null;

  // Clear sidebar highlight
  document.querySelectorAll("#sidebar-ctf-list button").forEach(btn => {
    btn.classList.remove("bg-cyan/15", "border-cyan", "text-cyan");
    btn.classList.add("border-transparent", "text-slate-300");
  });

  document.getElementById("writeup-viewer").classList.add("hidden");
  document.getElementById("dashboard-home").classList.remove("hidden");

  // Reset details panel
  const detailsPanel = document.getElementById("details-panel");
  detailsPanel.classList.add("opacity-50");
  document.getElementById("detail-name").innerText = "SELECT A CHALLENGE";
  document.getElementById("detail-ctf").innerText = "No writeup active";
  document.getElementById("detail-category").innerText = "N/A";
  document.getElementById("detail-points").innerText = "0 PTS";
  document.getElementById("detail-flag").value = "";

  appendTerminalLog("Returned to dashboard core.", "info");
}

// ──────────────────────────────────────────────
// Terminal Command Execution
// ──────────────────────────────────────────────
function executeTerminalCommand(inputLine) {
  const logContainer = document.getElementById("terminal-logs");
  if (!logContainer) return;

  // Record in history
  state.history.push(inputLine);
  state.historyIndex = -1;

  // Echo command
  const echo = document.createElement("div");
  echo.className = "flex items-start text-xs font-mono py-0.5 text-slate-400";
  echo.innerHTML = `<span class="text-cyan font-bold mr-2">guest@0xlightning:~$</span> <span>${escapeHtml(inputLine)}</span>`;
  logContainer.appendChild(echo);

  const tokens = inputLine.split(/\s+/);
  const cmd = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  let output = "";
  let isSuccess = true;

  switch (cmd) {
    case "help":
      output = `Available System Commands:
  <span class="text-cyan font-bold">help</span>               - Show this diagnostic documentation.
  <span class="text-cyan font-bold">list</span>               - List all registered CTF events and solve stats.
  <span class="text-cyan font-bold">view &lt;ctf&gt; &lt;chal&gt;</span> - Load and inspect writeup (e.g. 'view downunder timtams').
  <span class="text-cyan font-bold">theme &lt;name&gt;</span>      - Change terminal display theme (default, matrix, cyberpunk, amber).
  <span class="text-cyan font-bold">neofetch</span>           - Display developer environment stats.
  <span class="text-cyan font-bold">clear</span>              - Clear terminal scroll buffer.
  <span class="text-cyan font-bold">back</span>               - Exit writeup reader and return to dashboard core.`;
      break;

    case "list":
      output = "Registered Cybersecurity Database:\n\n";
      Object.keys(CTF_CATALOG).forEach(ctfKey => {
        const ctf = CTF_CATALOG[ctfKey];
        output += `<span class="text-cyan font-bold">${ctf.name}</span> (Alias: ${ctfKey})\n`;
        ctf.challenges.forEach(chal => {
          output += `  * [${chal.points} pts] ${chal.name} (${chal.category}) - Alias: <span class="text-teal">${chal.key}</span>\n`;
        });
        output += "\n";
      });
      break;

    case "view":
      if (args.length < 2) {
        output = "<span class=\"text-red\">Error: Missing arguments. Usage: view &lt;ctf-alias&gt; &lt;challenge-alias&gt;</span>";
        isSuccess = false;
      } else {
        const ctfKey = args[0].toLowerCase();
        const chalKey = args[1].toLowerCase();

        if (CTF_CATALOG[ctfKey] && CTF_CATALOG[ctfKey].challenges.some(c => c.key === chalKey)) {
          output = `Loading writeup: ${ctfKey}::${chalKey}...`;
          selectChallenge(ctfKey, chalKey);
        } else {
          output = `<span class="text-red">Error: Writeup not found for: "${escapeHtml(ctfKey)}" "${escapeHtml(chalKey)}". Type 'list' for valid keys.</span>`;
          isSuccess = false;
        }
      }
      break;

    case "theme":
      if (args.length < 1) {
        output = `Usage: theme &lt;default | matrix | cyberpunk | amber&gt;
Current: ${state.activeTheme}`;
      } else {
        const desiredTheme = args[0].toLowerCase();
        if (["default", "matrix", "cyberpunk", "amber"].includes(desiredTheme)) {
          setTheme(desiredTheme);
          output = `Display theme updated successfully to: ${desiredTheme.toUpperCase()}`;
        } else {
          output = `<span class="text-red">Error: Theme "${escapeHtml(desiredTheme)}" not recognized. Valid themes: default, matrix, cyberpunk, amber.</span>`;
          isSuccess = false;
        }
      }
      break;

    case "neofetch":
      output = `  <span class="text-cyan font-bold">guest@0xlightning-dev</span>
  ----------------------
  <span class="text-teal">OS</span>: Cyber Shell v1.0.0
  <span class="text-teal">Host</span>: github.com/0xlightning
  <span class="text-teal">Uptime</span>: 1h 45m
  <span class="text-teal">Shell</span>: Custom Javascript Terminal
  <span class="text-teal">Theme</span>: ${state.activeTheme.toUpperCase()}
  <span class="text-teal">CTF Events</span>: ${Object.keys(CTF_CATALOG).length} registered
  <span class="text-teal">Solves</span>: 16 flags captured
  <span class="text-teal">Total Score</span>: 1813 points
  <span class="text-teal">Main Profile</span>: <a href="https://0xlightning.github.io" target="_blank" class="text-cyan underline">0xlightning.github.io</a>`;
      break;

    case "clear":
      logContainer.innerHTML = "";
      return;

    case "back":
      showDashboardHome();
      output = "Returned to core dashboard view.";
      break;

    default:
      output = `<span class="text-red">Shell command not recognized: "${escapeHtml(cmd)}". Type 'help' for command manual.</span>`;
      isSuccess = false;
  }

  // Print output
  const response = document.createElement("div");
  response.className = "text-xs font-mono py-1 pl-4 leading-relaxed text-slate-300 whitespace-pre-wrap border-l border-slate-800";
  response.innerHTML = output;
  logContainer.appendChild(response);

  // Scroll to bottom
  logContainer.parentElement.scrollTop = logContainer.parentElement.scrollHeight;
}

// ──────────────────────────────────────────────
// Utility: Terminal Log Helper
// ──────────────────────────────────────────────
function appendTerminalLog(message, type = "info") {
  const logContainer = document.getElementById("terminal-logs");
  if (!logContainer) return;

  let color = "text-slate-400";
  let prefix = "[*]";

  if (type === "success") {
    color = "text-emerald";
    prefix = "[+]";
  } else if (type === "error") {
    color = "text-red";
    prefix = "[-]";
  } else if (type === "info") {
    color = "text-cyan";
    prefix = "[i]";
  }

  const log = document.createElement("div");
  log.className = `text-[11px] font-mono py-0.5 ${color}`;
  log.innerHTML = `<span class="font-bold mr-1">${prefix}</span> ${escapeHtml(message)}`;
  logContainer.appendChild(log);

  logContainer.parentElement.scrollTop = logContainer.parentElement.scrollHeight;
}

// ──────────────────────────────────────────────
// Utility: HTML Escaping
// ──────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
