import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ImageToPDF - Chuyển đổi ảnh sang PDF miễn phí',
  description: 'Công cụ trực tuyến miễn phí để chuyển đổi ảnh sang PDF nhanh chóng và dễ dàng',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <nav className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <a href="/" className="text-3xl font-bold tracking-tight">ImageToPDF</a>
              <ul className="flex space-x-6">
                <li><a href="/" className="hover:text-blue-200 transition-colors">Trang chủ</a></li>
                <li><a href="#features" className="hover:text-blue-200 transition-colors">Tính năng</a></li>
                <li><a href="#contact" className="hover:text-blue-200 transition-colors">Liên hệ</a></li>
              </ul>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 ImageToPDF. Bảo lưu mọi quyền.</p>
            <p className="mt-2 text-gray-400">Được phát triển với ❤️ bởi đội ngũ ImageToPDF</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

