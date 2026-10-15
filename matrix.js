// matrix.js - AXP Neuro-Optic Engine v30.0 (三大黑科技視標 × 五大模組專武化零重複 × 60s/90s 慢相神經適應版)
// 核心臨床專武化分工：
// 1. [KeyY 去抑制專武]：獨家採用 gyro_cross (航太三軸陀螺儀準星鎖) 與 dichoptic_lock，專攻全開全關交替與紅藍結構瞬換
// 2. [KeyU 周邊與追視專武]：獨家採用 golden_spiral (費馬黃金螺旋光流陣) 與廣角干擾星，結合 A(中心定錨餘光) + B(大範圍追視)
// 3. [KeyI 立體景深專武]：100% 純 3D 結構，由 depth_tunnel (10層立體蟲洞隧道) 與 sphere5 (胖圓球) 創造極致 SILO 空間縱深
// 4. [KeyO 垂直與跳視專武]：獨家壟斷兩組連續垂直雙向互調 (A 超慢速 14s 平滑牽引 + B 階梯停留 4s 鎖定) 與三維隨機急跳
// 5. [KeyP 調節解綁專武]：100% 純化為高對比清晰字母視標 (text)，專攻 BOP 內聚與 BIM 開散下之睫狀肌對焦收放解綁

export const PROTOCOL_NAMES = {
    'KeyY': 'Y. 陀螺儀去抑制與結構瞬換 (Gyroscopic Anti-Suppression)',
    'KeyU': 'U. 黃金螺旋周邊視野與廣域追視 (Golden Spiral & Peripheral Pursuits)',
    'KeyI': 'I. 蟲洞隧道與胖圓球立體融像 (Vectographic Tunnel & SILO)',
    'KeyO': 'O. 垂直雙向互調與階躍跳視 (Vertical Alignment & Saccades)',
    'KeyP': 'P. 高頻字體對焦與聚散解綁 (Accommodative-Vergence Uncoupling)'
};

export const AIM_MATRIX = {
    // ========================================================================
    // 🟩 [ Y 鍵 ] 陀螺儀去抑制與結構瞬換專武 (專治單眼抑制：無亂飛與垂直干擾，純粹訓練 V1 雙眼通道開通)
    // ========================================================================
    'KeyY': [
        { name: 'Y-01 初階破抑制 I (航太陀螺儀準星紅藍結構瞬換)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.0, size: 450, dist: 2.0, v_prism: 0, speed: 6, thick: 9.0, duration: 60, anim: 'swap_flash' },
        { name: 'Y-02 初階破抑制 II (雙眼左右通道全開全關交替喚醒)', shape: 'dichoptic_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.0, size: 420, dist: 4.0, v_prism: 0, speed: 8, thick: 9.0, duration: 60, anim: 'flicker' },
        { name: 'Y-03 初階破抑制 III (八角外框與晶核紅藍角色互換)', shape: 'dichoptic_lock', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.01, size: 390, dist: 6.0, v_prism: 0, speed: 10, thick: 8.5, duration: 60, anim: 'swap_flash' },
        { name: 'Y-04 中階雙眼共視 I (陀螺儀游標尺 10Δ 平滑對位鎖定)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.02, size: 350, dist: 10.0, v_prism: 0, speed: 12, thick: 8.5, duration: 60, anim: 'slow_cross,swap_flash' },
        { name: 'Y-05 中階雙眼共視 II (圓圈與十字 14Δ 雙眼交替開關鎖定)', shape: 'dichoptic_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.03, size: 320, dist: 14.0, v_prism: 0, speed: 12, thick: 8.0, duration: 60, anim: 'flicker,swap_flash' },
        { name: 'Y-06 中階雙眼共視 III (八角晶核鎖 18Δ 深度抗抑制牽引)', shape: 'dichoptic_lock', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.04, size: 295, dist: 18.0, v_prism: 0, speed: 14, thick: 8.0, duration: 60, anim: 'swap_flash' },
        { name: 'Y-07 🌿 90秒全向拮抗肌同步放鬆 (費馬黃金螺旋 360 度離心光流卸載)', shape: 'golden_spiral', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: 0.01, size: 390, dist: -2.5, v_prism: 0, speed: 6, thick: 8.0, duration: 90, anim: 'antagonist_relax' },
        { name: 'Y-08 高階中心窩破抑制 I (陀螺儀準星 22Δ 高頻結構瞬換)', shape: 'gyro_cross', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.05, size: 265, dist: 22.0, v_prism: 0, speed: 15, thick: 7.5, duration: 60, anim: 'swap_flash_fast' },
        { name: 'Y-09 高階中心窩破抑制 II (八角對位鎖 26Δ 強效內聚防抑制)', shape: 'dichoptic_lock', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.07, size: 240, dist: 26.0, v_prism: 0, speed: 16, thick: 7.5, duration: 60, anim: 'swap_flash_fast' },
        { name: 'Y-10 巔峰中心窩共視 III (精密陀螺儀 30Δ 極限雙眼咬合鎖定)', shape: 'gyro_cross', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.09, size: 220, dist: 30.0, v_prism: 0, speed: 18, thick: 7.5, duration: 60, anim: 'swap_flash_fast' }
    ],

    // ========================================================================
    // 🟦 [ U 鍵 ] 黃金螺旋周邊視野與廣域追視專武 (奇數階 A 中心定錨抓廣角餘光 + 偶數階 B 大範圍追視)
    // ========================================================================
    'KeyU': [
        { name: 'U-01 周邊定錨 A1 (黃金螺旋光流陣中心定錨 / 餘光感知 2 顆廣角外圍星)', shape: 'golden_spiral', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.02, size: 370, dist: 3.0, v_prism: 0, speed: 10, thick: 8.5, duration: 60, anim: 'center_lock_peripheral', distractors: 2 },
        { name: 'U-02 廣域追視 B1 (五層星芒大範圍 360 度環狀平滑追視 / 2 顆外圍星)', shape: 'star5', axis: 'circular', mode: 'crossover', fill: false, stereo: 0.03, size: 330, dist: 6.0, v_prism: 0, speed: 12, thick: 8.0, duration: 60, anim: 'peripheral_pursuit', distractors: 2 },
        { name: 'U-03 周邊定錨 A2 (陀螺儀中心定錨不動 / 餘光捕捉 3 顆廣角外圍目標)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.03, size: 320, dist: 8.0, v_prism: 0, speed: 12, thick: 8.5, duration: 60, anim: 'center_lock_peripheral,swap_flash', distractors: 3 },
        { name: 'U-04 廣域追視 B2 (莫比烏斯結 8 字形軌跡平滑追視 / 3 顆外圍星抗擾)', shape: 'torusKnot', axis: 'lissajous', mode: 'crossover', fill: false, stereo: 0.04, size: 295, dist: 12.0, v_prism: 0, speed: 14, thick: 8.0, duration: 60, anim: 'peripheral_pursuit', distractors: 3 },
        { name: 'U-05 周邊定錨 A3 (黃金螺旋陣列 15Δ 定錨鎖定 / 4 顆廣角星高速環繞)', shape: 'golden_spiral', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.05, size: 285, dist: 15.0, v_prism: 0, speed: 15, thick: 8.0, duration: 60, anim: 'center_lock_peripheral', distractors: 4 },
        { name: 'U-06 廣域追視 B3 (雙層八面晶體大範圍垂直擺幅追視 / 4 顆外圍星)', shape: 'crystal8', axis: 'vertical', mode: 'crossover', fill: false, stereo: 0.06, size: 265, dist: 18.0, v_prism: 0, speed: 16, thick: 8.0, duration: 60, anim: 'peripheral_pursuit', distractors: 4 },
        { name: 'U-07 🌿 90秒全向拮抗肌同步放鬆 (費馬黃金螺旋無干擾全視場水波舒展)', shape: 'golden_spiral', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: 0.02, size: 390, dist: -3.0, v_prism: 0, speed: 6, thick: 8.0, duration: 90, anim: 'antagonist_relax', distractors: 0 },
        { name: 'U-08 高階周邊極限 A4 (陀螺儀 22Δ 中心定錨 / 5 顆極廣角餘光挑戰)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.07, size: 245, dist: 22.0, v_prism: 0, speed: 18, thick: 7.5, duration: 60, anim: 'center_lock_peripheral,swap_flash', distractors: 5 },
        { name: 'U-09 高階廣域追視 B4 (莫比烏斯結 25Δ 全場自由漫遊追視 / 5 顆外圍星)', shape: 'torusKnot', axis: 'roam', mode: 'crossover', fill: true, stereo: 0.09, size: 230, dist: 25.0, v_prism: 0, speed: 18, thick: 7.5, duration: 60, anim: 'roam_smooth,peripheral_pursuit', distractors: 5 },
        { name: 'U-10 巔峰全視場整合 (黃金螺旋 28Δ 廣域漫遊與 6 顆廣角星極限鎖定)', shape: 'golden_spiral', axis: 'roam', mode: 'crossover', fill: true, stereo: 0.10, size: 220, dist: 28.0, v_prism: 0, speed: 20, thick: 7.5, duration: 60, anim: 'roam_smooth,peripheral_pursuit', distractors: 6 }
    ],

    // ========================================================================
    // 🟪 [ I 鍵 ] 10 層蟲洞隧道與胖圓球立體融像專武 (100% 純 3D 結構，無扁平靶與閃爍，專攻極致 SILO)
    // ========================================================================
    'KeyI': [
        { name: 'I-01 初階立體喚醒 I (五層同心立體圓筒溫和聚散推拉)', shape: 'circle5', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.03, size: 370, dist: 4.0, v_prism: 0, speed: 12, thick: 9.0, duration: 60, anim: 'trombone' },
        { name: 'I-02 初階蟲洞景深 II (10層立體深度蟲洞隧道建立三維縱深)', shape: 'depth_tunnel', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.05, size: 350, dist: 8.0, v_prism: 0, speed: 14, thick: 8.5, duration: 60, anim: 'silo_text' },
        { name: 'I-03 初階胖圓球 SILO (3D 五層網格胖圓球 12Δ 近小遠大感知)', shape: 'sphere5', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.06, size: 330, dist: 12.0, v_prism: 0, speed: 15, thick: 8.5, duration: 60, anim: 'silo_text' },
        { name: 'I-04 中階蟲洞推進 I (10層立體蟲洞隧道 16Δ 深層空間牽引)', shape: 'depth_tunnel', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.08, size: 310, dist: 16.0, v_prism: 0, speed: 16, thick: 8.0, duration: 60, anim: 'silo_text' },
        { name: 'I-05 中階實體胖球 II (3D 實體胖圓球 22Δ 飽滿體積推拉)', shape: 'sphere5', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.09, size: 290, dist: 22.0, v_prism: 0, speed: 16, thick: 8.0, duration: 60, anim: 'silo_text' },
        { name: 'I-06 中階晶體融像 III (雙層八面立體晶體 26Δ 深度鎖定)', shape: 'crystal8', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.10, size: 270, dist: 26.0, v_prism: 0, speed: 18, thick: 8.0, duration: 60, anim: 'silo_text' },
        { name: 'I-07 🌿 90秒全向拮抗肌同步放鬆 (大胖圓球微開散 360 度離心呼吸卸載)', shape: 'sphere5', axis: 'horizontal', mode: 'oneway_bi', fill: true, stereo: -0.02, size: 390, dist: -3.5, v_prism: 0, speed: 6, thick: 8.5, duration: 90, anim: 'antagonist_relax' },
        { name: 'I-08 高階蟲洞衝刺 I (10層立體蟲洞隧道 30Δ 高深度懸浮鎖定)', shape: 'depth_tunnel', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.12, size: 255, dist: 30.0, v_prism: 0, speed: 18, thick: 7.5, duration: 60, anim: 'breathing_fractal,silo_text' },
        { name: 'I-09 高階胖球儲備 II (3D 實體胖圓球 32Δ 強效內聚儲備擴展)', shape: 'sphere5', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.14, size: 240, dist: 32.0, v_prism: 0, speed: 20, thick: 7.5, duration: 60, anim: 'breathing_fractal,silo_text' },
        { name: 'I-10 巔峰物理融像極限 (雙層反向十二面體 35Δ 極限立體儲備挑戰)', shape: 'nested_dodeca', axis: 'horizontal', mode: 'oneway_bo', fill: true, stereo: 0.15, size: 225, dist: 35.0, v_prism: 0, speed: 20, thick: 7.5, duration: 60, anim: 'breathing_fractal' }
    ],

    // ========================================================================
    // 🟧 [ O 鍵 ] 垂直雙向互調與階躍跳視專武 (獨家配備兩組 A+B 垂直雙向訓練：O-03/04 與 O-08/09)
    // ========================================================================
    'KeyO': [
        { name: 'O-01 初階階躍合像 I (陀螺儀準星 3秒溫和聚散翻轉)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.02, size: 360, dist: 6.0, v_prism: 0, speed: 0, thick: 9.0, duration: 60, anim: 'flipper_slow' },
        { name: 'O-02 初階階躍合像 II (八角晶核鎖 1.8秒敏捷聚散切換)', shape: 'dichoptic_lock', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.03, size: 330, dist: 10.0, v_prism: 0, speed: 0, thick: 8.5, duration: 60, anim: 'flipper_fast,swap_flash' },
        { name: 'O-03 初中階垂直雙向訓練 A (陀螺儀 0.7Δ 超慢速左右眼上下平滑互調)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.04, size: 315, dist: 6.0, v_prism: 0.7, speed: 4, thick: 8.5, duration: 60, anim: 'vert_smooth_alt' },
        { name: 'O-04 初中階垂直雙向訓練 B (陀螺儀 0.8Δ 左右眼上下階梯停留 4 秒鎖定)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.04, size: 300, dist: 6.0, v_prism: 0.8, speed: 4, thick: 8.5, duration: 60, anim: 'vert_step_alt,swap_flash' },
        { name: 'O-05 中階定點跳視 I (雙層八面晶體 14Δ 隨機方位急跳合像)', shape: 'crystal8', axis: 'saccade', mode: 'crossover', fill: true, stereo: 0.05, size: 280, dist: 14.0, v_prism: 0, speed: 15, thick: 8.0, duration: 60, anim: 'saccade_vergence' },
        { name: 'O-06 中階定點跳視 II (陀螺儀準星 18Δ 廣域跳視與結構瞬換)', shape: 'gyro_cross', axis: 'saccade', mode: 'crossover', fill: true, stereo: 0.06, size: 260, dist: 18.0, v_prism: 0, speed: 16, thick: 8.0, duration: 60, anim: 'saccade_vergence,swap_flash' },
        { name: 'O-07 🌿 90秒全向拮抗肌同步放鬆 (零垂直壓差同心圓筒全向水波卸載)', shape: 'circle5', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: 0.02, size: 390, dist: -2.5, v_prism: 0, speed: 6, thick: 8.5, duration: 90, anim: 'antagonist_relax' },
        { name: 'O-08 高階垂直雙向極限 A (陀螺儀 1.2Δ 超慢速左右眼上下深度互調)', shape: 'gyro_cross', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.07, size: 255, dist: 8.0, v_prism: 1.2, speed: 4, thick: 8.0, duration: 60, anim: 'vert_smooth_alt,swap_flash' },
        { name: 'O-09 高階垂直雙向極限 B (八角對位鎖 1.4Δ 左右眼上下階梯停留鎖定)', shape: 'dichoptic_lock', axis: 'horizontal', mode: 'crossover', fill: true, stereo: 0.08, size: 240, dist: 10.0, v_prism: 1.4, speed: 4, thick: 8.0, duration: 60, anim: 'vert_step_alt,swap_flash' },
        { name: 'O-10 巔峰三維跳視整合 (精密陀螺儀 24Δ 隨機方位瞬時鎖定)', shape: 'gyro_cross', axis: 'saccade', mode: 'crossover', fill: true, stereo: 0.10, size: 225, dist: 24.0, v_prism: 0, speed: 18, thick: 7.5, duration: 60, anim: 'saccade_vergence,swap_flash_fast' }
    ],

    // ========================================================================
    // 🟥 [ P 鍵 ] 高頻字體對焦與聚散解綁專武 (100% 高對比清晰字母視標，專練 BOP 與 BIM 調節解綁)
    // ========================================================================
    'KeyP': [
        { name: 'P-01 初階調節喚醒 (清晰大視標 4Δ 雙眼同步對焦鎖定)', shape: 'text', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.02, size: 370, dist: 4.0, v_prism: 0, speed: 12, thick: 9.0, duration: 60, anim: 'text_bop' },
        { name: 'P-02 初階 BIM 開散解綁 I (外展 -3.5Δ 同時維持字母邊緣銳利)', shape: 'text', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: -0.02, size: 345, dist: -3.5, v_prism: 0, speed: 12, thick: 8.5, duration: 60, anim: 'text_bim' },
        { name: 'P-03 初階 BOP 內聚解綁 I (內聚 10Δ 保持睫狀肌放鬆不模糊)', shape: 'text', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.03, size: 325, dist: 10.0, v_prism: 0, speed: 12, thick: 8.5, duration: 60, anim: 'text_bop' },
        { name: 'P-04 中階 BIM 開散解綁 II (外展 -5.5Δ 負融像調節解綁)', shape: 'text', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: -0.04, size: 305, dist: -5.5, v_prism: 0, speed: 14, thick: 8.0, duration: 60, anim: 'text_bim' },
        { name: 'P-05 中階 BOP 內聚解綁 II (內聚 16Δ 穩定維持字母清晰度)', shape: 'text', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.05, size: 285, dist: 16.0, v_prism: 0, speed: 14, thick: 8.0, duration: 60, anim: 'text_bop' },
        { name: 'P-06 中階雙向調節推拉 (清晰字體於內聚與微開散間平滑收放)', shape: 'text', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.06, size: 270, dist: 18.0, v_prism: 0, speed: 15, thick: 8.0, duration: 60, anim: 'text_trombone' },
        { name: 'P-07 🌿 90秒全向拮抗肌同步放鬆 (10層蟲洞隧道微開散深層卸載睫狀肌)', shape: 'depth_tunnel', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: -0.02, size: 390, dist: -3.5, v_prism: 0, speed: 6, thick: 8.5, duration: 90, anim: 'antagonist_relax' },
        { name: 'P-08 高階 BIM 極限開散解綁 (外展 -7.0Δ 生理極限負融像對焦)', shape: 'text', axis: 'horizontal', mode: 'oneway_bi', fill: false, stereo: -0.06, size: 255, dist: -7.0, v_prism: 0, speed: 15, thick: 7.5, duration: 60, anim: 'text_bim' },
        { name: 'P-09 高階 BOP 強效內聚解綁 (內聚 24Δ 高負荷對焦彈性鎖定)', shape: 'text', axis: 'horizontal', mode: 'oneway_bo', fill: false, stereo: 0.09, size: 240, dist: 24.0, v_prism: 0, speed: 16, thick: 7.5, duration: 60, anim: 'text_bop' },
        { name: 'P-10 巔峰虛擬翻轉鏡挑戰 (精緻字體 28Δ 雙向階躍瞬間對焦收放)', shape: 'text', axis: 'horizontal', mode: 'crossover', fill: false, stereo: 0.11, size: 230, dist: 28.0, v_prism: 0, speed: 0, thick: 7.5, duration: 60, anim: 'text_flipper_fast' }
    ]
};
