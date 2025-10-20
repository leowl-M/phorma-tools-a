/* Font Glitch Studio — Kinetic + Effetti avanzati + Spaziatura per-lettera */
let baseFont = null;
let sketch = null;

const basePathCache = new Map();
const glyphCache = new Map();

const DEGULAR_TEXT_REGULAR_URL =
  "Font/Degular/Degular Text (14)/DegularText-Regular.otf";
const DEFAULT_FONT_URLS = [
  DEGULAR_TEXT_REGULAR_URL,
  "https://cdn.jsdelivr.net/npm/@fontsource/roboto/files/roboto-latin-400-normal.ttf",
  "https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.ttf",
];
const LOCAL_FONT_PRESETS = [
  {
    group: "Degular Variable",
    items: [
      {
        label: "Degular Variable",
        url: "Font/Degular/Degular Variable/DegularVariable.ttf",
      },
    ],
  },
  {
    group: "Degular Text",
    items: [
      {
        label: "Text Thin",
        url: "Font/Degular/Degular Text (14)/DegularText-Thin.otf",
      },
      {
        label: "Text Thin Italic",
        url: "Font/Degular/Degular Text (14)/DegularText-ThinItalic.otf",
      },
      {
        label: "Text Light",
        url: "Font/Degular/Degular Text (14)/DegularText-Light.otf",
      },
      {
        label: "Text Light Italic",
        url: "Font/Degular/Degular Text (14)/DegularText-LightItalic.otf",
      },
      {
        label: "Text Regular",
        url: DEGULAR_TEXT_REGULAR_URL,
      },
      {
        label: "Text Regular Italic",
        url: "Font/Degular/Degular Text (14)/DegularText-RegularItalic.otf",
      },
      {
        label: "Text Medium",
        url: "Font/Degular/Degular Text (14)/DegularText-Medium.otf",
      },
      {
        label: "Text Medium Italic",
        url: "Font/Degular/Degular Text (14)/DegularText-MediumItalic.otf",
      },
      {
        label: "Text Semibold",
        url: "Font/Degular/Degular Text (14)/DegularText-Semibold.otf",
      },
      {
        label: "Text Semibold Italic",
        url: "Font/Degular/Degular Text (14)/DegularText-SemiboldItalic.otf",
      },
      {
        label: "Text Bold",
        url: "Font/Degular/Degular Text (14)/DegularText-Bold.otf",
      },
      {
        label: "Text Bold Italic",
        url: "Font/Degular/Degular Text (14)/DegularText-BoldItalic.otf",
      },
      {
        label: "Text Black",
        url: "Font/Degular/Degular Text (14)/DegularText-Black.otf",
      },
      {
        label: "Text Black Italic",
        url: "Font/Degular/Degular Text (14)/DegularText-BlackItalic.otf",
      },
    ],
  },
  {
    group: "Degular",
    items: [
      {
        label: "Regular Thin",
        url: "Font/Degular/Degular (14)/Degular-Thin.otf",
      },
      {
        label: "Regular Thin Italic",
        url: "Font/Degular/Degular (14)/Degular-ThinItalic.otf",
      },
      {
        label: "Regular Light",
        url: "Font/Degular/Degular (14)/Degular-Light.otf",
      },
      {
        label: "Regular Light Italic",
        url: "Font/Degular/Degular (14)/Degular-LightItalic.otf",
      },
      {
        label: "Regular",
        url: "Font/Degular/Degular (14)/Degular-Regular.otf",
      },
      {
        label: "Regular Italic",
        url: "Font/Degular/Degular (14)/Degular-RegularItalic.otf",
      },
      {
        label: "Regular Medium",
        url: "Font/Degular/Degular (14)/Degular-Medium.otf",
      },
      {
        label: "Regular Medium Italic",
        url: "Font/Degular/Degular (14)/Degular-MediumItalic.otf",
      },
      {
        label: "Regular Semibold",
        url: "Font/Degular/Degular (14)/Degular-Semibold.otf",
      },
      {
        label: "Regular Semibold Italic",
        url: "Font/Degular/Degular (14)/Degular-SemiboldItalic.otf",
      },
      {
        label: "Regular Bold",
        url: "Font/Degular/Degular (14)/Degular-Bold.otf",
      },
      {
        label: "Regular Bold Italic",
        url: "Font/Degular/Degular (14)/Degular-BoldItalic.otf",
      },
      {
        label: "Regular Black",
        url: "Font/Degular/Degular (14)/Degular-Black.otf",
      },
      {
        label: "Regular Black Italic",
        url: "Font/Degular/Degular (14)/Degular-BlackItalic.otf",
      },
    ],
  },
  {
    group: "Degular Display",
    items: [
      {
        label: "Display Thin",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-Thin.otf",
      },
      {
        label: "Display Thin Italic",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-ThinItalic.otf",
      },
      {
        label: "Display Light",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-Light.otf",
      },
      {
        label: "Display Light Italic",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-LightItalic.otf",
      },
      {
        label: "Display Regular",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-Regular.otf",
      },
      {
        label: "Display Regular Italic",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-RegularItalic.otf",
      },
      {
        label: "Display Medium",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-Medium.otf",
      },
      {
        label: "Display Medium Italic",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-MediumItalic.otf",
      },
      {
        label: "Display Semibold",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-Semibold.otf",
      },
      {
        label: "Display Semibold Italic",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-SemiboldItalic.otf",
      },
      {
        label: "Display Bold",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-Bold.otf",
      },
      {
        label: "Display Bold Italic",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-BoldItalic.otf",
      },
      {
        label: "Display Black",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-Black.otf",
      },
      {
        label: "Display Black Italic",
        url: "Font/Degular/Degular Display (14)/DegularDisplay-BlackItalic.otf",
      },
    ],
  },
  {
    group: "Degular Mono Variable",
    items: [
      {
        label: "Mono Variable",
        url: "Font/Degular/Degular Mono Variable/DegularMonoVariable.ttf",
      },
    ],
  },
  {
    group: "Degular Mono",
    items: [
      {
        label: "Mono Thin",
        url: "Font/Degular/Degular Mono (14)/DegularMono-Thin.otf",
      },
      {
        label: "Mono Thin Italic",
        url: "Font/Degular/Degular Mono (14)/DegularMono-ThinItalic.otf",
      },
      {
        label: "Mono Light",
        url: "Font/Degular/Degular Mono (14)/DegularMono-Light.otf",
      },
      {
        label: "Mono Light Italic",
        url: "Font/Degular/Degular Mono (14)/DegularMono-LightItalic.otf",
      },
      {
        label: "Mono Regular",
        url: "Font/Degular/Degular Mono (14)/DegularMono-Regular.otf",
      },
      {
        label: "Mono Regular Italic",
        url: "Font/Degular/Degular Mono (14)/DegularMono-RegularItalic.otf",
      },
      {
        label: "Mono Medium",
        url: "Font/Degular/Degular Mono (14)/DegularMono-Medium.otf",
      },
      {
        label: "Mono Medium Italic",
        url: "Font/Degular/Degular Mono (14)/DegularMono-MediumItalic.otf",
      },
      {
        label: "Mono Semibold",
        url: "Font/Degular/Degular Mono (14)/DegularMono-Semibold.otf",
      },
      {
        label: "Mono Semibold Italic",
        url: "Font/Degular/Degular Mono (14)/DegularMono-SemiboldItalic.otf",
      },
      {
        label: "Mono Bold",
        url: "Font/Degular/Degular Mono (14)/DegularMono-Bold.otf",
      },
      {
        label: "Mono Bold Italic",
        url: "Font/Degular/Degular Mono (14)/DegularMono-BoldItalic.otf",
      },
      {
        label: "Mono Black",
        url: "Font/Degular/Degular Mono (14)/DegularMono-Black.otf",
      },
      {
        label: "Mono Black Italic",
        url: "Font/Degular/Degular Mono (14)/DegularMono-BlackItalic.otf",
      },
    ],
  },
];

const TAB_STORAGE_KEY = "FGS_ACTIVE_TAB";

const ui = {
  // Font
  drop: byId("drop"),
  file: byId("file"),
  localFont: byId("localFont"),
  fontName: byId("fontName"),
  fontStyle: byId("fontStyle"),
  useKerning: byId("useKerning"),
  autoHint: byId("autoHint"),

  // Testo
  text: byId("text"),
  fontSize: byId("fontSize"),
  fontSizeVal: byId("fontSizeVal"),
  lineHeight: byId("lineHeight"),
  lineHeightVal: byId("lineHeightVal"),
  tracking: byId("tracking"),
  trackingVal: byId("trackingVal"),
  wordSpacing: byId("wordSpacing"),
  wordSpacingVal: byId("wordSpacingVal"),
  align: byId("align"),
  padding: byId("padding"),
  paddingVal: byId("paddingVal"),

  // Spaziatura per-lettera
  perLetterEnabled: byId("perLetterEnabled"),
  perLetterPattern: byId("perLetterPattern"),
  perLetterRepeat: byId("perLetterRepeat"),
  perLetterIncludeSpaces: byId("perLetterIncludeSpaces"),
  perLetterScale: byId("perLetterScale"),
  perLetterScaleVal: byId("perLetterScaleVal"),

  // Deformazioni base
  amount: byId("amount"),
  amountVal: byId("amountVal"),
  freq: byId("freq"),
  freqVal: byId("freqVal"),
  seed: byId("seed"),
  speed: byId("speed"),
  speedVal: byId("speedVal"),
  animate: byId("animate"),
  noiseOctaves: byId("noiseOctaves"),
  noiseOctavesVal: byId("noiseOctavesVal"),
  noiseFalloff: byId("noiseFalloff"),
  noiseFalloffVal: byId("noiseFalloffVal"),
  noiseShape: byId("noiseShape"),
  noiseShapeVal: byId("noiseShapeVal"),
  noiseContrast: byId("noiseContrast"),
  noiseContrastVal: byId("noiseContrastVal"),
  noiseBias: byId("noiseBias"),
  noiseBiasVal: byId("noiseBiasVal"),
  noiseClamp: byId("noiseClamp"),
  noiseClampVal: byId("noiseClampVal"),
  noiseMix: byId("noiseMix"),
  noiseMixVal: byId("noiseMixVal"),
  fxContrast: byId("fxContrast"),
  contrastAmount: byId("contrastAmount"),
  contrastAmountVal: byId("contrastAmountVal"),
  contrastAngle: byId("contrastAngle"),
  contrastAngleVal: byId("contrastAngleVal"),
  contrastSharpness: byId("contrastSharpness"),
  contrastSharpnessVal: byId("contrastSharpnessVal"),
  contrastMix: byId("contrastMix"),
  contrastMixVal: byId("contrastMixVal"),
  contrastClamp: byId("contrastClamp"),
  contrastClampVal: byId("contrastClampVal"),
  contrastBalance: byId("contrastBalance"),
  contrastBalanceVal: byId("contrastBalanceVal"),
  zoneMix: byId("zoneMix"),
  zoneMixVal: byId("zoneMixVal"),
  zoneAscender: byId("zoneAscender"),
  zoneAscenderVal: byId("zoneAscenderVal"),
  zoneXHeight: byId("zoneXHeight"),
  zoneXHeightVal: byId("zoneXHeightVal"),
  zoneDescender: byId("zoneDescender"),
  zoneDescenderVal: byId("zoneDescenderVal"),
  counterProtect: byId("counterProtect"),
  counterStrength: byId("counterStrength"),
  counterStrengthVal: byId("counterStrengthVal"),
  axisX: byId("axisX"),
  axisXVal: byId("axisXVal"),
  axisY: byId("axisY"),
  axisYVal: byId("axisYVal"),
  shear: byId("shear"),
  shearVal: byId("shearVal"),
  rotation: byId("rotation"),
  rotationVal: byId("rotationVal"),
  jitter: byId("jitter"),
  jitterVal: byId("jitterVal"),
  jitterMode: byId("jitterMode"),
  jitterBias: byId("jitterBias"),
  jitterBiasVal: byId("jitterBiasVal"),
  jitterClamp: byId("jitterClamp"),
  jitterClampVal: byId("jitterClampVal"),

  fxWave: byId("fxWave"),
  waveShape: byId("waveShape"),
  waveAmpX: byId("waveAmpX"),
  waveAmpXVal: byId("waveAmpXVal"),
  waveAmpY: byId("waveAmpY"),
  waveAmpYVal: byId("waveAmpYVal"),
  waveLength: byId("waveLength"),
  waveLengthVal: byId("waveLengthVal"),
  wavePhase: byId("wavePhase"),
  wavePhaseVal: byId("wavePhaseVal"),
  waveDirection: byId("waveDirection"),
  waveDirectionVal: byId("waveDirectionVal"),
  waveSharpness: byId("waveSharpness"),
  waveSharpnessVal: byId("waveSharpnessVal"),
  waveMix: byId("waveMix"),
  waveMixVal: byId("waveMixVal"),

  fxBend: byId("fxBend"),
  bendAmount: byId("bendAmount"),
  bendAmountVal: byId("bendAmountVal"),
  bendExponent: byId("bendExponent"),
  bendExponentVal: byId("bendExponentVal"),
  bendPivot: byId("bendPivot"),
  bendPivotVal: byId("bendPivotVal"),
  bendMix: byId("bendMix"),
  bendMixVal: byId("bendMixVal"),
  bendClamp: byId("bendClamp"),
  bendClampVal: byId("bendClampVal"),

  // Colori/Stile (opzionali)
  fillColor: byId("fillColor"),
  strokeColor: byId("strokeColor"),
  strokeWeight: byId("strokeWeight"),
  strokeWeightVal: byId("strokeWeightVal"),
  useGradient: byId("useGradient"),
  gradA: byId("gradA"),
  gradB: byId("gradB"),
  gradAngle: byId("gradAngle"),
  gradAngleVal: byId("gradAngleVal"),
  showPoints: byId("showPoints"),
  showBounds: byId("showBounds"),

  // Export
  btnPNG: byId("btnExportPNG"),
  btnPNGTrim: byId("btnExportPNGTrim"),
  btnSVG: byId("btnExportSVG"),
  hintbar: byId("hintbar"),

  // Opzionali layout
  wrapWidth: byId("wrapWidth"),
  wrapWidthVal: byId("wrapWidthVal"),
  autoWrap: byId("autoWrap"),
  scaleX: byId("scaleX"),
  scaleXVal: byId("scaleXVal"),
  scaleY: byId("scaleY"),
  scaleYVal: byId("scaleYVal"),
  baselineShift: byId("baselineShift"),
  baselineShiftVal: byId("baselineShiftVal"),
  lineJoin: byId("lineJoin"),
  lineCap: byId("lineCap"),
  miterLimit: byId("miterLimit"),
  miterLimitVal: byId("miterLimitVal"),
  fillAlpha: byId("fillAlpha"),
  fillAlphaVal: byId("fillAlphaVal"),
  strokeAlpha: byId("strokeAlpha"),
  strokeAlphaVal: byId("strokeAlphaVal"),
  bgColor: byId("bgColor"),
  detectVF: byId("detectVF"),
  vfAxesRow: byId("vfAxesRow"),

  // Canvas & preset
  showGrid: byId("showGrid"),
  gridSize: byId("gridSize"),
  gridSizeVal: byId("gridSizeVal"),
  showSafe: byId("showSafe"),
  exportBg: byId("exportBg"),
  presetSelect: byId("presetSelect"),
  btnApplyPreset: byId("btnApplyPreset"),
  btnRandomize: byId("btnRandomize"),
  btnSavePreset: byId("btnSavePreset"),
  btnCopyConfig: byId("btnCopyConfig"),
  btnPasteConfig: byId("btnPasteConfig"),
  btnReset: byId("btnReset"),

  // Effetti: Quant
  fxQuantize: byId("fxQuantize"),
  quantMode: byId("quantMode"),
  quantStepX: byId("quantStepX"),
  quantStepXVal: byId("quantStepXVal"),
  quantStepY: byId("quantStepY"),
  quantStepYVal: byId("quantStepYVal"),
  quantAngle: byId("quantAngle"),
  quantAngleVal: byId("quantAngleVal"),
  quantProb: byId("quantProb"),
  quantProbVal: byId("quantProbVal"),
  quantMix: byId("quantMix"),
  quantMixVal: byId("quantMixVal"),
  quantStepR: byId("quantStepR"),
  quantStepRVal: byId("quantStepRVal"),
  quantStepA: byId("quantStepA"),
  quantStepAVal: byId("quantStepAVal"),

  // Effetti: Curvature Bitcrush
  fxCurvCrush: byId("fxCurvCrush"),
  curvSegments: byId("curvSegments"),
  curvSegmentsVal: byId("curvSegmentsVal"),
  curvAngleSnap: byId("curvAngleSnap"),
  curvAngleSnapVal: byId("curvAngleSnapVal"),
  curvTolerance: byId("curvTolerance"),
  curvToleranceVal: byId("curvToleranceVal"),

  // Effetti: Slice & Shift
  fxSlice: byId("fxSlice"),
  sliceH: byId("sliceH"),
  sliceHVal: byId("sliceHVal"),
  sliceShiftX: byId("sliceShiftX"),
  sliceShiftXVal: byId("sliceShiftXVal"),
  sliceShiftY: byId("sliceShiftY"),
  sliceShiftYVal: byId("sliceShiftYVal"),
  slicePattern: byId("slicePattern"),
  slicePhase: byId("slicePhase"),
  slicePhaseVal: byId("slicePhaseVal"),
  sliceNoiseScale: byId("sliceNoiseScale"),
  sliceNoiseScaleVal: byId("sliceNoiseScaleVal"),
  sliceJitter: byId("sliceJitter"),
  sliceJitterVal: byId("sliceJitterVal"),
  sliceProb: byId("sliceProb"),
  sliceProbVal: byId("sliceProbVal"),

  // Effetti: Gapify
  fxGap: byId("fxGap"),
  gapProb: byId("gapProb"),
  gapProbVal: byId("gapProbVal"),
  gapLen: byId("gapLen"),
  gapLenVal: byId("gapLenVal"),
  gapKeep: byId("gapKeep"),
  gapKeepVal: byId("gapKeepVal"),

  fxShapeMap: byId("fxShapeMap"),
  shapeSides: byId("shapeSides"),
  shapeSidesVal: byId("shapeSidesVal"),
  shapeRadius: byId("shapeRadius"),
  shapeRadiusVal: byId("shapeRadiusVal"),
  shapeInner: byId("shapeInner"),
  shapeInnerVal: byId("shapeInnerVal"),
  shapeSpacing: byId("shapeSpacing"),
  shapeSpacingVal: byId("shapeSpacingVal"),
  shapeTwist: byId("shapeTwist"),
  shapeTwistVal: byId("shapeTwistVal"),
  shapeFollow: byId("shapeFollow"),

  // Kinetic
  kinMode: byId("kinMode"),
  kinPeriod: byId("kinPeriod"),
  kinPeriodVal: byId("kinPeriodVal"),
  kinPhase: byId("kinPhase"),
  kinPhaseVal: byId("kinPhaseVal"),
  kinOrigin: byId("kinOrigin"),
  kinRestart: byId("kinRestart"),
  kinPerWord: byId("kinPerWord"),
  kinEnvelope: byId("kinEnvelope"),
  kinFalloff: byId("kinFalloff"),
  kinFalloffVal: byId("kinFalloffVal"),
  kinNoiseScale: byId("kinNoiseScale"),
  kinNoiseScaleVal: byId("kinNoiseScaleVal"),
  kinOffX: byId("kinOffX"),
  kinOffXVal: byId("kinOffXVal"),
  kinOffY: byId("kinOffY"),
  kinOffYVal: byId("kinOffYVal"),
  kinRot: byId("kinRot"),
  kinRotVal: byId("kinRotVal"),
  kinBase: byId("kinBase"),
  kinBaseVal: byId("kinBaseVal"),
  kinScaleX: byId("kinScaleX"),
  kinScaleXVal: byId("kinScaleXVal"),
  kinScaleY: byId("kinScaleY"),
  kinScaleYVal: byId("kinScaleYVal"),
};

const DEGREE_FIELDS = new Set([
  "rotation",
  "shear",
  "contrastAngle",
  "wavePhase",
  "waveDirection",
  "gradAngle",
  "slicePhase",
  "quantAngle",
  "shapeTwist",
  "kinPhase",
]);
const PERCENT_FIELDS = new Set(["scaleX", "scaleY", "kinScaleX", "kinScaleY"]);

function byId(id) {
  return document.getElementById(id);
}
const gv = (el, def = 0) =>
  el
    ? (el.type === "number" || el.type === "range" ? +el.value : el.value) ??
      def
    : def;
const gb = (el, def = false) => (el ? !!el.checked : def);

function syncVal(id, formatter = (v) => v) {
  const input = ui[id];
  const out = ui[id + "Val"];
  if (!input || !out) return;
  const set = () => {
    out.textContent = formatter(input.value);
    redraw();
  };
  input.addEventListener("input", set);
  set();
}

function invalidateGeometry() {
  glyphCache.clear();
}
function invalidateBasePaths() {
  basePathCache.clear();
  glyphCache.clear();
}
function invalidateLayout() {}

function initSidebarTabs() {
  const sidebar = byId("sidebar");
  const tabButtons = sidebar?.querySelectorAll(".tabbar .tab");
  const panels = sidebar?.querySelectorAll(".panel[data-tab]");
  if (!sidebar || !tabButtons?.length || !panels?.length) return;

  sidebar.classList.add("tabbed");
  const buttons = Array.from(tabButtons);
  const sectionPanels = Array.from(panels);

  const applyTabState = (target) => {
    buttons.forEach((btn) => {
      const active = btn.dataset.tabTarget === target;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
      btn.setAttribute("tabindex", active ? "0" : "-1");
    });
    sectionPanels.forEach((panel) => {
      const active = panel.dataset.tab === target;
      panel.classList.toggle("is-active", active);
      panel.toggleAttribute("hidden", !active);
    });
  };

  let stored = null;
  try {
    stored = localStorage.getItem(TAB_STORAGE_KEY);
  } catch {}
  const defaultTab = buttons[0]?.dataset.tabTarget;
  const fallback = defaultTab || sectionPanels[0]?.dataset.tab;
  const initial =
    stored && buttons.some((btn) => btn.dataset.tabTarget === stored)
      ? stored
      : fallback;
  applyTabState(initial);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tabTarget;
      if (!target) return;
      applyTabState(target);
      try {
        localStorage.setItem(TAB_STORAGE_KEY, target);
      } catch {}
    });
  });
}

function initPanelToggles() {
  const panels = document.querySelectorAll("#sidebar .panel");
  panels.forEach((panel) => {
    if (panel.dataset.toggleBound === "true") return;
    const header = panel.querySelector("h2");
    if (!header) return;

    panel.dataset.toggleBound = "true";
    const updateAria = (collapsed) => {
      header.setAttribute("aria-expanded", collapsed ? "false" : "true");
    };

    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    updateAria(panel.classList.contains("collapsed"));

    const toggle = () => {
      const collapsed = panel.classList.toggle("collapsed");
      updateAria(collapsed);
    };

    header.addEventListener("click", toggle);
    header.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        toggle();
      }
    });
  });
}

function populateLocalFontSelect() {
  const select = ui.localFont;
  if (!select || select.dataset.populated === "true") return;
  select.dataset.populated = "true";

  let placeholder = select.querySelector('option[value=""]');
  if (!placeholder) {
    placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "(Seleziona un font)";
    select.insertBefore(placeholder, select.firstChild);
  }

  LOCAL_FONT_PRESETS.forEach(({ group, items }) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = group;
    items.forEach(({ label, url }) => {
      const option = document.createElement("option");
      option.value = url;
      option.textContent = label;
      optgroup.appendChild(option);
    });
    select.appendChild(optgroup);
  });
}

function initRangeDoubleClickReset() {
  const sliders = document.querySelectorAll('input[type="range"]');
  sliders.forEach((slider) => {
    if (slider.dataset.resetBound === "true") return;
    slider.dataset.resetBound = "true";
    const defaultVal =
      slider.getAttribute("data-default") ?? slider.defaultValue;
    slider.dataset.defaultValue = defaultVal;
    slider.addEventListener("dblclick", () => {
      const val =
        slider.dataset.defaultValue !== undefined
          ? slider.dataset.defaultValue
          : slider.defaultValue;
      if (val == null) return;
      slider.value = val;
      slider.dispatchEvent(new Event("input", { bubbles: true }));
      slider.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}

/* hint per avvio via file:// */
(function () {
  if (location.protocol === "file:") {
    ui.hintbar &&
      (ui.hintbar.textContent =
        'Consiglio: avvia un server locale (es. "python -m http.server") per evitare limiti di sicurezza del browser.');
  }
})();

/* bind valori→etichette */
[
  "fontSize",
  "lineHeight",
  "tracking",
  "wordSpacing",
  "amount",
  "freq",
  "speed",
  "axisX",
  "axisY",
  "noiseOctaves",
  "noiseFalloff",
  "noiseShape",
  "noiseContrast",
  "noiseBias",
  "noiseClamp",
  "noiseMix",
  "contrastAmount",
  "contrastAngle",
  "contrastSharpness",
  "contrastMix",
  "contrastClamp",
  "contrastBalance",
  "zoneMix",
  "zoneAscender",
  "zoneXHeight",
  "zoneDescender",
  "counterStrength",
  "jitter",
  "jitterBias",
  "jitterClamp",
  "waveAmpX",
  "waveAmpY",
  "waveLength",
  "wavePhase",
  "waveDirection",
  "waveSharpness",
  "waveMix",
  "bendAmount",
  "bendExponent",
  "bendPivot",
  "bendMix",
  "bendClamp",
  "rotation",
  "shear",
  "strokeWeight",
  "padding",
  "wrapWidth",
  "scaleX",
  "scaleY",
  "baselineShift",
  "miterLimit",
  "fillAlpha",
  "strokeAlpha",
  "gradAngle",
  "gridSize",
  "quantStepX",
  "quantStepY",
  "quantAngle",
  "quantProb",
  "quantMix",
  "quantStepR",
  "quantStepA",
  "curvSegments",
  "curvAngleSnap",
  "curvTolerance",
  "sliceH",
  "sliceShiftX",
  "sliceShiftY",
  "slicePhase",
  "sliceNoiseScale",
  "sliceJitter",
  "sliceProb",
  "kinPeriod",
  "kinPhase",
  "kinFalloff",
  "kinNoiseScale",
  "kinOffX",
  "kinOffY",
  "kinRot",
  "kinBase",
  "kinScaleX",
  "kinScaleY",
  "perLetterScale",
  "shapeSides",
  "shapeRadius",
  "shapeInner",
  "shapeSpacing",
  "shapeTwist",
].forEach((k) => syncVal(k));

/* listeners */
[
  "useKerning",
  "autoHint",
  "animate",
  "showPoints",
  "showBounds",
  "align",
  "fillColor",
  "strokeColor",
  "autoWrap",
  "lineJoin",
  "lineCap",
  "bgColor",
  "detectVF",
  "useGradient",
  "gradA",
  "gradB",
  "showGrid",
  "showSafe",
  "exportBg",
  "fxContrast",
  "counterProtect",
  "jitterMode",
  "waveShape",
  "kinMode",
  "kinOrigin",
  "kinRestart",
  "kinPerWord",
  "kinEnvelope",
  "quantMode",
  "slicePattern",
  "perLetterEnabled",
  "perLetterRepeat",
  "perLetterIncludeSpaces",
  "fxShapeMap",
  "shapeFollow",
].forEach(
  (k) =>
    ui[k] &&
    ui[k].addEventListener("change", () => {
      invalidateLayout();
      redraw();
    })
);

[
  "amount",
  "freq",
  "seed",
  "axisX",
  "axisY",
  "noiseOctaves",
  "noiseFalloff",
  "noiseShape",
  "noiseContrast",
  "noiseBias",
  "noiseClamp",
  "noiseMix",
  "contrastAmount",
  "contrastAngle",
  "contrastSharpness",
  "contrastMix",
  "contrastClamp",
  "contrastBalance",
  "zoneMix",
  "zoneAscender",
  "zoneXHeight",
  "zoneDescender",
  "counterStrength",
  "jitter",
  "jitterBias",
  "jitterClamp",
  "fxWave",
  "waveAmpX",
  "waveAmpY",
  "waveLength",
  "wavePhase",
  "waveDirection",
  "waveSharpness",
  "waveMix",
  "fxBend",
  "bendAmount",
  "bendExponent",
  "bendPivot",
  "bendMix",
  "bendClamp",
  "fxQuantize",
  "quantStepX",
  "quantStepY",
  "quantAngle",
  "quantProb",
  "quantMix",
  "quantStepR",
  "quantStepA",
  "fxCurvCrush",
  "curvSegments",
  "curvAngleSnap",
  "curvTolerance",
  "fxSlice",
  "sliceH",
  "sliceShiftX",
  "sliceShiftY",
  "slicePhase",
  "sliceNoiseScale",
  "sliceJitter",
  "sliceProb",
  "fxGap",
  "gapProb",
  "gapLen",
  "gapKeep",
  "shapeSides",
  "shapeRadius",
  "shapeInner",
  "shapeSpacing",
  "shapeTwist",
  "perLetterPattern",
  "perLetterScale",
].forEach(
  (k) =>
    ui[k] &&
    ui[k].addEventListener("input", () => {
      invalidateLayout();
      redraw();
    })
);

/* drag & drop */
ui.drop?.addEventListener("click", () => ui.file?.click());
["dragenter", "dragover"].forEach((e) =>
  ui.drop?.addEventListener(e, (ev) => {
    ev.preventDefault();
    ui.drop.classList.add("drag");
  })
);
["dragleave", "drop"].forEach((e) =>
  ui.drop?.addEventListener(e, (ev) => {
    ev.preventDefault();
    ui.drop.classList.remove("drag");
  })
);
ui.drop?.addEventListener("drop", (ev) => {
  const f = ev.dataTransfer.files?.[0];
  if (f) loadFont(f);
});
ui.file?.addEventListener("change", () => {
  const f = ui.file.files?.[0];
  if (f) loadFont(f);
});
ui.localFont?.addEventListener("change", async () => {
  const select = ui.localFont;
  if (!select) return;
  const selected = select.value;
  if (!selected) {
    select.dataset.currentUrl = "";
    return;
  }
  const previous = select.dataset.currentUrl || "";
  const success = await loadFontFromUrl(selected);
  if (!success) {
    select.value = previous;
  }
});

/* doppio click per edit rapido */
byId("canvasWrap")?.addEventListener("dblclick", () => {
  const t = prompt("Testo di anteprima:", gv(ui.text, ""));
  if (t != null && ui.text) {
    ui.text.value = t;
    invalidateLayout();
    redraw();
  }
});

/* export */
ui.btnPNG?.addEventListener("click", () => {
  if (sketch) sketch.saveCanvas("glitch", "png");
});
ui.btnPNGTrim?.addEventListener("click", exportPNGTrimmed);
ui.btnSVG?.addEventListener("click", exportSVG);

/* preset (opzionali) */
ui.btnApplyPreset?.addEventListener("click", () =>
  applyPreset(gv(ui.presetSelect, ""))
);
ui.btnRandomize?.addEventListener("click", randomizeCurrent);
ui.btnSavePreset?.addEventListener("click", savePresetDialog);
ui.btnCopyConfig?.addEventListener("click", copyConfig);
ui.btnPasteConfig?.addEventListener("click", pasteConfig);
ui.btnReset?.addEventListener("click", () => {
  localStorage.removeItem("FGS_USER_PRESET");
  location.reload();
});

/* bootstrap */
document.addEventListener("DOMContentLoaded", async () => {
  populateLocalFontSelect();
  initSidebarTabs();
  initPanelToggles();
  initRangeDoubleClickReset();
  if (!sketch) makeSketch();
  await loadDefaultFontSafe();
  const saved = localStorage.getItem("FGS_USER_PRESET");
  if (saved) {
    try {
      loadState(sanitizeConfig(JSON.parse(saved), true));
    } catch {}
  }
});

/* ===== FONT LOAD ===== */
function applyLoadedFont(font, { sourceUrl = null } = {}) {
  baseFont = font;
  const family =
    baseFont.names.fontFamily?.en ||
    baseFont.names.fontFamily?.it ||
    baseFont.names.fontFamily?.default ||
    "(sconosciuto)";
  const style =
    baseFont.names.fontSubfamily?.en ||
    baseFont.names.fontSubfamily?.it ||
    baseFont.names.fontSubfamily?.default ||
    "(sconosciuto)";
  ui.fontName && (ui.fontName.value = family);
  ui.fontStyle && (ui.fontStyle.value = style);
  basePathCache.clear();
  glyphCache.clear();
  if (!sketch) makeSketch();
  redraw();
  setupVFAxes();

  if (ui.localFont) {
    const select = ui.localFont;
    const options = Array.from(select.options || []);
    if (sourceUrl && options.some((opt) => opt.value === sourceUrl)) {
      select.value = sourceUrl;
      select.dataset.currentUrl = sourceUrl;
    } else {
      select.value = "";
      select.dataset.currentUrl = "";
    }
  }
}

async function loadFontFromUrl(url, { silent = false } = {}) {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    const font = opentype.parse(buf);
    applyLoadedFont(font, { sourceUrl: url });
    return true;
  } catch (err) {
    console.error(err);
    if (!silent) {
      alert("Errore nel caricamento del font selezionato: " + (err?.message || err));
    }
    return false;
  }
}

async function loadDefaultFontSafe() {
  for (const url of DEFAULT_FONT_URLS) {
    const success = await loadFontFromUrl(url, { silent: true });
    if (success) return true;
  }
  console.warn(
    "Font di default non disponibile. Trascina un file .ttf/.otf/.woff/.woff2."
  );
  return false;
}

async function loadFont(file) {
  try {
    const buf = await file.arrayBuffer();
    const font = opentype.parse(buf);
    applyLoadedFont(font);
    return true;
  } catch (err) {
    console.error(err);
    alert("Errore nel caricamento del font: " + (err?.message || err));
    return false;
  }
}

/* ===== p5 ===== */
function makeSketch() {
  const mount = byId("canvasMount");
  sketch = new p5((p) => {
    let W = mount.clientWidth,
      H = byId("canvasWrap").clientHeight;
    p.setup = function () {
      const c = p.createCanvas(W, H);
      c.parent(mount);
      p.noLoop();
      p.pixelDensity(1);
    };
    p.windowResized = function () {
      W = mount.clientWidth;
      H = byId("canvasWrap").clientHeight;
      p.resizeCanvas(W, H);
      p.redraw();
    };
    p.draw = function () {
      if (!baseFont) {
        p.clear();
        p.push();
        p.noStroke();
        p.fill(60);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(16);
        p.text("Carica un font per iniziare", p.width / 2, p.height / 2);
        p.pop();
        return;
      }
      const state = getState();
      state.canvasW = p.width;
      state.canvasH = p.height;
      renderScene(p, state, { noBackground: false });
    };
  }, mount);

  (function tick() {
    if (ui.animate?.checked && sketch) {
      sketch.redraw();
    }
    requestAnimationFrame(tick);
  })();
}

/* ===== STATE ===== */
function getState() {
  return {
    text: gv(ui.text, "PHORMA"),
    fontSize: gv(ui.fontSize, 140),
    lineHeight: gv(ui.lineHeight, 1.15),
    tracking: gv(ui.tracking, 0),
    wordSpacing: gv(ui.wordSpacing, 40),
    align: gv(ui.align, "center"),
    padding: gv(ui.padding, 32),

    // per-letter spacing
    perLetterEnabled: gb(ui.perLetterEnabled, false),
    perLetterPattern: gv(ui.perLetterPattern, "0"),
    perLetterRepeat: gb(ui.perLetterRepeat, true),
    perLetterIncludeSpaces: gb(ui.perLetterIncludeSpaces, false),
    perLetterScale: gv(ui.perLetterScale, 1),

    amount: gv(ui.amount, 5),
    freq: gv(ui.freq, 80),
    seed: gv(ui.seed, 123) | 0,
    speed: gv(ui.speed, 0.6),
    animate: gb(ui.animate, false),
    noiseOctaves: gv(ui.noiseOctaves, 1),
    noiseFalloff: gv(ui.noiseFalloff, 0.5),
    noiseShape: gv(ui.noiseShape, 0),
    noiseContrast: gv(ui.noiseContrast, 0),
    noiseBias: gv(ui.noiseBias, 0),
    noiseClamp: gv(ui.noiseClamp, 1),
    noiseMix: gv(ui.noiseMix, 1),
    fxContrast: gb(ui.fxContrast, false),
    contrastAmount: gv(ui.contrastAmount, 0),
    contrastAngle: (gv(ui.contrastAngle, 30) * Math.PI) / 180,
    contrastSharpness: gv(ui.contrastSharpness, 0),
    contrastMix: gv(ui.contrastMix, 1),
    contrastClamp: gv(ui.contrastClamp, 1),
    contrastBalance: gv(ui.contrastBalance, 0),
    zoneMix: gv(ui.zoneMix, 0),
    zoneAscender: gv(ui.zoneAscender, 1),
    zoneXHeight: gv(ui.zoneXHeight, 1),
    zoneDescender: gv(ui.zoneDescender, 1),
    counterProtect: gb(ui.counterProtect, true),
    counterStrength: gv(ui.counterStrength, 0.6),
    axisX: gv(ui.axisX, 1),
    axisY: gv(ui.axisY, 1),
    shear: (gv(ui.shear, 0) * Math.PI) / 180,
    rotation: (gv(ui.rotation, 0) * Math.PI) / 180,
    jitter: gv(ui.jitter, 0),
    jitterMode: gv(ui.jitterMode, "uniform"),
    jitterBias: gv(ui.jitterBias, 0),
    jitterClamp: gv(ui.jitterClamp, 1),

    useKerning: gb(ui.useKerning, true),
    autoHint: gb(ui.autoHint, true),

    fxWave: gb(ui.fxWave, false),
    waveAmpX: gv(ui.waveAmpX, 0),
    waveAmpY: gv(ui.waveAmpY, 0),
    waveLength: gv(ui.waveLength, 220),
    wavePhase: (gv(ui.wavePhase, 0) * Math.PI) / 180,
    waveDirection: (gv(ui.waveDirection, 0) * Math.PI) / 180,
    waveShape: gv(ui.waveShape, "sine"),
    waveSharpness: gv(ui.waveSharpness, 0),
    waveMix: gv(ui.waveMix, 1),

    fxBend: gb(ui.fxBend, false),
    bendAmount: gv(ui.bendAmount, 0),
    bendExponent: gv(ui.bendExponent, 2),
    bendPivot: gv(ui.bendPivot, 0.5),
    bendMix: gv(ui.bendMix, 1),
    bendClamp: gv(ui.bendClamp, 0),

    fillColor: gv(ui.fillColor, "#000000"),
    strokeColor: gv(ui.strokeColor, "#000000"),
    strokeWeight: gv(ui.strokeWeight, 0),
    useGradient: gb(ui.useGradient, false),
    gradA: gv(ui.gradA, "#000000"),
    gradB: gv(ui.gradB, "#ffffff"),
    gradAngle: (gv(ui.gradAngle, 0) * Math.PI) / 180,
    showPoints: gb(ui.showPoints, false),
    showBounds: gb(ui.showBounds, false),

    wrapWidth: gv(ui.wrapWidth, 800),
    autoWrap: gb(ui.autoWrap, true),
    scaleX: gv(ui.scaleX, 100) / 100,
    scaleY: gv(ui.scaleY, 100) / 100,
    baselineShift: gv(ui.baselineShift, 0),
    lineJoin: gv(ui.lineJoin, "miter"),
    lineCap: gv(ui.lineCap, "butt"),
    miterLimit: gv(ui.miterLimit, 10),
    fillAlpha: gv(ui.fillAlpha, 1),
    strokeAlpha: gv(ui.strokeAlpha, 1),
    bgColor: gv(ui.bgColor, "#ffffff"),
    vfAxes: window.__vfAxes || null,

    showGrid: gb(ui.showGrid, false),
    gridSize: gv(ui.gridSize, 32),
    showSafe: gb(ui.showSafe, false),
    exportBg: gb(ui.exportBg, true),

    // Quant
    fxQuantize: gb(ui.fxQuantize, false),
    quantMode: gv(ui.quantMode, "grid"),
    quantStepX: gv(ui.quantStepX, 6),
    quantStepY: gv(ui.quantStepY, 6),
    quantAngle: (gv(ui.quantAngle, 0) * Math.PI) / 180,
    quantProb: gv(ui.quantProb, 1),
    quantMix: gv(ui.quantMix, 1),
    quantStepR: gv(ui.quantStepR, 0),
    quantStepA: (gv(ui.quantStepA, 15) * Math.PI) / 180,

    // Curvature bitcrush
    fxCurvCrush: gb(ui.fxCurvCrush, false),
    curvSegments: gv(ui.curvSegments, 8),
    curvAngleSnap: (gv(ui.curvAngleSnap, 0) * Math.PI) / 180,
    curvTolerance: gv(ui.curvTolerance, 0),

    // Slice & Shift
    fxSlice: gb(ui.fxSlice, false),
    sliceH: gv(ui.sliceH, 24),
    sliceShiftX: gv(ui.sliceShiftX, 12),
    sliceShiftY: gv(ui.sliceShiftY, 0),
    slicePattern: gv(ui.slicePattern, "sine"),
    slicePhase: (gv(ui.slicePhase, 0) * Math.PI) / 180,
    sliceNoiseScale: gv(ui.sliceNoiseScale, 12),
    sliceJitter: gv(ui.sliceJitter, 0),
    sliceProb: gv(ui.sliceProb, 1),

    // Gapify
    fxGap: gb(ui.fxGap, false),
    gapProb: gv(ui.gapProb, 0),
    gapLen: gv(ui.gapLen, 6),
    gapKeep: gv(ui.gapKeep, 20),

    // Shape mapping
    fxShapeMap: gb(ui.fxShapeMap, false),
    shapeSides: Math.max(3, gv(ui.shapeSides, 6) | 0),
    shapeRadius: Math.max(0.01, gv(ui.shapeRadius, 0.35)),
    shapeInner: Math.min(1, Math.max(0, gv(ui.shapeInner, 0.4))),
    shapeSpacing: Math.max(2, gv(ui.shapeSpacing, 22)),
    shapeTwist: (gv(ui.shapeTwist, 0) * Math.PI) / 180,
    shapeFollow: gb(ui.shapeFollow, true),

    // Kinetic
    kinMode: gv(ui.kinMode, "off"),
    kinPeriod: gv(ui.kinPeriod, 12),
    kinPhase: (gv(ui.kinPhase, 0) * Math.PI) / 180,
    kinOrigin: gv(ui.kinOrigin, "center"),
    kinRestart: gb(ui.kinRestart, true),
    kinPerWord: gb(ui.kinPerWord, false),
    kinEnvelope: gv(ui.kinEnvelope, "none"),
    kinFalloff: gv(ui.kinFalloff, 0),
    kinNoiseScale: gv(ui.kinNoiseScale, 12),
    kinOffX: gv(ui.kinOffX, 0),
    kinOffY: gv(ui.kinOffY, 0),
    kinRot: (gv(ui.kinRot, 0) * Math.PI) / 180,
    kinBase: gv(ui.kinBase, 0),
    kinScaleX: gv(ui.kinScaleX, 0) / 100,
    kinScaleY: gv(ui.kinScaleY, 0) / 100,
  };
}

function redraw() {
  if (sketch) sketch.redraw();
}

/* ===== helpers deform ===== */
const TAU = Math.PI * 2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clamp01(value) {
  return clamp(value, 0, 1);
}

function signPreservingPow(value, exp) {
  const sign = value < 0 ? -1 : 1;
  return sign * Math.pow(Math.abs(value), exp);
}

function shape01(value, shape) {
  const s = clamp(shape ?? 0, -1, 1);
  if (Math.abs(s) < 1e-6) return clamp01(value);
  if (s > 0) {
    const pow = 1 + s * 4;
    return clamp01(Math.pow(value, pow));
  }
  const pow = 1 + Math.abs(s) * 4;
  return clamp01(1 - Math.pow(1 - value, pow));
}

function shapeSigned(value, shape) {
  const s = clamp(shape ?? 0, -0.95, 0.95);
  if (Math.abs(s) < 1e-6) return value;
  const pow = s >= 0 ? 1 / (1 + s * 4) : 1 + Math.abs(s) * 4;
  return signPreservingPow(value, pow);
}

function applyContrast01(value, contrast, pivot = 0.5) {
  const c = clamp(contrast ?? 0, -0.95, 0.95);
  if (Math.abs(c) < 1e-6) return clamp01(value);
  const factor = (1 + c) / (1 - c);
  return clamp01((value - pivot) * factor + pivot);
}

function fractalNoise(p, x, y, t, state) {
  // Multi-ottava perlin noise keeps distortion detailed while respecting user softness/sharpness settings.
  const octaves = Math.max(1, Math.floor(state.noiseOctaves || 1));
  const falloff = clamp(state.noiseFalloff ?? 0.5, 0, 1);
  const freqBase = Math.max(1e-4, state.freq || 1);
  let amplitude = 1;
  let frequency = 1;
  let total = 0;
  let weight = 0;
  for (let i = 0; i < octaves; i++) {
    const offset = i * 37.1321;
    const sample = p.noise(
      (x / freqBase) * frequency + state.seed * 0.01 + offset,
      (y / freqBase) * frequency + state.seed * 0.02 + offset,
      t * state.speed * frequency + offset
    );
    total += sample * amplitude;
    weight += amplitude;
    frequency *= 2;
    amplitude *= falloff;
    if (amplitude < 1e-4) break;
  }
  return weight > 0 ? total / weight : 0.5;
}

function gaussianRandom() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

function noiseFn(p, x, y, t, state) {
  const n = fractalNoise(p, x, y, t, state);
  let value = shape01(n, state.noiseShape);
  value = applyContrast01(value, state.noiseContrast, 0.5);
  const bias = clamp(state.noiseBias ?? 0, -1, 1) * 0.5;
  value = clamp01(value + bias);

  const ang = (value - 0.5) * TAU;
  const mix = clamp01(state.noiseMix ?? 1);
  const clampMul = Math.max(0, state.noiseClamp ?? 1);
  const baseDx = Math.cos(ang) * state.amount * state.axisX;
  const baseDy = Math.sin(ang) * state.amount * state.axisY;
  const maxDx = Math.abs(state.amount * state.axisX) * clampMul;
  const maxDy = Math.abs(state.amount * state.axisY) * clampMul;
  const dx = clamp(baseDx, -maxDx, maxDx) * mix;
  const dy = clamp(baseDy, -maxDy, maxDy) * mix;
  return { dx, dy };
}

function jitterFn(j, state) {
  const amount = Math.max(0, j);
  if (!amount) return { dx: 0, dy: 0 };
  const mode = (state?.jitterMode || "uniform").toLowerCase();
  const clampMul = Math.max(0, state?.jitterClamp ?? 1);
  const bias = clamp(state?.jitterBias ?? 0, -1, 1);
  let sx = 0;
  let sy = 0;

  if (mode === "gaussian") {
    sx = gaussianRandom() / 3;
    sy = gaussianRandom() / 3;
  } else if (mode === "soft" || mode === "triangular") {
    sx = Math.random() + Math.random() - 1;
    sy = Math.random() + Math.random() - 1;
  } else {
    sx = Math.random() * 2 - 1;
    sy = Math.random() * 2 - 1;
  }

  sx = clamp(sx + bias, -1, 1);
  sy = clamp(sy + bias, -1, 1);
  const scale = amount * clampMul;
  return { dx: sx * scale, dy: sy * scale };
}

function sampleWave(theta, shape) {
  const mode = (shape || "sine").toLowerCase();
  if (mode === "triangle" || mode === "tri") {
    return (2 / Math.PI) * Math.asin(Math.sin(theta));
  }
  if (mode === "square") {
    const s = Math.sin(theta);
    return s >= 0 ? 1 : -1;
  }
  if (mode === "saw" || mode === "sawtooth" || mode === "ramp") {
    return 2 * (theta / TAU - Math.floor(theta / TAU + 0.5));
  }
  return Math.sin(theta);
}

function waveWarp(x, y, state) {
  if (!state.fxWave || (!state.waveAmpX && !state.waveAmpY)) return { x, y };
  const L = Math.max(1, state.waveLength || 220);
  const dir = state.waveDirection || 0;
  const proj = x * Math.cos(dir) + y * Math.sin(dir);
  const phase =
    (state.wavePhase || 0) +
    (state.animate ? performance.now() * 0.004 * state.speed : 0);
  const theta = proj * (TAU / L) + phase;
  const wave = shapeSigned(sampleWave(theta, state.waveShape), state.waveSharpness);
  const mix = clamp01(state.waveMix ?? 1);
  const dx = wave * (state.waveAmpX || 0) * mix;
  const dy = wave * (state.waveAmpY || 0) * mix;
  return { x: x + dx, y: y + dy };
}

function bendWarp(x, y, state) {
  if (!state.fxBend || !state.bendAmount) return { x, y };
  const norm = Math.max(1, state.fontSize || 100);
  const pivot = clamp(state.bendPivot ?? 0.5, 0, 1);
  const pivotX = (pivot - 0.5) * norm * 2;
  const exponent = Math.max(0.25, state.bendExponent || 2);
  const relative = Math.abs((x - pivotX) / norm);
  const intensity = Math.pow(relative, exponent);
  // Pivot + exponent let us choose between soft arcs and tighter bends while clamping keeps glyphs legible.
  const rawOffset = state.bendAmount * intensity;
  const clampMul = Math.max(0, state.bendClamp ?? 0);
  const limited =
    clampMul > 0
      ? clamp(
          rawOffset,
          -Math.abs(state.bendAmount) * clampMul,
          Math.abs(state.bendAmount) * clampMul
        )
      : rawOffset;
  const mix = clamp01(state.bendMix ?? 1);
  return { x, y: y + limited * mix };
}

function polygonSignedArea(points) {
  if (!points || points.length < 3) return 0;
  let area = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    area += (p0.x * p1.y - p1.x * p0.y) * 0.5;
  }
  return area;
}

function buildDirectionField(path, state, size) {
  const detail = Math.max(8, Math.round((state.contrastDetail ?? 18)));
  const subpaths = flattenPathToSubpaths(path, detail);
  const spacing = Math.max(2, Math.min(32, (state.contrastSampleStep || size / 18 || 6)));
  const field = [];
  subpaths.forEach((sub) => {
    const samples = samplePointsOnSubpath(sub, spacing);
    if (!samples.length) return;
    const area = polygonSignedArea(sub);
    const isHole = area > 0;
    samples.forEach((sample) => {
      field.push({
        x: sample.x,
        y: sample.y,
        angle: sample.angle,
        isHole,
      });
    });
  });
  return field;
}

function findDirectionSample(field, x, y) {
  if (!field || !field.length) return null;
  let best = null;
  let bestDist = Infinity;
  for (const sample of field) {
    const dx = sample.x - x;
    const dy = sample.y - y;
    const d2 = dx * dx + dy * dy;
    if (d2 < bestDist) {
      bestDist = d2;
      best = sample;
      if (bestDist < 1) break;
    }
  }
  return best;
}

function computeZoneWeight(y, bbox, state) {
  const mix = clamp01(state.zoneMix ?? 0);
  if (!mix || !bbox) return 1;
  const topWeight = clamp(state.zoneAscender ?? 1, 0, 4);
  const midWeight = clamp(state.zoneXHeight ?? 1, 0, 4);
  const bottomWeight = clamp(state.zoneDescender ?? 1, 0, 4);
  const span = Math.max(1e-3, bbox.maxY - bbox.minY);
  const ny = clamp01((y - bbox.minY) / span);
  let zoneValue;
  if (ny < 0.5) {
    const t = ny / 0.5;
    zoneValue = topWeight + (midWeight - topWeight) * t;
  } else {
    const t = (ny - 0.5) / 0.5;
    zoneValue = midWeight + (bottomWeight - midWeight) * t;
  }
  return 1 + (zoneValue - 1) * mix;
}

function applyContrastWarp(x, y, sample, bbox, state) {
  if (!sample) return { x, y };
  const amount = state.contrastAmount || 0;
  if (!amount) return { x, y };
  const contrastAngle = state.contrastAngle ?? 0;
  const sharp = clamp(state.contrastSharpness ?? 0, 0, 1);
  const mix = clamp01(state.contrastMix ?? 1);
  const clampMul = Math.max(0, state.contrastClamp ?? 1);
  const balance = clamp(state.contrastBalance ?? 0, -1, 1);
  const zoneWeight = computeZoneWeight(y, bbox, state);

  const delta = sample.angle - contrastAngle;
  let weight = Math.cos(delta);
  if (Math.abs(weight) < 1e-6) weight = 0;
  if (sharp > 0) {
    const power = 1 + sharp * 4;
    weight = Math.sign(weight) * Math.pow(Math.abs(weight), power);
  }
  weight = clamp(weight + balance, -1, 1);
  const baseOffset = amount * weight * zoneWeight;
  const maxOffset = Math.abs(amount) * clampMul || Math.abs(amount);
  const limited =
    clampMul > 0 ? clamp(baseOffset, -maxOffset, maxOffset) : baseOffset;

  let protectFactor = 1;
  if (state.counterProtect && sample.isHole) {
    const strength = clamp01(state.counterStrength ?? 0.6);
    protectFactor = 1 - strength;
  }

  const offset = limited * mix * protectFactor;
  if (Math.abs(offset) < 1e-6) return { x, y };

  const normalAngle = sample.angle + Math.PI / 2;
  const nx = Math.cos(normalAngle);
  const ny = Math.sin(normalAngle);
  return {
    x: x + nx * offset,
    y: y + ny * offset,
  };
}

/* base path */
function getBasePath(glyph, size, state) {
  const key = glyph.index + ":" + size;
  if (basePathCache.has(key)) return basePathCache.get(key);
  const path = glyph.getPath(0, 0, size, {
    kerning: state.useKerning,
    hinting: state.autoHint,
  });
  basePathCache.set(key, path);
  return path;
}

/* QUANT helpers */
function quantizePoint(x, y, bbox, state) {
  const mode = state.quantMode || "grid";
  const sx = Math.max(1, state.quantStepX || 6);
  const sy = Math.max(1, state.quantStepY || 6);
  const mix = Math.max(0, Math.min(1, state.quantMix ?? 1));
  const prob = Math.max(0, Math.min(1, state.quantProb ?? 1));
  if (Math.random() > prob) return { x, y };

  let qx = x,
    qy = y;

  if (mode === "grid") {
    qx = Math.round(x / sx) * sx;
    qy = Math.round(y / sy) * sy;
  } else if (mode === "x") {
    qx = Math.round(x / sx) * sx;
    qy = y;
  } else if (mode === "y") {
    qx = x;
    qy = Math.round(y / sy) * sy;
  } else if (mode === "grid-angled") {
    const a = state.quantAngle || 0;
    const c = Math.cos(a),
      s = Math.sin(a);
    const rx = c * x + s * y,
      ry = -s * x + c * y;
    const rqx = Math.round(rx / sx) * sx,
      rqy = Math.round(ry / sy) * sy;
    qx = c * rqx - s * rqy;
    qy = s * rqx + c * rqy;
  } else if (mode === "polar") {
    const cx = (bbox.minX + bbox.maxX) / 2,
      cy = (bbox.minY + bbox.maxY) / 2;
    const dx = x - cx,
      dy = y - cy;
    const r = Math.hypot(dx, dy),
      a = Math.atan2(dy, dx);
    const stepR = Math.max(0, state.quantStepR || 0),
      stepA = Math.max(0, state.quantStepA || 0);
    const rr = stepR > 0 ? Math.round(r / stepR) * stepR : r;
    const aa = stepA > 0 ? Math.round(a / stepA) * stepA : a;
    qx = cx + rr * Math.cos(aa);
    qy = cy + rr * Math.sin(aa);
  }

  return { x: x + (qx - x) * mix, y: y + (qy - y) * mix };
}

/* Bezier eval */
function qAt(p0, p1, p2, t) {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}
function cAt(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x:
      u * u * u * p0.x +
      3 * u * u * t * p1.x +
      3 * u * t * t * p2.x +
      t * t * t * p3.x,
    y:
      u * u * u * p0.y +
      3 * u * u * t * p1.y +
      3 * u * t * t * p2.y +
      t * t * t * p3.y,
  };
}

/* Douglas–Peucker */
function simplifyRDP(pts, eps) {
  if (eps <= 0 || pts.length <= 2) return pts;
  const out = [pts[0]];
  function dist(a, b, p) {
    const A = p.x - a.x,
      B = p.y - a.y,
      C = b.x - a.x,
      D = b.y - a.y;
    const dot = A * C + B * D,
      len2 = C * C + D * D;
    let t = len2 ? dot / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    const xx = a.x + t * C,
      yy = a.y + t * D;
    const dx = p.x - xx,
      dy = p.y - yy;
    return Math.hypot(dx, dy);
  }
  function rec(i, j) {
    let idx = -1,
      maxd = 0;
    for (let k = i + 1; k < j; k++) {
      const d = dist(pts[i], pts[j], pts[k]);
      if (d > maxd) {
        maxd = d;
        idx = k;
      }
    }
    if (maxd > eps && idx >= 0) {
      rec(i, idx);
      out.push(pts[idx]);
      rec(idx, j);
    }
  }
  rec(0, pts.length - 1);
  out.push(pts[pts.length - 1]);
  return out;
}

/* Curvature Bitcrush */
function crushCurvature(commands, segments, angleSnapRad, tolerance) {
  const result = [];
  let pen = { x: 0, y: 0 };
  let subStart = { x: 0, y: 0 };

  function pushL(to) {
    let a = Math.atan2(to.y - pen.y, to.x - pen.x);
    if (angleSnapRad > 0) {
      a = Math.round(a / angleSnapRad) * angleSnapRad;
    }
    const len = Math.hypot(to.x - pen.x, to.y - pen.y);
    const nx = pen.x + Math.cos(a) * len;
    const ny = pen.y + Math.sin(a) * len;
    result.push({ type: "L", x: nx, y: ny });
    pen = { x: nx, y: ny };
  }

  for (const c of commands) {
    if (c.type === "M") {
      result.push({ type: "M", x: c.x, y: c.y });
      pen = { x: c.x, y: c.y };
      subStart = { x: c.x, y: c.y };
    } else if (c.type === "L") {
      pushL({ x: c.x, y: c.y });
    } else if (c.type === "Q") {
      const p0 = pen,
        p1 = { x: c.x1, y: c.y1 },
        p2 = { x: c.x, y: c.y };
      const seg = Math.max(1, segments | 0);
      for (let i = 1; i <= seg; i++) {
        const t = i / seg;
        pushL(qAt(p0, p1, p2, t));
      }
    } else if (c.type === "C") {
      const p0 = pen,
        p1 = { x: c.x1, y: c.y1 },
        p2 = { x: c.x2, y: c.y2 },
        p3 = { x: c.x, y: c.y };
      const seg = Math.max(1, segments | 0);
      for (let i = 1; i <= seg; i++) {
        const t = i / seg;
        pushL(cAt(p0, p1, p2, p3, t));
      }
    } else if (c.type === "Z") {
      result.push({ type: "Z" });
      pen = { x: subStart.x, y: subStart.y };
    }
  }

  if (tolerance > 0) {
    const simplified = [];
    let buf = [],
      start = { x: 0, y: 0 };
    for (const c of result) {
      if (c.type === "M") {
        if (buf.length > 0) {
          simplified.push(...polyToCommands(buf));
          buf = [];
        }
        start = { x: c.x, y: c.y };
        buf = [start];
      } else if (c.type === "L") {
        buf.push({ x: c.x, y: c.y });
      } else if (c.type === "Z") {
        if (buf.length > 0) {
          simplified.push(...polyToCommands(simplifyRDP(buf, tolerance)));
          buf = [];
        }
        simplified.push({ type: "Z" });
      }
    }
    if (buf.length > 0) {
      simplified.push(...polyToCommands(simplifyRDP(buf, tolerance)));
    }
    return simplified;
  }
  return result;

  function polyToCommands(pts) {
    if (pts.length === 0) return [];
    const out = [{ type: "M", x: pts[0].x, y: pts[0].y }];
    for (let i = 1; i < pts.length; i++) {
      out.push({ type: "L", x: pts[i].x, y: pts[i].y });
    }
    return out;
  }
}

/* Slice & Shift */
function sliceShiftPoint(x, y, bbox, state) {
  const h = Math.max(2, state.sliceH || 24);
  const band = Math.floor((y - bbox.minY) / h);
  if (Math.random() > (state.sliceProb ?? 1)) return { x, y };
  const phase =
    (state.slicePhase || 0) +
    (state.animate ? performance.now() * 0.004 * state.speed : 0);
  let v = 0;
  if (state.slicePattern === "random") {
    const rnd = mulberry32((state.seed | 0) * 1664525 + band)();
    v = rnd * 2 - 1;
  } else if (state.slicePattern === "noise") {
    sketch.noiseSeed(state.seed | 0);
    v = sketch.noise(band / (state.sliceNoiseScale || 12), phase) * 2 - 1;
  } else if (state.slicePattern === "triangle") {
    const u = band / (state.sliceNoiseScale || 12) + phase;
    const s = (u / (2 * Math.PI)) % 1;
    v = 4 * Math.abs(s - 0.5) - 1;
  } else {
    v = Math.sin(band / (state.sliceNoiseScale || 12) + phase);
  }
  const jx =
    state.sliceJitter || 0 ? (Math.random() * 2 - 1) * state.sliceJitter : 0;
  const jy =
    state.sliceJitter || 0 ? (Math.random() * 2 - 1) * state.sliceJitter : 0;
  return {
    x: x + (state.sliceShiftX || 0) * v + jx,
    y: y + (state.sliceShiftY || 0) * v + jy,
  };
}

/* Gapify */
function applyGapify(commands, state) {
  if (!state.fxGap || state.gapProb <= 0) return commands;
  const out = [];
  for (const c of commands) {
    if (
      (c.type === "L" || c.type === "Q" || c.type === "C") &&
      Math.random() < state.gapProb
    ) {
      out.push({ type: "M", x: c.x, y: c.y }); // apri gap
    } else out.push(c);
    if (c.type === "Z") out.push(c);
  }
  return out;
}

/* PATH pipeline: warp → slice → crush → quant → gap */
function getMutatedPath(p, glyph, size, state) {
  const wantsQuant = state.fxQuantize;
  const wantsCrush = state.fxCurvCrush;
  const wantsSlice = state.fxSlice;
  const wantsGap = state.fxGap;

  const hasPointWarp =
    state.amount > 0 ||
    state.jitter > 0 ||
    (state.fxContrast && state.contrastAmount) ||
    state.fxWave ||
    (state.fxBend && state.bendAmount) ||
    wantsSlice ||
    wantsCrush ||
    wantsQuant ||
    wantsGap;
  if (!hasPointWarp) return getBasePath(glyph, size, state);

  const timeBucket = state.animate ? Math.floor(performance.now() / 120) : 0;
  const key =
    glyph.index +
    ":" +
    [
      size,
      state.amount,
      state.freq,
      state.seed,
      state.axisX,
      state.axisY,
      state.jitter,
      state.fxWave,
      state.waveAmpX,
      state.waveAmpY,
      state.waveLength,
      state.wavePhase,
      state.fxContrast,
      state.contrastAmount,
      state.contrastAngle,
      state.contrastSharpness,
      state.contrastMix,
      state.contrastClamp,
      state.contrastBalance,
      state.zoneMix,
      state.zoneAscender,
      state.zoneXHeight,
      state.zoneDescender,
      state.counterProtect,
      state.counterStrength,
      state.fxBend,
      state.bendAmount,
      "slice",
      wantsSlice,
      state.sliceH,
      state.sliceShiftX,
      state.sliceShiftY,
      state.slicePattern,
      state.slicePhase,
      state.sliceNoiseScale,
      state.sliceJitter,
      state.sliceProb,
      "crush",
      wantsCrush,
      state.curvSegments,
      state.curvAngleSnap,
      state.curvTolerance,
      "quant",
      wantsQuant,
      state.quantMode,
      state.quantStepX,
      state.quantStepY,
      state.quantAngle,
      state.quantProb,
      state.quantMix,
      state.quantStepR,
      state.quantStepA,
      "gap",
      wantsGap,
      state.gapProb,
      state.gapLen,
      state.gapKeep,
      timeBucket,
    ].join(",");

  if (glyphCache.has(key)) return glyphCache.get(key);

  const basePath = getBasePath(glyph, size, state);
  const cmds = basePath.commands.map((c) => Object.assign({}, c));

  const wantsContrast = state.fxContrast && state.contrastAmount;
  const directionField = wantsContrast
    ? buildDirectionField(basePath, state, size)
    : null;

  sketch.noiseSeed(state.seed | 0);

  // bbox preliminare
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const c of cmds) {
    ["x", "y", "x1", "y1", "x2", "y2"].forEach((k) => {
      const v = c[k];
      if (v === undefined) return;
      if (k.includes("x")) {
        if (v < minX) minX = v;
        if (v > maxX) maxX = v;
      } else {
        if (v < minY) minY = v;
        if (v > maxY) maxY = v;
      }
    });
  }
  const bbox = { minX, minY, maxX, maxY };

  // 1) warp + 2) slice
  for (const c of cmds) {
    for (const k of ["x", "y", "x1", "y1", "x2", "y2"]) {
      if (c[k] === undefined) continue;
      const sx =
        (k.startsWith("x")
          ? k === "x1"
            ? c.x1
            : k === "x2"
            ? c.x2
            : c.x
          : k === "y1"
          ? c.x1
          : k === "y2"
          ? c.x2
          : c.x) ?? 0;
      const sy =
        (k.startsWith("y")
          ? k === "y1"
            ? c.y1
            : k === "y2"
            ? c.y2
            : c.y
          : k === "x1"
          ? c.y1
          : k === "x2"
          ? c.y2
          : c.y) ?? 0;

      let pt = { x: sx, y: sy };
      if (state.fxWave || state.fxBend) {
        pt = waveWarp(pt.x, pt.y, state);
        pt = bendWarp(pt.x, pt.y, state);
      }
      if (directionField) {
        const sample = findDirectionSample(directionField, pt.x, pt.y);
        pt = applyContrastWarp(pt.x, pt.y, sample, bbox, state);
      }
      if (state.amount > 0) {
        const n = noiseFn(
          sketch,
          sx,
          sy,
          state.animate ? performance.now() * 0.0008 : 0,
          state
        );
        pt.x += n.dx;
        pt.y += n.dy;
      }
      if (state.jitter > 0) {
        const j = jitterFn(state.jitter, state);
        pt.x += j.dx;
        pt.y += j.dy;
      }
      if (wantsSlice) {
        pt = sliceShiftPoint(pt.x, pt.y, bbox, state);
      }

      c[k] = k.startsWith("x") ? pt.x : pt.y;
    }
  }

  // 3) crush (curve→L) + snap + simplify
  let cmds2 = cmds;
  if (wantsCrush) {
    const seg = Math.max(1, state.curvSegments | 0);
    const asnap = Math.max(0, state.curvAngleSnap || 0);
    const tol = Math.max(0, state.curvTolerance || 0);
    cmds2 = crushCurvature(cmds, seg, asnap, tol);
  }

  // 4) quantize
  if (wantsQuant) {
    for (const c of cmds2) {
      for (const k of ["x", "y", "x1", "y1", "x2", "y2"]) {
        if (c[k] === undefined) continue;
        const q = quantizePoint(c.x ?? 0, c.y ?? 0, bbox, state);
        if (k.startsWith("x")) c[k] = q.x;
        if (k.startsWith("y")) c[k] = q.y;
      }
    }
  }

  // 5) gapify
  if (wantsGap) {
    cmds2 = applyGapify(cmds2, state);
  }

  const newPath = new opentype.Path();
  newPath.commands = cmds2;
  glyphCache.set(key, newPath);
  return newPath;
}

/* VF opzionale */
function setupVFAxes() {
  const row = ui.vfAxesRow;
  if (!row) return;
  row.innerHTML = "";
  window.__vfAxes = null;
  if (
    !ui.detectVF?.checked ||
    !baseFont ||
    !baseFont.tables ||
    !baseFont.tables.fvar
  ) {
    row.style.display = "none";
    return;
  }
  const axes = baseFont.tables.fvar.axes || [];
  if (!axes.length) {
    row.style.display = "none";
    return;
  }
  row.style.display = "block";
  window.__vfAxes = {};
  axes.forEach((ax) => {
    const id = "vf_" + ax.tag;
    const wrap = document.createElement("div");
    wrap.className = "row";
    wrap.innerHTML =
      "<label>" +
      ax.tag +
      "</label>" +
      '<input type="range" id="' +
      id +
      '" min="' +
      ax.minValue +
      '" max="' +
      ax.maxValue +
      '" step="1" value="' +
      ax.defaultValue +
      '">' +
      '<span class="val" id="' +
      id +
      'Val">' +
      ax.defaultValue +
      "</span>";
    row.appendChild(wrap);
    const input = wrap.querySelector("input");
    const val = wrap.querySelector(".val");
    input.addEventListener("input", () => {
      val.textContent = input.value;
      window.__vfAxes[ax.tag] = +input.value;
      applyVF();
      invalidateBasePaths();
      redraw();
    });
    window.__vfAxes[ax.tag] = +input.value || ax.defaultValue;
  });
  applyVF();
}
function applyVF() {
  if (!baseFont || !window.__vfAxes) return;
  try {
    if (typeof baseFont.setVariation === "function") {
      Object.entries(window.__vfAxes).forEach(([tag, v]) =>
        baseFont.setVariation(tag, v)
      );
    } else {
      baseFont.variation = Object.assign({}, window.__vfAxes);
    }
  } catch (e) {
    console.warn("VF not applied:", e);
  }
}

/* layout */
function layoutLine(line, state) {
  if (baseFont && typeof baseFont.layout === "function") {
    try {
      return baseFont.layout(line);
    } catch (e) {}
  }
  const glyphs = [];
  const positions = [];
  let prev = null;
  for (const ch of line) {
    const g = baseFont.charToGlyph(ch);
    glyphs.push(g);
    let adv = g.advanceWidth || baseFont.unitsPerEm;
    if (state.useKerning && prev) {
      adv += baseFont.getKerningValue(prev, g);
    }
    positions.push({ xAdvance: adv, yAdvance: 0, xOffset: 0, yOffset: 0 });
    prev = g;
  }
  return { glyphs, positions };
}
function runWidth(run, size, state) {
  const UPEM = baseFont.unitsPerEm || 1000;
  let width = 0;
  for (let i = 0; i < run.glyphs.length; i++) {
    const g = run.glyphs[i];
    const pos = run.positions[i] || { xAdvance: g.advanceWidth || UPEM };
    let adv = (pos.xAdvance || 0) * (size / UPEM);
    adv += state.tracking / 100;
    if (g.unicode === 32) adv += state.wordSpacing || 0;
    // extra spacing per-lettera (dopo il glifo corrente)
    adv += deltaForGlyphIndex(run, i, state);
    width += adv;
  }
  return width;
}

function renderScene(p, state, { noBackground = false } = {}) {
  p.clear();
  if (!noBackground) {
    p.background(state.bgColor || "#ffffff");
  }
  renderText(p, state, p.width, p.height);
  if (state.showGrid) {
    drawGrid(p, state);
  }
  if (state.showSafe) {
    drawSafeArea(p, state);
  }
}
function drawGrid(p, state) {
  const step = Math.max(8, state.gridSize || 32);
  const ctx = p.drawingContext;
  ctx.save();
  p.noFill();
  p.stroke(0, 60);
  p.strokeWeight(1);
  for (let x = 0; x <= p.width; x += step) {
    p.line(x, 0, x, p.height);
  }
  for (let y = 0; y <= p.height; y += step) {
    p.line(0, y, p.width, y);
  }
  ctx.restore();
}
function drawSafeArea(p, state) {
  const m = state.padding || 32;
  p.noFill();
  p.stroke(0);
  p.strokeWeight(1);
  p.rect(m, m, p.width - 2 * m, p.height - 2 * m);
}

function renderText(p, state, W, H) {
  const margin = state.padding;
  const lineAdvance = state.fontSize * state.lineHeight;

  const rawLines = (state.text || "").split(/\n/);
  const lines = [];
  if (state.autoWrap) {
    const maxW = Math.min(state.wrapWidth || W - margin * 2, W - margin * 2);
    rawLines.forEach((src) => {
      const words = src.split(/(\s+)/);
      let cur = "";
      for (let i = 0; i < words.length; i++) {
        const test = cur + words[i];
        const runTest = layoutLine(test, state);
        const w = runWidth(runTest, state.fontSize, state);
        if (w > maxW && cur.trim() !== "") {
          lines.push(cur);
          cur = words[i].trimStart();
        } else cur = test;
      }
      if (cur !== "") lines.push(cur);
    });
  } else {
    lines.push(...rawLines);
  }

  if (!lines.length) {
    return;
  }

  const runs = lines.map((line) => layoutLine(line, state));
  const widths = runs.map((run) => runWidth(run, state.fontSize, state));

  const UPEM = baseFont ? baseFont.unitsPerEm || 1000 : 1000;
  const ascentUnits =
    baseFont && typeof baseFont.ascender === "number"
      ? baseFont.ascender
      : UPEM * 0.8;
  const descentUnitsRaw =
    baseFont && typeof baseFont.descender === "number"
      ? baseFont.descender
      : -UPEM * 0.2;
  const descentUnits = Math.abs(descentUnitsRaw);
  const ascentPx = (ascentUnits / UPEM) * state.fontSize;
  const descentPx = (descentUnits / UPEM) * state.fontSize;
  const blockHeight =
    ascentPx + descentPx + Math.max(0, lines.length - 1) * lineAdvance;
  const availableHeight = Math.max(lineAdvance, H - margin * 2);
  const freeSpace = Math.max(0, availableHeight - blockHeight);
  let y = margin + freeSpace / 2 + ascentPx + (state.baselineShift || 0);

  const ctx = p.drawingContext;
  ctx.lineJoin = state.lineJoin || "miter";
  ctx.lineCap = state.lineCap || "butt";
  ctx.miterLimit = state.miterLimit || 10;

  let globalIndex = 0;
  for (let li = 0; li < lines.length; li++) {
    const run = runs[li];
    let x;
    if (state.align === "center") x = (W - widths[li]) / 2;
    else if (state.align === "right") x = W - margin - widths[li];
    else x = margin;
    const used = drawLine(p, run, x, y, state, W, H, li, globalIndex);
    globalIndex += used;
    y += lineAdvance;
  }

  if (state.showBounds) {
    p.noFill();
    p.stroke(0, 120);
    p.rect(
      margin,
      margin,
      state.autoWrap
        ? Math.min(state.wrapWidth, W - 2 * margin)
        : W - 2 * margin,
      H - 2 * margin
    );
  }
}

function drawCanvasPath(
  ctx,
  path,
  fillStyle,
  strokeStyle,
  lineWidth,
  fillAlpha,
  strokeAlpha
) {
  ctx.save();
  ctx.beginPath();
  for (const c of path.commands) {
    if (c.type === "M") ctx.moveTo(c.x, c.y);
    else if (c.type === "L") ctx.lineTo(c.x, c.y);
    else if (c.type === "C")
      ctx.bezierCurveTo(c.x1, c.y1, c.x2, c.y2, c.x, c.y);
    else if (c.type === "Q") ctx.quadraticCurveTo(c.x1, c.y1, c.x, c.y);
    else if (c.type === "Z") ctx.closePath();
  }
  if (fillStyle) {
    ctx.globalAlpha = fillAlpha;
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (strokeStyle && lineWidth > 0) {
    ctx.globalAlpha = strokeAlpha;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.restore();
}

function drawShapeMappedGlyph(ctx, path, state, styles) {
  const samples = getShapeSamples(path, state);
  if (!samples.length) return;

  const outerRadius =
    Math.max(0.05, state.shapeRadius || 0.35) * state.fontSize;
  const innerRatio = Math.max(0, Math.min(0.99, state.shapeInner ?? 0.4));
  const sides = Math.max(3, state.shapeSides | 0);
  const twist = state.shapeTwist || 0;
  const follow = state.shapeFollow !== false;

  ctx.save();
  samples.forEach((sample) => {
    const angle = (follow ? sample.angle : 0) + twist;
    drawStarPolygon(
      ctx,
      sample.x,
      sample.y,
      sides,
      outerRadius,
      innerRatio,
      angle,
      styles
    );
  });
  ctx.restore();

  if (state.showPoints) {
    ctx.save();
    ctx.fillStyle = "rgba(255,0,0,0.75)";
    samples.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }
}

function drawStarPolygon(
  ctx,
  cx,
  cy,
  sides,
  outerRadius,
  innerRatio,
  rotation,
  styles
) {
  if (!(outerRadius > 0) || sides < 3) return;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.beginPath();
  const useStar = innerRatio > 0 && innerRatio < 0.999;
  if (useStar) {
    const steps = sides * 2;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const radius =
        i % 2 === 0 ? outerRadius : outerRadius * innerRatio;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
  } else {
    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const px = Math.cos(angle) * outerRadius;
      const py = Math.sin(angle) * outerRadius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
  }
  ctx.closePath();

  if (styles.fillStyle) {
    ctx.globalAlpha = styles.fillAlpha;
    ctx.fillStyle = styles.fillStyle;
    ctx.fill();
  }
  if (styles.strokeStyle && styles.strokeWeight > 0) {
    ctx.globalAlpha = styles.strokeAlpha;
    ctx.lineWidth = styles.strokeWeight;
    ctx.strokeStyle = styles.strokeStyle;
    ctx.stroke();
  }
  ctx.restore();
}

function flattenPathToSubpaths(path, detail = 18) {
  const subpaths = [];
  let current = [];
  let prev = null;
  let start = null;
  for (const cmd of path.commands) {
    if (cmd.type === "M") {
      if (current.length) subpaths.push(current);
      prev = { x: cmd.x, y: cmd.y };
      start = { x: cmd.x, y: cmd.y };
      current = [{ x: prev.x, y: prev.y }];
    } else if (cmd.type === "L") {
      if (!current.length && prev) {
        current = [{ x: prev.x, y: prev.y }];
      }
      prev = { x: cmd.x, y: cmd.y };
      current.push({ x: prev.x, y: prev.y });
    } else if (cmd.type === "C" && prev) {
      const p0 = { x: prev.x, y: prev.y };
      const p1 = { x: cmd.x1, y: cmd.y1 };
      const p2 = { x: cmd.x2, y: cmd.y2 };
      const p3 = { x: cmd.x, y: cmd.y };
      if (!current.length) current = [{ x: p0.x, y: p0.y }];
      for (let i = 1; i <= detail; i++) {
        const t = i / detail;
        current.push(cubicPoint(p0, p1, p2, p3, t));
      }
      prev = { x: cmd.x, y: cmd.y };
    } else if (cmd.type === "Q" && prev) {
      const p0 = { x: prev.x, y: prev.y };
      const p1 = { x: cmd.x1, y: cmd.y1 };
      const p2 = { x: cmd.x, y: cmd.y };
      if (!current.length) current = [{ x: p0.x, y: p0.y }];
      for (let i = 1; i <= detail; i++) {
        const t = i / detail;
        current.push(quadraticPoint(p0, p1, p2, t));
      }
      prev = { x: cmd.x, y: cmd.y };
    } else if (cmd.type === "Z") {
      if (start) {
        current.push({ x: start.x, y: start.y });
        prev = { x: start.x, y: start.y };
      }
      if (current.length) subpaths.push(current);
      current = [];
      start = null;
      prev = null;
    }
  }
  if (current.length) subpaths.push(current);
  return subpaths;
}

function cubicPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

function quadraticPoint(p0, p1, p2, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  return {
    x: mt2 * p0.x + 2 * mt * t * p1.x + t2 * p2.x,
    y: mt2 * p0.y + 2 * mt * t * p1.y + t2 * p2.y,
  };
}

function samplePointsOnSubpath(points, spacing) {
  const out = [];
  if (!points || points.length < 2) return out;
  let remaining = spacing;
  let prev = points[0];
  for (let i = 1; i < points.length; i++) {
    const cur = points[i];
    const dx = cur.x - prev.x;
    const dy = cur.y - prev.y;
    let segLen = Math.hypot(dx, dy);
    if (segLen === 0) {
      prev = cur;
      continue;
    }
    const dirX = dx / segLen;
    const dirY = dy / segLen;
    let dist = segLen;
    let localPrev = prev;
    while (dist >= remaining) {
      const px = localPrev.x + dirX * remaining;
      const py = localPrev.y + dirY * remaining;
      out.push({ x: px, y: py, angle: Math.atan2(dirY, dirX) });
      dist -= remaining;
      localPrev = { x: px, y: py };
      remaining = spacing;
    }
    remaining -= dist;
    if (remaining < 1e-6) remaining = spacing;
    prev = cur;
  }
  return out;
}

function computeBoundsFromSubpaths(subpaths) {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  subpaths.forEach((points) => {
    points.forEach((pt) => {
      if (pt.x < minX) minX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y > maxY) maxY = pt.y;
    });
  });
  if (minX === Infinity) return null;
  return { minX, minY, maxX, maxY };
}

function getShapeSamples(path, state) {
  const subpaths = flattenPathToSubpaths(path);
  const spacing = Math.max(1, state.shapeSpacing || 10);
  const samples = [];
  subpaths.forEach((sub) => {
    samples.push(...samplePointsOnSubpath(sub, spacing));
  });
  if (!samples.length) {
    const bounds = computeBoundsFromSubpaths(subpaths);
    if (bounds) {
      samples.push({
        x: (bounds.minX + bounds.maxX) / 2,
        y: (bounds.minY + bounds.maxY) / 2,
        angle: 0,
      });
    }
  }
  return samples;
}

function buildStarPathData(
  cx,
  cy,
  sides,
  outerRadius,
  innerRatio,
  angleRad
) {
  if (!(outerRadius > 0) || sides < 3) return "";
  const points = [];
  const useStar = innerRatio > 0 && innerRatio < 0.999;
  const steps = useStar ? sides * 2 : sides;
  const cosA = Math.cos(angleRad);
  const sinA = Math.sin(angleRad);
  for (let i = 0; i < steps; i++) {
    const baseAngle = (i / steps) * Math.PI * 2;
    const radius =
      useStar && i % 2 === 1 ? outerRadius * innerRatio : outerRadius;
    const localX = Math.cos(baseAngle) * radius;
    const localY = Math.sin(baseAngle) * radius;
    const rotX = localX * cosA - localY * sinA + cx;
    const rotY = localX * sinA + localY * cosA + cy;
    points.push({ x: rotX, y: rotY });
  }
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length; i++) {
    d += `L ${points[i].x} ${points[i].y} `;
  }
  d += "Z";
  return d.trim();
}

/* ===== KINETIC ===== */
function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function waveValue(mode, u) {
  if (mode === "sine") return Math.sin(u);
  if (mode === "triangle") {
    const s = (u / (2 * Math.PI)) % 1;
    return 4 * Math.abs(s - 0.5) - 1;
  }
  if (mode === "saw") {
    const s = (u / (2 * Math.PI)) % 1;
    return 2 * s - 1;
  }
  if (mode === "square") {
    return Math.sign(Math.sin(u)) || 0;
  }
  return Math.sin(u);
}
function envelopeAt(t, type) {
  if (type === "in") return t;
  if (type === "out") return 1 - t;
  if (type === "inout") {
    const x = t - 0.5;
    return 1 - 4 * x * x;
  }
  return 1;
}
function kineticForIndex(
  iGlyph,
  iWord,
  countGlyphs,
  countWords,
  state,
  lineIndex,
  globalIndex
) {
  const mode = state.kinMode || "off";
  if (mode === "off") return { dx: 0, dy: 0, rot: 0, sx: 0, sy: 0, base: 0 };

  const idx = state.kinPerWord ? iWord : iGlyph;
  const total = Math.max(1, state.kinPerWord ? countWords : countGlyphs);

  let idxOrigin;
  if (state.kinOrigin === "center") idxOrigin = idx - (total - 1) / 2;
  else if (state.kinOrigin === "right") idxOrigin = total - 1 - idx;
  else idxOrigin = idx;

  const t = state.animate ? performance.now() * 0.001 * state.speed : 0;
  const period = Math.max(2, state.kinPeriod || 12);
  const phase = state.kinPhase || 0;

  let v = 0;
  if (mode === "random") {
    const rnd = mulberry32(
      (state.seed | 0) + (state.kinPerWord ? iWord : globalIndex) + 1
    );
    v = rnd() * 2 - 1;
  } else if (mode === "noise") {
    const scale = Math.max(2, state.kinNoiseScale || 12);
    sketch.noiseSeed(state.seed | 0);
    const n = sketch.noise(idx / scale, t);
    v = n * 2 - 1;
  } else {
    const u =
      (idxOrigin / period) * (2 * Math.PI) +
      phase +
      t * ((2 * Math.PI) / period);
    v = waveValue(mode, u);
  }

  const pos01 = total > 1 ? idx / (total - 1) : 0.5;
  const env = envelopeAt(pos01, state.kinEnvelope || "none");
  const envMix = 1 - state.kinFalloff + state.kinFalloff * env;
  v *= envMix;

  return {
    dx: (state.kinOffX || 0) * v,
    dy: (state.kinOffY || 0) * v,
    rot: (state.kinRot || 0) * v,
    sx: (state.kinScaleX || 0) * v,
    sy: (state.kinScaleY || 0) * v,
    base: (state.kinBase || 0) * v,
  };
}

function drawLine(
  p,
  run,
  startX,
  baselineY,
  state,
  W,
  H,
  lineIndex = 0,
  globalStartIndex = 0
) {
  const size = state.fontSize;
  const UPEM = baseFont.unitsPerEm || 1000;
  let x = startX;

  const ctx = p.drawingContext;
  let fillStyle = p.color(state.fillColor).toString();
  if (state.useGradient) {
    const ang = state.gradAngle || 0;
    const g = ctx.createLinearGradient(
      0,
      0,
      Math.cos(ang) * W,
      Math.sin(ang) * H
    );
    g.addColorStop(0, state.gradA);
    g.addColorStop(1, state.gradB);
    fillStyle = g;
  }
  const strokeStyle = p.color(state.strokeColor).toString();

  const glyphCount = run.glyphs.length;
  let wordCount = 0;
  for (let gi = 0; gi < glyphCount; gi++) {
    if (run.glyphs[gi].unicode === 32) wordCount++;
  }
  if (glyphCount > 0 && run.glyphs[glyphCount - 1]?.unicode !== 32) wordCount++;

  let wordIndex = 0;

  for (let gi = 0; gi < glyphCount; gi++) {
    const glyph = run.glyphs[gi];
    const pos = run.positions[gi] || {
      xAdvance: glyph.advanceWidth || UPEM,
      yAdvance: 0,
      xOffset: 0,
      yOffset: 0,
    };

    const path = getMutatedPath(sketch, glyph, size, state);

    const iGlyph = state.kinRestart ? gi : globalStartIndex + gi;
    const iWord = wordIndex;
    const kin = kineticForIndex(
      iGlyph,
      iWord,
      glyphCount,
      wordCount,
      state,
      lineIndex,
      globalStartIndex + gi
    );

    p.push();
    p.translate(
      x + (pos.xOffset || 0) * (size / UPEM),
      baselineY + (pos.yOffset || 0) * (size / UPEM)
    );
    p.shearX(state.shear);
    p.rotate(state.rotation);
    p.scale(state.scaleX || 1, state.scaleY || 1);
    p.translate(kin.dx, kin.base + kin.dy);
   p.rotate(kin.rot);
   p.scale(1 + (kin.sx || 0), 1 + (kin.sy || 0));

    const fillForDraw =
      state.strokeWeight > 0 && state.fillAlpha <= 0 ? null : fillStyle;
    const strokeForDraw = state.strokeWeight > 0 ? strokeStyle : null;

    if (state.fxShapeMap) {
      drawShapeMappedGlyph(
        ctx,
        path,
        state,
        {
          fillStyle: fillForDraw,
          strokeStyle: strokeForDraw,
          fillAlpha: state.fillAlpha,
          strokeAlpha: state.strokeAlpha,
          strokeWeight: state.strokeWeight,
        }
      );
    } else {
      drawCanvasPath(
        ctx,
        path,
        fillForDraw,
        strokeForDraw,
        state.strokeWeight,
        state.fillAlpha,
        state.strokeAlpha
      );

      if (state.showPoints) {
        p.stroke(0);
        p.noFill();
        for (const c of path.commands) {
          if (c.x !== undefined && c.y !== undefined) p.circle(c.x, c.y, 2);
          if (c.x1 !== undefined && c.y1 !== undefined)
            p.circle(c.x1, c.y1, 2);
          if (c.x2 !== undefined && c.y2 !== undefined)
            p.circle(c.x2, c.y2, 2);
        }
      }
    }
    p.pop();

    let adv = (pos.xAdvance || 0) * (size / UPEM);
    adv += state.tracking / 100;
    if (glyph.unicode === 32) {
      adv += state.wordSpacing || 0;
      wordIndex++;
    }
    // extra spacing per-lettera
    adv += deltaForGlyphIndex(run, gi, state);
    x += adv * (state.scaleX || 1);
  }
  return glyphCount;
}

/* ====== Per-letter spacing helpers ====== */
const __perLetterCache = new Map();
function getPerLetterArray(state) {
  if (!state.perLetterEnabled) return [];
  const key = `${state.perLetterPattern}|${state.perLetterScale}`;
  if (__perLetterCache.has(key)) return __perLetterCache.get(key);
  const raw = (state.perLetterPattern || "").split(/[\s,;]+/).filter(Boolean);
  const arr = raw
    .map((x) => parseFloat(x))
    .filter((n) => Number.isFinite(n))
    .map((n) => n * (state.perLetterScale || 1));
  __perLetterCache.set(key, arr);
  return arr;
}
function deltaForGlyphIndex(run, gi, state) {
  if (!state.perLetterEnabled) return 0;
  const pattern = getPerLetterArray(state);
  if (!pattern.length) return 0;
  let idx = gi;
  if (!state.perLetterIncludeSpaces) {
    let count = 0;
    for (let k = 0; k <= gi; k++) {
      const g = run.glyphs[k];
      if (g && g.unicode !== 32) count++;
    }
    idx = count - 1;
  }
  if (idx < 0) return 0;
  if (idx >= pattern.length) {
    if (state.perLetterRepeat) idx = idx % pattern.length;
    else return 0;
  }
  return pattern[idx] || 0;
}

/* ===== EXPORTS ===== */
function exportSVG() {
  if (!baseFont) {
    alert("Carica prima un font.");
    return;
  }
  const s = getState();
  const W = sketch.width,
    H = sketch.height;

  const margin = s.padding;
  const lineAdvance = s.fontSize * s.lineHeight;

  const rawLines = (s.text || "").split(/\n/);
  const lines = [];
  if (s.autoWrap) {
    const maxW = Math.min(s.wrapWidth || W - margin * 2, W - margin * 2);
    rawLines.forEach((src) => {
      const words = src.split(/(\s+)/);
      let cur = "";
      for (let i = 0; i < words.length; i++) {
        const test = cur + words[i];
        const runTest = layoutLine(test, s);
        const w = runWidth(runTest, s.fontSize, s);
        if (w > maxW && cur.trim() !== "") {
          lines.push(cur);
          cur = words[i].trimStart();
        } else cur = test;
      }
      if (cur !== "") lines.push(cur);
    });
  } else {
    lines.push(...rawLines);
  }

  if (!lines.length) {
    return;
  }

  const runs = lines.map((line) => layoutLine(line, s));
  const widths = runs.map((run) => runWidth(run, s.fontSize, s));

  const UPEM = baseFont ? baseFont.unitsPerEm || 1000 : 1000;
  const ascentUnits =
    baseFont && typeof baseFont.ascender === "number"
      ? baseFont.ascender
      : UPEM * 0.8;
  const descentUnitsRaw =
    baseFont && typeof baseFont.descender === "number"
      ? baseFont.descender
      : -UPEM * 0.2;
  const descentUnits = Math.abs(descentUnitsRaw);
  const ascentPx = (ascentUnits / UPEM) * s.fontSize;
  const descentPx = (descentUnits / UPEM) * s.fontSize;
  const blockHeight =
    ascentPx + descentPx + Math.max(0, lines.length - 1) * lineAdvance;
  const availableHeight = Math.max(lineAdvance, H - margin * 2);
  const freeSpace = Math.max(0, availableHeight - blockHeight);
  let y = margin + freeSpace / 2 + (s.baselineShift || 0) + ascentPx;

  const defs = [];
  const fillRef =
    s.strokeWeight > 0 && s.fillAlpha <= 0
      ? "none"
      : s.useGradient
      ? "url(#grad1)"
      : s.fillColor;
  if (s.useGradient) {
    const ang = s.gradAngle || 0;
    const x2 = Math.cos(ang) * W;
    const y2 = Math.sin(ang) * H;
    defs.push(
      `<linearGradient id="grad1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${x2}" y2="${y2}">
        <stop offset="0" stop-color="${s.gradA}"/>
        <stop offset="1" stop-color="${s.gradB}"/>
      </linearGradient>`
    );
  }
  const defsMarkup = defs.length ? `<defs>${defs.join("\n")}</defs>` : "";

  const shearDeg = (s.shear * 180) / Math.PI || 0;
  const rotDeg = (s.rotation * 180) / Math.PI || 0;
  const scaleX = s.scaleX || 1,
    scaleY = s.scaleY || 1;

  const svg = [];
  svg.push(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`
  );
  if (s.exportBg)
    svg.push(
      `<rect width="100%" height="100%" fill="${s.bgColor || "#ffffff"}"/>`
    );
  if (defsMarkup) svg.push(defsMarkup);
  svg.push(
    `<g fill="${fillRef}" stroke="${
      s.strokeWeight > 0 ? s.strokeColor : "none"
    }" stroke-width="${s.strokeWeight}" stroke-linejoin="${
      s.lineJoin
    }" stroke-linecap="${s.lineCap}" fill-opacity="${
      s.fillAlpha
    }" stroke-opacity="${s.strokeAlpha}">`
  );

  let globalIndex = 0;
  for (let li = 0; li < runs.length; li++) {
    const run = runs[li];
    let x;
    if (s.align === "center") x = (W - widths[li]) / 2;
    else if (s.align === "right") x = W - margin - widths[li];
    else x = margin;

    const glyphCount = run.glyphs.length;
    let wordCount = 0;
    for (let gi = 0; gi < glyphCount; gi++) {
      if (run.glyphs[gi].unicode === 32) wordCount++;
    }
    if (glyphCount > 0 && run.glyphs[glyphCount - 1]?.unicode !== 32)
      wordCount++;

    let wordIndex = 0;

    for (let gi = 0; gi < glyphCount; gi++) {
      const glyph = run.glyphs[gi];
      const pos = run.positions[gi] || {
        xAdvance: glyph.advanceWidth || UPEM,
        yAdvance: 0,
        xOffset: 0,
        yOffset: 0,
      };

      const path = getMutatedPath(sketch, glyph, s.fontSize, s);
      const shapeSamples = s.fxShapeMap ? getShapeSamples(path, s) : null;
      let d = "";
      if (!s.fxShapeMap) {
        for (const c of path.commands) {
          if (c.type === "M") d += `M ${c.x} ${c.y} `;
          else if (c.type === "L") d += `L ${c.x} ${c.y} `;
          else if (c.type === "C")
            d += `C ${c.x1} ${c.y1} ${c.x2} ${c.y2} ${c.x} ${c.y} `;
          else if (c.type === "Q") d += `Q ${c.x1} ${c.y1} ${c.x} ${c.y} `;
          else if (c.type === "Z") d += `Z `;
        }
      }

      const iGlyph = s.kinRestart ? gi : globalIndex + gi;
      const kin = kineticForIndex(
        iGlyph,
        wordIndex,
        glyphCount,
        wordCount,
        s,
        li,
        globalIndex + gi
      );

      const tx = x + (pos.xOffset || 0) * (s.fontSize / UPEM);
      const ty = y + (pos.yOffset || 0) * (s.fontSize / UPEM);
      const kinRotDeg = ((kin.rot || 0) * 180) / Math.PI;
      const kinScaleX = 1 + (kin.sx || 0);
      const kinScaleY = 1 + (kin.sy || 0);

      const tstr =
        `translate(${tx} ${ty}) ` +
        `skewX(${shearDeg}) rotate(${rotDeg}) scale(${scaleX} ${scaleY}) ` +
        `translate(${kin.dx} ${
          kin.base + kin.dy
        }) rotate(${kinRotDeg}) scale(${kinScaleX} ${kinScaleY})`;

      if (s.fxShapeMap) {
        const outerRadius =
          Math.max(0.05, s.shapeRadius || 0.35) * s.fontSize;
        const innerRatio = Math.max(0, Math.min(0.99, s.shapeInner ?? 0.4));
        const sides = Math.max(3, s.shapeSides | 0);
        const follow = s.shapeFollow !== false;
        const twist = s.shapeTwist || 0;
        if (shapeSamples && shapeSamples.length) {
          shapeSamples.forEach((sample) => {
            const angle = (follow ? sample.angle : 0) + twist;
            const shapeD = buildStarPathData(
              sample.x,
              sample.y,
              sides,
              outerRadius,
              innerRatio,
              angle
            );
            if (shapeD) {
              svg.push(`<path d="${shapeD}" transform="${tstr}"/>`);
            }
          });
        }
      } else {
        svg.push(`<path d="${d.trim()}" transform="${tstr}"/>`);
      }

      let adv = (pos.xAdvance || 0) * (s.fontSize / UPEM);
      adv += s.tracking / 100;
      if (glyph.unicode === 32) {
        adv += s.wordSpacing || 0;
        wordIndex++;
      }
      adv += deltaForGlyphIndex(run, gi, s);
      x += adv * scaleX;
    }
    globalIndex += glyphCount;
    y += lineAdvance;
  }

  svg.push(`</g></svg>`);
  const blob = new Blob([svg.join("\n")], { type: "image/svg+xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "kinetic.svg";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function exportPNGTrimmed() {
  if (!sketch) {
    alert("Canvas non pronto.");
    return;
  }
  const state = getState();
  const W = sketch.width,
    H = sketch.height;

  const g = sketch.createGraphics(W, H);
  g.pixelDensity(1);
  renderScene(g, state, { noBackground: !state.exportBg });

  g.loadPixels();
  const dpr = g.pixelDensity();
  const GW = W * dpr,
    GH = H * dpr;
  const pix = g.pixels;
  let minX = GW,
    minY = GH,
    maxX = -1,
    maxY = -1;

  for (let y = 0; y < GH; y++) {
    for (let x = 0; x < GW; x++) {
      const idx = 4 * (y * GW + x);
      const a = pix[idx + 3];
      if (a > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0 || maxY < 0) {
    g.remove();
    sketch.saveCanvas("glitch-trim", "png");
    return;
  }

  const srcW = maxX - minX + 1,
    srcH = maxY - minY + 1;
  const out = document.createElement("canvas");
  out.width = Math.ceil(srcW / dpr);
  out.height = Math.ceil(srcH / dpr);
  const octx = out.getContext("2d");
  octx.drawImage(g.canvas, minX, minY, srcW, srcH, 0, 0, out.width, out.height);

  out.toBlob((blob) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "glitch-trim.png";
    a.click();
    URL.revokeObjectURL(a.href);
  }, "image/png");

  g.remove();
}

/* ===== PRESETS ===== */
const BUILTIN_PRESETS = {
  Clean: {
    amount: 5,
    freq: 80,
    speed: 0.6,
    fxContrast: false,
    contrastAmount: 0,
    contrastAngle: Math.PI / 6,
    contrastSharpness: 0,
    contrastMix: 1,
    contrastClamp: 1,
    contrastBalance: 0,
    zoneMix: 0,
    zoneAscender: 1,
    zoneXHeight: 1,
    zoneDescender: 1,
    counterProtect: true,
    counterStrength: 0.6,
    noiseOctaves: 1,
    noiseFalloff: 0.5,
    noiseShape: 0,
    noiseContrast: 0,
    noiseBias: 0,
    noiseClamp: 1,
    noiseMix: 1,
    jitterMode: "uniform",
    jitterBias: 0,
    jitterClamp: 1,
    jitter: 0,
    rotation: 0,
    shear: 0,
    fxWave: false,
    waveShape: "sine",
    waveAmpX: 0,
    waveAmpY: 0,
    waveLength: 220,
    wavePhase: 0,
    waveDirection: 0,
    waveSharpness: 0,
    waveMix: 1,
    fxBend: false,
    bendAmount: 0,
    bendExponent: 2,
    bendPivot: 0.5,
    bendMix: 1,
    bendClamp: 0,

    // effetti
    fxQuantize: false,
    quantMode: "grid",
    quantStepX: 6,
    quantStepY: 6,
    quantAngle: 0,
    quantProb: 1,
    quantMix: 1,
    quantStepR: 0,
    quantStepA: Math.PI / 12,
    fxCurvCrush: false,
    curvSegments: 8,
    curvAngleSnap: 0,
    curvTolerance: 0,
    fxSlice: false,
    sliceH: 24,
    sliceShiftX: 12,
    sliceShiftY: 0,
    slicePattern: "sine",
    slicePhase: 0,
    sliceNoiseScale: 12,
    sliceJitter: 0,
    sliceProb: 1,
    fxGap: false,
    gapProb: 0,
    gapLen: 6,
    gapKeep: 20,

    fxShapeMap: false,
    shapeSides: 6,
    shapeRadius: 0.35,
    shapeInner: 0.4,
    shapeSpacing: 22,
    shapeTwist: 0,
    shapeFollow: true,

    // per-letter
    perLetterEnabled: false,
    perLetterPattern: "0",
    perLetterRepeat: true,
    perLetterIncludeSpaces: false,
    perLetterScale: 1,

    strokeWeight: 0,
    fillAlpha: 1,
    strokeAlpha: 1,
    useGradient: false,
    scaleX: 1,
    scaleY: 1,
    baselineShift: 0,
    lineHeight: 1.1,
    tracking: 0,
    wordSpacing: 40,
    padding: 32,
    kinMode: "off",
    kinPeriod: 12,
    kinPhase: 0,
    kinOrigin: "center",
    kinRestart: true,
    kinPerWord: false,
    kinEnvelope: "none",
    kinFalloff: 0,
    kinNoiseScale: 12,
    kinOffX: 0,
    kinOffY: 0,
    kinRot: 0,
    kinBase: 0,
    kinScaleX: 0,
    kinScaleY: 0,
  },
  "Soft Warp": {
    amount: 22,
    freq: 120,
    speed: 0.5,
    seed: 214,
    axisX: 1,
    axisY: 0.7,
    fxContrast: true,
    contrastAmount: 14,
    contrastAngle: (20 * Math.PI) / 180,
    contrastSharpness: 0.25,
    contrastMix: 0.8,
    contrastClamp: 0.6,
    contrastBalance: -0.1,
    zoneMix: 0.5,
    zoneAscender: 1.15,
    zoneXHeight: 1,
    zoneDescender: 0.85,
    counterProtect: true,
    counterStrength: 0.7,
    noiseOctaves: 3,
    noiseFalloff: 0.65,
    noiseShape: -0.35,
    noiseContrast: -0.2,
    noiseBias: 0,
    noiseClamp: 0.6,
    noiseMix: 0.85,
    jitter: 4,
    jitterMode: "soft",
    jitterBias: 0,
    jitterClamp: 0.6,
    rotation: 0,
    shear: 0,
    fxWave: true,
    waveShape: "sine",
    waveAmpX: 10,
    waveAmpY: 14,
    waveLength: 320,
    wavePhase: 0,
    waveDirection: 20,
    waveSharpness: -0.25,
    waveMix: 0.85,
    fxBend: true,
    bendAmount: 16,
    bendExponent: 2.4,
    bendPivot: 0.55,
    bendMix: 0.55,
    bendClamp: 0.6,
    quantMode: "grid",
    quantStepX: 6,
    quantStepY: 6,
    quantProb: 1,
    quantMix: 0.9,
    fxCurvCrush: false,
    fxSlice: false,
    fxGap: false,
    fxShapeMap: false,
    perLetterEnabled: false,
    strokeWeight: 0,
    fillAlpha: 1,
    strokeAlpha: 1,
    scaleX: 1,
    scaleY: 1,
    baselineShift: 0,
    lineHeight: 1.1,
    tracking: 0,
    wordSpacing: 42,
    padding: 32,
    kinMode: "off",
  },
  "Sharp Glitch": {
    amount: 38,
    freq: 60,
    speed: 0.9,
    seed: 42,
    axisX: 1,
    axisY: 1,
    fxContrast: true,
    contrastAmount: 32,
    contrastAngle: (30 * Math.PI) / 180,
    contrastSharpness: 0.6,
    contrastMix: 0.9,
    contrastClamp: 0.8,
    contrastBalance: 0.2,
    zoneMix: 0.4,
    zoneAscender: 1.2,
    zoneXHeight: 1,
    zoneDescender: 0.75,
    counterProtect: true,
    counterStrength: 0.65,
    noiseOctaves: 4,
    noiseFalloff: 0.45,
    noiseShape: 0.6,
    noiseContrast: 0.45,
    noiseBias: 0.1,
    noiseClamp: 1,
    noiseMix: 1,
    jitter: 14,
    jitterMode: "gaussian",
    jitterBias: 0.2,
    jitterClamp: 0.85,
    rotation: 0,
    shear: 0,
    fxWave: true,
    waveShape: "square",
    waveAmpX: 22,
    waveAmpY: 6,
    waveLength: 180,
    wavePhase: 0,
    waveDirection: 340,
    waveSharpness: 0.6,
    waveMix: 0.7,
    fxBend: true,
    bendAmount: -28,
    bendExponent: 1.3,
    bendPivot: 0.45,
    bendMix: 0.7,
    bendClamp: 0.8,
    quantMode: "grid-angled",
    quantStepX: 8,
    quantStepY: 6,
    quantProb: 0.95,
    quantMix: 1,
    fxCurvCrush: true,
    curvSegments: 3,
    curvAngleSnap: 30,
    curvTolerance: 0.25,
    fxSlice: true,
    sliceH: 18,
    sliceShiftX: 24,
    sliceShiftY: -6,
    slicePattern: "triangle",
    slicePhase: 90,
    sliceNoiseScale: 18,
    sliceJitter: 4,
    sliceProb: 0.85,
    fxGap: true,
    gapProb: 0.12,
    gapLen: 10,
    gapKeep: 18,
    fxShapeMap: false,
    perLetterEnabled: false,
    strokeWeight: 1,
    fillAlpha: 1,
    strokeAlpha: 0.8,
    scaleX: 1,
    scaleY: 1,
    baselineShift: 0,
    lineHeight: 1.05,
    tracking: 6,
    wordSpacing: 36,
    padding: 36,
    kinMode: "off",
  },
  "Low Contrast Sans": {
    amount: 12,
    freq: 140,
    speed: 0.4,
    seed: 88,
    axisX: 0.9,
    axisY: 0.6,
    fxContrast: true,
    contrastAmount: 10,
    contrastAngle: (45 * Math.PI) / 180,
    contrastSharpness: 0.18,
    contrastMix: 0.65,
    contrastClamp: 0.55,
    contrastBalance: -0.2,
    zoneMix: 0.35,
    zoneAscender: 1.05,
    zoneXHeight: 0.9,
    zoneDescender: 0.85,
    counterProtect: true,
    counterStrength: 0.75,
    noiseOctaves: 2,
    noiseFalloff: 0.7,
    noiseShape: -0.2,
    noiseContrast: -0.15,
    noiseBias: 0,
    noiseClamp: 0.7,
    noiseMix: 0.7,
    jitter: 2,
    jitterMode: "soft",
    jitterBias: 0,
    jitterClamp: 0.6,
    rotation: 0,
    shear: 0,
    fxWave: false,
    waveShape: "sine",
    waveAmpX: 0,
    waveAmpY: 0,
    waveLength: 260,
    wavePhase: 0,
    waveDirection: 0,
    waveSharpness: 0,
    waveMix: 0.6,
    fxBend: true,
    bendAmount: 8,
    bendExponent: 2,
    bendPivot: 0.52,
    bendMix: 0.45,
    bendClamp: 0.3,
    fxQuantize: false,
    fxCurvCrush: false,
    fxSlice: false,
    fxGap: false,
    fxShapeMap: false,
    perLetterEnabled: false,
    strokeWeight: 0,
    fillAlpha: 1,
    strokeAlpha: 1,
    scaleX: 1,
    scaleY: 1,
    baselineShift: 0,
    lineHeight: 1.12,
    tracking: 2,
    wordSpacing: 38,
    padding: 32,
    kinMode: "off",
  },
  "High Contrast Didone": {
    amount: 26,
    freq: 90,
    speed: 0.7,
    seed: 512,
    axisX: 0.9,
    axisY: 0.9,
    fxContrast: true,
    contrastAmount: 45,
    contrastAngle: (80 * Math.PI) / 180,
    contrastSharpness: 0.5,
    contrastMix: 0.95,
    contrastClamp: 0.85,
    contrastBalance: 0.15,
    zoneMix: 0.75,
    zoneAscender: 1.4,
    zoneXHeight: 1,
    zoneDescender: 0.6,
    counterProtect: true,
    counterStrength: 0.75,
    noiseOctaves: 3,
    noiseFalloff: 0.55,
    noiseShape: 0.4,
    noiseContrast: 0.35,
    noiseBias: 0.1,
    noiseClamp: 0.9,
    noiseMix: 0.85,
    jitter: 6,
    jitterMode: "gaussian",
    jitterBias: 0.1,
    jitterClamp: 0.8,
    rotation: 0,
    shear: 0,
    fxWave: false,
    waveShape: "sine",
    waveAmpX: 4,
    waveAmpY: 0,
    waveLength: 320,
    wavePhase: 0,
    waveDirection: 0,
    waveSharpness: 0.4,
    waveMix: 0.6,
    fxBend: true,
    bendAmount: 20,
    bendExponent: 2.6,
    bendPivot: 0.48,
    bendMix: 0.5,
    bendClamp: 0.6,
    fxQuantize: false,
    fxCurvCrush: true,
    curvSegments: 5,
    curvAngleSnap: 15,
    curvTolerance: 0.15,
    fxSlice: false,
    fxGap: false,
    fxShapeMap: false,
    perLetterEnabled: false,
    strokeWeight: 0,
    fillAlpha: 1,
    strokeAlpha: 1,
    scaleX: 1,
    scaleY: 1,
    baselineShift: 0,
    lineHeight: 1.05,
    tracking: 4,
    wordSpacing: 36,
    padding: 34,
    kinMode: "off",
  },
};

function applyPreset(name) {
  if (!name) return;
  let p = BUILTIN_PRESETS[name];
  if (!p) {
    const stored = JSON.parse(localStorage.getItem("FGS_PRESETS") || "{}");
    p = stored[name];
  }
  if (!p) {
    alert("Preset non trovato.");
    return;
  }
  loadState(p);
  invalidateGeometry();
  redraw();
}
function savePresetDialog() {
  const name = prompt("Nome preset:");
  if (!name) return;
  const cfg = collectStateForPreset();
  const store = JSON.parse(localStorage.getItem("FGS_PRESETS") || "{}");
  store[name] = cfg;
  localStorage.setItem("FGS_PRESETS", JSON.stringify(store));
  alert("Preset salvato!");
}
function randomizeCurrent() {
  ui.amount.value = Math.floor(Math.random() * 80);
  ui.freq.value = 20 + Math.floor(Math.random() * 200);
  ui.noiseOctaves.value = 1 + Math.floor(Math.random() * 4);
  ui.noiseFalloff.value = (0.35 + Math.random() * 0.6).toFixed(2);
  ui.noiseShape.value = (-0.6 + Math.random() * 1.2).toFixed(2);
  ui.noiseContrast.value = (-0.4 + Math.random() * 0.8).toFixed(2);
  ui.noiseBias.value = (-0.5 + Math.random()).toFixed(2);
  ui.noiseClamp.value = (0.4 + Math.random() * 0.6).toFixed(2);
  ui.noiseMix.value = (0.4 + Math.random() * 0.6).toFixed(2);
  ui.fxContrast.checked = Math.random() < 0.65;
  ui.contrastAmount.value = ui.fxContrast.checked
    ? (-40 + Math.random() * 80).toFixed(0)
    : 0;
  ui.contrastAngle.value = Math.floor(Math.random() * 180);
  ui.contrastSharpness.value = Math.random().toFixed(2);
  ui.contrastMix.value = (0.4 + Math.random() * 0.6).toFixed(2);
  ui.contrastClamp.value = (0.5 + Math.random() * 0.5).toFixed(2);
  ui.contrastBalance.value = (-0.4 + Math.random() * 0.8).toFixed(2);
  ui.zoneMix.value = (Math.random() * 0.9).toFixed(2);
  ui.zoneAscender.value = (0.6 + Math.random() * 1.2).toFixed(2);
  ui.zoneXHeight.value = (0.6 + Math.random() * 1.2).toFixed(2);
  ui.zoneDescender.value = (0.6 + Math.random() * 1.2).toFixed(2);
  ui.counterProtect.checked = Math.random() < 0.85;
  ui.counterStrength.value = (0.3 + Math.random() * 0.6).toFixed(2);
  ui.jitter.value = Math.floor(Math.random() * 12);
  ui.jitterMode.value = ["uniform", "soft", "gaussian"][
    Math.floor(Math.random() * 3)
  ];
  ui.jitterBias.value = (-0.3 + Math.random() * 0.6).toFixed(2);
  ui.jitterClamp.value = (0.5 + Math.random() * 0.5).toFixed(2);
  ui.rotation.value = (-20 + Math.random() * 40).toFixed(1);
  ui.shear.value = (-15 + Math.random() * 30).toFixed(1);
  ui.fxWave.checked = Math.random() < 0.65;
  ui.waveShape.value = ["sine", "triangle", "saw", "square"][
    Math.floor(Math.random() * 4)
  ];
  ui.waveAmpX.value = ui.fxWave.checked
    ? Math.floor(Math.random() * 50)
    : 0;
  ui.waveAmpY.value = ui.fxWave.checked
    ? Math.floor(Math.random() * 50)
    : 0;
  ui.waveLength.value = 40 + Math.floor(Math.random() * 360);
  ui.wavePhase.value = Math.floor(Math.random() * 360);
  ui.waveDirection.value = Math.floor(Math.random() * 360);
  ui.waveSharpness.value = (-0.6 + Math.random() * 1.2).toFixed(2);
  ui.waveMix.value = (0.4 + Math.random() * 0.6).toFixed(2);
  ui.fxBend.checked = Math.random() < 0.6;
  ui.bendAmount.value = ui.fxBend.checked
    ? (-120 + Math.random() * 240).toFixed(0)
    : 0;
  ui.bendExponent.value = (0.7 + Math.random() * 2.8).toFixed(2);
  ui.bendPivot.value = Math.random().toFixed(2);
  ui.bendMix.value = (0.3 + Math.random() * 0.7).toFixed(2);
  ui.bendClamp.value = Math.random().toFixed(2);

  // quant
  ui.quantMode.value = ["grid", "grid-angled", "x", "y", "polar"][
    Math.floor(Math.random() * 5)
  ];
  ui.quantStepX.value = 4 + Math.floor(Math.random() * 12);
  ui.quantStepY.value = 4 + Math.floor(Math.random() * 12);
  ui.quantAngle.value = Math.floor(Math.random() * 360);
  ui.quantProb.value = (0.6 + Math.random() * 0.4).toFixed(2);
  ui.quantMix.value = (0.7 + Math.random() * 0.3).toFixed(2);
  ui.quantStepR.value = Math.floor(Math.random() * 20);
  ui.quantStepA.value = [0, 5, 10, 15, 30, 45][Math.floor(Math.random() * 6)];

  // curvature
  ui.fxCurvCrush.checked = Math.random() < 0.7;
  ui.curvSegments.value = 2 + Math.floor(Math.random() * 10);
  ui.curvAngleSnap.value = [0, 15, 30, 45, 60, 90][
    Math.floor(Math.random() * 6)
  ];
  ui.curvTolerance.value = (Math.random() * 1.2).toFixed(2);

  // slice
  ui.fxSlice.checked = Math.random() < 0.8;
  ui.sliceH.value = 12 + Math.floor(Math.random() * 40);
  ui.sliceShiftX.value = -30 + Math.floor(Math.random() * 60);
  ui.sliceShiftY.value = -10 + Math.floor(Math.random() * 20);
  ui.slicePattern.value = ["sine", "triangle", "random", "noise"][
    Math.floor(Math.random() * 4)
  ];
  ui.slicePhase.value = Math.floor(Math.random() * 360);
  ui.sliceNoiseScale.value = 6 + Math.floor(Math.random() * 20);
  ui.sliceJitter.value = Math.floor(Math.random() * 8);
  ui.sliceProb.value = (0.5 + Math.random() * 0.5).toFixed(2);

  // gapify
  ui.fxGap.checked = Math.random() < 0.5;
  ui.gapProb.value = (Math.random() * 0.3).toFixed(2);
  ui.gapLen.value = 4 + Math.floor(Math.random() * 12);
  ui.gapKeep.value = 12 + Math.floor(Math.random() * 36);

  // shape map
  ui.fxShapeMap.checked = Math.random() < 0.7;
  ui.shapeSides.value = 3 + Math.floor(Math.random() * 6);
  ui.shapeRadius.value = (
    0.1 + Math.floor(Math.random() * 23) * 0.05
  ).toFixed(2);
  ui.shapeInner.value = (0.2 + Math.random() * 0.6).toFixed(2);
  ui.shapeSpacing.value = 10 + Math.floor(Math.random() * 40);
  ui.shapeTwist.value = (-90 + Math.random() * 180).toFixed(0);
  ui.shapeFollow.checked = Math.random() < 0.8;

  // per-letter
  ui.perLetterEnabled.checked = Math.random() < 0.5;
  ui.perLetterPattern.value = Math.random() < 0.5 ? "0, 12, -6, 0" : "2,2,2,2";
  ui.perLetterScale.value = (Math.random() * 2).toFixed(2);
  ui.perLetterRepeat.checked = true;
  ui.perLetterIncludeSpaces.checked = Math.random() < 0.3;

  [
    "amount",
    "freq",
    "jitter",
    "noiseOctaves",
    "noiseFalloff",
    "noiseShape",
    "noiseContrast",
    "noiseBias",
    "noiseClamp",
    "noiseMix",
    "contrastAmount",
    "contrastAngle",
    "contrastSharpness",
    "contrastMix",
    "contrastClamp",
    "contrastBalance",
    "zoneMix",
    "zoneAscender",
    "zoneXHeight",
    "zoneDescender",
    "counterStrength",
    "rotation",
    "shear",
    "waveAmpX",
    "waveAmpY",
    "waveLength",
    "wavePhase",
    "waveDirection",
    "waveSharpness",
    "waveMix",
    "bendAmount",
    "bendExponent",
    "bendPivot",
    "bendMix",
    "bendClamp",
    "gradAngle",
    "quantStepX",
    "quantStepY",
    "quantAngle",
    "quantProb",
    "quantMix",
    "quantStepR",
    "quantStepA",
    "curvSegments",
    "curvAngleSnap",
    "curvTolerance",
    "sliceH",
    "sliceShiftX",
    "sliceShiftY",
    "slicePhase",
    "sliceNoiseScale",
    "sliceJitter",
    "sliceProb",
    "gapProb",
    "gapLen",
    "gapKeep",
    "shapeSides",
    "shapeRadius",
    "shapeInner",
    "shapeSpacing",
    "shapeTwist",
    "perLetterScale",
    "jitterBias",
    "jitterClamp",
  ].forEach(syncVal);
  invalidateGeometry();
  redraw();
}
function copyConfig() {
  const cfg = collectStateForPreset();
  navigator.clipboard
    .writeText(JSON.stringify(cfg, null, 2))
    .then(() => {
      console.log("Config copiata:", cfg);
      alert("Config copiata!");
    });
}
function pasteConfig() {
  const json = prompt("Incolla qui la config JSON:");
  if (!json) return;
  try {
    const cfg = sanitizeConfig(JSON.parse(json), true);
    loadState(cfg);
    invalidateGeometry();
    redraw();
    alert("Config applicata!");
  } catch (e) {
    alert("JSON non valido.");
  }
}

const DEFAULT_STATE = getState();
const ALLOWED_KEYS = Object.keys(DEFAULT_STATE);
function collectStateForPreset() {
  const s = getState();
  const out = {};
  ALLOWED_KEYS.forEach((k) => (out[k] = s[k]));
  return out;
}
function sanitizeConfig(cfg, fillDefaults = false) {
  const out = {};
  ALLOWED_KEYS.forEach((k) => {
    if (cfg.hasOwnProperty(k)) out[k] = cfg[k];
  });
  if (fillDefaults) {
    ALLOWED_KEYS.forEach((k) => {
      if (out[k] === undefined) out[k] = DEFAULT_STATE[k];
    });
  }
  return out;
}
function loadState(cfg) {
  for (const [k, v] of Object.entries(cfg)) {
    if (ui[k] === undefined) continue;
    const el = ui[k];
    if (el.type === "checkbox") {
      el.checked = !!v;
    } else if (el.tagName === "SELECT") {
      el.value = v;
    } else {
      let valueToSet = v;
      if (DEGREE_FIELDS.has(k) && typeof v === "number") {
        const abs = Math.abs(v);
        if (abs <= Math.PI * 2 + 1e-3) {
          valueToSet = (v * 180) / Math.PI;
        }
      }
      if (PERCENT_FIELDS.has(k) && typeof valueToSet === "number") {
        valueToSet = valueToSet * 100;
      }
      el.value =
        typeof valueToSet === "number" && !Number.isInteger(valueToSet)
          ? String(valueToSet)
          : valueToSet;
    }
    if (el.type === "range") syncVal(k);
  }
  invalidateGeometry();
  redraw();
}
