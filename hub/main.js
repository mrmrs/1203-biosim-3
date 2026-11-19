const link = document.querySelector('[data-webgpu]');
const note = document.querySelector('.gpu-note');

async function checkWebGPU() {
  if (!link || !note) return;
  if (!navigator.gpu) {
    link.classList.add('is-blocked');
    note.hidden = false;
    return;
  }
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      link.classList.add('is-blocked');
      note.hidden = false;
    }
  } catch {
    link.classList.add('is-blocked');
    note.hidden = false;
  }
}

checkWebGPU();
