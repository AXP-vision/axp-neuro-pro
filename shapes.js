// shapes.js - AXP Neuro-Optic Engine v30.0 (三大神經光學黑科技視標 × 黃金粗細比例 × 零紫色殘影版)
// 核心黑科技武裝：
// 1. gyro_cross (航太三軸陀螺儀準星鎖)：12刻度共視羅盤 + 雙眼互補測距環翼與十字游標尺，支援結構瞬換破抑制
// 2. depth_tunnel (10層立體深度蟲洞隧道)：非線性對數間距之圓環與八角艙交錯結構，創造極致 SILO 三維空間縱深
// 3. golden_spiral (費馬黃金螺旋視動光流陣)：依黃金角度 137.5 度排列之 88 顆雙眼分視光點陣，擴張周邊視野並卸載眼肌張力
// 4. 所有單層雙眼分視靶皆嚴格封裝於單一 unitGroup 內，100% 杜絕立體視差拆歪零件造成的獨立紫色殘影

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

function createWireframeTubes(geometry, thickness) {
    const edges = new THREE.EdgesGeometry(geometry);
    const pos = edges.attributes.position;
    const group = new THREE.Group();
    
    const size = Math.max(1.0, thickness * 0.20); 
    const boxGeo = new THREE.BoxGeometry(size, 1, size); 
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const v1 = new THREE.Vector3();
    const v2 = new THREE.Vector3();
    const mid = new THREE.Vector3();

    for (let i = 0; i < pos.count; i += 2) {
        v1.fromBufferAttribute(pos, i);
        v2.fromBufferAttribute(pos, i + 1);

        const dist = v1.distanceTo(v2);
        if(dist < 0.001) continue;

        mid.addVectors(v1, v2).multiplyScalar(0.5);

        const mesh = new THREE.Mesh(boxGeo, mat);
        mesh.position.copy(mid);
        mesh.scale.set(1, dist, 1); 
        
        const dir = new THREE.Vector3().subVectors(v2, v1).normalize();
        mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        group.add(mesh);
    }
    return group;
}

export function createTarget(shapeType, colorHex, isFilled, textStr, thickness, eyeSide = 'both') {
    const rootGroup = new THREE.Group();
    
    let layers = 1;
    if (shapeType.includes('5')) layers = 5;
    if (shapeType.includes('3')) layers = 3;

    const solidMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        roughness: 0.42, 
        metalness: 0.22,
        side: THREE.DoubleSide
    });

    // 100% 純淨無陰影平面材質：專供 OEPF 紅藍分視靶使用，徹底消除邊緣半透明高光引起的鬼影
    const pureFlatMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        side: THREE.DoubleSide
    });

    // =========================================================================
    // 🧭 黑科技一：航太三軸陀螺儀準星鎖 (gyro_cross)
    // 專攻 KeyY 去抑制與 KeyO 垂直眼位微調，支援「圓環平衡翼 <-> 十字游標尺」瞬態角色互換
    // =========================================================================
    if (shapeType === 'gyro_cross') {
        const unitGroup = new THREE.Group();
        const barW = Math.max(5.5, thickness * 0.88);
        const ringW = Math.max(5.0, thickness * 0.82);

        // 1. 雙眼共視之最外層航太羅盤鎖定環 (半徑 136) + 12 道精密方位刻度
        const outerCompass = new THREE.Mesh(new THREE.RingGeometry(136 - ringW * 0.55, 136 + ringW * 0.55, 64), pureFlatMaterial);
        unitGroup.add(outerCompass);

        for (let a = 0; a < 12; a++) {
            if (a % 3 === 0) continue; // 避開上下左右主軸，留給內部互補刻度
            const rad = (a * 30 * Math.PI) / 180;
            const tick = new THREE.Mesh(new THREE.BoxGeometry(barW * 0.55, 12, 2), pureFlatMaterial);
            tick.position.set(Math.sin(rad) * 126, Math.cos(rad) * 126, 0);
            tick.rotation.z = -rad;
            unitGroup.add(tick);
        }

        if (eyeSide === 'left') {
            // 【陀螺儀外環與水平平衡翼通道】：雙層同心測距環 + 左右水平穩定翼 + 四角斜向準星
            const midGyroRing = new THREE.Mesh(new THREE.RingGeometry(90 - ringW * 0.85, 90 + ringW * 0.85, 64), pureFlatMaterial);
            const innerGyroRing = new THREE.Mesh(new THREE.RingGeometry(42 - ringW * 0.65, 42 + ringW * 0.65, 48), pureFlatMaterial);
            
            const leftWing = new THREE.Mesh(new THREE.BoxGeometry(36, barW * 1.15, 2), pureFlatMaterial);
            const rightWing = new THREE.Mesh(new THREE.BoxGeometry(36, barW * 1.15, 2), pureFlatMaterial);
            leftWing.position.set(-112, 0, 0);
            rightWing.position.set(112, 0, 0);

            unitGroup.add(midGyroRing, innerGyroRing, leftWing, rightWing);
        } else if (eyeSide === 'right') {
            // 【陀螺儀中心十字與垂直高度尺通道】：中央精準十字靶 + 上下垂直高度槽 + 實心核心點
            const hAxis = new THREE.Mesh(new THREE.BoxGeometry(164, barW * 0.9, 2), pureFlatMaterial);
            const vAxis = new THREE.Mesh(new THREE.BoxGeometry(barW * 0.9, 224, 2), pureFlatMaterial);
            
            // 上下水平對位橫槓 (當雙眼合像時，剛好與另一眼的 90 半徑測距環完美切齊)
            const topBar = new THREE.Mesh(new THREE.BoxGeometry(44, barW * 0.85, 2), pureFlatMaterial);
            const botBar = new THREE.Mesh(new THREE.BoxGeometry(44, barW * 0.85, 2), pureFlatMaterial);
            topBar.position.set(0, 90, 0);
            botBar.position.set(0, -90, 0);

            const centerCore = new THREE.Mesh(new THREE.CircleGeometry(Math.max(9.5, barW * 1.25), 32), pureFlatMaterial);
            centerCore.position.set(0, 0, 1);

            unitGroup.add(hAxis, vAxis, topBar, botBar, centerCore);
        }
        rootGroup.add(unitGroup);
    }
    // =========================================================================
    // 🌀 黑科技二：10 層非線性對數立體深度蟲洞隧道 (depth_tunnel)
    // 專攻 KeyI 之 SILO 立體景深融像：奇數層為八角航太框，偶數層為精密圓環，產生強烈三維縱深感
    // (注意：此視標直接在 rootGroup 下生成 8 層獨立子節點，讓 app.js 自動施加層間立體視差梯度)
    // =========================================================================
    else if (shapeType === 'depth_tunnel') {
        const tunnelLayers = 8;
        const baseTube = Math.max(2.6, thickness * 0.55);

        for (let i = 0; i < tunnelLayers; i++) {
            // 非線性對數半徑分佈：由內層 (半徑 22) 向外層 (半徑 142) 漸進擴張
            const t = i / (tunnelLayers - 1);
            const radius = 22 + Math.pow(t, 1.15) * 120;
            const ringThick = baseTube * (0.65 + 0.55 * t);
            const segs = (i % 2 === 0) ? 64 : 8; // 圓環與八角框交錯，強化視網膜視差鎖定
            
            const layerGroup = new THREE.Group();
            const ringMesh = new THREE.Mesh(new THREE.RingGeometry(radius - ringThick, radius + ringThick, segs), pureFlatMaterial);
            if (segs === 8) ringMesh.rotation.z = Math.PI / 8;
            layerGroup.add(ringMesh);

            // 在最深處的第 0 層中心放入立體對位晶核，引導中心窩鎖定隧道盡頭
            if (i === 0) {
                const centerDot = new THREE.Mesh(new THREE.CircleGeometry(8.5, 24), pureFlatMaterial);
                layerGroup.add(centerDot);
            }
            layerGroup.position.z = i * 2.0;
            rootGroup.add(layerGroup);
        }
    }
    // =========================================================================
    // 🌌 黑科技三：費馬黃金螺旋視動光流陣 (golden_spiral)
    // 專攻 KeyU 周邊視野擴張與第 7 階 90 秒全向眼外肌放鬆：依 137.508 度黃金角排列
    // =========================================================================
    else if (shapeType === 'golden_spiral') {
        const unitGroup = new THREE.Group();
        const barW = Math.max(5.0, thickness * 0.8);

        // 中央穩定融合錨點 (左眼圓環 + 右眼十字，確保觀看螺旋光流時中央仍維持精準合像)
        const centerAnchorRing = new THREE.Mesh(new THREE.RingGeometry(20 - barW * 0.5, 20 + barW * 0.5, 32), pureFlatMaterial);
        unitGroup.add(centerAnchorRing);

        if (eyeSide === 'left') {
            const vTick = new THREE.Mesh(new THREE.BoxGeometry(barW * 0.7, 30, 2), pureFlatMaterial);
            unitGroup.add(vTick);
        } else if (eyeSide === 'right') {
            const hTick = new THREE.Mesh(new THREE.BoxGeometry(30, barW * 0.7, 2), pureFlatMaterial);
            unitGroup.add(hTick);
        }

        // 費馬黃金螺旋陣列 (84 顆幾何光點，依黃金角 137.508 度向四周 360 度均勻發散)
        const totalNodes = 84;
        const goldenAngle = 137.507764 * (Math.PI / 180);

        for (let n = 6; n < totalNodes; n++) {
            // 將螺旋光點奇偶交錯分配給左眼與右眼，加上外圍共視點，形成立體雙眼螺旋場
            const isLeftNode = (n % 2 === 0);
            const isCommonNode = (n % 5 === 0);
            if (!isCommonNode) {
                if (eyeSide === 'left' && !isLeftNode) continue;
                if (eyeSide === 'right' && isLeftNode) continue;
            }

            const r = 14.8 * Math.sqrt(n); // 最大半徑推展至約 135
            const theta = n * goldenAngle;
            const nodeSize = Math.max(3.2, (thickness * 0.48) * (0.55 + (n / totalNodes) * 0.65));
            
            const nodeGeo = (n % 3 === 0) 
                ? new THREE.RingGeometry(nodeSize * 0.5, nodeSize * 1.15, 6)
                : new THREE.CircleGeometry(nodeSize, 16);
            const nodeMesh = new THREE.Mesh(nodeGeo, pureFlatMaterial);
            nodeMesh.position.set(r * Math.cos(theta), r * Math.sin(theta), 0);
            nodeMesh.rotation.z = theta;
            unitGroup.add(nodeMesh);
        }
        rootGroup.add(unitGroup);
    }
    // =========================================================================
    // ➕ 經典黃金比例「圓圈 vs. 十字」雙眼互補靶 (dichoptic_cross)
    // =========================================================================
    else if (shapeType === 'dichoptic_cross') {
        const unitGroup = new THREE.Group();
        const barW = Math.max(6.0, thickness * 0.95);
        const ringW = Math.max(5.2, thickness * 0.85);

        const lockRing = new THREE.Mesh(new THREE.RingGeometry(132 - ringW * 0.6, 132 + ringW * 0.6, 64), pureFlatMaterial);
        unitGroup.add(lockRing);

        if (eyeSide === 'left') {
            const mainCircle = new THREE.Mesh(new THREE.RingGeometry(82 - ringW, 82 + ringW, 64), pureFlatMaterial);
            const innerCircle = new THREE.Mesh(new THREE.RingGeometry(36 - ringW * 0.7, 36 + ringW * 0.7, 48), pureFlatMaterial);
            unitGroup.add(mainCircle, innerCircle);
        } else if (eyeSide === 'right') {
            const hLine = new THREE.Mesh(new THREE.BoxGeometry(210, barW, 2), pureFlatMaterial);
            const vLine = new THREE.Mesh(new THREE.BoxGeometry(barW, 210, 2), pureFlatMaterial);
            const centerDot = new THREE.Mesh(new THREE.CircleGeometry(Math.max(10, barW * 1.25), 32), pureFlatMaterial);
            centerDot.position.set(0, 0, 1);
            unitGroup.add(hLine, vLine, centerDot);
        }
        rootGroup.add(unitGroup);
    }
    // =========================================================================
    // 💠 雙眼分視八角外框與晶核對位鎖 (dichoptic_lock)
    // =========================================================================
    else if (shapeType === 'dichoptic_lock') {
        const unitGroup = new THREE.Group();
        const barThick = Math.max(5.8, thickness * 0.90);

        const commonBaseRing = new THREE.Mesh(new THREE.RingGeometry(132 - barThick * 0.6, 132 + barThick * 0.6, 8), pureFlatMaterial);
        commonBaseRing.rotation.z = Math.PI / 8;
        unitGroup.add(commonBaseRing);

        if (eyeSide === 'left') {
            const midRing = new THREE.Mesh(new THREE.RingGeometry(84 - barThick * 0.8, 84 + barThick * 0.8, 64), pureFlatMaterial);
            const topTick = new THREE.Mesh(new THREE.BoxGeometry(barThick, 46, 2), pureFlatMaterial);
            const botTick = new THREE.Mesh(new THREE.BoxGeometry(barThick, 46, 2), pureFlatMaterial);
            topTick.position.set(0, 108, 0);
            botTick.position.set(0, -108, 0);
            unitGroup.add(midRing, topTick, botTick);
        } else if (eyeSide === 'right') {
            const coreGeo = new THREE.OctahedronGeometry(46, 0);
            const coreMesh = isFilled ? new THREE.Mesh(coreGeo, pureFlatMaterial) : createWireframeTubes(coreGeo, thickness);
            const leftTick = new THREE.Mesh(new THREE.BoxGeometry(46, barThick, 2), pureFlatMaterial);
            const rightTick = new THREE.Mesh(new THREE.BoxGeometry(46, barThick, 2), pureFlatMaterial);
            leftTick.position.set(-108, 0, 0);
            rightTick.position.set(108, 0, 0);
            unitGroup.add(coreMesh, leftTick, rightTick);
        }
        rootGroup.add(unitGroup);
    }
    else if (shapeType.startsWith('circle')) {
        for (let i = 0; i < layers; i++) {
            const radius = 32 + i * 28;
            let mesh;
            if (isFilled) {
                const geo = new THREE.CircleGeometry(radius, 64);
                mesh = new THREE.Mesh(geo, solidMaterial);
            } else {
                const tubeW = Math.max(3.0, thickness * 0.75);
                const geo = new THREE.RingGeometry(radius - tubeW, radius + tubeW, 64);
                mesh = new THREE.Mesh(geo, pureFlatMaterial);
            }
            mesh.position.z = i * 0.1;
            rootGroup.add(mesh);
        }
    }
    else if (shapeType.startsWith('star')) {
        for (let i = 0; i < layers; i++) {
            const outer = 42 + i * 28;
            const inner = outer * 0.48;
            const starShape = new THREE.Shape();
            for (let j = 0; j < 10; j++) {
                const r = (j % 2 === 0) ? outer : inner;
                const a = (j / 10) * Math.PI * 2 + Math.PI / 2;
                if (j === 0) starShape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
                else starShape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
            starShape.closePath();

            if (isFilled) {
                const geo = new THREE.ShapeGeometry(starShape);
                const mesh = new THREE.Mesh(geo, solidMaterial);
                mesh.position.z = i * 0.1;
                rootGroup.add(mesh);
            } else {
                const geo = new THREE.ExtrudeGeometry(starShape, { depth: 0.1, bevelEnabled: false });
                const wireframe = createWireframeTubes(geo, thickness * 1.1);
                wireframe.position.z = i * 0.1;
                rootGroup.add(wireframe);
            }
        }
    }
    else if (shapeType.startsWith('sphere')) {
        for (let i = 0; i < layers; i++) {
            const radius = 40 + i * 28;
            const geo = new THREE.SphereGeometry(radius, 24, 18);
            let layerMesh = isFilled ? new THREE.Mesh(geo, solidMaterial) : createWireframeTubes(geo, thickness * 1.1);
            layerMesh.rotation.set(0.6, 0.4, 0); 
            rootGroup.add(layerMesh);
        }
    }
    else if (shapeType === 'crystal8') {
        const geoOuter = new THREE.OctahedronGeometry(95, 0);
        const geoInner = new THREE.OctahedronGeometry(50, 0);

        let layerOuter = isFilled ? new THREE.Mesh(geoOuter, solidMaterial) : createWireframeTubes(geoOuter, thickness * 1.1);
        let layerInner = isFilled ? new THREE.Mesh(geoInner, pureFlatMaterial) : createWireframeTubes(geoInner, Math.max(2.0, thickness * 0.9));

        layerOuter.rotation.set(Math.PI / 4, 0, Math.PI / 4);
        layerInner.rotation.set(Math.PI / 4, 0, Math.PI / 4);

        rootGroup.add(layerOuter, layerInner);
    }
    else if (shapeType === 'torusKnot') {
        const geoKnot = new THREE.TorusKnotGeometry(55, 15, 128, 16);
        let meshKnot = isFilled ? new THREE.Mesh(geoKnot, solidMaterial) : createWireframeTubes(geoKnot, thickness * 1.1);
        rootGroup.add(meshKnot);
    }
    else if (shapeType === 'nested_dodeca') {
        const geoOuter = new THREE.DodecahedronGeometry(88, 0);
        const geoInner = new THREE.DodecahedronGeometry(46, 0);

        let layerOuter = isFilled ? new THREE.Mesh(geoOuter, solidMaterial) : createWireframeTubes(geoOuter, thickness * 1.1);
        let layerInner = isFilled ? new THREE.Mesh(geoInner, pureFlatMaterial) : createWireframeTubes(geoInner, Math.max(2.0, thickness * 0.9));

        layerOuter.rotation.set(0.2, 0.3, 0);
        layerInner.rotation.set(-0.2, -0.3, 0);

        rootGroup.add(layerOuter, layerInner);
    }
    else if (shapeType === 'text') {
        const unitGroup = new THREE.Group();
        const canvas = document.createElement('canvas');
        canvas.width = 512; 
        canvas.height = 160; 
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 512, 160);
        ctx.fillStyle = 'white'; 
        ctx.font = '900 88px "Montserrat", monospace';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        
        ctx.fillText((textStr || 'H O T V').substring(0, 9), 256, 80); 
        
        const imgData = ctx.getImageData(0, 0, 512, 160).data;
        const voxelSize = Math.max(2.0, thickness * 0.35);
        const boxGeo = new THREE.BoxGeometry(voxelSize * 1.4, voxelSize * 1.4, voxelSize * 2.5); 

        for (let y = 0; y < 160; y += 3) {
            for (let x = 0; x < 512; x += 3) {
                const i = (y * 512 + x) * 4;
                if (imgData[i] > 140) {
                    const mesh = new THREE.Mesh(boxGeo, pureFlatMaterial);
                    mesh.position.set((x - 256) * 0.72, (80 - y) * 0.72, 0);
                    unitGroup.add(mesh);
                }
            }
        }
        rootGroup.add(unitGroup);
    }

    return rootGroup;
}
