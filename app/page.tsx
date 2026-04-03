import SpecalistDoctorCard from "@/components/homepage/SpecalistDoctorCard";
import TopSection from "../components/homepage/TopSection";

export default function Home() {
  return (
    <div>
      <TopSection />
      <div className="w-full flex items-center justify-center border-t-8 border-t-sky-600 border-b-8 border-b-sky-600 py-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-7 max-w-1/2">
          <SpecalistDoctorCard
            header="Dentist"
            imagePath="/next.svg"
            description="Teeth and oral care"
            price={50}
            linkURL="/book/dentist"
          />
          <SpecalistDoctorCard
            header="Cardiologist"
            imagePath="/file.svg"
            description="Heart specialist"
            price={80}
            linkURL="/book/cardiologist"
          />
          <SpecalistDoctorCard
            header="Dermatologist"
            imagePath="/file.svg"
            description="Skin treatments"
            price={60}
            linkURL="/book/dermatologist"
          />
          <SpecalistDoctorCard
            header="Pediatrician"
            imagePath="/file.svg"
            description="Child healthcare"
            price={55}
            linkURL="/book/pediatrician"
          />
        </div>
      </div>
    </div>
  );
}
