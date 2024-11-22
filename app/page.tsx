import ChuyenDoiAnhSangPDF from '@/components/chuyen-doi-anh-sang-pdf'
import { motion } from 'framer-motion'

export default function TrangChu() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="py-20 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Chuyển đổi ảnh sang PDF dễ dàng
          </motion.h1>
          <motion.p 
            className="text-xl mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Công cụ trực tuyến miễn phí, nhanh chóng và an toàn
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ChuyenDoiAnhSangPDF />
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Liên hệ với chúng tôi
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Có câu hỏi hoặc góp ý? Chúng tôi luôn sẵn sàng hỗ trợ bạn!
          </motion.p>
          <motion.a
            href="mailto:support@imagetopdf.com"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Gửi email cho chúng tôi
          </motion.a>
        </div>
      </section>
    </div>
  )
}

