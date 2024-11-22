import dynamic from 'next/dynamic'

const ChuyenDoiAnhSangPDF = dynamic(() => import('@/components/chuyen-doi-anh-sang-pdf'), { ssr: false })

export default function TrangChu() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Chuyển đổi ảnh sang PDF dễ dàng
          </h1>
          <p className="text-xl mb-12">
            Công cụ trực tuyến miễn phí, nhanh chóng và an toàn
          </p>
          <div>
            <ChuyenDoiAnhSangPDF />
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-xl mb-8">
            Có câu hỏi hoặc góp ý? Chúng tôi luôn sẵn sàng hỗ trợ bạn!
          </p>
          <a
            href="mailto:support@imagetopdf.com"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Gửi email cho chúng tôi
          </a>
        </div>
      </section>
    </div>
  )
}

