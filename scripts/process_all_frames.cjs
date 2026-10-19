const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const inputDir = path.join(__dirname, '..', 'scratch', 'frames', 'all');
const outDir = path.join(__dirname, '..', 'public', 'assets', 'frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
} else {
  // Clear out old frames
  fs.readdirSync(outDir).forEach(f => {
    if (f.endsWith('.jpg') || f.endsWith('.webp')) {
      fs.unlinkSync(path.join(outDir, f));
    }
  });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg')).sort();
console.log(`Processing ${files.length} frames from ${inputDir} -> ${outDir}...`);

const CONCURRENCY = 6;
let nextIndex = 0;
let completed = 0;
const t0 = Date.now();

function processNext() {
  if (nextIndex >= files.length) return Promise.resolve();

  const file = files[nextIndex++];
  const src = path.join(inputDir, file);
  const dest = path.join(outDir, file);

  return new Promise((resolve) => {
    // Resize 3840x2160 -> 1920x1080 with high-quality Lanczos resampling and q:v 4
    const proc = spawn(ffmpeg, [
      '-i', src,
      '-vf', 'scale=1920:1080:flags=lanczos',
      '-q:v', '4',
      dest,
      '-y'
    ]);

    proc.on('close', (code) => {
      completed++;
      if (completed % 50 === 0 || completed === files.length) {
        const pct = Math.round((completed / files.length) * 100);
        const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
        console.log(`[${pct}%] ${completed}/${files.length} frames processed (${elapsed}s)...`);
      }
      resolve(processNext());
    });

    proc.on('error', (err) => {
      console.error(`Error processing ${file}:`, err);
      resolve(processNext());
    });
  });
}

const workers = [];
for (let i = 0; i < CONCURRENCY; i++) {
  workers.push(processNext());
}

Promise.all(workers).then(() => {
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`All ${files.length} frames processed in ${elapsed}s!`);
  
  const outFiles = fs.readdirSync(outDir).filter(f => f.endsWith('.jpg'));
  let totalBytes = 0;
  outFiles.forEach(f => {
    totalBytes += fs.statSync(path.join(outDir, f)).size;
  });
  console.log(`Total output size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Average frame size: ${(totalBytes / outFiles.length / 1024).toFixed(1)} KB`);
});
