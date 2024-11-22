window.jsPDF = window.jspdf.jsPDF;
Dropzone.autoDiscover = false;

document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convertBtn');
    const pdfDownload = document.getElementById('pdfDownload');
    const downloadLink = document.getElementById('downloadLink');
    const successNotification = document.getElementById('successNotification');
    const removeBackgroundCheckbox = document.getElementById('removeBackground');
    const orientationSelect = document.getElementById('orientation');
    const pageSizeSelect = document.getElementById('pageSize');
    const marginInputs = {
        top: document.getElementById('marginTop'),
        right: document.getElementById('marginRight'),
        bottom: document.getElementById('marginBottom'),
        left: document.getElementById('marginLeft')
    };

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
            try {
                // Get selected options
                const orientation = orientationSelect.value;
                const pageSize = pageSizeSelect.value;
                const margins = {
                    top: Number(marginInputs.top.value),
                    right: Number(marginInputs.right.value),
                    bottom: Number(marginInputs.bottom.value),
                    left: Number(marginInputs.left.value)
                };

                // Create PDF with selected orientation and size
                const pdf = new jsPDF({
                    orientation: orientation,
                    unit: 'mm',
                    format: pageSize
                });

                // Get page dimensions
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();

                // Calculate usable area after margins
                const usableWidth = pdfWidth - (margins.left + margins.right);
                const usableHeight = pdfHeight - (margins.top + margins.bottom);

                for (let i = 0; i < myDropzone.files.length; i++) {
                    const file = myDropzone.files[i];
                    let imgData;

                    try {
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

                        // Create a temporary image element to get dimensions
                        const img = new Image();
                        await new Promise((resolve, reject) => {
                            img.onload = resolve;
                            img.onerror = reject;
                            img.src = imgData;
                        });

                        // Calculate dimensions while maintaining aspect ratio
                        const imgAspectRatio = img.width / img.height;
                        const pageAspectRatio = usableWidth / usableHeight;

                        let imgWidth, imgHeight, x, y;

                        if (imgAspectRatio > pageAspectRatio) {
                            // Image is wider than the page (relative to their heights)
                            imgWidth = usableWidth;
                            imgHeight = usableWidth / imgAspectRatio;
                            x = margins.left;
                            y = margins.top + (usableHeight - imgHeight) / 2;
                        } else {
                            // Image is taller than the page (relative to their widths)
                            imgHeight = usableHeight;
                            imgWidth = usableHeight * imgAspectRatio;
                            x = margins.left + (usableWidth - imgWidth) / 2;
                            y = margins.top;
                        }

                        // Add image to PDF with calculated dimensions
                        pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight, undefined, 'FAST');

                    } catch (error) {
                        console.error(`Error processing image ${i + 1}:`, error);
                        continue;
                    }
                }

                // Generate PDF and create download link
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

            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Đã xảy ra lỗi khi tạo PDF. Vui lòng thử lại.');
            }
        }
    });
});

