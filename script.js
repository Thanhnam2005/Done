// Đảm bảo rằng jsPDF đã được tải
if (typeof jsPDF === 'undefined') {
  console.error('jsPDF library is not loaded');
}

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const convertBtn = document.getElementById('convert-btn');
const pdfDownload = document.getElementById('pdf-download');
const downloadLink = document.getElementById('download-link');

let images = [];

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
});

function handleFiles(files) {
  images = [];
  imagePreview.innerHTML = '';
  for (let file of files) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        images.push(e.target.result);
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'preview-image';
        imagePreview.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  }
  convertBtn.style.display = 'block';
}

convertBtn.addEventListener('click', () => {
  if (images.length === 0) {
    alert('Vui lòng chọn ít nhất một ảnh');
    return;
  }

  const pdf = new jsPDF();
  let pdfWidth = pdf.internal.pageSize.getWidth();
  let pdfHeight = pdf.internal.pageSize.getHeight();

  images.forEach((img, index) => {
    if (index > 0) {
      pdf.addPage();
    }
    pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  });

  const pdfBlob = pdf.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  
  downloadLink.href = pdfUrl;
  pdfDownload.style.display = 'block';
});

