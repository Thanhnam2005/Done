interface ThuocTinhXemTruocAnh {
  danhSachAnh: File[]
}

export function XemTruocAnh({ danhSachAnh }: ThuocTinhXemTruocAnh) {
  return (
    <div className="image-preview">
      {danhSachAnh.map((anh, index) => (
        <img
          key={index}
          src={URL.createObjectURL(anh)}
          alt={`Ảnh đã tải lên ${index + 1}`}
        />
      ))}
    </div>
  )
}

