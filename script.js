window.jsPDF = window.jspdf.jsPDF;
Dropzone.autoDiscover = false;

document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convertBtn');
    const pdfDownload = document.getElementById('pdfDownload');
    const downloadLink = document.getElementById('downloadLink');
    const successNotification = document.getElementById('successNotification');
    const removeBackgroundCheckbox = document.getElementById('removeBackground');

    const myDropzone = new Dropzone("#upload-form", {
        url: "#",
        autoProcessQueue: false,
        addRemoveLinks: true,
        acceptedFiles: "image/*",
        dictRemoveFile: '×',
        init: function() {
            this.on("addedfile", (file) => {
                convertBtn.classList.remove('hidden');
                file.previewElement.classList.add('animate-fadeIn');
            });
            this.on("removedfile", (file) => {
                file.previewElement.classList.add('animate-fadeOut');
                setTimeout(() => {
                    if (this.files.length === 0) {
                        convertBtn.classList.add('hidden');
                        pdfDownload.classList.add('hidden');
                    }
                }, 500);
            });
        }
    });

    async function removeBackground(imageFile) {
        const formData = new FormData();
        formData.append('image_file', imageFile);
        formData.append('size', 'auto');

        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': 'YOUR_API_KEY_HERE'
            },
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } else {
            console.error('Error removing background:', await response.text());
            return null;
        }
    }

    convertBtn.addEventListener('click', async function() {
        if (myDropzone.files.length > 0) {
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            for (let i = 0; i < myDropzone.files.length; i++) {
                const file = myDropzone.files[i];
                let imgData;

                if (removeBackgroundCheckbox.checked) {
                    const processedImageUrl = await removeBackground(file);
                    if (processedImageUrl) {
                        imgData = processedImageUrl;
                    } else {
                        console.error('Failed to remove background for', file.name);
                        continue;
                    }
                } else {
                    imgData = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.readAsDataURL(file);
                    });
                }

                if (i > 0) pdf.addPage();

                // Get the dimensions of the image
                const img = new Image();
                img.src = imgData;
                await new Promise(resolve => img.onload = resolve);

                // Calculate scaling factor to fit within page while maintaining aspect ratio
                const imgAspectRatio = img.width / img.height;
                const pageAspectRatio = pdfWidth / pdfHeight;

                let imgWidth, imgHeight, x, y;

                if (imgAspectRatio > pageAspectRatio) {
                    // Image is wider than the page (relative to their heights)
                    imgWidth = pdfWidth;
                    imgHeight = pdfWidth / imgAspectRatio;
                    x = 0;
                    y = (pdfHeight - imgHeight) / 2;
                } else {
                    // Image is taller than the page (relative to their widths)
                    imgHeight = pdfHeight;
                    imgWidth = pdfHeight * imgAspectRatio;
                    x = (pdfWidth - imgWidth) / 2;
                    y = 0;
                }

                // Add image to PDF
                pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
            }

            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            downloadLink.href = pdfUrl;
            pdfDownload.classList.remove('hidden');
            pdfDownload.classList.add('animate-fadeIn');

            // Show success notification
            successNotification.style.display = 'block';
            setTimeout(() => {
                successNotification.style.display = 'none';
            }, 3000);
        }
    });
});

