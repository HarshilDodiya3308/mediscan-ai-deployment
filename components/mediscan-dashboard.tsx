"use client"

import { useRef, useState } from "react"
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Brain, ChevronDown,
  CircleHelp, Clock3, FileImage, HeartPulse, LayoutDashboard, LockKeyhole,
  Menu, MoreHorizontal, Plus, Search, ShieldCheck, Stethoscope, Upload, X,
} from "lucide-react"

type ModuleKey = "overview" | "brain" | "chest" | "retina" | "history"

const modules = [
  { id: "brain" as const, name: "Brain MRI", detail: "Tumor classification", icon: Brain, tint: "violet", labels: "Glioma · Meningioma · Pituitary · No tumor" },
  { id: "chest" as const, name: "Chest X-ray", detail: "Pneumonia screening", icon: HeartPulse, tint: "teal", labels: "Normal · Pneumonia" },
  { id: "retina" as const, name: "Retinal fundus", detail: "Diabetic retinopathy", icon: Activity, tint: "amber", labels: "No DR · Mild · Moderate · Severe · Proliferative" },
]

const navItems: { id: ModuleKey; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "brain", label: "Brain MRI", icon: Brain },
  { id: "chest", label: "Chest X-ray", icon: HeartPulse },
  { id: "retina", label: "Retinal fundus", icon: Activity },
  { id: "history", label: "Analysis history", icon: Clock3 },
]

export function MediscanDashboard() {
  const [active, setActive] = useState<ModuleKey>("overview")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [notice, setNotice] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedModule = modules.find((item) => item.id === active)
  const handleFile = (file?: File) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setNotice("Choose an image file to continue.")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setNotice("This prototype accepts image files up to 10 MB.")
      return
    }
    setSelectedFile(file)
    setNotice("")
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><Activity aria-hidden="true" /></div>
          <span className="brand-name">mediscan<span>ai</span></span>
          <button className="icon-button sidebar-close" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X /></button>
        </div>
        <div className="workspace-label">RESEARCH WORKSPACE</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${active === id ? "nav-active" : ""}`} onClick={() => { setActive(id); setMobileNavOpen(false); setSelectedFile(null); setNotice("") }} aria-current={active === id ? "page" : undefined}>
              <Icon aria-hidden="true" /><span>{label}</span>{id === "history" && <span className="nav-count">0</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-divider" />
        <div className="workspace-label">WORKSPACE</div>
        <button className="nav-item"><ShieldCheck aria-hidden="true" /><span>Model registry</span><span className="nav-status-dot" /></button>
        <button className="nav-item"><CircleHelp aria-hidden="true" /><span>Documentation</span></button>
        <div className="sidebar-spacer" />
        <div className="storage-card">
          <div className="storage-icon"><LockKeyhole aria-hidden="true" /></div>
          <strong>Privacy first</strong>
          <p>Images stay in your browser in this prototype.</p>
          <span className="storage-link">Learn about data handling <ArrowRight aria-hidden="true" /></span>
        </div>
        <button className="profile-row" aria-label="Researcher account menu">
          <span className="avatar">RS</span><span className="profile-copy"><strong>Research staff</strong><small>Research workspace</small></span><MoreHorizontal aria-hidden="true" />
        </button>
      </aside>

      {mobileNavOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu /></button>
          <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{navItems.find((item) => item.id === active)?.label}</strong></div>
          <div className="top-actions"><span className="environment-pill"><span /> Prototype environment</span><button className="icon-button notification-button" aria-label="Notifications"><Bell /></button><span className="avatar avatar-small">RS</span></div>
        </header>

        <div className="content-wrap">
          <div className="research-banner"><div className="banner-icon"><Stethoscope aria-hidden="true" /></div><p><strong>Research prototype</strong><span>Not for clinical use. No diagnostic models are connected.</span></p><button aria-label="Dismiss notice" className="banner-dismiss" onClick={(event) => event.currentTarget.parentElement?.remove()}><X /></button></div>

          {active === "overview" ? (
            <>
              <section className="welcome-row"><div><p className="eyebrow">MONDAY, NOVEMBER 23, 2026</p><h1>Research overview</h1><p className="page-subtitle">A clear view of your medical imaging research workspace.</p></div><button className="primary-button" onClick={() => { setActive("brain"); setSelectedFile(null); setNotice("") }}><Plus aria-hidden="true" /> New analysis <ChevronDown className="button-chevron" aria-hidden="true" /></button></section>

              <section className="stats-grid" aria-label="Workspace summary">
                <article className="stat-card"><div className="stat-top"><span>Analysis sessions</span><span className="stat-icon sky"><FileImage /></span></div><div className="stat-value">0</div><div className="stat-note">No sessions in this prototype</div></article>
                <article className="stat-card"><div className="stat-top"><span>AI modules</span><span className="stat-icon mint"><Activity /></span></div><div className="stat-value">3</div><div className="stat-note"><span className="status-dot muted-dot" /> Model weights not configured</div></article>
                <article className="stat-card"><div className="stat-top"><span>Data stored</span><span className="stat-icon lilac"><LockKeyhole /></span></div><div className="stat-value">0 <small>files</small></div><div className="stat-note">Nothing uploaded or retained</div></article>
              </section>

              <section className="section-heading"><div><h2>Imaging modules</h2><p>Independent research pipelines, pending model configuration</p></div><button className="text-button" onClick={() => setActive("history")}>View history <ArrowRight /></button></section>
              <section className="module-grid" aria-label="Imaging modules">
                {modules.map(({ id, name, detail, icon: Icon, tint, labels }) => <article key={id} className="module-card"><div className="module-card-top"><div className={`module-icon ${tint}`}><Icon aria-hidden="true" /></div><span className="unavailable-pill"><span /> Not configured</span></div><h3>{name}</h3><p className="module-detail">{detail}</p><p className="class-labels">{labels}</p><button className="module-link" onClick={() => { setActive(id); setSelectedFile(null); setNotice("") }}>Open workspace <ArrowRight aria-hidden="true" /></button></article>)}
              </section>

              <section className="lower-grid"><article className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Latest events across your workspace</p></div><button className="icon-button" aria-label="More activity options"><MoreHorizontal /></button></div><div className="empty-state"><div className="empty-icon"><Clock3 aria-hidden="true" /></div><strong>No activity yet</strong><p>Your research sessions will appear here after models are configured.</p></div></article><article className="panel readiness-panel"><div className="panel-heading"><div><h2>System readiness</h2><p>Deployment configuration overview</p></div><span className="readiness-tag">Setup needed</span></div><div className="readiness-list"><div><span className="check-icon"><X /></span><span>Backend API</span><strong>Not connected</strong></div><div><span className="check-icon"><X /></span><span>Database</span><strong>Not connected</strong></div><div><span className="check-icon"><X /></span><span>Model weights</span><strong>Not configured</strong></div><div><span className="check-icon"><ShieldCheck /></span><span>Research disclaimer</span><strong className="ready-text">Active</strong></div></div><button className="setup-link">Deployment checklist <ArrowRight /></button></article></section>
              <footer className="page-footer"><span>MediScan AI · Research workspace</span><span>Educational and research use only</span></footer>
            </>
          ) : active === "history" ? (
            <section className="detail-page"><p className="eyebrow">WORKSPACE</p><h1>Analysis history</h1><p className="page-subtitle">Private session records for your research workspace.</p><div className="panel history-empty"><div className="empty-icon"><Clock3 aria-hidden="true" /></div><h2>No saved analyses</h2><p>There are no analysis sessions in this prototype. Nothing is stored or persisted.</p></div></section>
          ) : selectedModule ? (
            <section className="detail-page"><p className="eyebrow">IMAGING MODULE</p><h1>{selectedModule.name}</h1><p className="page-subtitle">{selectedModule.detail} · {selectedModule.labels}</p><div className="detail-layout"><article className="panel upload-panel"><div className="panel-heading"><div><h2>Image input</h2><p>Files remain local to this browser session.</p></div><div className={`module-icon ${selectedModule.tint}`}><selectedModule.icon aria-hidden="true" /></div></div><button className="dropzone" onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFile(event.dataTransfer.files[0]) }}><span className="upload-icon"><Upload aria-hidden="true" /></span><strong>{selectedFile ? selectedFile.name : "Choose an image to get started"}</strong><span>{selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · selected locally` : "Drag and drop, or browse files · Max 10 MB"}</span><span className="browse-label">Browse files</span></button><input ref={inputRef} className="sr-only" type="file" accept="image/*" aria-label="Select medical image" onChange={(event) => handleFile(event.target.files?.[0])} />{notice && <p className="form-notice" role="alert">{notice}</p>}<div className="upload-privacy"><LockKeyhole aria-hidden="true" /><span>Privacy note: this prototype does not transmit or save your image.</span></div><button className="primary-button analyze-button" disabled={!selectedFile} onClick={() => setNotice("MODEL_NOT_CONFIGURED — no inference service or model weights are connected in this prototype.")}>Check model availability <ArrowRight aria-hidden="true" /></button>{notice.startsWith("MODEL_NOT_CONFIGURED") && <p className="model-error" role="status">{notice}</p>}</article><aside className="panel model-panel"><div className="panel-heading"><div><h2>Model status</h2><p>Availability for this pipeline</p></div></div><div className="model-status-box"><span className="status-indicator" /><div><strong>MODEL_NOT_CONFIGURED</strong><p>No model weights connected</p></div></div><div className="model-info-row"><span>Inference service</span><strong>Not connected</strong></div><div className="model-info-row"><span>Model version</span><strong>Not available</strong></div><div className="model-info-row"><span>Supported classes</span><strong>{selectedModule.labels}</strong></div><div className="medical-note"><ShieldCheck aria-hidden="true" /><p>Research prototype only. Do not use for diagnosis or treatment decisions.</p></div></aside></div><button className="back-link" onClick={() => { setActive("overview"); setSelectedFile(null); setNotice("") }}><ArrowDownRight aria-hidden="true" /> Back to overview</button></section>
          ) : null}
        </div>
      </main>
    </div>
  )
}
