import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlignCenter,
  AlignLeft,
  CheckCircle2,
  ChevronDown,
  FileText,
  GraduationCap,
  HelpCircle,
  Highlighter,
  MousePointerClick,
  PartyPopper,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Type,
} from "lucide-react";


function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", variant = "default", disabled = false, children, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:pointer-events-none disabled:opacity-50";
  const variantClass =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
      : "bg-blue-700 text-white hover:bg-blue-800";
  return (
    <button className={`${base} ${variantClass} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

function Progress({ value = 0, className = "" }) {
  return (
    <div className={`h-3 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}


const correctDate = "15 June 2026";
const correctLastName = "Mitchell";
const correctTitle = "Why Revision Matters in College Writing";
const templateUrl = "https://docs.google.com/document/d/1LshgCho0Nkbf8dGjUvEPc0q9DYX9ENUyHAyuMKYrCTE/template/preview";

const initialState = {
  margins: "Default",
  font: "Arial",
  fontSize: "11",
  spacing: "Single",
  selectedDate: "June 15, 2026",
  pageNumberAdded: false,
  headerLastName: "",
  title: "why revision matters in college writing",
  titleAlign: "left",
  paragraphIndented: false,
};

const steps = [
  {
    id: "margins",
    short: "Margins",
    color: "from-sky-400 to-blue-500",
    goal: "Check the page margins.",
    doThis: ["Click File.", "Choose Page setup.", "Check that each margin is set to 1 inch.", "Click Apply."],
    why: "MLA papers use 1-inch margins on all sides. Google Docs usually already has this setting, but it is still important to check.",
    success: "Great job! You checked the page margins. MLA papers use 1-inch margins.",
    hint: "Look at the top menu. The File menu is on the far left.",
    showMe: "File → Page setup → Margins: 1 inch → Apply",
    check: (state) => state.margins === "1 inch",
    solve: { margins: "1 inch" },
  },
  {
    id: "font",
    short: "Font",
    color: "from-emerald-400 to-green-500",
    goal: "Use the correct MLA font.",
    doThis: ["Click the font menu that says Arial.", "Choose Times New Roman."],
    why: "MLA papers should use a clear academic font. Times New Roman is the standard font used in many English classes.",
    success: "Great job! You changed the paper to Times New Roman.",
    hint: "The font menu is in the toolbar near the top. It currently says Arial.",
    showMe: "Font menu → Times New Roman",
    check: (state) => state.font === "Times New Roman",
    solve: { font: "Times New Roman" },
  },
  {
    id: "size",
    short: "Size",
    color: "from-violet-400 to-purple-500",
    goal: "Make the font 12-point size.",
    doThis: ["Click the size box that says 11.", "Choose 12."],
    why: "MLA papers should use 12-point font. This keeps the paper readable and professional.",
    success: "Great job! The document is now set to 12-point font.",
    hint: "The font size box is beside the font menu.",
    showMe: "Font size menu → 12",
    check: (state) => state.fontSize === "12",
    solve: { fontSize: "12" },
  },
  {
    id: "spacing",
    short: "Spacing",
    color: "from-amber-400 to-orange-500",
    goal: "Spread the lines farther apart.",
    doThis: ["Click the Line Spacing button beside the alignment buttons.", "Select Double."],
    why: "MLA papers are double spaced from the heading through the final paragraph. Do not press Enter extra times to create space before or after the title.",
    success: "Great job! You changed the paper to double spacing.",
    hint: "The Line Spacing button has lines with up and down arrows and sits beside the alignment buttons.",
    showMe: "Line Spacing button → Double",
    check: (state) => state.spacing === "Double",
    solve: { spacing: "Double" },
  },
  {
    id: "headingDate",
    short: "Date Format",
    color: "from-rose-400 to-pink-500",
    goal: "Fix the date in the MLA heading.",
    doThis: ["Look at the page above and find the date in the MLA heading.", "Answer the question below by selecting the date that fixes the heading correctly."],
    why: "The MLA heading includes your name, instructor name, course, and date. MLA dates are written in day-month-year order: 15 June 2026.",
    success: "Great job! You selected the correct MLA date format.",
    hint: "MLA date format puts the day first, then the month, then the year.",
    showMe: "Correct format: 15 June 2026",
    check: (state) => state.selectedDate === correctDate,
    solve: { selectedDate: correctDate },
    custom: "dateChoices",
  },
  {
    id: "runningHeader",
    short: "Page Header",
    color: "from-cyan-400 to-teal-500",
    goal: "Put the last name before the page number.",
    doThis: ["Click Insert.", "Choose Page number → Top right.", "Type Mitchell before the page number."],
    why: "Only the running header repeats on each page. The MLA heading on the left appears on the first page only, but the last name and page number repeat at the top right of every page.",
    success: "Great job! You added the last name before the page number in the running header.",
    hint: "First add the page number. Then type the last name before it.",
    showMe: "The finished running header should say: Mitchell 1",
    check: (state) => state.pageNumberAdded && state.headerLastName.trim() === correctLastName,
    solve: { pageNumberAdded: true, headerLastName: correctLastName },
    custom: "runningHeaderInput",
  },
  {
    id: "titleCase",
    short: "Title Words",
    color: "from-fuchsia-400 to-pink-500",
    goal: "Capitalize the important words in the title.",
    doThis: ["Look at the page above and find the essay title.", "Answer the question below by selecting the title that fixes it correctly."],
    why: "This is called title case. Capitalize the first word, last word, and important words in the title.",
    success: "Great job! You fixed the title capitalization.",
    hint: "The correct title is: Why Revision Matters in College Writing.",
    showMe: "Correct title: Why Revision Matters in College Writing",
    check: (state) => state.title === correctTitle,
    solve: { title: correctTitle },
    custom: "titleChoices",
  },
  {
    id: "centerTitle",
    short: "Center Title",
    color: "from-indigo-400 to-blue-500",
    goal: "Move the title to the center of the page.",
    doThis: ["Click the title.", "Click the Center Align button."],
    why: "MLA titles are centered, but they are not bolded, underlined, enlarged, italicized, colored, or placed in quotation marks.",
    success: "Great job! The title is centered correctly.",
    hint: "The center align button looks like centered horizontal lines.",
    showMe: "Click the title → Center Align",
    check: (state) => state.titleAlign === "center",
    solve: { titleAlign: "center" },
  },
  {
    id: "indent",
    short: "Tab Inward",
    color: "from-lime-400 to-green-500",
    goal: "Tab the first line inward.",
    doThis: ["Locate the blue Press Tab button in the MLA Coach panel on the right side of the screen.", "Click the Press Tab button.", "Watch the first line of the paragraph move inward."],
    why: "In MLA formatting, the first line of each paragraph begins slightly inward from the left margin. In a real Google Doc, you would press the Tab key once.",
    success: "Great job! You tabbed the first line inward.",
    hint: "The blue Press Tab button is in the MLA Coach panel directly under these instructions.",
    showMe: "Click Press Tab in the MLA Coach panel.",
    check: (state) => state.paragraphIndented,
    solve: { paragraphIndented: true },
    custom: "tabPractice",
  },
];

const dateChoices = ["June 15, 2026", "15 June 2026", "6/15/2026"];
const titleChoices = ["why revision matters in college writing", "Why revision matters in college writing", "Why Revision Matters in College Writing"];
const paragraphText = "Writing is a process that requires planning, drafting, revising, and editing. Successful college writers rarely produce a perfect paper on the first attempt. Instead, they review their work carefully and make improvements before submitting the final version. Learning MLA formatting is part of that revision process because it helps writers present their ideas professionally. Throughout this course, you will use these formatting skills on every essay you write. Mastering them now will save time and reduce formatting errors later in the semester.";

function LineSpacingIcon() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      <span className="flex flex-col gap-[3px]">
        <span className="block h-[2px] w-5 rounded bg-current" />
        <span className="block h-[2px] w-5 rounded bg-current" />
        <span className="block h-[2px] w-5 rounded bg-current" />
      </span>
      <span className="text-xs leading-none">↕</span>
    </span>
  );
}

export default function MLAFormattingLab() {
  const [state, setState] = useState(initialState);
  const [stepIndex, setStepIndex] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);
  const [wrongAction, setWrongAction] = useState("");
  const [started, setStarted] = useState(false);
  const [selectedArea, setSelectedArea] = useState("document");
  const [helpLevel, setHelpLevel] = useState(0);
  const [showExample, setShowExample] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [showPageSetup, setShowPageSetup] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [certificateDownloaded, setCertificateDownloaded] = useState(false);
  const [templateOpened, setTemplateOpened] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const current = steps[stepIndex];
  const currentComplete = current.check(state);
  const completedCount = steps.filter((step) => step.check(state)).length;
  const progress = Math.round((completedCount / steps.length) * 100);
  const allComplete = completedCount === steps.length;
  const isLastStepComplete = stepIndex === steps.length - 1 && currentComplete;

  const pageStyle = useMemo(() => ({
    fontFamily: state.font === "Times New Roman" ? "'Times New Roman', Times, serif" : "Arial, sans-serif",
    fontSize: state.fontSize === "12" ? "12pt" : "11pt",
    lineHeight: state.spacing === "Double" ? "2" : "1.25",
  }), [state.font, state.fontSize, state.spacing]);

  const showWrongAction = (message = "Not quite. Follow the current step in the MLA Coach before moving on.") => {
    setWrongAction(message);
    setFeedback(message);
    window.setTimeout(() => setWrongAction(""), 2500);
  };

  const completeStepAction = (stepId, updates) => {
    if (current.id !== stepId) {
      showWrongAction();
      setOpenMenu(null);
      return;
    }
    setState((prev) => ({ ...prev, ...updates }));
    setOpenMenu(null);
    setFeedback("");
  };

  const chooseDate = (date) => {
    setState((prev) => ({ ...prev, selectedDate: date }));
    setFeedback(date === correctDate ? "Correct! MLA dates are written as Day Month Year." : "Not quite. MLA dates use this order: day, month, year. Try again.");
  };

  const chooseTitle = (title) => {
    setState((prev) => ({ ...prev, title }));
    setFeedback(title === correctTitle ? "Correct! Important words in an MLA title should be capitalized." : "Not quite. The important words in the title should be capitalized. Try again.");
  };

  const updateHeaderLastName = (value) => {
    setState((prev) => ({ ...prev, headerLastName: value }));
    if (!value.trim()) setFeedback("");
    else if (value.trim() === correctLastName) setFeedback("Correct! The running header now shows the last name before the page number.");
    else setFeedback("Not quite. Type Mitchell before the page number.");
  };

  const pressTab = () => {
    if (current.id !== "indent") {
      showWrongAction();
      return;
    }
    setState((prev) => ({ ...prev, paragraphIndented: true }));
    setSelectedArea("indent");
    setFeedback("Correct! You tabbed the first line inward.");
  };

  const nextStep = () => {
    if (!currentComplete) return;
    setHelpLevel(0);
    setFeedback("");
    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  };

  const activeClass = (area) => (selectedArea === area || current.id === area ? "ring-4 ring-sky-300 bg-sky-50/60 rounded-md" : "");

  const certificateId = useMemo(() => {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const serial = String(Math.floor(date.getTime() % 100000)).padStart(5, "0");
    return `MLA-${y}${m}${d}-${serial}`;
  }, []);

  const downloadCertificate = () => {
    setCertificateDownloaded(true);
    window.setTimeout(() => {
      const certificateSection = document.getElementById("printable-certificate");
      if (certificateSection) certificateSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const printCertificate = () => {
    window.print();
  };

  const openTemplate = () => {
    setTemplateOpened(true);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-fuchsia-500 to-amber-400 p-5 text-slate-950">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-[1fr_.85fr]">
            <div className="p-8 md:p-10">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><GraduationCap className="h-8 w-8" /></div>
                <div><p className="text-sm font-bold uppercase tracking-wide text-blue-600">Interactive practice</p><h1 className="text-3xl font-black md:text-5xl">MLA Formatting Lab</h1></div>
              </div>
              <p className="text-lg leading-relaxed text-slate-700">Your mission is to repair a poorly formatted essay and turn it into a properly formatted MLA document.</p>
              <div className="mt-6 rounded-3xl bg-gradient-to-r from-yellow-100 via-amber-50 to-orange-100 p-5 shadow-sm ring-2 ring-yellow-300">
                <p className="text-xl font-black text-amber-900">🏆 EARN PARTICIPATION CREDIT!</p>
                <div className="mt-3 space-y-2 text-sm font-semibold text-slate-800"><p>The skills you learn in this activity will be used on every essay you write in this course.</p><p>📝 Learn MLA formatting once.</p><p>📘 Use your MLA template all semester.</p><p>🚀 Build skills that will help you succeed on future writing assignments.</p></div>
              </div>
              <div className="mt-6 rounded-3xl bg-yellow-50 p-5 ring-1 ring-yellow-200">
                <p className="font-bold text-yellow-900">How it works</p>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-yellow-950"><li>Read one task at a time in the MLA Coach.</li><li>Use the toolbar, menus, pop-up boxes, and practice choices to fix the document.</li><li>Look for the green check mark when the step is correct.</li><li>Use the <strong>I’m Stuck</strong> button anytime you need help.</li></ol>
              </div>
              <div className="mt-5 rounded-3xl bg-slate-50 p-5"><p className="font-bold">You do not need to open Google Docs.</p><p className="mt-1 text-sm text-slate-600">This activity includes its own Google Docs-style practice workspace. Complete everything inside this lab.</p></div>
              <div className="mt-6 rounded-3xl bg-white p-4 ring-1 ring-slate-200"><label className="block text-sm font-bold text-slate-700">Enter your full name for your completion certificate:</label><input value={studentName} onChange={(event) => setStudentName(event.target.value)} placeholder="First and Last Name" className="mt-2 w-full rounded-2xl border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400" /></div>
              <Button onClick={() => setStarted(true)} disabled={!studentName.trim()} className="mt-7 w-full rounded-2xl bg-blue-700 py-6 text-lg hover:bg-blue-800 disabled:opacity-50"><PlayCircle className="mr-2 h-5 w-5" /> Start Lab</Button>
              {!studentName.trim() && <p className="mt-2 text-center text-sm text-slate-500">Enter your full name to begin.</p>}
            </div>
            <div className="bg-slate-950 p-8 text-white md:p-10">
              <div className="mb-5 flex items-center gap-2 text-yellow-300"><Sparkles className="h-5 w-5" /><p className="font-bold">Skills you will practice</p></div>
              <div className="grid gap-3">{steps.map((step, index) => <div key={step.id} className={`rounded-2xl bg-gradient-to-r ${step.color} p-[2px]`}><div className="rounded-2xl bg-slate-950/85 px-4 py-3 text-sm font-semibold">{index + 1}. {step.short}</div></div>)}</div>
              <p className="mt-6 text-sm text-slate-300">This lab focuses only on MLA page formatting. In-text citations and Works Cited entries are not included in this activity.</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showCertificate && allComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-sky-500 to-fuchsia-500 p-6">
        <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="w-full rounded-[2rem] bg-white p-8 text-center shadow-2xl md:p-12">
            <PartyPopper className="mx-auto h-16 w-16 text-amber-500" />
            <h1 className="mt-4 text-4xl font-black text-slate-950">MLA Formatting Mastered!</h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">{studentName}, you successfully repaired the document and practiced the basic MLA page formatting skills needed for college essays.</p>
            <div className="mt-8 grid gap-3 text-left sm:grid-cols-2 md:grid-cols-3">{steps.map((step) => <div key={step.id} className="flex items-center gap-2 rounded-2xl bg-green-50 p-3 font-medium text-green-800"><CheckCircle2 className="h-5 w-5" /> {step.short}</div>)}</div>
            <div className="mt-8 rounded-3xl bg-slate-50 p-5">
              <p className="font-bold text-slate-900">Completion Certificate</p>
              <div id="printable-certificate" className="mx-auto mt-3 max-w-md rounded-2xl border bg-white p-4 text-sm leading-relaxed shadow-sm"><p className="text-center text-lg font-black">MLA Formatting Lab Completion Certificate</p><p className="mt-3 text-center">This certifies that</p><p className="text-center text-xl font-black text-blue-700">{studentName}</p><p className="mt-2 text-center">successfully completed the MLA Formatting Lab.</p><p className="mt-3 text-center text-xs text-slate-500">Instructor: Professor Wendy Esch</p><p className="mt-2 text-center text-xs text-slate-500">Certificate ID: {certificateId}</p></div>
              <div className="mt-4 rounded-2xl bg-yellow-50 p-4 text-left ring-1 ring-yellow-200"><p className="font-black text-yellow-900">IMPORTANT: Submit your certificate in Blackboard</p><ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-yellow-950"><li>Download your MLA Formatting Lab Completion Certificate.</li><li>Upload the certificate only to the MLA Formatting Lab assignment link in Blackboard for participation credit.</li><li>Open the MLA Essay Template and click the blue <strong>Use Template</strong> button on the right side of the screen.</li></ol></div>
              <Button onClick={downloadCertificate} className="mt-4 rounded-2xl">View Completion Certificate</Button>
              {certificateDownloaded && (
                <div className="mt-3 rounded-2xl bg-green-50 p-4 text-left text-sm text-green-800">
                  <p className="font-bold">✓ Certificate ready.</p>
                  <p>Use the button below to print this page or save it as a PDF, then upload the certificate to Blackboard.</p>
                  <Button onClick={printCertificate} className="mt-3 rounded-2xl bg-green-700 hover:bg-green-800">Save Certificate as PDF</Button><p className="mt-2 text-xs text-green-700">In the print window, choose Save as PDF, then upload that PDF to Blackboard.</p>
                </div>
              )}
              <a href={templateUrl} target="_blank" rel="noreferrer" onClick={openTemplate} className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">Open MLA Essay Template</a>
              {templateOpened && <p className="mt-2 text-sm font-semibold text-green-700">✓ Template opened. Click the blue Use Template button in Google Docs.</p>}
              <a href={templateUrl} target="_blank" rel="noreferrer" className="mt-2 block text-sm font-semibold text-blue-700 underline">Template link not opening? Click here.</a>
              <p className="mt-3 text-left text-sm text-slate-600">After the template opens, click the blue <strong>Use Template</strong> button. Replace LastName, Type Your Name Here, Type Date Here, and Type Your Title Here before writing your essay.</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f4] text-slate-900">
      {showPageSetup && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><h2 className="text-2xl font-black text-slate-950">Page setup</h2><p className="mt-2 text-sm text-slate-600">Check the margins for the document. MLA uses 1-inch margins on all sides.</p><div className="mt-5 grid grid-cols-2 gap-3">{["Top", "Bottom", "Left", "Right"].map((label) => <label key={label} className="rounded-2xl border bg-slate-50 p-3 text-sm font-semibold text-slate-700">{label}<select className="mt-2 w-full rounded-xl border bg-white px-3 py-2" defaultValue="1 inch"><option>0.5 inch</option><option>1 inch</option><option>1.5 inches</option></select></label>)}</div><div className="mt-6 flex gap-3"><Button variant="outline" className="flex-1 rounded-2xl" onClick={() => setShowPageSetup(false)}>Cancel</Button><Button className="flex-1 rounded-2xl" onClick={() => { completeStepAction("margins", { margins: "1 inch" }); setShowPageSetup(false); }}>Apply</Button></div></div></div>}

      <div className="border-b bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-600 via-fuchsia-500 to-amber-400 px-5 py-3 text-white"><div className="mb-2 flex items-center justify-between gap-3"><div className="flex items-center gap-2 font-bold"><Sparkles className="h-5 w-5" /> MLA Lab Progress</div><div className="text-sm font-semibold">Step {stepIndex + 1} of {steps.length}</div></div><div className="flex w-full gap-1 rounded-full bg-white/25 p-1">{steps.map((step, index) => { const done = step.check(state); const active = index === stepIndex; return <button key={step.id} onClick={() => { if (index <= stepIndex || step.check(state)) setStepIndex(index); }} title={step.short} className={`h-4 flex-1 rounded-full transition-all ${done ? `bg-gradient-to-r ${step.color} shadow-sm` : active ? "bg-white" : "bg-white/30"}`} />; })}</div></div>
        <div className="flex items-center gap-3 px-5 py-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700"><FileText className="h-6 w-6" /></div><div><h1 className="text-lg font-semibold leading-tight">MLA Practice Worksheet</h1><p className="text-xs text-slate-500">Google Docs-style practice workspace</p></div><div className="ml-auto rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">{progress}% Complete</div></div>
        <div className="flex flex-wrap items-center gap-1 px-5 pb-2 text-sm">{[{ label: "File", key: "file" }, { label: "Edit", key: "edit" }, { label: "View", key: "view" }, { label: "Insert", key: "insert" }, { label: "Format", key: "format" }, { label: "Tools", key: "tools" }, { label: "Help", key: "help" }].map((menu) => <div className="relative" key={menu.key}><button onClick={() => setOpenMenu(openMenu === menu.key ? null : menu.key)} className={`rounded px-3 py-1 hover:bg-slate-100 ${current.id === "runningHeader" && menu.key === "insert" && helpLevel >= 2 ? "ring-4 ring-yellow-300" : ""}`}>{menu.label}</button>{openMenu === menu.key && <div className="absolute left-0 top-8 z-30 w-64 rounded-lg border bg-white p-2 shadow-xl">{menu.key === "file" && <button onClick={() => { if (current.id !== "margins") { showWrongAction(); setOpenMenu(null); return; } setShowPageSetup(true); setOpenMenu(null); }} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">Page setup</button>}{menu.key === "insert" && <button onClick={() => completeStepAction("runningHeader", { pageNumberAdded: true })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">Page number → Top right</button>}{menu.key === "format" && <><button onClick={() => completeStepAction("font", { font: "Times New Roman" })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">Font → Times New Roman</button><button onClick={() => completeStepAction("size", { fontSize: "12" })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">Font size → 12</button><button onClick={() => showWrongAction("Use the Line Spacing toolbar button for this step.")} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">Line spacing</button><button onClick={() => completeStepAction("centerTitle", { titleAlign: "center" })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">Align → Center</button></>}{!["file", "insert", "format"].includes(menu.key) && <p className="px-3 py-2 text-slate-500">Use File, Insert, or Format for this lab.</p>}</div>}</div>)}</div>
        <div className="flex flex-wrap items-center gap-2 border-t px-5 py-2 text-sm"><button className="rounded p-2 hover:bg-slate-100"><RotateCcw className="h-4 w-4" /></button><div className="h-6 w-px bg-slate-300" /><div className="relative"><button onClick={() => setOpenMenu(openMenu === "font" ? null : "font")} className={`flex min-w-44 items-center justify-between rounded border bg-white px-3 py-1 hover:bg-slate-50 ${current.id === "font" && helpLevel >= 2 ? "ring-4 ring-yellow-300" : ""}`}>{state.font} <ChevronDown className="h-4 w-4" /></button>{openMenu === "font" && <div className="absolute z-30 mt-1 w-44 rounded-lg border bg-white p-1 shadow-xl">{["Arial", "Times New Roman", "Calibri"].map((font) => <button key={font} onClick={() => completeStepAction("font", { font })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">{font}</button>)}</div>}</div><div className="relative"><button onClick={() => setOpenMenu(openMenu === "size" ? null : "size")} className={`flex w-20 items-center justify-between rounded border bg-white px-3 py-1 hover:bg-slate-50 ${current.id === "size" && helpLevel >= 2 ? "ring-4 ring-yellow-300" : ""}`}>{state.fontSize} <ChevronDown className="h-4 w-4" /></button>{openMenu === "size" && <div className="absolute z-30 mt-1 w-20 rounded-lg border bg-white p-1 shadow-xl">{["10", "11", "12", "14"].map((fontSize) => <button key={fontSize} onClick={() => completeStepAction("size", { fontSize })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">{fontSize}</button>)}</div>}</div><button className="rounded p-2 hover:bg-slate-100"><Type className="h-4 w-4" /></button><button onClick={() => completeStepAction("centerTitle", { titleAlign: "left" })} className="rounded p-2 hover:bg-slate-100"><AlignLeft className="h-4 w-4" /></button><button onClick={() => completeStepAction("centerTitle", { titleAlign: "center" })} className={`rounded p-2 hover:bg-slate-100 ${current.id === "centerTitle" && helpLevel >= 2 ? "ring-4 ring-yellow-300" : ""}`}><AlignCenter className="h-4 w-4" /></button><div className="relative"><button onClick={() => setOpenMenu(openMenu === "lineSpacing" ? null : "lineSpacing")} className={`rounded p-2 hover:bg-slate-100 ${current.id === "spacing" && helpLevel >= 2 ? "ring-4 ring-yellow-300" : ""}`} title="Line Spacing"><LineSpacingIcon /></button>{openMenu === "lineSpacing" && <div className="absolute z-30 mt-1 w-36 rounded-lg border bg-white p-1 shadow-xl"><button onClick={() => completeStepAction("spacing", { spacing: "Single" })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">Single</button><button onClick={() => completeStepAction("spacing", { spacing: "1.15" })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">1.15</button><button onClick={() => completeStepAction("spacing", { spacing: "1.5" })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">1.5</button><button onClick={() => completeStepAction("spacing", { spacing: "Double" })} className="w-full rounded px-3 py-2 text-left hover:bg-blue-50">Double</button></div>}</div></div>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_380px]">
        <main className="flex justify-center overflow-auto rounded-2xl bg-[#e8eaed] p-6 shadow-inner"><div className="relative min-h-[850px] w-full max-w-[720px] overflow-hidden bg-white shadow-2xl" style={{ padding: state.margins === "1 inch" ? "92px" : "52px" }}>{state.pageNumberAdded && <div onClick={() => setSelectedArea("runningHeader")} className={`absolute right-20 top-12 flex items-center justify-end gap-1 text-right ${current.id === "runningHeader" ? "ring-4 ring-sky-300 bg-sky-50/80 rounded-md p-1" : ""}`} style={pageStyle}><input aria-label="Type last name for running header" value={state.headerLastName} onChange={(event) => updateHeaderLastName(event.target.value)} placeholder="Last name" className="w-24 rounded border border-slate-300 px-1 text-right focus:outline-none focus:ring-2 focus:ring-blue-300" /><span>1</span></div>}<div style={pageStyle}><div onClick={() => setSelectedArea("headingDate")} className={`cursor-pointer p-1 ${current.id === "headingDate" ? "ring-4 ring-sky-300 bg-sky-50/60 rounded-md" : ""}`}><div>Sarah Mitchell</div><div>Professor Esch</div><div>English 1301</div><div>{state.selectedDate}</div></div><div onClick={() => setSelectedArea("title")} className={`cursor-pointer break-words p-1 ${activeClass("titleCase")} ${activeClass("centerTitle")}`} style={{ textAlign: state.titleAlign }}>{state.title}</div><p onClick={() => setSelectedArea("indent")} className={`cursor-pointer break-words p-1 ${current.id === "indent" ? "" : activeClass("indent")}`} style={{ textIndent: state.paragraphIndented ? "0.5in" : "0in", overflowWrap: "break-word" }}>{paragraphText}</p></div></div></main>

        <aside className="space-y-4"><Card className={`rounded-3xl border-0 bg-gradient-to-br ${current.color} p-[2px] shadow-xl`}><CardContent className="rounded-3xl bg-white p-5"><div className="mb-3 flex items-center gap-2 text-slate-700"><Highlighter className="h-5 w-5" /><span className="font-bold">MLA Coach</span></div><p className="text-sm font-bold uppercase tracking-wide text-slate-500">Step {stepIndex + 1} of {steps.length}</p><h2 className="mt-1 text-2xl font-black text-slate-950">{current.goal}</h2><div className="mt-4 rounded-2xl bg-blue-50 p-4"><p className="text-sm font-bold uppercase tracking-wide text-blue-700">What to do</p><ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-800">{current.doThis.map((item) => <li key={item}>{item}</li>)}</ol></div>

          {current.custom === "dateChoices" && <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200"><p className="text-sm font-bold uppercase tracking-wide text-slate-500">Look at the page above. How should the date be fixed?</p>
                  <p className="mt-1 text-sm text-slate-600">Select the correct MLA date below.</p><div className="mt-3 grid gap-2">{dateChoices.map((date) => <button key={date} onClick={() => chooseDate(date)} className={`rounded-xl border px-4 py-3 text-left font-medium transition hover:bg-blue-50 ${state.selectedDate === date ? "border-blue-500 bg-blue-50 text-blue-800" : "bg-white"}`}>{date}</button>)}</div></div>}
          {current.custom === "titleChoices" && <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200"><p className="text-sm font-bold uppercase tracking-wide text-slate-500">Look at the page above. How can the title be fixed?</p>
                  <p className="mt-1 text-sm text-slate-600">Select one of the multiple-choice answers below.</p><div className="mt-3 grid gap-2">{titleChoices.map((title) => <button key={title} onClick={() => chooseTitle(title)} className={`rounded-xl border px-4 py-3 text-left font-medium transition hover:bg-blue-50 ${state.title === title ? "border-blue-500 bg-blue-50 text-blue-800" : "bg-white"}`}>{title}</button>)}</div></div>}
          {current.custom === "runningHeaderInput" && <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200"><p className="text-sm font-bold uppercase tracking-wide text-slate-500">Practice the running header</p><div className="mt-3 rounded-2xl bg-cyan-50 p-3 text-sm text-cyan-950">In a real Google Doc, you would double click at the top of the page to get into the header area. The page number is provided here. Type the student’s last name before the number.</div><label className="mt-3 block text-sm font-semibold text-slate-700">Type the last name:</label><input value={state.headerLastName} onChange={(event) => updateHeaderLastName(event.target.value)} placeholder="Mitchell" className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>}
          {current.custom === "tabPractice" && <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200"><p className="text-sm font-bold uppercase tracking-wide text-slate-500">Practice the Tab key</p><p className="mt-2 text-sm text-slate-700">The blue Press Tab button is in this MLA Coach panel. Click it and watch the first line move inward.</p><Button onClick={pressTab} className="mt-3 w-full rounded-2xl bg-blue-700 hover:bg-blue-800">Press Tab</Button></div>}

          <div className="mt-4 rounded-2xl bg-yellow-50 p-4"><p className="text-sm font-bold uppercase tracking-wide text-yellow-700">Why</p><p className="mt-1 text-sm text-slate-800">{current.why}</p></div><div className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50 p-3">{currentComplete ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : <MousePointerClick className="h-6 w-6 text-slate-500" />}<span className={`font-semibold ${currentComplete ? "text-green-700" : "text-slate-700"}`}>{currentComplete ? current.success : "Not complete yet. Try the steps above."}</span></div>{feedback && <div className={`mt-3 rounded-2xl p-4 text-sm font-semibold ${feedback.startsWith("Correct") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{feedback}</div>}{wrongAction && <div className="mt-3 rounded-2xl bg-red-100 p-4 text-sm font-bold text-red-800">{wrongAction}</div>}{!currentComplete && <div className="mt-4 space-y-3"><Button variant="outline" className="w-full rounded-2xl" onClick={() => setHelpLevel((level) => Math.min(level + 1, 3))}><HelpCircle className="mr-2 h-4 w-4" /> I’m Stuck</Button>{helpLevel >= 1 && <div className="rounded-2xl bg-purple-50 p-4 text-sm text-purple-950"><strong>Hint:</strong> {current.hint}</div>}{helpLevel >= 2 && <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-950"><strong>Show me:</strong> {current.showMe}</div>}{helpLevel >= 3 && <Button className="w-full rounded-2xl bg-amber-600 hover:bg-amber-700" onClick={() => completeStepAction(current.id, current.solve)}>Complete This Step For Me</Button>}</div>}<div className="mt-5 flex gap-3"><Button variant="outline" className="flex-1 rounded-2xl" onClick={() => { setHelpLevel(0); setFeedback(""); setStepIndex((index) => Math.max(0, index - 1)); }} disabled={stepIndex === 0}>Back</Button><Button className="flex-1 rounded-2xl" onClick={isLastStepComplete ? () => setShowCertificate(true) : nextStep} disabled={!currentComplete}>{isLastStepComplete ? "Finish Lab" : "Next"}</Button></div></CardContent></Card>

          <Card className="rounded-3xl shadow-sm"><CardContent className="p-5"><div className="mb-3 flex items-center justify-between"><p className="font-bold">Progress</p><p className="text-sm font-semibold text-slate-500">{completedCount}/{steps.length}</p></div><Progress value={progress} className="mb-4" /><div className="grid grid-cols-2 gap-2 text-sm">{steps.map((step, index) => <button key={step.id} onClick={() => { if (index <= stepIndex || step.check(state)) setStepIndex(index); }} className={`flex items-center gap-2 rounded-xl p-2 text-left hover:bg-slate-100 ${index === stepIndex ? "bg-blue-50" : ""}`}>{step.check(state) ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <span className="h-4 w-4 rounded-full border" />} {step.short}</button>)}</div><Button variant="outline" onClick={() => setShowExample(!showExample)} className="mt-4 w-full rounded-2xl">{showExample ? "Hide" : "View"} Correct MLA Example</Button>{showExample && <div className="mt-4 rounded-2xl border bg-white p-4 font-serif text-xs leading-loose shadow-inner"><div className="text-right">Mitchell 1</div><div>Sarah Mitchell</div><div>Professor Esch</div><div>English 1301</div><div>15 June 2026</div><div className="text-center">Why Revision Matters in College Writing</div><p style={{ textIndent: "0.5in" }}>Writing is a process that requires planning, drafting, revising, and editing. Successful college writers rarely produce a perfect paper on the first attempt.</p></div>}</CardContent></Card>
        </aside>
      </div>
    </div>
  );
}
