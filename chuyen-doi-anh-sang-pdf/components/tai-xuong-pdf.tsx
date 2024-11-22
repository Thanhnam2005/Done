import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

interface ThuocTinhTaiXuongPDF {
  urlPDF: string
}

export function TaiXuongPDF({ urlPDF }: ThuocTinhTaiXuongPDF) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">PDF của bạn đã sẵn sàng!</h3>
      <Button asChild className="w-full">
        <a href={urlPDF} download="anh-da-chuyen-doi.pdf">
          <Download className="mr-2 h-4 w-4" /> Tải xuống PDF
        </a>
      </Button>
    </div>
  )
}

