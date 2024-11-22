'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { chuyenDoiAnhSangPdf } from '@/lib/chuyen-doi-pdf'
import { Upload, Download, Trash2, Loader } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChuyenDoiAnhSangPDF() {
  const [danhSachAnh, setDanhSachAnh] = useState<File[]>([])
  const [urlPDF, setUrlPDF] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setDanhSachAnh(prevFiles => [...prevFiles, ...acceptedFiles])
    setUrlPDF(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  })

  const xuLyChuyenDoi = async () => {
    if (danhSachAnh.length > 0) {
      setIsLoading(true)
      try {
        const blobPDF = await chuyenDoiAnhSangPdf(danhSachAnh)
        const url = URL.createObjectURL(new Blob([blobPDF], { type: 'application/pdf' }))
        setUrlPDF(url)
      } catch (error) {
        console.error(error)
        alert('Đã xảy ra lỗi khi chuyển đổi file. Vui lòng thử lại.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const xoaAnh = (index: number) => {
    setDanhSachAnh(prevFiles => prevFiles.filter((_, i) => i !== index))
    setUrlPDF(null)
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl mx-auto">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <p className="text-gray-600">
          Kéo và thả các ảnh vào đây, hoặc nhấp để chọn tệp
        </p>
      </div>

      {danhSachAnh.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Ảnh đã tải lên:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {danhSachAnh.map((anh, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(anh)}
                  alt={`Ảnh đã tải lên ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => xoaAnh(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={xuLyChuyenDoi} 
            className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin mr-2" size={20} />
                Đang chuyển đổi...
              </>
            ) : (
              <>
                <Upload className="mr-2" size={20} />
                Chuyển đổi sang PDF
              </>
            )}
          </button>
        </div>
      )}

      {urlPDF && (
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold mb-4">PDF của bạn đã sẵn sàng!</h3>
          <a 
            href={urlPDF} 
            download="anh-da-chuyen-doi.pdf" 
            className="inline-flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="mr-2" size={20} />
            Tải xuống PDF
          </a>
        </div>
      )}
    </div>
  )
}

