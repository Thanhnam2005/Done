'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface ThuocTinhTaiLenTep {
  onTaiLenTep: (cacTep: File[]) => void
}

export function TaiLenTep({ onTaiLenTep }: ThuocTinhTaiLenTep) {
  const onDrop = useCallback((cacTepDuocChapNhan: File[]) => {
    onTaiLenTep(cacTepDuocChapNhan)
  }, [onTaiLenTep])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Kéo và thả các ảnh vào đây, hoặc nhấp để chọn tệp
      </p>
    </div>
  )
}

