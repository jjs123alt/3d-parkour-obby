const gameContainer = document.getElementById("gameContainer");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x091521);
scene.fog = new THREE.Fog(0x091521, 60, 220);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.rotation.order = "YXZ";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
gameContainer.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 0.65);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 1.0);
sun.position.set(20, 35, 20);
sun.castShadow = true;
sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;
sun.shadow.camera.left = -80;
sun.shadow.camera.right = 80;
sun.shadow.camera.top = 80;
sun.shadow.camera.bottom = -80;
sun.shadow.camera.near = 0.1;
sun.shadow.camera.far = 220;
scene.add(sun);

const glow = new THREE.PointLight(0x38d39b, 0.8, 200);
glow.position.set(0, 12, 0);
scene.add(glow);

const skyGlow = new THREE.PointLight(0x66c7ff, 0.6, 200);
skyGlow.position.set(40, 30, -20);
scene.add(skyGlow);

const ui = {
  levelTitle: document.getElementById("levelTitle"),
  speed: document.getElementById("speedValue"),
  height: document.getElementById("heightValue"),
  time: document.getElementById("timeValue"),
  overPanel: document.getElementById("gameOverPanel"),
  completePanel: document.getElementById("levelCompletePanel"),
  completeText: document.getElementById("levelCompleteText"),
  restartBtn: document.getElementById("restartBtn"),
  nextBtn: document.getElementById("nextLevelBtn")
};

const player = {
  position: new THREE.Vector3(0, 5, 0),
  velocity: new THREE.Vector3(0, 0, 0),
  acceleration: new THREE.Vector3(0, 0, 0),
  radius: 0.45,
  height: 1.8,
  yaw: 0,
  pitch: 0,
  grounded: false,
  jumpReady: true,
  active: true
};

const input = {
  keys: {},
  pointerLocked: false,
  mouseX: 0,
  mouseY: 0,
  jumpHeld: false
};

const world = {
  platforms: [],
  finish: null,
  levelIndex: 0,
  startedAt: performance.now(),
  running: true
};

function createPlatform(data) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(data.w, data.h, data.d),
    new THREE.MeshStandardMaterial({
      color: data.color,
      metalness: 0.2,
      roughness: 0.75
    })
  );
  mesh.position.set(data.x, data.y, data.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

function createFinish(x, y, z) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(4, 1, 4),
    new THREE.MeshStandardMaterial({
      color: 0x38d39b,
      emissive: 0x1aa86d,
      emissiveIntensity: 0.9,
      metalness: 0.5,
      roughness: 0.25
    })
  );
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

function clearWorld() {
  for (let i = scene.children.length - 1; i >= 0; i--) {
    const child = scene.children[i];
    if (child !== ambient && child !== sun && child !== glow && child !== skyGlow && child !== camera) {
      scene.remove(child);
    }
  }
  world.platforms = [];
  world.finish = null;
}

function loadLevel(index) {
  clearWorld();
  const level = levels[index];
  world.levelIndex = index;
  world.startedAt = performance.now();
  world.running = true;

  player.position.set(level.start.x, level.start.y, level.start.z);
  player.velocity.set(0, 0, 0);
  player.acceleration.set(0, 0, 0);
  player.yaw = 0;
  player.pitch = 0;
  player.grounded = false;
  player.jumpReady = true;

  for (const p of level.platforms) {
    world.platforms.push(createPlatform(p));
  }

  world.finish = createFinish(level.finish.x, level.finish.y, level.finish.z);

  ui.levelTitle.textContent = `Level ${index + 1}: ${level.name}`;
  ui.overPanel.style.display = "none";
  ui.completePanel.style.display = "none";

  camera.position.set(player.position.x, player.position.y + player.height, player.position.z);
  camera.rotation.set(0, 0, 0);
}

function showGameOver() {
  world.running = false;
  ui.overPanel.style.display = "block";
}

function showLevelComplete() {
  world.running = false;
  const seconds = Math.floor((performance.now() - world.startedAt) / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  ui.completeText.textContent =
    world.levelIndex === levels.length - 1
      ? `You beat all ${levels.length} levels in ${mins}:${String(secs).padStart(2, "0")}!`
      : `Completed in ${mins}:${String(secs).padStart(2, "0")}.`;

  ui.completePanel.style.display = "block";
}

ui.restartBtn.addEventListener("click", () => {
  ui.overPanel.style.display = "none";
  loadLevel(world.levelIndex);
});

ui.nextBtn.addEventListener("click", () => {
  ui.completePanel.style.display = "none";
  const nextIndex = world.levelIndex >= levels.length - 1 ? 0 : world.levelIndex + 1;
  loadLevel(nextIndex);
});

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  input.keys[key] = true;
  if (key === " ") input.jumpHeld = true;
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  input.keys[key] = false;
  if (key === " ") input.jumpHeld = false;
});

window.addEventListener("mousemove", (event) => {
  if (!input.pointerLocked) return;
  input.mouseX = event.movementX * 0.0024;
  input.mouseY = event.movementY * 0.0024;
  player.yaw -= input.mouseX;
  player.pitch -= input.mouseY;
  player.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, player.pitch));
});

document.addEventListener("click", () => {
  if (!input.pointerLocked) document.body.requestPointerLock();
});

document.addEventListener("pointerlockchange", () => {
  input.pointerLocked = document.pointerLockElement === document.body;
});

function updatePlayerPhysics() {
  const forward = new THREE.Vector3(Math.sin(player.yaw), 0, Math.cos(player.yaw));
  const right = new THREE.Vector3(Math.cos(player.yaw), 0, -Math.sin(player.yaw));
  const move = new THREE.Vector3();

  if (input.keys["w"] || input.keys["arrowup"]) move.add(forward);
  if (input.keys["s"] || input.keys["arrowdown"]) move.sub(forward);
  if (input.keys["a"] || input.keys["arrowleft"]) move.sub(right);
  if (input.keys["d"] || input.keys["arrowright"]) move.add(right);

  const moveSpeed = 0.175;
  if (move.lengthSq() > 0) {
    move.normalize();
    player.acceleration.x = move.x * moveSpeed;
    player.acceleration.z = move.z * moveSpeed;
  } else {
    player.acceleration.x *= 0.75;
    player.acceleration.z *= 0.75;
  }

  if (player.grounded && (input.keys[" "] || input.keys["space"])) {
    player.velocity.y = 0.72;
    player.grounded = false;
    player.jumpReady = false;
  }

  if (!input.keys[" "] && !input.keys["space"]) {
    player.jumpReady = true;
  }

  player.velocity.x = player.acceleration.x;
  player.velocity.z = player.acceleration.z;
  player.velocity.y -= 0.017;
  if (player.velocity.y < -0.9) player.velocity.y = -0.9;

  const oldY = player.position.y;
  const nextX = player.position.x + player.velocity.x;
  const nextZ = player.position.z + player.velocity.z;
  const nextY = player.position.y + player.velocity.y;

  player.position.x = nextX;
  player.position.z = nextZ;
  player.position.y = nextY;

  player.grounded = false;
  for (const platform of world.platforms) {
    const halfW = platform.geometry.parameters.width / 2;
    const halfH = platform.geometry.parameters.height / 2;
    const halfD = platform.geometry.parameters.depth / 2;

    const minX = platform.position.x - halfW;
    const maxX = platform.position.x + halfW;
    const minY = platform.position.y - halfH;
    const maxY = platform.position.y + halfH;
    const minZ = platform.position.z - halfD;
    const maxZ = platform.position.z + halfD;

    const insideXZ =
      player.position.x > minX && player.position.x < maxX &&
      player.position.z > minZ && player.position.z < maxZ;

    if (insideXZ && oldY >= maxY - 0.1 && player.position.y <= maxY + 0.5 && player.velocity.y < 0) {
      player.position.y = maxY + player.radius + 0.15;
      player.velocity.y = 0;
      player.grounded = true;
    }
  }

  const finish = world.finish;
  if (finish) {
    const dx = Math.abs(player.position.x - finish.position.x);
    const dy = Math.abs(player.position.y - finish.position.y);
    const dz = Math.abs(player.position.z - finish.position.z);
    if (dx < 2.2 && dy < 1.4 && dz < 2.2) {
      showLevelComplete();
    }
  }

  if (player.position.y < -25) {
    showGameOver();
  }

  camera.position.set(player.position.x, player.position.y + player.height, player.position.z);
  camera.rotation.y = player.yaw;
  camera.rotation.x = player.pitch;
}

function updateHUD() {
  const speed = Math.sqrt(
    player.velocity.x * player.velocity.x + player.velocity.z * player.velocity.z
  );
  ui.speed.textContent = speed.toFixed(2);
  ui.height.textContent = Math.max(0, player.position.y).toFixed(2);

  const elapsed = Math.floor((performance.now() - world.startedAt) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  ui.time.textContent = `${mins}:${String(secs).padStart(2, "0")}`;
}

function animate() {
  requestAnimationFrame(animate);

  if (world.running) {
    updatePlayerPhysics();
    updateHUD();
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

loadLevel(0);
animate();
