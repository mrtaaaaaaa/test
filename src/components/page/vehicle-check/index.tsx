"use client";
import {
  VehicleCheckSteps,
  WhyVehicleCheckWithUs,
} from "@/organism/vehicle-check/cards-vehicle-check";
import Benefites from "./components/benefites";
import VehicleCheckPacks, {
  VehicleCheckPacksMobile,
} from "./components/packages";

export default function VehicleCheck() {
  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <div>
        <h2 className="block text-center md:text-2xl font-bold mt-2">
          پکیج‌های کارشناسی خودرو
        </h2>

        <VehicleCheckPacks />
        <VehicleCheckPacksMobile />
      </div>
      <Benefites />
      <WhyVehicleCheckWithUs />
      <VehicleCheckSteps />
    </div>
  );
}
