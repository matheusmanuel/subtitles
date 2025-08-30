const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Entrada: node index.js video.mkv
const inputVideo = process.argv[2];

if (!inputVideo) {
  console.error('❌ Informe o nome do vídeo. Ex: node legenda.js 01.mkv');
  process.exit(1);
}

const videoPath = path.resolve(inputVideo);
const ext = path.extname(videoPath);
const baseName = path.basename(videoPath, ext);
const audioPath = `${baseName}.wav`;
const srtInput = `${audioPath}.srt`;
const srtFinal = `${baseName}.srt`;

try {
  console.log('[1/2] Extraindo áudio...');
  execSync(`ffmpeg -y -i "${videoPath}" -vn -acodec pcm_s16le -ar 16000 -ac 1 "${audioPath}"`, { stdio: 'inherit' });

  console.log('[2/2] Transcrevendo e traduzindo com Whisper...');
  execSync(`whisper "${audioPath}" --task translate --language en --model medium --output_format srt --fp16 False`, { stdio: 'inherit' });

  if (fs.existsSync(srtInput)) {
    fs.renameSync(srtInput, srtFinal);
    console.log(`[✔] Legenda traduzida gerada: ${srtFinal}`);
  } else {
    throw new Error('Legenda não foi criada pelo Whisper.');
  }

} catch (err) {
  console.error('\n❌ Erro durante o processo:', err.message);
}
