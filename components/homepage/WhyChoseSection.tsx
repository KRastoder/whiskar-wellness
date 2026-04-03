export default function WhyChooseSection() {
  return (
    <div className=" py-10">
      <h2 className="text-xl font-semibold mb-6">
        Why Choose Whisker & Wellness?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-sky-50">
          <p className="text-lg">✅</p>
          <h3 className="font-medium mt-2">Expert Specialists</h3>
          <p className="text-sm text-gray-500 mt-1">
            Board-certified veterinarians with feline expertise
          </p>
        </div>

        <div className="p-4 rounded-xl bg-sky-50">
          <p className="text-lg">📦</p>
          <h3 className="font-medium mt-2">Premium Quality</h3>
          <p className="text-sm text-gray-500 mt-1">
            Vet-approved toys and ethical sourcing
          </p>
        </div>

        <div className="p-4 rounded-xl bg-sky-50">
          <p className="text-lg">💳</p>
          <h3 className="font-medium mt-2">Smart Rewards</h3>
          <p className="text-sm text-gray-500 mt-1">
            Cross-platform discounts on all purchases
          </p>
        </div>

        <div className="p-4 rounded-xl bg-sky-50">
          <p className="text-lg">📱</p>
          <h3 className="font-medium mt-2">Easy Booking</h3>
          <p className="text-sm text-gray-500 mt-1">
            Online scheduling and telemedicine options
          </p>
        </div>
      </div>
    </div>
  );
}
