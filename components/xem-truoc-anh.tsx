import Image from 'next/image'

interface ThuocTinhXemTruocAnh {
  danhSachAnh: File[]
}

export function XemTruocAnh({ danhSachAnh }: ThuocTinhXemTruocAnh) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Ảnh đã tải lên:</h3>
      <div className="grid grid-cols-2 gap-4">
        {danhSachAnh.map((anh, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={URL.createObjectURL(anh)}
              alt={`Ảnh đã tải lên ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

