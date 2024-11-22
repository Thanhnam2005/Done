'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

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
    <div {...getRootProps()} className={`drop-zone ${isDragActive ? 'drag-over' : ''}`}>
      <input {...getInputProps()} />
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-icon">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
      <p>Kéo và thả các ảnh vào đây, hoặc nhấp để chọn tệp</p>
    </div>
  )
}

