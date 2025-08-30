# 🎬 Gerador de Legendas Traduzidas com Whisper + FFmpeg

Este projeto permite **extrair o áudio de um vídeo**, transcrever com o **Whisper** e gerar uma legenda (`.srt`) **traduzida para inglês**.

---

## 🚀 Pré-requisitos

Antes de rodar o script, você precisa ter instalado no seu sistema:

1. **Node.js** (versão 16+)

   - [Download Node.js](https://nodejs.org/)

2. **FFmpeg** (para extrair o áudio do vídeo)

   - Linux (Ubuntu/Debian):
     ```bash
     sudo apt update && sudo apt install ffmpeg -y
     ```
   - Mac (via Homebrew):
     ```bash
     brew install ffmpeg
     ```
   - Windows:
     - Baixe em: [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
     - Adicione o binário ao PATH.

3. **Whisper** (CLI para transcrição/tradução com IA da OpenAI)
   - Recomendado instalar via `pip`:
     ```bash
     pip install git+https://github.com/openai/whisper.git
     ```
   - Também precisa do **ffmpeg** instalado (já listado acima).
   - Caso queira usar CUDA/GPU (opcional), instale PyTorch com suporte CUDA:
     ```bash
     pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
     ```

---

## ▶️ Como rodar

1. Clone este repositório

2. Execute o comando ``npm install`` dentro da pasta do projeto.

3. Execute o script passando o vídeo como parâmetro:

````bash
node index.js meu_video.mkv

## ⚠️ Possíveis problemas

- **Erro "whisper: command not found"**
  → Verifique se o Whisper foi instalado globalmente com `pip install` e se o PATH do Python está configurado.

- **Erro "ffmpeg not found"**
  → Instale o FFmpeg conforme instruções acima.

- **Problema de performance**
  → Modelos maiores do Whisper (`medium`, `large`) são mais precisos mas exigem mais RAM e GPU.
  Você pode trocar o modelo no script (linha do `execSync`) para `small` ou `base`:
  ```bash
  whisper "arquivo.wav" --model small
````

## Exemplos de uso real
```js
  node index.js aula_online.mp4
```

## Saída

```bash
[1/2] Extraindo áudio...
[2/2] Transcrevendo e traduzindo com Whisper...
[✔] Legenda traduzida gerada: aula_online.srt
```
