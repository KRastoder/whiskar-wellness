import SpecalistDoctorCard from "@/components/homepage/SpecalistDoctorCard";
import TopSection from "../components/homepage/TopSection";
import WhyChooseSection from "@/components/homepage/WhyChoseSection";
import HomePageFooter from "../components/homepage/Home-page-footer";

export default function Home() {
  return (
    <div>
      <TopSection />
      <section className="bg-pink-100 w-full flex items-center justify-center border-t-8 border-t-sky-600 border-b-8 border-b-sky-600 py-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-7 max-w-1/2">
          <SpecalistDoctorCard
            header="General CheckUp"
            imagePath="/veterinarian-svgrepo-com.svg"
            description="Health checkups"
            price={50}
            linkURL="/book/dentist"
          />
          <SpecalistDoctorCard
            header="Cardiologist"
            imagePath="/cardiology-svgrepo-com.svg"
            description="Heart specialist"
            price={80}
            linkURL="/book/cardiologist"
          />
          <SpecalistDoctorCard
            header="Dermatologist"
            imagePath="/dermathology-skin-svgrepo-com.svg"
            description="Skin treatments"
            price={60}
            linkURL="/book/dermatologist"
          />
          <SpecalistDoctorCard
            header="Dentist"
            imagePath="/dentist-svgrepo-com.svg"
            description="Teeth and oral care"
            price={55}
            linkURL="/book/pediatrician"
          />
        </div>
      </section>
      <section className="bg-sky-200 flex items-center justify-center w-full">
        <WhyChooseSection />
      </section>
      <HomePageFooter />
    </div>
  );
}
