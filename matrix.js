// matrix.js - AXP Neuro-Optic Engine v31.0 (戰術雷達網 × 1-3階 Pursuit/Saccade 暖身啟動 × 尺寸線寬生理匹配版)
// 核心臨床專武化與舒適圈升級：
// 1. 遵循「圖大線厚 (Stage 1-3 喚醒舒適圈) -> 圖小線細 (Stage 8-10 中心窩精雕)」原則，thick 由初階 9.0 漸進收細至高階 5.5
// 2. [KeyU 追視與周邊專武]：Stage 1-2 直接啟動低稜鏡大圓周與 8 字形平滑追視 (Pursuit) 暖身，搭配戰術雷達廣角網 (golden_spiral/radar_hud)
// 3. [KeyO 跳視與垂直專武]：Stage 1-2 直接啟動低稜鏡慢速定點跳視 (Saccade) 暖身，Stage 3-4 與 8-9 執行垂直雙向互調 (A平滑+B階梯)
// 4. [KeyY 去抑制 / KeyI 蟲洞 SILO / KeyP 高頻字體解綁]：五大模組 50 階零重複，第 7 階皆為 90 秒全向拮抗肌同步放鬆站

export const PROTOCOL_NAMES = {
    'KeyY': 'Y. 陀螺儀去抑制與結構瞬換 (Gyroscopic Anti-Suppression)',
    'KeyU': 'U. 戰術雷達追視與周邊定錨 (Radar Pursuits & Peripheral Awareness)',
    'KeyI': 'I. 蟲洞隧道與胖圓球立體融像 (Vectographic Tunnel & SILO)',
    'KeyO': 'O. 定點跳視喚醒與垂直雙向微調 (Saccadic Warmup & Vertical Alignment)',
    'KeyP': 'P. 高頻字體對焦與聚散解綁 (Accommodative-Vergence Uncoupling)'
};

export const AIM_MATRIX = {
    // ========================================================================
    // 🟩 [ Y 鍵 ] 陀螺儀去抑制與結構瞬換專武 (1-3階低稜鏡溫和漫遊喚醒雙眼通道，逐步擴大共視舒適圈)
    // ========================================================================
    'KeyY': [
        { name: 'Y-01 初階舒適圈 I (航太陀螺儀準星紅藍結構瞬換喚醒)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.0, size: 440, dist: 2.0, v_prism: 0, speed: 8, thick: 9.0, duration: 60, anim: 'swap_flash' },
        { name: 'Y-02 初階舒適圈 II (雙眼左右通道全開全關交替與微幅水平位移)', shape: 'dichoptic_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.0, size: 410, dist: 4.0, v_prism: 0, speed: 10, thick: 8.5, duration: 60, anim: 'flicker' },
        { name: 'Y-03 初階舒適圈 III (八角外框與晶核紅藍角色互換對位)', shape: 'dichoptic_lock', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.01, size: 380, dist: 6.0, v_prism: 0, speed: 12, thick: 8.0, duration: 60, anim: 'swap_flash' },
        { name: 'Y-04 中階雙眼共視 I (陀螺儀游標尺 10Δ 平滑對位鎖定)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.02, size: 345, dist: 10.0, v_prism: 0, speed: 14, thick: 7.5, duration: 60, anim: 'slow_cross,swap_flash' },
        { name: 'Y-05 中階雙眼共視 II (圓圈與十字 14Δ 雙眼交替開關鎖定)', shape: 'dichoptic_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.03, size: 315, dist: 14.0, v_prism: 0, speed: 14, thick: 7.0, duration: 60, anim: 'flicker,swap_flash' },
        { name: 'Y-06 中階雙眼共視 III (八角晶核鎖 18Δ 深度抗抑制牽引)', shape: 'dichoptic_lock', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.04, size: 290, dist: 18.0, v_prism: 0, speed: 15, thick: 6.8, duration: 60, anim: 'swap_flash' },
        { name: 'Y-07 🌿 90秒全向拮抗肌同步放鬆 (戰術雷達廣角網 360 度離心水波卸載)', shape: 'golden_spiral', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: 0.01, size: 390, dist: -2.5, v_prism: 0, speed: 6, thick: 8.0, duration: 90, anim: 'antagonist_relax' },
        { name: 'Y-08 高階中心窩破抑制 I (精緻陀螺儀 22Δ 高頻結構瞬換)', shape: 'gyro_cross', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.05, size: 260, dist: 22.0, v_prism: 0, speed: 16, thick: 6.2, duration: 60, anim: 'swap_flash_fast' },
        { name: 'Y-09 高階中心窩破抑制 II (精緻八角對位鎖 26Δ 強效內聚防抑制)', shape: 'dichoptic_lock', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.07, size: 235, dist: 26.0, v_prism: 0, speed: 16, thick: 5.8, duration: 60, anim: 'swap_flash_fast' },
        { name: 'Y-10 巔峰中心窩共視 III (細銳陀螺儀 30Δ 極限雙眼咬合鎖定)', shape: 'gyro_cross', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.09, size: 215, dist: 30.0, v_prism: 0, speed: 18, thick: 5.5, duration: 60, anim: 'swap_flash_fast' }
    ],

    // ========================================================================
    // 🟦 [ U 鍵 ] 戰術雷達追視與周邊定錨專武 (Stage 1-2 直接啟動低稜鏡 Pursuit 大圓周與 8 字追視暖身眼外肌！)
    // ========================================================================
    'KeyU': [
        { name: 'U-01 初階追視暖身 I (戰術雷達網 3Δ 大圓周平滑追視喚醒眼外肌 / 2 顆外圍星)', shape: 'golden_spiral', axis: 'circular', mode: 'crossover', fill: true, stereo: 0.02, size: 390, dist: 3.0, v_prism: 0, speed: 16, thick: 8.5, duration: 60, anim: 'peripheral_pursuit,swap_flash', distractors: 2 },
        { name: 'U-02 初階追視暖身 II (戰術雷達網 5Δ 莫比烏斯 8 字形平滑追視 / 2 顆外圍星)', shape: 'golden_spiral', axis: 'lissajous', mode: 'crossover', fill: true, stereo: 0.03, size: 365, dist: 5.0, v_prism: 0, speed: 16, thick: 8.0, duration: 60, anim: 'peripheral_pursuit', distractors: 2 },
        { name: 'U-03 初階周邊定錨 III (戰術雷達中心定錨不動 / 餘光捕捉 3 顆廣角外圍目標)', shape: 'golden_spiral', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.03, size: 345, dist: 6.0, v_prism: 0, speed: 14, thick: 8.0, duration: 60, anim: 'center_lock_peripheral,swap_flash', distractors: 3 },
        { name: 'U-04 中階廣域追視 I (莫比烏斯結 10Δ 8 字形絲滑追視 / 3 顆外圍星抗擾)', shape: 'torusKnot', axis: 'lissajous', mode: 'crossover', fill: false, stereo: 0.04, size: 315, dist: 10.0, v_prism: 0, speed: 18, thick: 7.5, duration: 60, anim: 'peripheral_pursuit', distractors: 3 },
        { name: 'U-05 中階周邊定錨 II (陀螺儀 14Δ 中心定錨鎖定 / 餘光感知 4 顆廣角外圍星)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.05, size: 295, dist: 14.0, v_prism: 0, speed: 16, thick: 7.0, duration: 60, anim: 'center_lock_peripheral,swap_flash', distractors: 4 },
        { name: 'U-06 中階廣域追視 III (戰術雷達網 18Δ 全視場自由漫遊追視 / 4 顆外圍星)', shape: 'golden_spiral', axis: 'roam', mode: 'crossover', fill: true, stereo: 0.06, size: 275, dist: 18.0, v_prism: 0, speed: 18, thick: 6.8, duration: 60, anim: 'roam_smooth,peripheral_pursuit,swap_flash', distractors: 4 },
        { name: 'U-07 🌿 90秒全向拮抗肌同步放鬆 (戰術雷達廣角網無干擾全視場水波舒展)', shape: 'golden_spiral', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: 0.02, size: 390, dist: -3.0, v_prism: 0, speed: 6, thick: 8.0, duration: 90, anim: 'antagonist_relax', distractors: 0 },
        { name: 'U-08 高階周邊極限 I (戰術雷達網 22Δ 中心定錨 / 5 顆極廣角餘光挑戰)', shape: 'golden_spiral', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.07, size: 250, dist: 22.0, v_prism: 0, speed: 18, thick: 6.2, duration: 60, anim: 'center_lock_peripheral,swap_flash', distractors: 5 },
        { name: 'U-09 高階廣域追視 II (雙層八面晶體 25Δ 8 字形高速追視 / 5 顆外圍星)', shape: 'crystal8', axis: 'lissajous', mode: 'crossover', fill: false, stereo: 0.09, size: 235, dist: 25.0, v_prism: 0, speed: 20, thick: 5.8, duration: 60, anim: 'peripheral_pursuit', distractors: 5 },
        { name: 'U-10 巔峰全視場整合 (細銳戰術雷達 28Δ 廣域漫遊追視與 6 顆廣角星鎖定)', shape: 'golden_spiral', axis: 'roam', mode: 'crossover', fill: true, stereo: 0.10, size: 220, dist: 28.0, v_prism: 0, speed: 22, thick: 5.5, duration: 60, anim: 'roam_smooth,peripheral_pursuit,swap_flash_fast', distractors: 6 }
    ],

    // ========================================================================
    // 🟪 [ I 鍵 ] 10 層蟲洞隧道與胖圓球立體融像專武 (100% 純 3D 結構，由淺入深擴展 SILO 聚散舒適圈)
    // ========================================================================
    'KeyI': [
        { name: 'I-01 初階立體舒適圈 I (五層同心立體圓筒 4Δ 溫和聚散推拉)', shape: 'circle5', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.03, size: 390, dist: 4.0, v_prism: 0, speed: 12, thick: 8.8, duration: 60, anim: 'trombone' },
        { name: 'I-02 初階蟲洞景深 II (10層立體深度蟲洞隧道 7Δ 建立三維縱深)', shape: 'depth_tunnel', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.05, size: 365, dist: 7.0, v_prism: 0, speed: 14, thick: 8.2, duration: 60, anim: 'silo_text' },
        { name: 'I-03 初階胖圓球 SILO (3D 五層網格胖圓球 10Δ 近小遠大感知)', shape: 'sphere5', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.06, size: 340, dist: 10.0, v_prism: 0, speed: 14, thick: 7.8, duration: 60, anim: 'silo_text' },
        { name: 'I-04 中階蟲洞推進 I (10層立體蟲洞隧道 15Δ 深層空間牽引)', shape: 'depth_tunnel', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.08, size: 315, dist: 15.0, v_prism: 0, speed: 16, thick: 7.2, duration: 60, anim: 'silo_text' },
        { name: 'I-05 中階實體胖球 II (3D 實體胖圓球 20Δ 飽滿體積推拉)', shape: 'sphere5', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.09, size: 290, dist: 20.0, v_prism: 0, speed: 16, thick: 6.8, duration: 60, anim: 'silo_text' },
        { name: 'I-06 中階晶體融像 III (雙層八面立體晶體 24Δ 深度鎖定)', shape: 'crystal8', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.10, size: 270, dist: 24.0, v_prism: 0, speed: 18, thick: 6.5, duration: 60, anim: 'silo_text' },
        { name: 'I-07 🌿 90秒全向拮抗肌同步放鬆 (大胖圓球微開散 360 度離心呼吸卸載)', shape: 'sphere5', axis: 'horizontal', mode: 'oneway_bi', fill: true, stereo: -0.02, size: 390, dist: -3.5, v_prism: 0, speed: 6, thick: 8.0, duration: 90, anim: 'antagonist_relax' },
        { name: 'I-08 高階蟲洞衝刺 I (10層立體蟲洞隧道 28Δ 高深度懸浮鎖定)', shape: 'depth_tunnel', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.12, size: 250, dist: 28.0, v_prism: 0, speed: 18, thick: 6.0, duration: 60, anim: 'breathing_fractal,silo_text' },
        { name: 'I-09 高階胖球儲備 II (3D 實體胖圓球 32Δ 強效內聚儲備擴展)', shape: 'sphere5', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.14, size: 235, dist: 32.0, v_prism: 0, speed: 20, thick: 5.8, duration: 60, anim: 'breathing_fractal,silo_text' },
        { name: 'I-10 巔峰物理融像極限 (雙層反向十二面體 35Δ 極限立體儲備挑戰)', shape: 'nested_dodeca', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.15, size: 220, dist: 35.0, v_prism: 0, speed: 20, thick: 5.5, duration: 60, anim: 'breathing_fractal' }
    ],

    // ========================================================================
    // 🟧 [ O 鍵 ] 定點跳視喚醒與垂直雙向微調專武 (Stage 1-2 直接啟動低稜鏡 Saccade 跳視暖身，附目標落點預告圈！)
    // ========================================================================
    'KeyO': [
        { name: 'O-01 初階跳視暖身 I (陀螺儀 4Δ 慢速定點跳視喚醒眼肌 / 附目標預告準星)', shape: 'gyro_cross', axis: 'saccade', mode: 'crossover', fill: true, stereo: 0.02, size: 380, dist: 4.0, v_prism: 0, speed: 12, thick: 8.8, duration: 60, anim: 'saccade_warmup' },
        { name: 'O-02 初階跳視暖身 II (戰術雷達網 6Δ 四象限定點跳視與結構瞬換)', shape: 'golden_spiral', axis: 'saccade', mode: 'crossover', fill: true, stereo: 0.03, size: 355, dist: 6.0, v_prism: 0, speed: 14, thick: 8.2, duration: 60, anim: 'saccade_warmup,swap_flash' },
        { name: 'O-03 初中階垂直雙向訓練 A (陀螺儀 0.6Δ 超慢速左右眼上下平滑互調)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.03, size: 330, dist: 6.0, v_prism: 0.6, speed: 4, thick: 7.8, duration: 60, anim: 'vert_smooth_alt' },
        { name: 'O-04 初中階垂直雙向訓練 B (陀螺儀 0.8Δ 左右眼上下階梯停留 4 秒鎖定)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.04, size: 310, dist: 6.0, v_prism: 0.8, speed: 4, thick: 7.5, duration: 60, anim: 'vert_step_alt,swap_flash' },
        { name: 'O-05 中階敏捷跳視 I (八角晶核鎖 12Δ 廣域定點急跳合像)', shape: 'dichoptic_lock', axis: 'saccade', mode: 'crossover', fill: true, stereo: 0.05, size: 285, dist: 12.0, v_prism: 0, speed: 16, thick: 7.0, duration: 60, anim: 'saccade_vergence,swap_flash' },
        { name: 'O-06 中階階躍翻轉 II (陀螺儀準星 16Δ 雙向階躍聚散快速切換)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.06, size: 265, dist: 16.0, v_prism: 0, speed: 0, thick: 6.8, duration: 60, anim: 'flipper_fast,swap_flash' },
        { name: 'O-07 🌿 90秒全向拮抗肌同步放鬆 (零垂直壓差同心圓筒全向水波卸載)', shape: 'circle5', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: 0.02, size: 390, dist: -2.5, v_prism: 0, speed: 6, thick: 8.0, duration: 90, anim: 'antagonist_relax' },
        { name: 'O-08 高階垂直雙向極限 A (精緻陀螺儀 1.2Δ 超慢速左右眼上下深度互調)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.07, size: 250, dist: 8.0, v_prism: 1.2, speed: 4, thick: 6.2, duration: 60, anim: 'vert_smooth_alt,swap_flash' },
        { name: 'O-09 高階垂直雙向極限 B (精緻八角鎖 1.4Δ 左右眼上下階梯停留鎖定)', shape: 'dichoptic_lock', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.08, size: 235, dist: 10.0, v_prism: 1.4, speed: 4, thick: 5.8, duration: 60, anim: 'vert_step_alt,swap_flash' },
        { name: 'O-10 巔峰三維跳視整合 (細銳陀螺儀 22Δ 隨機方位瞬時急跳鎖定)', shape: 'gyro_cross', axis: 'saccade', mode: 'crossover', fill: true, stereo: 0.10, size: 220, dist: 22.0, v_prism: 0, speed: 18, thick: 5.5, duration: 60, anim: 'saccade_vergence,swap_flash_fast' }
    ],

    // ========================================================================
    // 🟥 [ P 鍵 ] 高頻字體對焦與聚散解綁專武 (1-3階結合溫和位移與清晰字體，逐步解開睫狀肌與內聚鎖死)
    // ========================================================================
    'KeyP': [
        { name: 'P-01 初階調節舒適圈 I (清晰大視標 3Δ 雙眼同步對焦喚醒)', shape: 'text', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.02, size: 380, dist: 3.0, v_prism: 0, speed: 12, thick: 8.8, duration: 60, anim: 'text_bop' },
        { name: 'P-02 初階 BIM 開散解綁 I (外展 -3.5Δ 同時維持字母邊緣銳利)', shape: 'text', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: -0.02, size: 355, dist: -3.5, v_prism: 0, speed: 12, thick: 8.2, duration: 60, anim: 'text_bim' },
        { name: 'P-03 初階動態追視對焦 (清晰字體 6Δ 大圓周平滑追視同時維持對焦)', shape: 'text', axis: 'circular', mode: 'crossover', fill: false, stereo: 0.03, size: 335, dist: 6.0, v_prism: 0, speed: 14, thick: 7.8, duration: 60, anim: 'text_trombone' },
        { name: 'P-04 中階 BOP 內聚解綁 I (內聚 12Δ 保持睫狀肌放鬆不模糊)', shape: 'text', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.04, size: 310, dist: 12.0, v_prism: 0, speed: 14, thick: 7.2, duration: 60, anim: 'text_bop' },
        { name: 'P-05 中階 BIM 開散解綁 II (外展 -5.5Δ 負融像調節解綁)', shape: 'text', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: -0.04, size: 290, dist: -5.5, v_prism: 0, speed: 14, thick: 6.8, duration: 60, anim: 'text_bim' },
        { name: 'P-06 中階跳視調節解綁 (清晰字體 16Δ 定點跳視瞬間對焦鎖定)', shape: 'text', axis: 'saccade', mode: 'crossover', fill: false, stereo: 0.06, size: 270, dist: 16.0, v_prism: 0, speed: 16, thick: 6.5, duration: 60, anim: 'text_saccade' },
        { name: 'P-07 🌿 90秒全向拮抗肌同步放鬆 (10層蟲洞隧道微開散深層卸載睫狀肌)', shape: 'depth_tunnel', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: -0.02, size: 390, dist: -3.5, v_prism: 0, speed: 6, thick: 8.0, duration: 90, anim: 'antagonist_relax' },
        { name: 'P-08 高階 BIM 極限開散解綁 (外展 -6.8Δ 生理極限負融像對焦)', shape: 'text', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: -0.06, size: 250, dist: -6.8, v_prism: 0, speed: 15, thick: 6.0, duration: 60, anim: 'text_bim' },
        { name: 'P-09 高階 BOP 強效內聚解綁 (內聚 24Δ 高負荷對焦彈性鎖定)', shape: 'text', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.09, size: 235, dist: 24.0, v_prism: 0, speed: 16, thick: 5.8, duration: 60, anim: 'text_bop' },
        { name: 'P-10 巔峰虛擬翻轉鏡挑戰 (精緻字體 28Δ 雙向階躍瞬間對焦收放)', shape: 'text', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.11, size: 220, dist: 28.0, v_prism: 0, speed: 0, thick: 5.5, duration: 60, anim: 'text_flipper_fast' }
    ]
};
