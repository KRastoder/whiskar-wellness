export default function HomePageFooter() {
  return (
    <footer className="w-full bg-pink-100 border-t-8 border-t-sky-600">
      <div className="w-full px-6 py-10 flex flex-col gap-8">
        <div className="flex flex-wrap justify-center gap-8 text-base text-gray-700">
          <span className="hover:text-black cursor-pointer transition">
            Services
          </span>
          <span className="hover:text-black cursor-pointer transition">
            FAQ
          </span>
          <span className="hover:text-black cursor-pointer transition">
            Privacy
          </span>
          <span className="hover:text-black cursor-pointer transition">
            Contact
          </span>
        </div>

        <div className="text-center text-base text-gray-700">
          <span className="font-medium">Contact:</span>
          <span className="ml-2 text-sky-700 font-medium">
            info@whiskerandwellness.com
          </span>
        </div>

        <div className="w-full border-t border-sky-200 pt-5 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 gap-2">
          <p>© 2026 Whisker & Wellness. All rights reserved.</p>
          <p className="font-medium">Purring with care 🐱</p>
        </div>
      </div>
    </footer>
  );
}
