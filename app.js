// app.js - AXP Neuro-Optic Engine v30.0 (OEPF 臨床濾鏡光譜校準 × 尺寸線寬生理耦合 × 1-3階舒適圈漸進擴張版)
// 核心臨床工程突破：
// 1. 尺寸與線條粗細生理耦合 (Size-Thickness Coupling)：大尺寸配厚實線條 (Stage 1-3 喚醒周邊舒適圈)，小尺寸配精緻細線 (Stage 8-10 中心窩精準鎖定)，徹底杜絕「圖小線粗」悲劇
// 2. OEPF 臨床紅藍濾鏡專屬光譜引擎：內建左眼鈷藍防紫波長補償 (cyanComp) 與右眼深紅消光控制，100% 恆定高對比零鬼影
// 3. 第 1~3 階舒適圈喚醒阻尼：於初階自動柔化 Pursuit 追視半徑與 Saccade 跳視跨度，溫和喚醒長期僵直之眼外肌群，逐步擴大視覺舒適圈
// 4. 完整支援三大黑科技視標 (陀螺儀準星鎖 / 10層立體蟲洞隧道 / 費馬黃金螺旋光流陣) 與 60s/90s 換關前 5 秒倒數預告

import { AIM_MATRIX, PROTOCOL_NAMES } from './matrix.js';
import { createTarget } from './shapes.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// === SaaS 後端資料庫配置 ===
const supabaseUrl = 'https://wvholwcyrldixlsgoege.supabase.co';
const supabaseKey = 'sb_publishable_BozJ84tPQF-jBHGKtXKqgw_ELodM54e';
const supabase = createClient(supabaseUrl, supabaseKey);

// === 1. 腹側迷走神經輕鬆配色登入畫面 (晨曦冰川霧藍 × 溫潤白玉卡片) ===
let currentPatientCode = 'FV-8888';
const loginOverlay = document.createElement('div');
loginOverlay.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:linear-gradient(135deg, #ebf3f9 0%, #f8fafc 50%, #f3efe6 100%); z-index:9999; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:'Noto Sans TC', -apple-system, sans-serif; transition: opacity 0.35s ease;";
loginOverlay.innerHTML = `
    <div style="background:#ffffff; padding:44px 40px; border-radius:20px; text-align:center; box-shadow: 0 20px 50px rgba(26, 54, 93, 0.08); border: 1px solid #e2e8f0; border-top: 5px solid #2980b9; max-width: 440px; width: 90%;">
        <div style="display:inline-block; background:#ebf3f9; color:#2980b9; font-size:12px; font-weight:800; letter-spacing:1.5px; padding:5px 14px; border-radius:20px; margin-bottom:14px;">FANTASTIC VISION LAB</div>
        <h1 style="color:#1a365d; font-size:26px; font-weight:900; letter-spacing:1px; margin:0 0 8px 0;">AXP 神經視覺空間協同系統</h1>
        <p style="color:#64748b; margin:0 0 26px 0; font-size:14.5px; font-weight:500; line-height:1.65;">請保持雙肩自然放鬆與平穩呼吸<br>準備好後即可啟動您的專屬視覺練習</p>
        <label style="display:block; margin-bottom:10px; font-size:14px; font-weight:800; color:#1a365d; text-align:center;">請輸入您的專屬訓練代號，或者姓名</label>
        <input type="text" id="patient-code-input" placeholder="例：FV-8888 / 凡特錫" style="background-color:#f8fafc; padding:14px 16px; width:100%; text-align:center; border-radius:10px; border:1.5px solid #cbd5e1; margin-bottom:22px; font-size:16px; font-weight:700; color:#1a365d; outline:none; transition:0.2s; box-sizing:border-box;">
        <button id="login-btn" style="background:linear-gradient(135deg, #2980b9 0%, #1a365d 100%); color:#ffffff; border:none; padding:15px 30px; width:100%; border-radius:10px; font-size:16px; cursor:pointer; font-weight:800; transition:0.25s; box-shadow: 0 8px 20px rgba(41, 128, 185, 0.22); letter-spacing:0.5px;">進入視覺練習空間</button>
    </div>
`;
document.body.appendChild(loginOverlay);

function performLogin() {
    const code = document.getElementById('patient-code-input')?.value.trim();
    if(!code) return alert("請輸入您的專屬訓練代號，或者姓名！");
    currentPatientCode = code; 
    loginOverlay.style.display = 'none'; 
    forceRenderFrame();
}

document.getElementById('login-btn')?.addEventListener('click', performLogin);
const inputField = document.getElementById('patient-code-input');
if(inputField) {
    inputField.addEventListener('focus', () => { inputField.style.borderColor = '#2980b9'; inputField.style.backgroundColor = '#ffffff'; inputField.style.boxShadow = '0 0 0 3px rgba(41,128,185,0.15)'; });
    inputField.addEventListener('blur', () => { inputField.style.borderColor = '#cbd5e1'; inputField.style.backgroundColor = '#f8fafc'; inputField.style.boxShadow = 'none'; });
    inputField.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); performLogin(); } });
}

// === DOM 元素綁定 ===
const container = document.getElementById('webgl-container');
const controlPanel = document.querySelector('.control-panel'); 
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const reportBtn = document.getElementById('report-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const statusText = document.getElementById('status-text');
const hudScoreVal = document.getElementById('hud-score-val');

const shapeSelect = document.getElementById('shape-select');
const customTextInput = document.getElementById('custom-text'); 
const textInputGroup = document.getElementById('text-input-group'); 
const sizeSlider = document.getElementById('size-slider');
const sizeLabel = document.getElementById('size-label');
const thickSlider = document.getElementById('thick-slider');
const thickLabel = document.getElementById('thick-label');
const fillCheckbox = document.getElementById('fill-checkbox');
const rotateCheckbox = document.getElementById('rotate-checkbox');
const aiToggle = document.getElementById('ai-toggle');
const speedSlider = document.getElementById('speed-slider');
const speedLabel = document.getElementById('speed-label');
const stereoSlider = document.getElementById('stereo-slider');
const stereoLabel = document.getElementById('stereo-label');

const prismSlider = document.getElementById('prism-slider');
const prismLabel = document.getElementById('prism-label');
const prismValHud = document.getElementById('prism-val-hud'); 

const screenSpecSelect = document.getElementById('screen-spec');
const viewDistInput = document.getElementById('view-dist');

const glassesSelect = document.getElementById('glasses-select');
const balanceSlider = document.getElementById('balance-slider');
const balanceLabel = document.getElementById('balance-label');
const redSlider = document.getElementById('red-slider');
const greenSlider = document.getElementById('green-slider');
const blueSlider = document.getElementById('blue-slider');
const cyanCompSlider = document.getElementById('cyan-comp-slider');
const cyanCompVal = document.getElementById('cyan-comp-val');
const oepfTuneGroup = document.getElementById('oepf-tune-group');

const timerDisplay = document.getElementById('timer-val');
const dynamicModeTag = document.getElementById('dynamic-mode-tag');
const stageIndicatorLabel = document.getElementById('stage-indicator-label');
const btnTestMode = document.getElementById('btn-test-mode');
const breathIndicator = document.getElementById('breath-indicator');
const breathText = document.getElementById('breath-text');

// 臨床狀態導引膠囊
const siloPrompt = document.createElement('div');
siloPrompt.id = 'silo-prompt';
siloPrompt.style.cssText = "position:absolute; bottom:66px; left:50%; transform:translateX(-50%); font-size:15px; font-weight:800; letter-spacing:1.2px; background:rgba(15, 23, 42, 0.90); backdrop-filter:blur(8px); padding:10px 24px; border-radius:10px; border:1.5px solid #D4AF37; color:#f8fafc; z-index:100; display:none; text-align:center; pointer-events:none; box-shadow:0 8px 25px rgba(0,0,0,0.45);";
document.getElementById('arena').appendChild(siloPrompt);

// ⏳ 切換下一動作前「最後 5 秒倒數計時膠囊」
const stageCountdownBadge = document.createElement('div');
stageCountdownBadge.id = 'stage-countdown-badge';
stageCountdownBadge.style.cssText = "position:absolute; top:24px; right:28px; font-size:15.5px; font-weight:900; letter-spacing:1px; background:rgba(26, 54, 93, 0.92); backdrop-filter:blur(10px); padding:12px 22px; border-radius:12px; border:2px solid #D4AF37; color:#D4AF37; z-index:110; display:none; text-align:center; pointer-events:none; box-shadow:0 10px 30px rgba(0,0,0,0.5); font-family:'Noto Sans TC', monospace;";
document.getElementById('arena').appendChild(stageCountdownBadge);

// === 核心狀態變數 ===
let isRunning = false, animationId;
let currentSize = 360, currentSpeed = 12, currentStereo = 0.02, currentThick = 8.0;
let currentVertPrism = 0; 
let currentStageDurationMs = 60000; 
let currentDistractors = 0; 
let isRotating = true, isFilled = true;
let activeProtocol = null, protocolStage = 0, protocolTime = 0, totalTimerSec = 0, lastTime = 0, phase = 0;
let currentSaccadeX = 0, currentSaccadeY = 0, saccadeTimer = 0, currentRoamX = 0, currentRoamY = 0;

let dichopticSwapState = false; 

let currentAxis = 'horizontal';
let currentMode = 'crossover';

let sessionLogs = [];
let sessionScore = 0;
let isTestModeActive = true; 
let taskActive = false;
let taskDirection = '', taskEye = 'both', taskSpawnTime = 0, timeSinceLastTask = 0, nextTaskInterval = 2800, statusTimeout = null;
let taskInitialPrism = "";

let consecutiveHits = 0;
let consecutiveMisses = 0;
let isAIRescueActive = false;
let aiRescueStartTime = 0;
let originalSizeBeforeRescue = 360;
let originalPrismBeforeRescue = 0; 

let flipperTimer = 0;
let flipperState = true; 

const AXP_WORDS = ['H O T V', 'Z R K D', 'E M C W', 'S N E L', 'O S V D', 'N H Z O', 'A X 7 P', '9 Q 2 M'];
let currentWordIndex = 0;
let lastWordChangeTime = 0;

if (btnTestMode) {
    btnTestMode.innerHTML = "<strong>0</strong> 互動測驗: 開 (按方向鍵)";
    btnTestMode.classList.add('test-on');
}

// ==========================================
// 核心圖學：Layer Masking 雙通道渲染引擎 (OEPF 臨床濾鏡光譜校準版)
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const aspect = container.clientWidth / container.clientHeight;
const d = 500; 
const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
camera.position.set(0, 0, 100);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.58); 
ambientLight.layers.enable(1); ambientLight.layers.enable(2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.85); 
directionalLight.position.set(0, 0, 200); 
directionalLight.layers.enable(1); directionalLight.layers.enable(2);
scene.add(directionalLight);

const rtLeft = new THREE.WebGLRenderTarget(container.clientWidth, container.clientHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat });
const rtRight = new THREE.WebGLRenderTarget(container.clientWidth, container.clientHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat });

const anaglyphShader = {
    uniforms: {
        "mapLeft": { value: rtLeft.texture },
        "mapRight": { value: rtRight.texture },
        "colorLeft": { value: new THREE.Color(0.0, 0.22, 1.0) }, 
        "colorRight": { value: new THREE.Color(1.0, 0.02, 0.0) }, 
        "intensityLeft": { value: 1.0 },
        "intensityRight": { value: 0.85 }
    },
    vertexShader: ` varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); } `,
    fragmentShader: `
        uniform sampler2D mapLeft;
        uniform sampler2D mapRight;
        uniform vec3 colorLeft;
        uniform vec3 colorRight;
        uniform float intensityLeft;
        uniform float intensityRight;
        varying vec2 vUv;
        void main() {
            vec4 texelLeft = texture2D(mapLeft, vUv);
            vec4 texelRight = texture2D(mapRight, vUv);
            vec3 finalColor = (texelLeft.rgb * colorLeft * intensityLeft) + 
                              (texelRight.rgb * colorRight * intensityRight);
            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
};

const postMaterial = new THREE.ShaderMaterial(anaglyphShader);
const postScene = new THREE.Scene();
const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMaterial);
postScene.add(postQuad);

// 🌿 第 7 階專屬：360 度全向同心水波漣漪群組
const antagonistRippleGroup = new THREE.Group();
const rippleRings = [];
for (let r = 0; r < 4; r++) {
    const rMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0, depthWrite: false });
    const rMesh = new THREE.Mesh(new THREE.RingGeometry(95, 100, 64), rMat);
    rMesh.position.z = -40;
    rMesh.layers.set(r % 2 === 0 ? 1 : 2);
    antagonistRippleGroup.add(rMesh);
    rippleRings.push({ mesh: rMesh, mat: rMat, offset: r * 0.25 });
}
antagonistRippleGroup.visible = false;
scene.add(antagonistRippleGroup);

// 紅藍分層深空星點
const starCanvas = document.createElement('canvas');
starCanvas.width = 32; starCanvas.height = 32;
const starCtx = starCanvas.getContext('2d');
starCtx.beginPath(); starCtx.arc(16, 16, 12, 0, Math.PI * 2); starCtx.fillStyle = 'white'; starCtx.fill();
const starTexture = new THREE.CanvasTexture(starCanvas);

const starsCount = 45; 
const posArrayL = new Float32Array(starsCount * 3);
const posArrayR = new Float32Array(starsCount * 3);
for(let i = 0; i < starsCount; i++) {
    posArrayL[i*3] = (Math.random() - 0.5) * 1500;
    posArrayL[i*3+1] = (Math.random() - 0.5) * 1200;
    posArrayL[i*3+2] = -300 - Math.random() * 500;

    posArrayR[i*3] = (Math.random() - 0.5) * 1500;
    posArrayR[i*3+1] = (Math.random() - 0.5) * 1200;
    posArrayR[i*3+2] = -300 - Math.random() * 500;
}
const starsGeoL = new THREE.BufferGeometry();
starsGeoL.setAttribute('position', new THREE.BufferAttribute(posArrayL, 3));
const starsGeoR = new THREE.BufferGeometry();
starsGeoR.setAttribute('position', new THREE.BufferAttribute(posArrayR, 3));

const starMat = new THREE.PointsMaterial({ size: 4.2, map: starTexture, transparent: true, opacity: 0.32, color: 0xffffff, depthWrite: false });
const starsLeft = new THREE.Points(starsGeoL, starMat);
const starsRight = new THREE.Points(starsGeoR, starMat);
starsLeft.layers.set(1);
starsRight.layers.set(2);
scene.add(starsLeft, starsRight);

let targetLeft, targetRight;
let distractorGroupLeft = new THREE.Group();
let distractorGroupRight = new THREE.Group();
let distractorData = []; 

// 方向鍵測驗閃爍提示點
const cueGroupLeft = new THREE.Group();
const cueGroupRight = new THREE.Group();
const cueOutlineGeo = new THREE.CircleGeometry(1.4, 32);
const cueOutlineMat = new THREE.MeshBasicMaterial({ color: 0x000000, depthTest: false, depthWrite: false });
const cueDotGeo = new THREE.CircleGeometry(1, 32); 
const cueDotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, depthWrite: false }); 

const outlineLeft = new THREE.Mesh(cueOutlineGeo, cueOutlineMat);
const outlineRight = new THREE.Mesh(cueOutlineGeo, cueOutlineMat);
const dotLeft = new THREE.Mesh(cueDotGeo, cueDotMat); 
const dotRight = new THREE.Mesh(cueDotGeo, cueDotMat);

outlineLeft.renderOrder = 998; outlineRight.renderOrder = 998;
dotLeft.renderOrder = 999; dotRight.renderOrder = 999;
outlineLeft.layers.set(1); dotLeft.layers.set(1);
outlineRight.layers.set(2); dotRight.layers.set(2);

cueGroupLeft.add(outlineLeft, dotLeft);
cueGroupRight.add(outlineRight, dotRight);
cueGroupLeft.visible = false; cueGroupRight.visible = false; 
scene.add(cueGroupLeft, cueGroupRight, distractorGroupLeft, distractorGroupRight);

function forceRenderFrame() {
    if (isRunning) return; 
    camera.layers.set(1); renderer.setRenderTarget(rtLeft); renderer.clear(); renderer.render(scene, camera);
    camera.layers.set(2); renderer.setRenderTarget(rtRight); renderer.clear(); renderer.render(scene, camera);
    camera.layers.set(0); renderer.setRenderTarget(null); renderer.render(postScene, postCamera);
}

function getPhysicalScreenWidthCm() {
    const spec = screenSpecSelect ? screenSpecSelect.value : 'mbp16';
    const screenWidthMapCm = {
        'laptop14': 30.5,
        'mbp16': 34.5,
        'desktop24': 53.1,
        'desktop27': 59.8,
        'desktop32': 70.8
    };
    return screenWidthMapCm[spec] || 34.5;
}

function getPhysicalPixelToCm() {
    const physicalWidthCm = getPhysicalScreenWidthCm();
    const logicalScreenPx = Math.max(800, window.screen.width || window.innerWidth);
    return physicalWidthCm / logicalScreenPx;
}

function getScreenSizeCompensationFactor() {
    const physicalWidthCm = getPhysicalScreenWidthCm();
    const baseMbp16Cm = 34.5;
    return baseMbp16Cm / physicalWidthCm;
}

// =========================================================================
// 🔬 OEPF 臨床紅藍濾鏡光譜校準引擎
// 針對 OEPF 左眼鈷藍鏡片提供防紫短波補償 (cyanComp)，徹底消除商業螢幕藍光發紫與紅光刺穿鬼影
// =========================================================================
function updateOpticsFromUI() {
    const rVal = redSlider ? parseInt(redSlider.value) : 85;
    const gVal = greenSlider ? parseInt(greenSlider.value) : 85;
    const bVal = blueSlider ? parseInt(blueSlider.value) : 100;
    const cyanComp = cyanCompSlider ? (parseInt(cyanCompSlider.value) / 100.0) : 0.22;
    if (cyanCompVal && cyanCompSlider) cyanCompVal.innerText = cyanCompSlider.value + '%';
    
    let balance = balanceSlider ? parseInt(balanceSlider.value) : 50;
    let opacityLeft = balance < 50 ? (balance / 50) : 1; 
    let opacityRight = balance > 50 ? ((100 - balance) / 50) : 1;
    
    postMaterial.uniforms.intensityRight.value = (rVal / 100.0) * opacityRight;
    if(document.getElementById('r-val')) document.getElementById('r-val').innerText = rVal + '%';
    
    let primaryLeftColor = new THREE.Color();
    let primaryRightColor = new THREE.Color(1.0, 0.02, 0.0); 

    const gMode = glassesSelect ? glassesSelect.value : 'oepf_rb';

    if (gMode === 'rg') {
        if(document.getElementById('l-val')) document.getElementById('l-val').innerText = gVal + '%';
        primaryLeftColor.setRGB(0.0, 1.0, 0.0);
        postMaterial.uniforms.intensityLeft.value = (gVal / 100.0) * opacityLeft;
    } else if (gMode === 'rb') {
        // 一般商業紅青鏡
        if(document.getElementById('l-val')) document.getElementById('l-val').innerText = bVal + '%';
        primaryLeftColor.setRGB(0.0, 0.55, 1.0);
        postMaterial.uniforms.intensityLeft.value = (bVal / 100.0) * opacityLeft;
    } else {
        // 🔬 OEPF 臨床級紅藍濾鏡：左眼鈷藍加入精準短波補償，不發紫且不穿透紅片
        if(document.getElementById('l-val')) document.getElementById('l-val').innerText = bVal + '%';
        primaryLeftColor.setRGB(0.0, cyanComp, 1.0);
        postMaterial.uniforms.intensityLeft.value = (bVal / 100.0) * opacityLeft;
    }

    postMaterial.uniforms.colorLeft.value.copy(primaryLeftColor);
    postMaterial.uniforms.colorRight.value.copy(primaryRightColor);

    if (prismSlider) {
        const prismVal = parseFloat(prismSlider.value);
        const pText = prismVal > 0 ? `${prismVal.toFixed(1)} Δ (BO)` : prismVal < 0 ? `${Math.abs(prismVal).toFixed(1)} Δ (BI)` : `0.0 Δ (平光)`;
        if(prismLabel) prismLabel.innerText = pText;
        if(prismValHud && !isRunning) prismValHud.innerText = pText;
    }
    
    if (!isRunning) {
        updatePositions(phase, ''); 
    }
}

function clearTargets() {
    if (targetLeft) { targetLeft.traverse(child => { if(child.isMesh) { child.geometry?.dispose(); child.material?.dispose(); }}); scene.remove(targetLeft); }
    if (targetRight) { targetRight.traverse(child => { if(child.isMesh) { child.geometry?.dispose(); child.material?.dispose(); }}); scene.remove(targetRight); }
    
    while(distractorGroupLeft.children.length > 0){ 
        const c = distractorGroupLeft.children[0]; c.geometry?.dispose(); c.material?.dispose(); distractorGroupLeft.remove(c); 
    }
    while(distractorGroupRight.children.length > 0){ 
        const c = distractorGroupRight.children[0]; c.geometry?.dispose(); c.material?.dispose(); distractorGroupRight.remove(c); 
    }
    distractorData = [];
}

// =========================================================================
// 🔬 核心突破：尺寸與線條粗細生理耦合器 (Size-Thickness Physiological Coupling)
// 確保「圖形越大 (初階舒適圈) -> 線條越厚實好抓；圖形越小 (高階精細圈) -> 線條越細緻銳利」！
// 徹底杜絕「稜鏡越大、尺寸越小、結果線條越粗糊成一團」的視覺擁擠悲劇！
// =========================================================================
function getPhysiologicalCoupledThickness(sizeVal, rawThickVal) {
    // 以 360px 為基準 (比例 1.0)；當尺寸放大至 450px 時線寬自動加厚至 1.15 倍；
    // 當高階尺寸縮小至 220px 時，幾何內部線寬額外精細化縮減至 0.68 倍，維持完美的留白對比度！
    const sizeRatio = Math.max(0.55, Math.min(1.25, Math.pow(sizeVal / 360.0, 0.85)));
    return Math.max(3.2, Math.min(10.0, rawThickVal * sizeRatio));
}

function buildTargets() {
    clearTargets(); 
    if(textInputGroup) textInputGroup.style.display = shapeSelect?.value === 'text' ? 'block' : 'none';
    const shapeVal = shapeSelect ? shapeSelect.value : 'gyro_cross';
    const txtVal = customTextInput ? customTextInput.value : 'H O T V';
    
    const leftRole = dichopticSwapState ? 'right' : 'left';
    const rightRole = dichopticSwapState ? 'left' : 'right';

    // 自動計算與當前尺寸完美匹配之生理線寬
    const effectiveThick = getPhysiologicalCoupledThickness(currentSize, currentThick);

    targetLeft = createTarget(shapeVal, 0xffffff, isFilled, txtVal, effectiveThick, leftRole);
    targetRight = createTarget(shapeVal, 0xffffff, isFilled, txtVal, effectiveThick, rightRole);
    targetLeft.traverse(c => { c.layers.set(1); if(c.isMesh) { c.material.blending = THREE.NormalBlending; c.material.color.setHex(0xffffff); } });
    targetRight.traverse(c => { c.layers.set(2); if(c.isMesh) { c.material.blending = THREE.NormalBlending; c.material.color.setHex(0xffffff); } });

    if (currentDistractors > 0) {
        const distMatLeft = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const distMatRight = new THREE.MeshBasicMaterial({ color: 0xffffff });
        
        const geoPool = [
            new THREE.OctahedronGeometry(1.15, 0),
            new THREE.TorusGeometry(0.85, 0.32, 16, 32),
            new THREE.DodecahedronGeometry(1.05, 0)
        ];

        for (let i = 0; i < currentDistractors; i++) {
            const geo = geoPool[i % geoPool.length];
            const meshL = new THREE.Mesh(geo, distMatLeft);
            const meshR = new THREE.Mesh(geo, distMatRight);
            meshL.layers.set(1); meshR.layers.set(2);
            distractorGroupLeft.add(meshL); distractorGroupRight.add(meshR);
            
            distractorData.push({
                phaseOffset: (i * Math.PI * 2) / currentDistractors,
                speedMultiplier: 0.42 + (i % 3) * 0.20,
                orbitRadiusX: 255 + (i * 30),
                orbitRadiusY: 185 + (i * 25),
                zOffset: (i % 2 === 0 ? 1 : -1) * 60,
                baseSize: 38
            });
        }
    }

    updateScaleAndThickness(); 
    scene.add(targetLeft, targetRight); 
    updateOpticsFromUI(); 
}

// 純淨等比縮放：徹底移除舊版會導致小視標線條變粗的 correctionScale 反向補償
function updateScaleAndThickness(dynamicSize = currentSize) {
    const screenComp = getScreenSizeCompensationFactor();
    const scaleFactor = (dynamicSize / 200) * screenComp;
    
    if(targetLeft && targetRight) { 
        targetLeft.scale.set(scaleFactor, scaleFactor, scaleFactor); 
        targetRight.scale.set(scaleFactor, scaleFactor, scaleFactor); 
    }

    for (let i = 0; i < currentDistractors; i++) {
        if(distractorGroupLeft.children[i]) {
            const dSize = distractorData[i].baseSize * scaleFactor * 0.65;
            distractorGroupLeft.children[i].scale.set(dSize, dSize, dSize);
            distractorGroupRight.children[i].scale.set(dSize, dSize, dSize);
        }
    }

    const cueScale = Math.max(13, dynamicSize * 0.048 * screenComp); 
    cueGroupLeft.scale.set(cueScale, cueScale, 1); 
    cueGroupRight.scale.set(cueScale, cueScale, 1);
    forceRenderFrame();
}

function updatePositions(phaseVal, currentAnim = '') {
    const maxPrismLoad = parseFloat(prismSlider ? prismSlider.value : 0);
    let targetPrismDemand = maxPrismLoad;

    // 生理不對稱聚散軌道：BO 可推至高階，但 BI 開散回彈嚴格限制於 6.5 Δ BI 以內
    if (isRunning) {
        if (currentAnim.includes('antagonist_relax') || currentAnim.includes('center_lock_peripheral') || currentAnim.includes('vert_')) {
            targetPrismDemand = maxPrismLoad * (0.85 + 0.15 * Math.sin(phaseVal));
        } else if (currentAnim.includes('flipper')) {
            targetPrismDemand = flipperState ? maxPrismLoad : -Math.min(5.5, Math.abs(maxPrismLoad) * 0.35);
        } else {
            const wave = (Math.sin(phaseVal - Math.PI/2) + 1) / 2; 
            if (currentMode === 'oneway_bo') {
                targetPrismDemand = wave * Math.max(0, maxPrismLoad);
            } else if (currentMode === 'oneway_bi') {
                targetPrismDemand = wave * Math.max(-7.0, Math.min(0, maxPrismLoad));
            } else {
                const s = Math.sin(phaseVal);
                if (s >= 0) {
                    targetPrismDemand = s * Math.max(0, maxPrismLoad);
                } else {
                    const safeMaxBI = Math.min(6.0, Math.max(2.0, Math.abs(maxPrismLoad) * 0.24));
                    targetPrismDemand = s * safeMaxBI;
                }
            }
        }
    }

    const pixelToCm = getPhysicalPixelToCm();
    const viewDistM = (parseFloat(viewDistInput ? viewDistInput.value : 50) || 50) / 100;

    const requiredSeparationCm = targetPrismDemand * viewDistM;
    const totalSeparationPx = requiredSeparationCm / pixelToCm;
    let baseDispX = totalSeparationPx / 2;

    // 🌿 第 1~3 階舒適圈喚醒阻尼 (Warm-up Comfort Zone Damping)：
    // 當處於前 3 階 (protocolStage <= 2) 時，自動將追視與跳視的幅度收斂至 68% 溫和範圍，幫助久未運動的眼外肌無痛甦醒！
    const comfortZoneFactor = (aiToggle && aiToggle.checked && protocolStage <= 2) ? 0.68 : 1.0;

    let pxLeftX = 0, pxRightX = 0, pxLeftY = 0, pxRightY = 0;

    if (currentAnim.includes('center_lock_peripheral') || currentAnim.includes('antagonist_relax')) {
        pxLeftX = baseDispX;
        pxRightX = -baseDispX;
        pxLeftY = 0;
        pxRightY = 0;
    }
    else if (currentAxis === 'lissajous') {
        const ampX = 225 * comfortZoneFactor;
        const ampY = 145 * comfortZoneFactor;
        pxLeftX = baseDispX + Math.sin(phaseVal) * ampX;
        pxRightX = -baseDispX + Math.sin(phaseVal) * ampX;
        pxLeftY = Math.sin(phaseVal * 2) * ampY;
        pxRightY = pxLeftY;
    }
    else if (currentAxis === 'vertical') {
        const ampV = 165 * comfortZoneFactor;
        pxLeftX = baseDispX; pxRightX = -baseDispX;
        pxLeftY = Math.sin(phaseVal) * ampV; pxRightY = pxLeftY;
    } 
    else if (currentAxis === 'circular') {
        const radC = 180 * comfortZoneFactor;
        const orbitX = Math.cos(phaseVal) * radC; 
        const orbitY = Math.sin(phaseVal) * radC;
        pxLeftX = baseDispX + orbitX; pxRightX = -baseDispX + orbitX; pxLeftY = orbitY; pxRightY = orbitY;
    } 
    else {
        pxLeftX = baseDispX; pxRightX = -baseDispX;
    }

    let finalLeftX = pxLeftX + currentRoamX + currentSaccadeX; let finalLeftY = pxLeftY + currentRoamY + currentSaccadeY;
    let finalRightX = pxRightX + currentRoamX + currentSaccadeX; let finalRightY = pxRightY + currentRoamY + currentSaccadeY;

    // 垂直稜鏡雙向互調引擎 (左右眼上下交替)
    const targetVertPrism = currentVertPrism > 0 ? currentVertPrism : (currentAnim.includes('vert_') ? 0.8 : 0);
    if (targetVertPrism > 0 && isRunning) {
        const totalVertPx = (targetVertPrism * viewDistM) / pixelToCm;
        const halfVertPx = totalVertPx / 2;
        let vertFactor = 0;

        if (currentAnim.includes('vert_step_alt')) {
            const cycleSec = (protocolTime / 1000) % 14.0;
            if (cycleSec < 4.0) { vertFactor = 1.0; }
            else if (cycleSec < 7.0) { vertFactor = 0.0; }
            else if (cycleSec < 11.0) { vertFactor = -1.0; }
            else { vertFactor = 0.0; }
        } else {
            vertFactor = Math.sin((protocolTime / 14000) * Math.PI * 2);
        }

        finalLeftY += halfVertPx * vertFactor;
        finalRightY -= halfVertPx * vertFactor;
    }

    // 全域物理安全邊界：BO 上限 36Δ，BI 開散上限嚴格鎖死於 7.0Δ BI
    const maxBOPx = (36 * viewDistM) / pixelToCm;
    const maxBIPx = (7.0 * viewDistM) / pixelToCm; 

    let dx = finalLeftX - finalRightX; 
    if (dx > maxBOPx) { let scale = maxBOPx / dx; finalLeftX *= scale; finalRightX *= scale; } 
    else if (dx < -maxBIPx) { let scale = -maxBIPx / dx; finalLeftX *= scale; finalRightX *= scale; }

    // 僅對多層 3D 結構 (如 depth_tunnel 10層蟲洞隧道 / sphere5 / circle5) 施加層間立體視差梯度；
    // 單一 unitGroup 封裝之陀螺儀與十字靶則保持 0 位移，100% 杜絕零件脫節與獨立紫色！
    if(targetLeft && targetRight) {
        const layerCount = targetLeft.children.length;
        if (layerCount > 1) {
            const stereoStep = shapeSelect?.value === 'depth_tunnel' ? 11.5 : 14.0;
            targetLeft.children.forEach((layer, i) => { layer.position.x = -(i * stereoStep) * currentStereo; });
            targetRight.children.forEach((layer, i) => { layer.position.x = (i * stereoStep) * currentStereo; });
        } else if (layerCount === 1) {
            targetLeft.children[0].position.x = 0;
            targetRight.children[0].position.x = 0;
        }
        targetLeft.position.set(finalLeftX, finalLeftY, 0); targetRight.position.set(finalRightX, finalRightY, 0);
        
        const currentSepX = targetLeft.position.x - targetRight.position.x;
        const currentSepY = targetLeft.position.y - targetRight.position.y;
        
        const horizontalPrism = (Math.abs(currentSepX) * pixelToCm) / viewDistM;
        let hPrismDir = currentSepX >= 0 ? "BO" : "BI";
        const verticalPrism = (Math.abs(currentSepY) * pixelToCm) / viewDistM;
        
        if (prismValHud) {
            let hudText = `${horizontalPrism.toFixed(1)} Δ (${hPrismDir})`;
            if (verticalPrism >= 0.15) {
                const vDirStr = currentSepY > 0 ? "L↑ R↓" : "R↑ L↓";
                hudText += ` | ↕ ${verticalPrism.toFixed(1)} Δ (${vDirStr})`;
            }
            prismValHud.innerText = hudText;
        }
    }

    for (let i = 0; i < currentDistractors; i++) {
        const dData = distractorData[i];
        const dPhase = (phase * dData.speedMultiplier * 1.4) + dData.phaseOffset;
        const roamingX = Math.cos(dPhase) * dData.orbitRadiusX;
        const roamingY = Math.sin(dPhase) * dData.orbitRadiusY;
        const depthDisp = (currentStereo * dData.zOffset * 0.1); 

        if (distractorGroupLeft.children[i]) {
            distractorGroupLeft.children[i].position.set(baseDispX + roamingX + depthDisp, roamingY, dData.zOffset);
            distractorGroupLeft.children[i].rotation.x += 0.015;
            distractorGroupLeft.children[i].rotation.y += 0.01;
        }
        if (distractorGroupRight.children[i]) {
            distractorGroupRight.children[i].position.set(-baseDispX + roamingX - depthDisp, roamingY, dData.zOffset);
            distractorGroupRight.children[i].rotation.x += 0.015;
            distractorGroupRight.children[i].rotation.y += 0.01;
        }
    }

    if (taskActive && isTestModeActive) {
        const screenComp = getScreenSizeCompensationFactor();
        const isPeripheralLock = currentAnim.includes('center_lock_peripheral');
        const offsetDist = isPeripheralLock ? (275 * screenComp) : Math.min(currentSize * 0.58 * screenComp, 195); 
        let cueDx = 0, cueDy = 0;
        if (taskDirection === 'ArrowUp') cueDy = offsetDist; if (taskDirection === 'ArrowDown') cueDy = -offsetDist;
        if (taskDirection === 'ArrowLeft') cueDx = -offsetDist; if (taskDirection === 'ArrowRight') cueDx = offsetDist;
        cueGroupLeft.position.set(finalLeftX + cueDx, finalLeftY + cueDy, 25); 
        cueGroupRight.position.set(finalRightX + cueDx, finalRightY + cueDy, 25);
        
        const isBlink = Math.floor(performance.now() / 130) % 2 === 0;
        cueGroupLeft.visible = isBlink && (taskEye === 'both' || taskEye === 'left');
        cueGroupRight.visible = isBlink && (taskEye === 'both' || taskEye === 'right');
    }
    forceRenderFrame();
}

function spawnTask() {
    if (!isTestModeActive) return;
    taskActive = true; taskSpawnTime = performance.now();
    taskInitialPrism = prismValHud ? prismValHud.innerText : '0.0';
    const dirs = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    taskDirection = dirs[Math.floor(Math.random() * dirs.length)];
    const eyes = ['both', 'both', 'left', 'right'];
    taskEye = eyes[Math.floor(Math.random() * eyes.length)];
}

function handleTaskResult(result, rt = 0) {
    taskActive = false; cueGroupLeft.visible = false; cueGroupRight.visible = false; timeSinceLastTask = 0; nextTaskInterval = 2400 + Math.random() * 2200; 
    let logMsg = "", statusLabel = ""; 
    const currentPrismStr = prismValHud ? prismValHud.innerText : '0.0';
    const dx = targetRight.position.x - targetLeft.position.x; const dy = targetRight.position.y - targetLeft.position.y;

    if (result === 'hit') {
        sessionScore += 10 + (consecutiveHits * 5);
        if (hudScoreVal) hudScoreVal.innerText = sessionScore;
    }

    if (taskEye === 'both') {
        if (result === 'hit') { 
            consecutiveHits++; consecutiveMisses = 0;
            logMsg = `🟢 雙眼精準合像 (${rt}s) | COMBO x${consecutiveHits}`; statusLabel = "完美融像(FUSION)"; 
            if(!isAIRescueActive && statusText) statusText.style.color = consecutiveHits >= 3 ? '#D4AF37' : '#34d399';
        } else {
            let failType = ""; let reason = result === 'wrong' ? "方向誤差" : "反應逾時";
            let triggerRescue = false;
            if (Math.abs(dy) > 4) { failType = "垂直融像失準"; statusLabel = "垂直失準(VERT_FAIL)"; triggerRescue = true; } 
            else {
                if (dx < 0) { failType = "內聚負荷臨界"; statusLabel = "聚合不足(BO_FAIL)"; triggerRescue = true; } 
                else { failType = "外展負荷臨界"; statusLabel = "開散不足(BI_FAIL)"; triggerRescue = true; }
            }
            logMsg = `🔴 ${failType} (${reason})`; 
            consecutiveMisses++; consecutiveHits = 0;
            
            if (aiToggle && aiToggle.checked && consecutiveMisses >= 2 && !isAIRescueActive) {
                consecutiveMisses = 0;
                activateAIRescue(logMsg);
            } else {
                if(!isAIRescueActive && statusText) statusText.style.color = '#fb7185';
            }
        }
    } else {
        const eyeName = taskEye === 'left' ? '左眼通道' : '右眼通道';
        if (result === 'hit') {
            consecutiveHits++;
            logMsg = `🟢 ${eyeName}訊號暢通 (${rt}s)`; statusLabel = `${eyeName}去抑制(ANTI_SUPP_${taskEye.toUpperCase()})`;
            if(!isAIRescueActive && statusText) statusText.style.color = '#34d399';
        } else {
            let reason = result === 'wrong' ? "方向誤差" : "未察覺閃爍";
            logMsg = `🟡 ${eyeName}間歇抑制 (${reason})`; statusLabel = `${eyeName}抑制(SUPP_${taskEye.toUpperCase()})`;
            if(!isAIRescueActive && statusText) statusText.style.color = '#facc15';
        }
    }
    
    if(!isAIRescueActive && statusText) statusText.innerText = logMsg;
    
    sessionLogs.push({ time: totalTimerSec.toString(), initial_sep: "0", initial_prism: taskInitialPrism, response_sep: "0", response_prism: currentPrismStr, reaction_time: rt, stereo: currentStereo.toFixed(2), size: currentSize.toFixed(1), status: statusLabel, eye: taskEye, distractors: currentDistractors });

    if (!isAIRescueActive) {
        if(statusTimeout) clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => { if (isRunning && statusText) { statusText.innerText = isTestModeActive ? "INTERACTIVE TEST ON" : "TRAINING ACTIVE"; statusText.style.color = isTestModeActive ? "#D4AF37" : '#38bdf8'; } }, 2200);
    }
}

let protocolTimeBeforeRescue = 0;

// 減壓緩衝機制：當大腦負荷過高時，自動退回舒適圈 (降低稜鏡並適度放大尺寸，同時重新匹配適當線寬)
function activateAIRescue(reasonMsg) {
    if (loginOverlay.style.display !== 'none' || !isRunning || isAIRescueActive) return;
    isAIRescueActive = true; aiRescueStartTime = performance.now();
    originalSizeBeforeRescue = currentSize; originalPrismBeforeRescue = parseFloat(prismSlider ? prismSlider.value : 0);
    protocolTimeBeforeRescue = protocolTime;
    if(prismSlider) { prismSlider.value = (originalPrismBeforeRescue * 0.45).toFixed(1); updateOpticsFromUI(); }
    currentSize = Math.min(500, currentSize * 1.25);
    buildTargets(); updateUIValues();
    if(statusText) { statusText.innerText = `🌿 舒適圈減壓緩衝中 | ${reasonMsg}`; statusText.style.color = '#facc15'; }
    if(dynamicModeTag) { dynamicModeTag.innerText = `[ 舒適圈減壓緩衝 10s ] 正在溫和釋放雙眼融像張力...`; dynamicModeTag.style.color = '#facc15'; }
}

function endAIRescue() {
    if (!isAIRescueActive) return;
    isAIRescueActive = false; protocolTime = protocolTimeBeforeRescue; currentSize = originalSizeBeforeRescue; 
    if(prismSlider) { prismSlider.value = originalPrismBeforeRescue.toFixed(1); updateOpticsFromUI(); }
    buildTargets(); updateUIValues(); 
    if(statusText) { statusText.innerText = isTestModeActive ? "INTERACTIVE TEST ON" : "TRAINING ACTIVE"; statusText.style.color = isTestModeActive ? "#D4AF37" : '#38bdf8'; }
    if(activeProtocol && dynamicModeTag) {
        const config = AIM_MATRIX[activeProtocol][protocolStage]; 
        const stageMaxStr = AIM_MATRIX[activeProtocol] ? AIM_MATRIX[activeProtocol].length : 10;
        const durSec = config.duration || 60;
        dynamicModeTag.innerText = `[ ${PROTOCOL_NAMES[activeProtocol].split(' ')[0]} ] Stage ${protocolStage + 1}/${stageMaxStr} (${durSec}s) : ${config.name}`;
        dynamicModeTag.style.color = '#D4AF37';
    }
}

function showClinicalReport(logs, totalTime, protocolName) {
    let fusionCount = 0, suppCount = 0, antiSuppCount = 0, boFail = 0, biFail = 0, vertFail = 0;
    let tableRowsHTML = "";
    logs.forEach(log => {
        if(log.status.includes('FUSION')) fusionCount++;
        if(log.status.includes('SUPP_') && !log.status.includes('ANTI')) suppCount++;
        if(log.status.includes('ANTI_SUPP')) antiSuppCount++;
        if(log.status.includes('BO_FAIL')) boFail++;
        if(log.status.includes('BI_FAIL')) biFail++;
        if(log.status.includes('VERT_FAIL')) vertFail++;
        let statusColor = log.status.includes('FUSION') || log.status.includes('ANTI') ? '#059669' : (log.status.includes('SUPP') ? '#d97706' : '#e11d48');
        tableRowsHTML += `<tr style="border-bottom: 1px solid #e2e8f0; font-size:13px; text-align:center;"><td style="padding: 8px;">${log.time}s</td><td style="padding: 8px; font-weight:bold; color:${statusColor};">${log.status.split('(')[0]}</td><td style="padding: 8px; font-size:12px; color:#64748b;">${log.initial_prism}</td><td style="padding: 8px; font-weight:bold; color:#0f172a;">${log.response_prism}</td><td style="padding: 8px; font-family:monospace;">${log.reaction_time}s</td></tr>`;
    });

    const reportOverlay = document.createElement('div');
    reportOverlay.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.82); backdrop-filter:blur(6px); z-index:10000; display:flex; justify-content:center; align-items:center; font-family:'Noto Sans TC', sans-serif;";
    reportOverlay.innerHTML = `
        <div style="background:#ffffff; width: 660px; max-width:94vw; max-height: 86vh; border-radius:16px; box-shadow: 0 25px 50px rgba(0,0,0,0.4); display:flex; flex-direction:column; overflow:hidden; border-top: 5px solid #2980b9;">
            <div style="background:#1A365D; color:white; padding: 20px; text-align:center;">
                <h2 style="margin:0; font-size:21px; font-weight:900; letter-spacing:1px;">AXP 神經視覺空間協同評估報告</h2>
                <p style="margin:5px 0 0 0; color:#D4AF37; font-size:13.5px; font-weight:700;">專屬訓練代號: ${currentPatientCode} ｜ 綜合積分: ${sessionScore}</p>
            </div>
            <div style="padding: 20px; overflow-y:auto; flex-grow:1; color:#334155;">
                <div style="display:flex; justify-content:space-between; margin-bottom: 18px; background:#f8fafc; padding:14px 18px; border-radius:8px; border:1px solid #cbd5e1;">
                    <div><p style="margin:0 0 4px 0; font-size:12px; color:#64748b; font-weight:bold;">練習總時長</p><p style="margin:0; font-size:18px; font-weight:900; color:#1A365D;">${Math.floor(totalTime / 60)}分 ${totalTime % 60}秒</p></div>
                    <div style="text-align:right;"><p style="margin:0 0 4px 0; font-size:12px; color:#64748b; font-weight:bold;">主要執行模組</p><p style="margin:0; font-size:14px; font-weight:800; color:#1A365D;">${protocolName.split('(')[0]}</p></div>
                </div>
                <h3 style="font-size:15px; margin-bottom:10px; color:#1A365D; border-bottom:1.5px solid #e2e8f0; padding-bottom:6px; font-weight:900;">📊 雙眼舒適圈與協同表現統計</h3>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:20px;">
                    <div style="background:#ecfdf5; padding:10px 14px; border-radius:8px; border:1px solid #a7f3d0;"><span style="font-size:12px; color:#059669; font-weight:bold;">🟢 雙眼精準合像次數</span><br><span style="font-size:20px; font-weight:900; color:#065f46;">${fusionCount}</span></div>
                    <div style="background:#ecfdf5; padding:10px 14px; border-radius:8px; border:1px solid #a7f3d0;"><span style="font-size:12px; color:#059669; font-weight:bold;">🟢 單側去抑制喚醒成功</span><br><span style="font-size:20px; font-weight:900; color:#065f46;">${antiSuppCount}</span></div>
                    <div style="background:#fef2f2; padding:10px 14px; border-radius:8px; border:1px solid #fecaca;"><span style="font-size:12px; color:#e11d48; font-weight:bold;">🔴 內聚負荷臨界 (BO)</span><br><span style="font-size:20px; font-weight:900; color:#9f1239;">${boFail}</span></div>
                    <div style="background:#fef2f2; padding:10px 14px; border-radius:8px; border:1px solid #fecaca;"><span style="font-size:12px; color:#e11d48; font-weight:bold;">🔴 外展負荷臨界 (BI)</span><br><span style="font-size:20px; font-weight:900; color:#9f1239;">${biFail}</span></div>
                    <div style="background:#fffbeb; padding:10px 14px; border-radius:8px; border:1px solid #fde68a;"><span style="font-size:12px; color:#d97706; font-weight:bold;">🟡 間歇性單眼抑制</span><br><span style="font-size:20px; font-weight:900; color:#92400e;">${suppCount}</span></div>
                    <div style="background:#fef2f2; padding:10px 14px; border-radius:8px; border:1px solid #fecaca;"><span style="font-size:12px; color:#e11d48; font-weight:bold;">🔴 垂直空間失準</span><br><span style="font-size:20px; font-weight:900; color:#9f1239;">${vertFail}</span></div>
                </div>
                <h3 style="font-size:15px; margin-bottom:10px; color:#1A365D; border-bottom:1.5px solid #e2e8f0; padding-bottom:6px; font-weight:900;">📋 毫秒級反應明細</h3>
                <table style="width:100%; border-collapse: collapse;"><thead><tr style="background:#f1f5f9; font-size:12px; color:#475569;"><th style="padding:8px; text-align:center;">時間</th><th style="padding:8px; text-align:center;">雙眼狀態</th><th style="padding:8px; text-align:center;">起始稜鏡</th><th style="padding:8px; text-align:center;">作答稜鏡</th><th style="padding:8px; text-align:center;">反應秒數</th></tr></thead><tbody>${tableRowsHTML || '<tr><td colspan="5" style="text-align:center; padding:14px; color:#94a3b8;">本次練習未觸發方向鍵作答紀錄</td></tr>'}</tbody></table>
            </div>
            <div style="padding: 15px 20px; background:#f8fafc; border-top:1px solid #e2e8f0; text-align:center;">
                <button id="close-report-btn" style="background:#2980b9; color:#ffffff; border:none; padding:12px 32px; border-radius:8px; font-size:15px; cursor:pointer; font-weight:800; transition:0.2s; box-shadow:0 4px 12px rgba(41,128,185,0.25);">關閉報告並重置畫面</button>
            </div>
        </div>
    `;
    document.body.appendChild(reportOverlay);
    document.getElementById('close-report-btn').addEventListener('click', () => {
        document.body.removeChild(reportOverlay);
        executeReset();
    });
}

async function uploadToSupabase() {
    const finalTime = totalTimerSec; 
    const finalProtocol = activeProtocol ? PROTOCOL_NAMES[activeProtocol] : 'MANUAL_MODE';
    
    const payloadData = {
        patient_id: currentPatientCode,
        environmental_setup: {
            prism_base: document.getElementById('prism-slider')?.value || 0,
            anaglyph_balance: document.getElementById('balance-slider')?.value || 50,
            screen_spec: screenSpecSelect?.value || 'mbp16',
            glasses_mode: glassesSelect?.value || 'oepf_rb',
            distractor_count: currentDistractors
        },
        clinical_logs: [...sessionLogs]
    };

    isRunning = false; 
    cancelAnimationFrame(animationId); 
    if(startBtn) { startBtn.innerText = "▶ 啟動訓練 [ Space ]"; startBtn.classList.remove('active'); }
    if(statusText) { statusText.innerText = "SYNCING CLOUD REPORT..."; statusText.style.color = "#38bdf8"; }
    
    try {
        if (sessionLogs.length > 0) {
            await supabase.from('training_sessions').insert([{ 
                duration_sec: finalTime, 
                protocol_name: finalProtocol, 
                raw_data: payloadData,
                patient_code: currentPatientCode  
            }]);
        }
        if(statusText) { statusText.innerText = "REPORT GENERATED"; statusText.style.color = "#34d399"; }
        showClinicalReport(payloadData.clinical_logs, finalTime, finalProtocol);
        sessionLogs = []; 
    } catch (err) {
        console.warn("Cloud Sync Note:", err);
        showClinicalReport(payloadData.clinical_logs, finalTime, finalProtocol);
    }
}

function updateGlassesUI() {
    const lLabelText = document.getElementById('l-label-text');
    const gMode = glassesSelect ? glassesSelect.value : 'oepf_rb';
    if (gMode === 'rg') {
        if(greenSlider) greenSlider.style.display = 'block'; if(blueSlider) blueSlider.style.display = 'none';
        if(oepfTuneGroup) oepfTuneGroup.style.display = 'none';
        if(lLabelText) lLabelText.innerText = '左眼 (綠通道) 亮度';
    } else if (gMode === 'rb') {
        if(greenSlider) greenSlider.style.display = 'none'; if(blueSlider) blueSlider.style.display = 'block';
        if(oepfTuneGroup) oepfTuneGroup.style.display = 'none';
        if(lLabelText) lLabelText.innerText = '左眼 (青藍通道) 亮度';
    } else {
        if(greenSlider) greenSlider.style.display = 'none'; if(blueSlider) blueSlider.style.display = 'block';
        if(oepfTuneGroup) oepfTuneGroup.style.display = 'block';
        if(lLabelText) lLabelText.innerText = '左眼 (OEPF 藍通道) 亮度';
    }
    updateOpticsFromUI();
}

if(glassesSelect) glassesSelect.addEventListener('change', updateGlassesUI);
[redSlider, greenSlider, blueSlider, cyanCompSlider].forEach(slider => { if(slider) slider.addEventListener('input', updateOpticsFromUI); });
if(prismSlider) prismSlider.addEventListener('input', () => { protocolTime = 0; updateOpticsFromUI(); });

function updateUIValues() {
    const coupledThick = getPhysiologicalCoupledThickness(currentSize, currentThick);
    if(sizeLabel) sizeLabel.innerText = currentSize.toFixed(0) + 'px'; 
    if(speedLabel) speedLabel.innerText = currentSpeed.toFixed(0); 
    if(thickLabel) thickLabel.innerText = coupledThick.toFixed(1);
    if(stereoLabel) stereoLabel.innerText = (currentStereo > 0 ? '+' : '') + currentStereo.toFixed(2);
    
    const hudStereoVal = document.getElementById('hud-stereo-val');
    if(hudStereoVal) hudStereoVal.innerText = currentStereo.toFixed(2);
    
    let balance = balanceSlider ? parseInt(balanceSlider.value) : 50; 
    if(balanceLabel) balanceLabel.innerText = balance === 50 ? "均衡 50/50" : (balance < 50 ? `強左 ${100-balance}%` : `強右 ${balance}%`);
    
    if(sizeSlider) sizeSlider.value = currentSize; 
    if(speedSlider) speedSlider.value = currentSpeed; 
    if(thickSlider) thickSlider.value = currentThick; 
    if(stereoSlider) stereoSlider.value = currentStereo;
}

if (screenSpecSelect) screenSpecSelect.addEventListener('change', () => {
    updateScaleAndThickness();
    updateOpticsFromUI();
    updatePositions(phase, '');
});
if (viewDistInput) viewDistInput.addEventListener('input', () => {
    updateOpticsFromUI();
    updatePositions(phase, '');
});

// 當手動調整尺寸時，同步觸發 buildTargets() 讓線條粗細隨尺寸自動變細或變厚
if(sizeSlider) sizeSlider.addEventListener('input', (e) => { currentSize = parseFloat(e.target.value); protocolTime = 0; updateUIValues(); buildTargets(); disableAI(); });
if(speedSlider) speedSlider.addEventListener('input', (e) => { currentSpeed = parseFloat(e.target.value); protocolTime = 0; updateUIValues(); disableAI(); });
if(thickSlider) thickSlider.addEventListener('input', (e) => { currentThick = parseFloat(e.target.value); protocolTime = 0; updateUIValues(); buildTargets(); disableAI(); });
if(stereoSlider) stereoSlider.addEventListener('input', (e) => { currentStereo = Math.max(-0.15, Math.min(0.15, parseFloat(e.target.value))); e.target.value = currentStereo; protocolTime = 0; updateUIValues(); if (!isRunning) updatePositions(0, ''); disableAI(); });

if(balanceSlider) balanceSlider.addEventListener('input', () => { updateUIValues(); updateOpticsFromUI(); });
if(rotateCheckbox) rotateCheckbox.addEventListener('change', (e) => { isRotating = e.target.checked; protocolTime = 0; });
if(shapeSelect) shapeSelect.addEventListener('change', () => { protocolTime = 0; buildTargets(); }); 
if(customTextInput) customTextInput.addEventListener('input', buildTargets); 
if(fillCheckbox) fillCheckbox.addEventListener('change', (e) => { isFilled = e.target.checked; protocolTime = 0; buildTargets(); });

function disableAI() {
    if (aiToggle && aiToggle.checked) { aiToggle.checked = false; }
    if(dynamicModeTag) { dynamicModeTag.innerText = "AXP NEURO-OPTIC PRO｜手動自由調控模式"; dynamicModeTag.style.color = '#f8fafc'; }
    if(stageIndicatorLabel) stageIndicatorLabel.innerText = "手動自由模式";
    document.querySelectorAll('.proto-btn[data-proto]').forEach(b => b.classList.remove('active-proto'));
    
    currentAxis = 'horizontal';
    currentMode = 'crossover';
    currentVertPrism = 0;
    currentDistractors = 0; 
    protocolTime = 0;
    dichopticSwapState = false;
    antagonistRippleGroup.visible = false;
    stageCountdownBadge.style.display = 'none';
    buildTargets();
    
    siloPrompt.style.display = 'none'; 
    if(isAIRescueActive) endAIRescue();
}

function loadMatrixStage(protocol, stage) {
    const config = AIM_MATRIX[protocol][stage]; if (!config) return;
    
    protocolTime = 0;
    flipperTimer = 0;
    saccadeTimer = 0;
    timeSinceLastTask = 0;
    taskActive = false;
    dichopticSwapState = false;
    cueGroupLeft.visible = false;
    cueGroupRight.visible = false;
    stageCountdownBadge.style.display = 'none';
    lastTime = performance.now();

    document.querySelectorAll('.proto-btn[data-proto]').forEach(b => {
        b.classList.toggle('active-proto', b.getAttribute('data-proto') === protocol);
    });

    if(shapeSelect) {
        let optionExists = Array.from(shapeSelect.options).some(opt => opt.value === config.shape);
        if (!optionExists) { const newOpt = new Option(config.shape, config.shape); shapeSelect.add(newOpt); }
        shapeSelect.value = config.shape; 
    }
    
    currentAxis = config.axis || 'horizontal';
    currentMode = config.mode || 'crossover';
    currentVertPrism = config.v_prism || 0;
    currentStageDurationMs = (config.duration || 60) * 1000;
    currentDistractors = config.distractors || 0;

    if(fillCheckbox) fillCheckbox.checked = config.fill; isFilled = config.fill;
    
    currentStereo = Math.max(-0.15, Math.min(0.15, config.stereo)); 
    currentSize = config.size; currentSpeed = config.speed; currentThick = config.thick;
    isRotating = !config.anim.includes('none'); if(rotateCheckbox) rotateCheckbox.checked = isRotating; 
    
    if(prismSlider) { prismSlider.value = config.dist; }

    updateUIValues(); buildTargets();
    
    const stageMaxStr = AIM_MATRIX[protocol] ? AIM_MATRIX[protocol].length : 10;
    const durSec = config.duration || 60;
    const zoneTag = stage <= 2 ? " [初階舒適圈]" : (stage === 6 ? " [全向放鬆站]" : (stage >= 7 ? " [精細擴展圈]" : " [進階適應圈]"));
    if(dynamicModeTag) {
        dynamicModeTag.innerText = `[ ${PROTOCOL_NAMES[protocol].split(' ')[0]} ] Stage ${stage + 1}/${stageMaxStr}${zoneTag} : ${config.name}`;
        dynamicModeTag.style.color = config.anim.includes('antagonist_relax') ? '#34d399' : '#D4AF37'; 
    }
    if(stageIndicatorLabel) {
        stageIndicatorLabel.innerText = `${protocol.replace('Key','')} 模組｜Stage ${stage + 1} / ${stageMaxStr} (${durSec}s)`;
    }
    currentSaccadeX = 0; currentSaccadeY = 0; currentRoamX = 0; currentRoamY = 0;
}

function toggleTestMode() {
    if (isAIRescueActive) return;
    isTestModeActive = !isTestModeActive;
    if (btnTestMode) {
        btnTestMode.innerHTML = isTestModeActive ? "<strong>0</strong> 互動測驗: 開 (按方向鍵)" : "<strong>0</strong> 互動測驗: 關";
        btnTestMode.classList.toggle('test-on', isTestModeActive);
    }
    if (!isTestModeActive) { 
        taskActive = false; cueGroupLeft.visible = false; cueGroupRight.visible = false; 
        if (isRunning && statusText) { statusText.innerText = "TRAINING ACTIVE (測驗已關閉)"; statusText.style.color = '#38bdf8'; } 
    } else { 
        timeSinceLastTask = 0;
        if (isRunning && statusText) { statusText.innerText = "INTERACTIVE TEST ON (請按方向鍵)"; statusText.style.color = '#D4AF37'; } 
    }
}

document.querySelectorAll('.proto-btn[data-proto]').forEach(btn => {
    btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-proto');
        if (isAIRescueActive) return;
        if (aiToggle) aiToggle.checked = true;
        activeProtocol = code;
        protocolStage = 0;
        loadMatrixStage(activeProtocol, protocolStage);
        if (!isRunning) toggleTraining();
    });
});

if (btnTestMode) btnTestMode.addEventListener('click', toggleTestMode);
document.getElementById('btn-stage-prev')?.addEventListener('click', () => {
    if (activeProtocol && protocolStage > 0) { protocolStage--; loadMatrixStage(activeProtocol, protocolStage); }
});
document.getElementById('btn-stage-next')?.addEventListener('click', () => {
    if (activeProtocol) {
        const maxS = AIM_MATRIX[activeProtocol].length - 1;
        if (protocolStage < maxS) { protocolStage++; loadMatrixStage(activeProtocol, protocolStage); }
    }
});
if (reportBtn) reportBtn.addEventListener('click', uploadToSupabase);

function toggleFullScreen() {
    const elem = document.getElementById('fv-fusion-app');
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (elem.requestFullscreen) { elem.requestFullscreen(); } else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); } 
    } else {
        if (document.exitFullscreen) { document.exitFullscreen(); } else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
    }
}
if(fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullScreen);

// ==========================================
// 🚀 動態動畫與嚴格 60s/90s 階段計時迴圈
// ==========================================
function animate(time) {
    if (!isRunning) return;
    if (!lastTime) lastTime = time;
    const dt = Math.min(100, time - lastTime);
    lastTime = time;

    if (Math.floor(time / 1000) > Math.floor((time - dt) / 1000)) {
        totalTimerSec++; 
        if(timerDisplay) timerDisplay.innerText = Math.floor(totalTimerSec / 60).toString().padStart(2, '0') + ':' + (totalTimerSec % 60).toString().padStart(2, '0');
    }
    const speedFactor = 40000 / Math.max(1, currentSpeed); phase += dt / speedFactor; 

    // 10 秒迷走神經呼吸指示燈律動
    const breathCycle = (time % 10000) / 1000;
    const isInhale = breathCycle < 4.0;
    const breathWave = isInhale ? (breathCycle / 4.0) : (1.0 - (breathCycle - 4.0) / 6.0);
    if (breathIndicator && breathText) {
        breathIndicator.style.transform = `scale(${0.8 + breathWave * 0.6})`;
        breathIndicator.style.backgroundColor = isInhale ? '#38bdf8' : '#D4AF37';
        breathText.innerText = isInhale ? '🌬️ 請保持平穩吸氣 (4秒)...' : '😮‍💨 請放鬆雙肩並深長吐氣 (6秒)...';
    }

    if (isAIRescueActive) {
        const timeInRescue = performance.now() - aiRescueStartTime;
        if (timeInRescue > 10000) { endAIRescue(); } 
        else { const timeLeft = Math.ceil((10000 - timeInRescue) / 1000); if(dynamicModeTag) dynamicModeTag.innerText = `[ 舒適圈減壓緩衝 ${timeLeft}s ] 請深長吐氣並放鬆雙眼...`; }
    }

    let currentAnim = '';

    if (aiToggle && aiToggle.checked && activeProtocol && !isAIRescueActive) {
        protocolTime += dt;
        const config = AIM_MATRIX[activeProtocol][protocolStage];
        currentAnim = config.anim || ''; 
        
        const secLeft = Math.max(0, Math.ceil((currentStageDurationMs - protocolTime) / 1000));
        const stageMaxStr = AIM_MATRIX[activeProtocol] ? AIM_MATRIX[activeProtocol].length : 10;
        if (stageIndicatorLabel) {
            stageIndicatorLabel.innerText = `${activeProtocol.replace('Key','')} 模組｜Stage ${protocolStage + 1}/${stageMaxStr} (剩餘 ${secLeft}s)`;
        }

        // ⏳ 換關前最後 5 秒倒數計時膠囊提示
        if (secLeft <= 5 && secLeft > 0) {
            const nextStageIdx = (protocolStage + 1) % stageMaxStr;
            stageCountdownBadge.style.display = 'block';
            stageCountdownBadge.innerText = `⏳ 即將切換至 Stage ${nextStageIdx + 1}：倒數 ${secLeft} 秒（請自然眨眼吐氣）`;
        } else {
            stageCountdownBadge.style.display = 'none';
        }

        // ⚡ 去抑制機制一：左右眼幾何結構瞬換 (swap_flash)，不改紅藍亮度，直接互換圓圈與十字角色
        if (currentAnim.includes('swap_flash')) {
            const swapPeriod = currentAnim.includes('swap_flash_fast') ? 5000 : 7000;
            const cyclePos = protocolTime % swapPeriod;
            const shouldSwapRole = (cyclePos > (swapPeriod - 1800));
            if (shouldSwapRole !== dichopticSwapState) {
                dichopticSwapState = shouldSwapRole;
                buildTargets();
            }
        } else if (dichopticSwapState) {
            dichopticSwapState = false;
            buildTargets();
        }

        // ⚡ 去抑制機制二：純粹全開/全關交替 (flicker)
        if (currentAnim.includes('flicker')) {
            const isLeftTurn = Math.floor(protocolTime / 480) % 2 === 0;
            if (targetLeft) targetLeft.visible = isLeftTurn;
            if (targetRight) targetRight.visible = !isLeftTurn;
        } else {
            if (targetLeft) targetLeft.visible = true;
            if (targetRight) targetRight.visible = true;
        }

        // 🌿 第 7 階「90 秒全向同心漣漪拮抗肌同步放鬆 (antagonist_relax)」
        if (currentAnim.includes('antagonist_relax')) {
            antagonistRippleGroup.visible = true;
            taskActive = false; cueGroupLeft.visible = false; cueGroupRight.visible = false;
            rippleRings.forEach(r => {
                const prog = ((time / 5500) + r.offset) % 1.0;
                const s = 0.5 + prog * 3.8;
                r.mesh.scale.set(s, s, 1);
                r.mat.opacity = Math.sin(prog * Math.PI) * 0.45;
            });
            const gentleBreathSize = currentSize * (0.88 + 0.22 * breathWave);
            updateScaleAndThickness(gentleBreathSize);
            siloPrompt.style.display = 'block';
            siloPrompt.innerText = `🌿 第 7 階・全向拮抗肌放鬆站 (剩餘 ${secLeft}s)：請看中央黃金螺旋與水波舒展並深長吐氣`;
            siloPrompt.style.borderColor = "#34d399";
        } else {
            antagonistRippleGroup.visible = false;

            if (currentAnim.includes('breathing_fractal')) {
                const breathScale = currentSize + (currentSize * 0.15 * Math.sin(phase));
                updateScaleAndThickness(breathScale);
            }

            if (currentAnim.includes('silo_text')) {
                siloPrompt.style.display = 'block';
                let sineVal = Math.sin(phase);
                if (sineVal > 0) {
                    siloPrompt.innerText = "SILO 空間引導：立體隧道/圓球向內聚合靠近中，請配合緩慢長吐氣";
                    siloPrompt.style.borderColor = "#D4AF37";
                } else {
                    siloPrompt.innerText = "SILO 空間引導：立體隧道/圓球向外展開遠離中，請配合平穩深吸氣";
                    siloPrompt.style.borderColor = "#38bdf8";
                }
                updateScaleAndThickness(currentSize * (1 - sineVal * 0.22));
            } else if (currentAnim.includes('center_lock_peripheral')) {
                siloPrompt.style.display = 'block';
                siloPrompt.innerText = "👁️ 周邊視野定錨：請盯緊中央靶心保持合像，用眼角餘光辨識外圍閃爍點方向！";
                siloPrompt.style.borderColor = "#38bdf8";
            } else if (currentAnim.includes('vert_step_alt')) {
                siloPrompt.style.display = 'block';
                const cSec = (protocolTime / 1000) % 14.0;
                const vStateStr = cSec < 4.0 ? "左眼上 / 右眼下 鎖定維持 (4秒)" : (cSec < 7.0 ? "回歸水平零位放鬆 (3秒)" : (cSec < 11.0 ? "交換！右眼上 / 左眼下 鎖定維持 (4秒)" : "回歸水平零位放鬆 (3秒)"));
                siloPrompt.innerText = `↕️ 垂直雙向階梯訓練：${vStateStr}`;
                siloPrompt.style.borderColor = "#D4AF37";
            } else if (currentAnim.includes('vert_smooth_alt')) {
                siloPrompt.style.display = 'block';
                siloPrompt.innerText = "↕️ 垂直雙向超慢速牽引：請保持頭頸端正不歪頭，讓雙眼平滑對齊陀螺儀水平翼";
                siloPrompt.style.borderColor = "#38bdf8";
            } else {
                siloPrompt.style.display = 'none';
            }
        }

        if (currentAnim.includes('flipper')) {
            let delay = currentAnim.includes('slow') ? 3200 : 1800;
            flipperTimer += dt;
            if (flipperTimer > delay) { flipperState = !flipperState; flipperTimer = 0; }
        }
        
        if (currentAnim.includes('text_') && shapeSelect && shapeSelect.value === 'text') {
            if (time - lastWordChangeTime > 3800) {
                lastWordChangeTime = time;
                currentWordIndex = (currentWordIndex + 1) % AXP_WORDS.length;
                if(customTextInput) customTextInput.value = AXP_WORDS[currentWordIndex];
                buildTargets(); 
            }
        }

        if (protocolTime >= currentStageDurationMs) {
            protocolStage = (protocolStage + 1) % stageMaxStr;
            loadMatrixStage(activeProtocol, protocolStage);
        }
    }

    if (isTestModeActive && !currentAnim.includes('antagonist_relax')) {
        if (!taskActive) { timeSinceLastTask += dt; if (timeSinceLastTask > nextTaskInterval) spawnTask(); } 
        else { if (performance.now() - taskSpawnTime > 7500) handleTaskResult('miss'); }
    }

    const isRoamActive = (currentAnim.includes('roam') || (!aiToggle.checked && currentAxis === 'roam')) && !currentAnim.includes('center_lock_peripheral') && !currentAnim.includes('antagonist_relax');
    const isSaccadeActive = (currentAnim.includes('saccade') || (!aiToggle.checked && currentAxis === 'saccade')) && !currentAnim.includes('center_lock_peripheral') && !currentAnim.includes('antagonist_relax');

    // 漫遊與跳視同樣支援「前 3 階舒適圈溫和喚醒阻尼」
    const stageWarmupScale = (aiToggle && aiToggle.checked && protocolStage <= 2) ? 0.65 : 1.0;

    if (isRoamActive) {
        currentRoamX = Math.sin(phase * 0.72) * 260 * stageWarmupScale;
        currentRoamY = Math.cos(phase * 0.52) * 175 * stageWarmupScale;
    } else {
        currentRoamX = 0; currentRoamY = 0;
    }

    if (isSaccadeActive) {
        saccadeTimer += dt; 
        const sacInterval = (protocolStage <= 4) ? 2000 : 1650; // 初中階給予更充裕的跳視停靠時間
        if (saccadeTimer > sacInterval) { 
            saccadeTimer = 0; 
            currentSaccadeX = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 145) * stageWarmupScale; 
            currentSaccadeY = (Math.random() > 0.5 ? 1 : -1) * (70 + Math.random() * 105) * stageWarmupScale; 
        }
    } else {
        currentSaccadeX = 0; currentSaccadeY = 0;
    }

    if(targetLeft && targetRight) {
        const curShape = shapeSelect ? shapeSelect.value : '';
        if (isRotating) {
            if (curShape === 'depth_tunnel') {
                // 10層立體蟲洞隧道：奇偶層反向微速緩慢自轉，創造深邃太空引力井立體視覺
                targetLeft.children.forEach((layer, idx) => { layer.rotation.z = phase * (idx % 2 === 0 ? 0.22 : -0.22); });
                targetRight.children.forEach((layer, idx) => { layer.rotation.z = phase * (idx % 2 === 0 ? 0.22 : -0.22); });
            } else if (curShape === 'golden_spiral') {
                // 費馬黃金螺旋光流陣：極慢速順時針旋轉，溫和擴張周邊視網膜
                targetLeft.rotation.z = phase * 0.25;
                targetRight.rotation.z = phase * 0.25;
            } else if (curShape.includes('crystal') || curShape.includes('sphere') || curShape === 'nested_dodeca' || curShape === 'torusKnot') {
                targetLeft.children.forEach((layer, index) => { 
                    layer.rotation.x += (index % 2 === 0 ? 0.008 : -0.008); 
                    layer.rotation.y += 0.011; 
                });
                targetRight.children.forEach((layer, index) => { 
                    layer.rotation.x += (index % 2 === 0 ? 0.008 : -0.008); 
                    layer.rotation.y += 0.011; 
                });
            }
        }
        
        // 陀螺儀 (gyro_cross)、十字靶 (dichoptic_cross) 與文字 (text) 保持水平與垂直軸絕對端正不旋轉，確保垂直與水平刻度的精準對位！
        if (!isRotating || curShape === 'text' || curShape === 'dichoptic_cross' || curShape === 'gyro_cross' || curShape === 'depth_tunnel') {
            targetLeft.rotation.z = 0;
            targetRight.rotation.z = 0;
        } else if (curShape !== 'golden_spiral') {
            targetLeft.rotation.z = phase * 0.35; 
            targetRight.rotation.z = phase * 0.35; 
        }
    }
    
    updatePositions(phase, currentAnim); 

    camera.layers.set(1); renderer.setRenderTarget(rtLeft); renderer.clear(); renderer.render(scene, camera);
    camera.layers.set(2); renderer.setRenderTarget(rtRight); renderer.clear(); renderer.render(scene, camera);
    camera.layers.set(0); renderer.setRenderTarget(null); renderer.render(postScene, postCamera);

    animationId = requestAnimationFrame(animate);
}

function toggleTraining() {
    if(loginOverlay.style.display !== 'none') return; 
    isRunning = !isRunning;
    if (isRunning) {
        if(startBtn) { startBtn.innerText = "⏸ 暫停訓練 [ Space ]"; startBtn.classList.add('active'); }
        if(statusText) { statusText.innerText = isAIRescueActive ? statusText.innerText : (isTestModeActive ? "INTERACTIVE TEST ON" : "TRAINING ACTIVE"); statusText.style.color = isAIRescueActive ? '#facc15' : (isTestModeActive ? "#D4AF37" : '#38bdf8'); }
        lastTime = performance.now(); animate(lastTime);
    } else {
        if(startBtn) { startBtn.innerText = "▶ 繼續訓練 [ Space ]"; startBtn.classList.remove('active'); }
        if(statusText) { statusText.innerText = "PAUSED"; statusText.style.color = '#D4AF37'; }
        cancelAnimationFrame(animationId);
        taskActive = false; cueGroupLeft.visible = false; cueGroupRight.visible = false;
        stageCountdownBadge.style.display = 'none';
        forceRenderFrame();
    }
}

function executeReset() {
    isRunning = false; cancelAnimationFrame(animationId); 
    if(startBtn) { startBtn.innerText = "▶ 啟動訓練 [ Space ]"; startBtn.classList.remove('active'); }
    if(statusText) { statusText.innerText = "IDLE (待命)"; statusText.style.color = '#f8fafc'; }
    totalTimerSec = 0; sessionScore = 0; protocolTime = 0;
    if(timerDisplay) timerDisplay.innerText = "00:00"; 
    if(hudScoreVal) hudScoreVal.innerText = "0";
    
    activeProtocol = null; protocolStage = 0;
    disableAI();
    
    taskActive = false;
    isTestModeActive = true;
    dichopticSwapState = false;
    antagonistRippleGroup.visible = false;
    stageCountdownBadge.style.display = 'none';
    cueGroupLeft.visible = false; cueGroupRight.visible = false;
    if (btnTestMode) {
        btnTestMode.innerHTML = "<strong>0</strong> 互動測驗: 開 (按方向鍵)";
        btnTestMode.classList.add('test-on');
    }
    consecutiveHits = 0; consecutiveMisses = 0;
    
    currentSize = 360; currentSpeed = 12; currentStereo = 0.02; currentThick = 8.0;
    currentVertPrism = 0;
    currentDistractors = 0; 
    currentSaccadeX = 0; currentSaccadeY = 0; currentRoamX = 0; currentRoamY = 0; phase = 0;
    isRotating = true; isFilled = true; sessionLogs = []; isAIRescueActive = false;
    
    if(shapeSelect) shapeSelect.value = 'gyro_cross'; 
    if(rotateCheckbox) rotateCheckbox.checked = true; 
    if(fillCheckbox) fillCheckbox.checked = true; 
    if(balanceSlider) balanceSlider.value = 50;
    if(prismSlider) prismSlider.value = 0;
    if(prismValHud) prismValHud.innerText = "0.0 Δ (平光)";
    
    if(redSlider) redSlider.value = 85; 
    if(greenSlider) greenSlider.value = 85; 
    if(blueSlider) blueSlider.value = 100;
    if(cyanCompSlider) cyanCompSlider.value = 22;
    
    updateUIValues(); buildTargets(); updatePositions(0, '');
    forceRenderFrame();
}

if(startBtn) startBtn.addEventListener('click', toggleTraining); 
if(resetBtn) resetBtn.addEventListener('click', executeReset);

document.addEventListener('keydown', (e) => {
    if(loginOverlay.style.display !== 'none') return; 

    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    const activeType = document.activeElement ? document.activeElement.type : '';
    if (activeTag === 'INPUT' && (activeType === 'text' || activeType === 'number')) {
        return;
    }

    const code = e.code;
    
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) {
        e.preventDefault();
        if (taskActive && isRunning && isTestModeActive) { const rt = ((performance.now() - taskSpawnTime) / 1000).toFixed(2); if (code === taskDirection) handleTaskResult('hit', rt); else handleTaskResult('wrong', rt); }
        return;
    }

    const shortcuts = ['Space', 'Enter', 'KeyE', 'KeyW', 'KeyS', 'KeyD', 'KeyA', 'KeyF', 'KeyR', 'KeyG', 'KeyZ', 'Digit0', 'Numpad0', 'Digit1', 'Digit2', 'Numpad1', 'Numpad2', 'BracketLeft', 'BracketRight', 'Comma', 'Period', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyQ', 'PageUp', 'PageDown'];
    
    if (shortcuts.includes(code)) {
        e.preventDefault(); if (document.activeElement) document.activeElement.blur(); 
        
        switch(code) {
            case 'PageUp':
                if (isAIRescueActive || !activeProtocol) break;
                if (protocolStage > 0) { protocolStage--; loadMatrixStage(activeProtocol, protocolStage); }
                break;
            case 'PageDown':
                if (isAIRescueActive || !activeProtocol) break;
                const maxStagesDown = AIM_MATRIX[activeProtocol] ? AIM_MATRIX[activeProtocol].length : 10;
                if (protocolStage < maxStagesDown - 1) { protocolStage++; loadMatrixStage(activeProtocol, protocolStage); }
                break;

            case 'Space': toggleTraining(); break; 
            case 'Enter': executeReset(); break; 
            case 'KeyE': if(controlPanel) { controlPanel.style.display = controlPanel.style.display === 'none' ? 'flex' : 'none'; setTimeout(onWindowResize, 50); } break;
            case 'KeyG': uploadToSupabase(); break; 
            case 'KeyZ': 
                if(aiToggle) { 
                    aiToggle.checked = !aiToggle.checked; 
                    if (!aiToggle.checked) { disableAI(); } 
                    else {
                        if (!activeProtocol) { activeProtocol = 'KeyY'; protocolStage = 0; }
                        loadMatrixStage(activeProtocol, protocolStage);
                        if (!isRunning) toggleTraining();
                    }
                } 
                break;
            case 'KeyQ': toggleFullScreen(); break; 
            case 'Digit0': case 'Numpad0': toggleTestMode(); break;
            
            case 'Digit1': case 'Numpad1': 
                protocolTime = 0;
                if(prismSlider) { prismSlider.value = Math.max(parseFloat(prismSlider.min), parseFloat(prismSlider.value) - 0.5).toFixed(1); prismSlider.dispatchEvent(new Event('input')); }
                break;
            case 'Digit2': case 'Numpad2': 
                protocolTime = 0;
                if(prismSlider) { prismSlider.value = Math.min(parseFloat(prismSlider.max), parseFloat(prismSlider.value) + 0.5).toFixed(1); prismSlider.dispatchEvent(new Event('input')); }
                break;
                
            case 'BracketRight': protocolTime = 0; if(stereoSlider) { stereoSlider.value = Math.min(0.15, parseFloat(stereoSlider.value) + 0.01).toFixed(2); stereoSlider.dispatchEvent(new Event('input')); } break;
            case 'BracketLeft': protocolTime = 0; if(stereoSlider) { stereoSlider.value = Math.max(-0.15, parseFloat(stereoSlider.value) - 0.01).toFixed(2); stereoSlider.dispatchEvent(new Event('input')); } break;
            case 'Period': protocolTime = 0; if(speedSlider) { speedSlider.value = Math.min(50, parseFloat(speedSlider.value) + (e.shiftKey ? 5 : 1)); speedSlider.dispatchEvent(new Event('input')); } break;
            case 'Comma': protocolTime = 0; if(speedSlider) { speedSlider.value = Math.max(0, parseFloat(speedSlider.value) - (e.shiftKey ? 5 : 1)); speedSlider.dispatchEvent(new Event('input')); } break;
            
            case 'KeyW': protocolTime = 0; currentSize = Math.min(550, currentSize + 15); updateUIValues(); buildTargets(); if(!isAIRescueActive) disableAI(); break;
            case 'KeyS': protocolTime = 0; currentSize = Math.max(150, currentSize - 15); updateUIValues(); buildTargets(); if(!isAIRescueActive) disableAI(); break;
            
            case 'KeyD': protocolTime = 0; currentThick = Math.min(10, currentThick + 0.5); updateUIValues(); buildTargets(); if(!isAIRescueActive) disableAI(); break;
            case 'KeyA': protocolTime = 0; currentThick = Math.max(3, currentThick - 0.5); updateUIValues(); buildTargets(); if(!isAIRescueActive) disableAI(); break;
            case 'KeyF': protocolTime = 0; if(fillCheckbox) { fillCheckbox.checked = !fillCheckbox.checked; fillCheckbox.dispatchEvent(new Event('change')); } break;
            case 'KeyR': protocolTime = 0; if(rotateCheckbox) { rotateCheckbox.checked = !rotateCheckbox.checked; rotateCheckbox.dispatchEvent(new Event('change')); } break;
            case 'KeyY': case 'KeyU': case 'KeyI': case 'KeyO': case 'KeyP':
                if (isAIRescueActive) break;
                if(aiToggle) aiToggle.checked = true; 
                const maxStages = AIM_MATRIX[code] ? AIM_MATRIX[code].length : 10;
                if (activeProtocol === code && isRunning) { protocolStage = (protocolStage + 1) % maxStages; } else { activeProtocol = code; protocolStage = 0; }
                loadMatrixStage(activeProtocol, protocolStage);
                if (!isRunning) toggleTraining();
                break;
        }
    }
});

updateGlassesUI(); updateUIValues(); buildTargets();

function onWindowResize() {
    const width = container.clientWidth; const height = container.clientHeight;
    camera.left = -d * (width / height); camera.right = d * (width / height); camera.updateProjectionMatrix();
    renderer.setSize(width, height); rtLeft.setSize(width, height); rtRight.setSize(width, height);
    updateScaleAndThickness();
    forceRenderFrame();
}
window.addEventListener('resize', onWindowResize); setTimeout(onWindowResize, 100);
