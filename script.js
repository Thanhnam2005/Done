document.addEventListener('DOMContentLoaded', function() {
    const { jsPDF } = window.jspdf;
    let myDropzone = new Dropzone("#dropzone", {
        url: "#",
        autoProcessQueue: false,
        addRemoveLinks: true,
        acceptedFiles: "image/*"
    });

    const convertBtn = document.getElementById('convertBtn');
    const pdfDownload = document.getElementById('pdfDownload');
    const downloadLink = document.getElementById('downloadLink');

    myDropzone.on("addedfile", function() {
        convertBtn.style.display = 'inline-block';
    });

    myDropzone.on("removedfile", function() {
        if (myDropzone.files.length === 0) {
            convertBtn.style.display = 'none';
            pdfDownload.style.display = 'none';
        }
    });

    convertBtn.addEventListener('click', function() {
        if (myDropzone.files.length > 0) {
            const pdf = new jsPDF();
            let pdfWidth = pdf.internal.pageSize.getWidth();
            let pdfHeight = pdf.internal.pageSize.getHeight();

            const processImages = (index) => {
                if (index >= myDropzone.files.length) {
                    const pdfBlob = pdf.output('blob');
                    const pdfUrl = URL.createObjectURL(pdfBlob);
                    downloadLink.href = pdfUrl;
                    pdfDownload.style.display = 'block';
                    return;
                }

                const file = myDropzone.files[index];
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (index > 0) {
                        pdf.addPage();
                    }
                    pdf.addImage(e.target.result, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                    processImages(index + 1);
                };
                reader.readAsDataURL(file);
            };

            processImages(0);
        }
    });
});

