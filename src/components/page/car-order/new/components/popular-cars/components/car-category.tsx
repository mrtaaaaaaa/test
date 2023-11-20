import React from "react";

export default function CarCategory() {
  const data = ["داخلی", "خارجی", "وارداتی"];
  return (
    <div
      className="bg-white rounded py-8 px-4"
      style={{
        boxShadow:
          "0px 1px 12px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(13, 68, 250, 0.16) inset",
      }}
    >
      <h3 className="text-gray-800 font-bold text-xl text-center mb-4">
        خودروهای محبوب خریداران
      </h3>
      <div className="px-8">
        {data.map((text) => (
          <button className="mt-2 w-full py-3 rounded border-2 border-[#E0E0E2] font-medium text-gray-800 hover:text-blue hover:border-blue-200">
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
