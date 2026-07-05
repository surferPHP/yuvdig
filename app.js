const contentPath = "content/portfolio-content.json";
const cvFileName = "Yuval_Digmal_Product_Operations_CV.pdf";

const setText = (id, text) => {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
};

const setStyledName = (id, fullName) => {
  const el = document.getElementById(id);
  if (!el || !fullName) return;
  const parts = String(fullName).trim().split(/\s+/);
  if (parts.length < 2) {
    el.textContent = fullName;
    return;
  }
  const first = parts.slice(0, -1).join(" ");
  const last = parts[parts.length - 1];
  el.textContent = "";
  el.append(document.createTextNode(`${first} `));
  const accent = document.createElement("span");
  accent.className = "name-accent";
  accent.textContent = last;
  el.append(accent);
};

const setInitials = (id, fullName) => {
  const el = document.getElementById(id);
  if (!el || !fullName) return;
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
  el.textContent = initials || "PB";
};

const sanitizeHref = (href, fallback = "#") => {
  if (!href || href.includes("<ADD_")) return fallback;
  const raw = String(href).trim();
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(raw);

  if (!hasScheme) {
    return raw.startsWith("/") || raw.startsWith("./") || raw.startsWith("../") ? raw : fallback;
  }

  try {
    const parsed = new URL(raw);
    const allowedProtocols = new Set(["https:", "mailto:", "tel:"]);
    return allowedProtocols.has(parsed.protocol) ? parsed.href : fallback;
  } catch {
    return fallback;
  }
};

const setHref = (id, href, fallback = "#") => {
  const el = document.getElementById(id);
  if (!el) return;
  const safeHref = sanitizeHref(href, fallback);
  el.setAttribute("href", safeHref);
  if (safeHref === "#") {
    el.classList.add("is-disabled");
    el.setAttribute("aria-disabled", "true");
    el.title = "Link will be added soon";
  } else {
    el.classList.remove("is-disabled");
    el.removeAttribute("aria-disabled");
    el.removeAttribute("title");
  }
};

const normalizePhoneNumber = (value = "") => String(value).replace(/[^\d]/g, "");

const getWhatsAppConfig = (profile = {}) => {
  const phone = normalizePhoneNumber(profile.whatsappNumber || profile.phone || "");
  const isConfigured = Boolean(phone) && !phone.includes("000000");
  const defaultMessage = "Hi Yuval, I saw your portfolio and would love to connect about a potential opportunity.";
  const message = profile.whatsappDefaultMessage || defaultMessage;

  return {
    isConfigured,
    href: isConfigured ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : "",
  };
};

const trimCopy = (text = "", maxLength = 120) => {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trimEnd()}…`;
};

const renderRoles = (roles = []) => {
  const parent = document.getElementById("targetRoles");
  parent.innerHTML = "";
  roles.forEach((role) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = role;
    parent.appendChild(chip);
  });
};

const renderHeroSignals = (highlights = []) => {
  const parent = document.getElementById("heroSignals");
  if (!parent) return;
  parent.innerHTML = "";

  const dynamicSignals = (highlights || [])
    .map((item) => item.metric)
    .filter((metric) => metric && !metric.includes("<ADD_"))
    .slice(0, 3);

  const fallbackSignals = ["Enterprise Integrations", "Escalation Ownership", "Automation Delivery"];
  const signals = dynamicSignals.length ? dynamicSignals : fallbackSignals;

  signals.forEach((signal) => {
    const chip = document.createElement("span");
    chip.className = "hero-signal";
    chip.textContent = signal;
    parent.appendChild(chip);
  });
};

const renderImpact = (highlights = []) => {
  const parent = document.getElementById("impactGrid");
  parent.innerHTML = "";

const visualTemplate = [
  {
    value: "Global",
    heading: "Enterprise Integrations",
    text: "Led enterprise onboarding and integrations for global clients across the US, Europe, Japan, and Australia. Worked directly with partners and internal teams to map APIs, align data flows, and ensure smooth go-live. Focused on reducing onboarding friction and accelerating time-to-production."
  },
  {
    value: "150+",
    heading: "Hours Saved / Month",
    text: "Designed internal automation tools that eliminated repetitive manual workflows. Used scripting and data automation to streamline operational processes across teams. Reduced manual effort and allowed teams to focus on higher-value work."
  },
  {
    value: "12+",
    heading: "Cross-Functional Teams",
    text: "Collaborated across Product, R&D, BI, and Customer teams to deliver technical solutions. Acted as a bridge between business requirements and technical implementation. Helped align stakeholders and accelerate delivery of customer-facing features."
  }
];

  const cardCount = 3;

  for (let idx = 0; idx < cardCount; idx += 1) {
    const item = highlights[idx] || {};
    const preset = visualTemplate[idx] || {};

    const card = document.createElement("article");
    card.className = "card impact-card";

    const value = document.createElement("p");
    value.className = "impact-card-value";
    value.textContent = preset.value || item.metric || "Metric";

    const heading = document.createElement("h3");
    heading.className = "impact-card-heading";
    heading.textContent = preset.heading || item.title || "Operational Outcome";

    const text = document.createElement("p");
    text.className = "impact-card-text";
    const fullText = preset.text || item.description || item.statement || "";
    text.textContent = fullText;
    text.classList.add("is-collapsed");

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "impact-card-toggle";
    toggle.textContent = "Read more";
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
      const isExpanded = text.classList.toggle("is-expanded");
      text.classList.toggle("is-collapsed", !isExpanded);
      toggle.textContent = isExpanded ? "Read less" : "Read more";
      toggle.setAttribute("aria-expanded", String(isExpanded));
    });

    card.append(value, heading, text, toggle);
    parent.appendChild(card);
  }
};

const renderExperience = (items = []) => {
  const parent = document.getElementById("experienceTimeline");
  parent.innerHTML = "";
  items.forEach((item, idx) => {
    const block = document.createElement("article");
    block.className = `role-item ${idx % 2 === 0 ? "role-left" : "role-right"}`;

    const head = document.createElement("div");
    head.className = "role-head";

    const role = document.createElement("p");
    role.className = "role-title";
    role.textContent = item.role;

    const period = document.createElement("p");
    period.className = "role-period";
    period.textContent = item.period;

    const company = document.createElement("p");
    company.className = "role-company";
    company.textContent = item.company;

    const list = document.createElement("ul");
    const compactAchievements = (item.achievements || []).slice(0, 2);
    compactAchievements.forEach((achievement) => {
      const li = document.createElement("li");
      li.className = "role-bullet";
      li.textContent = trimCopy(achievement, 96);
      list.appendChild(li);
    });

    head.append(role, period);
    block.append(head, company, list);
    parent.appendChild(block);
  });
};

const renderSkills = (capabilities = []) => {
  const parent = document.getElementById("skillsGrid");
  if (!parent) return;
  parent.innerHTML = "";
  parent.classList.remove("skill-grid-panels");
  parent.classList.add("capabilities-grid");

  const selectedCapabilities = [
    "Integrations & APIs",
    "Data & Analytics",
    "Monitoring & Production Operations"
  ];

  const capabilityToneMap = {
    "Integrations & APIs": "integrations",
    "Data & Analytics": "analytics",
    "Monitoring & Production Operations": "operations"
  };

  const capabilityLabelMap = {
    integrations: "CONNECT",
    analytics: "ANALYZE",
    operations: "OPERATE"
  };

  capabilities
    .filter((capability) => selectedCapabilities.includes(capability.title))
    .sort((a, b) => selectedCapabilities.indexOf(a.title) - selectedCapabilities.indexOf(b.title))
    .forEach((capability) => {
    const card = document.createElement("article");
    const tone = capabilityToneMap[capability.title] || "default";
    card.className = `card capability-card capability-card-${tone}`;

    const head = document.createElement("div");
    head.className = "capability-head";

    const kicker = document.createElement("span");
    kicker.className = "capability-kicker";
    kicker.textContent = capabilityLabelMap[tone] || "CAPABILITY";

    const heading = document.createElement("h3");
    heading.className = "capability-title";
    heading.textContent = capability.title || "Capability";

    const description = document.createElement("p");
    description.className = "capability-description";
    description.textContent = trimCopy(capability.description || "", 140);

    const tags = document.createElement("div");
    tags.className = "capability-tags";
    (capability.tags || []).slice(0, 3).forEach((tag) => {
      const chip = document.createElement("span");
      chip.className = "capability-tag";
      chip.textContent = tag;
      tags.appendChild(chip);
    });

    head.append(kicker, heading);
    card.append(head, description, tags);
    parent.appendChild(card);
  });
};

const renderAIExperiments = (projects = []) => {
  const parent = document.getElementById("aiProjectsGrid");
  if (!parent) return;
  parent.innerHTML = "";

  const categoryConfig = {
    prototype: { label: "POC / Prototype", marker: "LAB", hint: "Early concept validated through hands-on testing." },
    automation: { label: "Automation System", marker: "FLOW", hint: "Process-driven tools built to remove repeat manual work." },
    product: { label: "Working Software", marker: "LIVE", hint: "Usable software with a clearer product shape and workflow." }
  };

  projects.slice(0, 4).forEach((project) => {
    const category = project.category || (project.statusTone === "live" ? "product" : "prototype");
    const categoryMeta = categoryConfig[category] || categoryConfig.prototype;

    const card = document.createElement("article");
    card.className = `card ai-project-card ai-project-card-${category}`;

    const head = document.createElement("div");
    head.className = "ai-project-head";

    const kicker = document.createElement("div");
    kicker.className = "ai-project-kicker";

    const marker = document.createElement("span");
    marker.className = "ai-project-kicker-mark";
    marker.textContent = categoryMeta.marker;

    const categoryLabel = document.createElement("span");
    categoryLabel.className = "ai-project-kicker-label";
    categoryLabel.textContent = project.categoryLabel || categoryMeta.label;

    const topRow = document.createElement("div");
    topRow.className = "ai-project-head-main";

    const title = document.createElement("h3");
    title.className = "ai-project-title";
    title.textContent = project.title || "AI Project";

    const typeHint = document.createElement("p");
    typeHint.className = "ai-project-type";
    typeHint.textContent = categoryMeta.hint;

    const fullDescription = project.description || "";
    const description = document.createElement("p");
    description.className = "ai-project-description";
    description.textContent = fullDescription;

    const shouldShowToggle = fullDescription.trim().length > 110;
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "ai-project-toggle";
    toggle.textContent = "Read more";
    toggle.hidden = !shouldShowToggle;
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
      const isExpanded = description.classList.toggle("is-expanded");
      toggle.textContent = isExpanded ? "Read less" : "Read more";
      toggle.setAttribute("aria-expanded", String(isExpanded));
    });

    const tags = document.createElement("div");
    tags.className = "ai-project-tags";
    (project.technologies || []).slice(0, 2).forEach((tech) => {
      const chip = document.createElement("span");
      chip.className = "ai-project-tag";
      chip.textContent = tech;
      tags.appendChild(chip);
    });

    kicker.append(marker, categoryLabel);
    topRow.append(title);
    head.append(kicker, topRow, typeHint);
    card.append(head, description, toggle, tags);
    parent.appendChild(card);
  });
};

const renderJobHuntAgentDetail = (project) => {
  const parent = document.getElementById("jobHuntAgentDetail");
  if (!parent || !project) return;
  parent.innerHTML = "";

  const shell = document.createElement("article");
  shell.className = "job-agent-detail";

  const intro = document.createElement("div");
  intro.className = "job-agent-intro";

  const eyebrow = document.createElement("p");
  eyebrow.className = "job-agent-eyebrow";
  eyebrow.textContent = project.type || "AI Automation Project";

  const title = document.createElement("h3");
  title.textContent = project.name || "JobHuntAgent";

  const summary = document.createElement("p");
  summary.className = "job-agent-summary";
  summary.textContent = project.summary || "";

  const positioning = document.createElement("p");
  positioning.className = "job-agent-positioning";
  positioning.textContent = project.positioning || "";

  intro.append(eyebrow, title, summary, positioning);

  const workflowGrid = document.createElement("div");
  workflowGrid.className = "job-agent-workflows";

  (project.workflows || []).forEach((workflow) => {
    const card = document.createElement("section");
    card.className = "job-agent-workflow";

    const heading = document.createElement("h4");
    heading.textContent = workflow.title || "Workflow";

    const description = document.createElement("p");
    description.textContent = workflow.description || "";

    const list = document.createElement("ul");
    (workflow.points || []).forEach((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      list.appendChild(item);
    });

    card.append(heading, description, list);
    workflowGrid.appendChild(card);
  });

  const bottom = document.createElement("div");
  bottom.className = "job-agent-bottom";

  const highlights = document.createElement("section");
  highlights.className = "job-agent-panel";
  const highlightsTitle = document.createElement("h4");
  highlightsTitle.textContent = "Key Technical Highlights";
  const highlightsList = document.createElement("ul");
  (project.technicalHighlights || []).forEach((highlight) => {
    const item = document.createElement("li");
    item.textContent = highlight;
    highlightsList.appendChild(item);
  });
  highlights.append(highlightsTitle, highlightsList);

  const future = document.createElement("section");
  future.className = "job-agent-panel job-agent-panel-muted";
  const futureTitle = document.createElement("h4");
  futureTitle.textContent = "Planned Architecture";
  const futureTags = document.createElement("div");
  futureTags.className = "job-agent-tags";
  (project.plannedArchitecture || []).forEach((item) => {
    const tag = document.createElement("span");
    tag.textContent = item;
    futureTags.appendChild(tag);
  });
  future.append(futureTitle, futureTags);

  bottom.append(highlights, future);
  shell.append(intro, workflowGrid, bottom);
  parent.appendChild(shell);
};

const renderCases = (cases = []) => {
  const parent = document.getElementById("casesGrid");
  if (!parent) return;
  parent.innerHTML = "";

  const createCaseBlock = (label, value) => {
    const block = document.createElement("div");
    block.className = "case-block";

    const blockLabel = document.createElement("p");
    blockLabel.className = "case-label";
    blockLabel.textContent = label;

    const blockValue = document.createElement("p");
    blockValue.className = "case-value";
    blockValue.textContent = value || "";

    block.append(blockLabel, blockValue);
    return block;
  };

  cases.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card case-card";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const summary = document.createElement("p");
    summary.className = "case-summary";
    summary.textContent = `${item.context} ${item.problem}`;

    const body = document.createElement("div");
    body.className = "case-body";

    const actionBlock = createCaseBlock("Action", item.action);
    const outcomeBlock = createCaseBlock("Outcome", item.outcome);

    const toolsWrap = document.createElement("div");
    toolsWrap.className = "case-tools";

    const toolsLabel = document.createElement("p");
    toolsLabel.className = "case-label";
    toolsLabel.textContent = "Tools";

    const chips = document.createElement("div");
    chips.className = "case-chips";
    (item.tools || []).forEach((tool) => {
      const chip = document.createElement("span");
      chip.className = "case-chip";
      chip.textContent = tool;
      chips.appendChild(chip);
    });

    toolsWrap.append(toolsLabel, chips);
    body.append(actionBlock, outcomeBlock, toolsWrap);

    card.append(title, summary, body);
    parent.appendChild(card);
  });
};

const setupReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
};

const escapePdfText = (text) =>
  String(text || "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const wrapText = (text, maxChars = 88) => {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= maxChars) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  });
  if (line) lines.push(line);
  return lines;
};

const buildContactLine = (profile = {}) => {
  const parts = [];
  if (profile.phone) parts.push(`Phone: ${profile.phone}`);
  if (profile.email) parts.push(`Email: ${profile.email}`);
  if (profile.linkedin) parts.push("LinkedIn");
  if (profile.location) parts.push(profile.location);
  return parts.join(" | ");
};

const buildCvLines = (data) => {
  const { profile = {}, impactHighlights = [], experience = [], skills = {}, education = [], languages = [] } = data || {};
  const lines = [];
  const push = (text, bold = false, spacer = false) => lines.push({ text, bold, spacer });
  const pushCenter = (text, bold = false, size = 10) => lines.push({ text, bold, align: "center", size });
  const pushSection = (title) => {
    push(title, true);
    lines.push({ rule: true });
  };

  pushCenter((profile.fullName || "Candidate Name").toUpperCase(), true, 16);
  const contactLine = buildContactLine(profile);
  if (contactLine) pushCenter(contactLine, false, 9);
  pushCenter(profile.title || "Senior Technical Solutions Engineer / Product Owner - CX", true, 10);
  push("", false, true);

  pushSection("ABOUT ME");
  wrapText(profile.tagline || "").forEach((line) => push(line));
  push("", false, true);

  pushSection("SELECTED IMPACT");
  impactHighlights.forEach((item) => {
    push(item.title || "Impact", true);
    wrapText(item.description || item.statement || "").forEach((line) => push(line));
    push(`Metric: ${item.metric || "N/A"}`, true);
    push("", false, true);
  });

  pushSection("EXPERIENCE");
  experience.forEach((item) => {
    push(`${item.period || ""} - ${item.company || ""}`, true);
    push(item.role || "", true);
    (item.achievements || []).forEach((bullet) => {
      const wrapped = wrapText(`- ${bullet}`, 84);
      wrapped.forEach((line, idx) => {
        if (idx === 0) push(line);
        else push(`  ${line}`);
      });
    });
    push("", false, true);
  });

  if (Object.keys(skills).length) {
    pushSection("TECHNOLOGIES");
    Object.entries(skills).forEach(([label, values]) => {
      const valueText = (values || []).join(", ");
      wrapText(`${titleize(label)}: ${valueText}`, 92).forEach((line) => push(line));
    });
    push("", false, true);
  }

  if (education.length) {
    pushSection("EDUCATION");
    education.forEach((entry) => wrapText(entry, 92).forEach((line) => push(line)));
    push("", false, true);
  }

  if (languages.length) {
    pushSection("LANGUAGES");
    languages.forEach((entry) => push(entry));
  }

  return lines;
};

const buildPdfBinary = (pages) => {
  const objects = [];
  const addObject = (body) => {
    objects.push(body);
    return objects.length;
  };

  const fontRegularId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const contentIds = pages.map((lines) => {
    const stream = lines
      .map(({ text, y, bold, size, x }) => `BT /${bold ? "F2" : "F1"} ${size || 10} Tf ${x || 48} ${y} Td (${escapePdfText(text)}) Tj ET`)
      .join("\n");
    return addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });

  const pageIds = contentIds.map((contentId) =>
    addObject(
      `<< /Type /Page /Parent PAGES_ID /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`
    )
  );

  const kids = pageIds.map((id) => `${id} 0 R`).join(" ");
  const pagesId = addObject(`<< /Type /Pages /Kids [${kids}] /Count ${pageIds.length} >>`);
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  objects.forEach((obj, i) => {
    if (obj.includes("PAGES_ID")) objects[i] = obj.replace("PAGES_ID", `${pagesId} 0 R`);
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
  return pdf;
};

const generateCvPdf = (data) => {
  const lines = buildCvLines(data);
  const pages = [];
  let currentPage = [];
  let y = 802;
  const minY = 52;
  const baseLineHeight = 13;
  const estimateWidth = (text, size) => Math.max(0, text.length * size * 0.5);

  lines.forEach((line) => {
    if (line.rule) {
      if (y < minY + 10) {
        pages.push(currentPage);
        currentPage = [];
        y = 802;
      }
      currentPage.push({ text: "__________________________________________________", y, bold: false, size: 9, x: 48 });
      y -= 9;
      return;
    }

    const text = line.text || "";
    const bold = line.bold || false;
    const size = line.size || (bold ? 10.5 : 9.8);
    const lineHeight = baseLineHeight + (size >= 12 ? 4 : size >= 10.5 ? 2 : 0);
    if (y < minY || (line.spacer && y < minY + 10)) {
      pages.push(currentPage);
      currentPage = [];
      y = 802;
    }
    if (text) {
      let x = 48;
      if (line.align === "center") {
        x = Math.max(48, (595 - estimateWidth(text, size)) / 2);
      }
      currentPage.push({ text, y, bold, size, x });
      y -= lineHeight;
    } else {
      y -= line.spacer ? 10 : lineHeight;
    }
    if (pages.length >= 2 && y < minY + 10) {
      currentPage.push({ text: "See LinkedIn for full background and detailed project history.", y, bold: false, size: 9.8, x: 48 });
      y = minY;
    }
  });

  if (currentPage.length) pages.push(currentPage);
  const limitedPages = pages.slice(0, 2);
  const pdfBinary = buildPdfBinary(limitedPages);
  const blob = new Blob([pdfBinary], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = cvFileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
};

const setupCvDownload = (data) => {
  const cvLink = document.getElementById("cvLink");
  if (!cvLink) return;
  const cvUrl = data?.profile?.cvUrl;
  if (cvUrl && !cvUrl.includes("<ADD_")) {
    const filename = cvUrl.split("/").pop();
    if (filename && /\.(pdf|doc|docx)$/i.test(filename)) {
      cvLink.setAttribute("download", filename);
    }
    return;
  }

  const email = data?.profile?.email || "";
  const subject = encodeURIComponent("CV Request - Yuval Digmal");
  const body = encodeURIComponent("Hi Yuval,\n\nI reviewed your profile and would like to receive your CV.\n\nThanks.");
  cvLink.href = `mailto:${email}?subject=${subject}&body=${body}`;
  cvLink.classList.remove("is-disabled");
  cvLink.removeAttribute("aria-disabled");
  cvLink.removeAttribute("title");
  cvLink.removeAttribute("download");
};

const setupActiveNav = () => {
  const sectionIds = ["impact", "roles", "skills", "ai-projects", "experience", "contact"];
  const navLinks = Array.from(document.querySelectorAll(".nav a, .mobile-nav-link"));
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter((section) => section);
  const sectionSet = new Set(sections.map((section) => section.id));

  if (!navLinks.length || !sections.length) return;

  const setActive = (activeId) => {
    navLinks.forEach((link) => {
      const target = link.getAttribute("href")?.replace("#", "");
      link.classList.toggle("is-active", target === activeId);
    });
  };

  const getActiveSectionId = () => {
    const orderedSections = [...sections].sort((a, b) => a.offsetTop - b.offsetTop);
    const marker = window.scrollY + 160;
    let activeId = orderedSections[0].id;

    orderedSections.forEach((section) => {
      if (section.offsetTop <= marker) {
        activeId = section.id;
      }
    });

    return activeId;
  };

  let isTicking = false;
  const syncActiveNav = () => {
    if (isTicking) return;
    isTicking = true;

    requestAnimationFrame(() => {
      setActive(getActiveSectionId());
      isTicking = false;
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("href")?.replace("#", "");
      if (target && sectionSet.has(target)) {
        setActive(target);
      }
    });
  });

  window.addEventListener("scroll", syncActiveNav, { passive: true });
  window.addEventListener("resize", syncActiveNav);
  setActive(getActiveSectionId());
};

const setupBackToTop = () => {
  const button = document.getElementById("backToTop");
  if (!button) return;

  const updateVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 360);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
};

const hydrate = (data) => {
  const { profile, targetRoles, impactHighlights, experience, technicalCapabilities, aiExperiments, jobHuntAgentProject, caseStudies, cta } = data;
  const whatsapp = getWhatsAppConfig(profile);

  setText("location", profile.location);
  setStyledName("fullName", profile.fullName);
  setInitials("spotInitials", profile.fullName);
  setText("tagline", profile.tagline);

  setHref("cvLink", profile.cvUrl || "#download-cv", "#download-cv");
  setHref("linkedinLink", profile.linkedin);
  setHref("contactLinkedinLink", profile.linkedin);
  setHref("headerLinkedin", profile.linkedin);
  setHref("emailLink", whatsapp.href, `mailto:${profile.email}`);
  setHref("primaryCta", whatsapp.href, `mailto:${profile.email}`);

  setText("primaryCta", whatsapp.isConfigured ? (cta?.primary || "Let's Connect on WhatsApp") : "Let's Connect by Email");
  if (cta?.secondary) setText("linkedinLink", cta.secondary);
  if (cta?.tertiary) setText("cvLink", cta.tertiary);

  const primaryCta = document.getElementById("primaryCta");
  if (primaryCta) {
    if (whatsapp.isConfigured) {
      primaryCta.setAttribute("target", "_blank");
      primaryCta.setAttribute("rel", "noreferrer");
      primaryCta.setAttribute("aria-label", "Open WhatsApp chat");
      primaryCta.title = "Opens WhatsApp chat";
    } else {
      primaryCta.removeAttribute("target");
      primaryCta.removeAttribute("rel");
      primaryCta.setAttribute("aria-label", "Send email");
      primaryCta.title = "WhatsApp number not configured yet. Fallback to email.";
    }
  }

  const mobileMenuCta = document.querySelector(".mobile-menu-cta");
  if (mobileMenuCta) {
    mobileMenuCta.href = whatsapp.href || `mailto:${profile.email}`;
    mobileMenuCta.textContent = whatsapp.isConfigured ? "Chat on WhatsApp" : "Email Me";
    if (whatsapp.isConfigured) {
      mobileMenuCta.setAttribute("target", "_blank");
      mobileMenuCta.setAttribute("rel", "noreferrer");
    } else {
      mobileMenuCta.removeAttribute("target");
      mobileMenuCta.removeAttribute("rel");
    }
  }

  const emailLink = document.getElementById("emailLink");
  if (emailLink) {
    if (whatsapp.isConfigured) {
      setText("emailLink", "Chat on WhatsApp");
      emailLink.setAttribute("target", "_blank");
      emailLink.setAttribute("rel", "noreferrer");
      emailLink.setAttribute("aria-label", "Open WhatsApp chat");
      emailLink.title = "Opens WhatsApp chat";
    } else {
      setText("emailLink", "Let's Talk");
      emailLink.removeAttribute("target");
      emailLink.removeAttribute("rel");
      emailLink.setAttribute("aria-label", "Send email");
      emailLink.title = "WhatsApp number not configured yet. Fallback to email.";
    }
  }

  renderRoles(targetRoles);
  renderHeroSignals(impactHighlights);
  renderImpact(impactHighlights);
  renderExperience(experience);
  renderSkills(technicalCapabilities);
  renderAIExperiments(aiExperiments);
  renderJobHuntAgentDetail(jobHuntAgentProject);
  renderCases(caseStudies);
  setupCvDownload(data);
};

const start = async () => {
  try {
    setupMobileMenu();
    setupBackToTop();
    const response = await fetch(contentPath, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load content: ${response.status}`);

    const data = await response.json();
    hydrate(data);
    setupReveal();
    setupActiveNav();
  } catch (error) {
    setText("tagline", "Failed to load portfolio content. Check content/portfolio-content.json");
    console.error(error);
  }
};

const setupMobileMenu = () => {
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("mobileMenuBackdrop");
  const closeBtn = document.getElementById("mobileMenuClose");
  if (!toggle || !menu || !backdrop || !closeBtn) return;
  let lastFocused = null;

  const setOpen = (open) => {
    const focusables = Array.from(
      menu.querySelectorAll("a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])")
    );
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    menu.classList.toggle("is-open", open);
    backdrop.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      lastFocused = document.activeElement;
      (focusables[0] || closeBtn).focus();
    } else if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  };

  setOpen(false);

  toggle.addEventListener("click", () => {
    const nextState = toggle.getAttribute("aria-expanded") !== "true";
    setOpen(nextState);
  });

  closeBtn.addEventListener("click", () => setOpen(false));
  backdrop.addEventListener("click", () => setOpen(false));
  menu.querySelectorAll(".mobile-nav-link, .mobile-menu-cta").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    const isOpen = menu.classList.contains("is-open");
    if (!isOpen) return;
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "Tab") {
      const focusables = Array.from(
        menu.querySelectorAll("a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])")
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) setOpen(false);
  });
};

start();
