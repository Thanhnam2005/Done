import jsPDF from 'jspdf'

export async function chuyenDoiAnhSangPdf(danhSachAnh: File[]): Promise<Blob> {
  const pdf = new jsPDF()

  for (let i = 0; i < danhSachAnh.length; i++) {
    const anh = danhSachAnh[i]
    const duLieuAnh = await docTepDangDataURL(anh)
    const thuocTinhAnh = pdf.getImageProperties(duLieuAnh)
    const chieuRongPDF = pdf.internal.pageSize.getWidth()
    const chieuCaoPDF = (thuocTinhAnh.height * chieuRongPDF) / thuocTinhAnh.width
    
    if (i > 0) {
      pdf.addPage()
    }
    
    pdf.addImage(duLieuAnh, 'JPEG', 0, 0, chieuRongPDF, chieuCaoPDF)
  }

  return pdf.output('blob')
}

function docTepDangDataURL(tep: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(tep)
  })
}

