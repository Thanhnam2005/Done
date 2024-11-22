'use client'

import { useState, useCallback } from 'react'
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
    <motion.div 
      className="bg-white shadow-xl rounded-lg p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <p className="text-gray-600">
          Kéo và thả các ảnh vào đây, hoặc nhấp để chọn tệp
        </p>
      </motion.div>

      <AnimatePresence>
        {danhSachAnh.length > 0 && (
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Ảnh đã tải lên:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {danhSachAnh.map((anh, index) => (
                <motion.div 
                  key={index} 
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={URL.createObjectURL(anh)}
                    alt={`Ảnh đã tải lên ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <motion.button
                    onClick={() => xoaAnh(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
            <motion.button 
              onClick={xuLyChuyenDoi} 
              className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {urlPDF && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">PDF của bạn đã sẵn sàng!</h3>
            <motion.a 
              href={urlPDF} 
              download="anh-da-chuyen-doi.pdf" 
              className="inline-flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="mr-2" size={20} />
              Tải xuống PDF
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

