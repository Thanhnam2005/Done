'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TaiLenTep } from './tai-len-tep'
import { XemTruocAnh } from './xem-truoc-anh'
import { TaiXuongPDF } from './tai-xuong-pdf'
import { chuyenDoiAnhSangPdf } from '@/lib/chuyen-doi-pdf'

export default function ChuyenDoiAnhSangPDF() {
  const [danhSachAnh, setDanhSachAnh] = useState<File[]>([])
  const [urlPDF, setUrlPDF] = useState<string | null>(null)

  const xuLyTaiLenTep = (cacTep: File[]) => {
    setDanhSachAnh(anhTruocDo => [...anhTruocDo, ...cacTep])
    setUrlPDF(null)
  }

  const xuLyChuyenDoi = async () => {
    if (danhSachAnh.length > 0) {
      const blobPDF = await chuyenDoiAnhSangPdf(danhSachAnh)
      const url = URL.createObjectURL(blobPDF)
      setUrlPDF(url)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Chuyển đổi ảnh sang PDF</h1>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <TaiLenTep onTaiLenTep={xuLyTaiLenTep} />
            {danhSachAnh.length > 0 && (
              <>
                <XemTruocAnh danhSachAnh={danhSachAnh} />
                <Button onClick={xuLyChuyenDoi} className="w-full mt-4">
                  Chuyển đổi sang PDF
                </Button>
              </>
            )}
            {urlPDF && <TaiXuongPDF urlPDF={urlPDF} />}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

