const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const outDir = path.join(__dirname, '..', 'public', 'assets', 'frames');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
} else {
  // Clear directory
  fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));
}

console.log('Extracting JPG frames from public/assets/hero_scroll_video.mp4...');
// fps=7 over 16.17s yields ~113 frames. At scale=1440:-1 and q:v 4, each frame is ~45-55 KB!
const inputVideo = path.join(__dirname, '..', 'public', 'assets', 'hero_scroll_video.mp4');
const outputPattern = path.join(outDir, 'frame_%04d.jpg');

const cmd = `"${ffmpeg}" -i "${inputVideo}" -vf "fps=7,scale=1440:-1" -q:v 4 "${outputPattern}" -y`;
console.log('Running:', cmd);
execSync(cmd, { stdio: 'inherit' });

const files = fs.readdirSync(outDir).filter(f => f.endsWith('.jpg')).sort();
console.log(`Successfully extracted ${files.length} frames to ${outDir}`);

let totalBytes = 0;
files.forEach(f => {
  totalBytes += fs.statSync(path.join(outDir, f)).size;
});
console.log(`Total sequence size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Average per frame: ${(totalBytes / files.length / 1024).toFixed(1)} KB`);
