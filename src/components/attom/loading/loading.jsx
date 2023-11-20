import img from "@/assets/images/icons/loading.gif";
export function Loading() {
  return (
    <div className="flex justify-center h-full items-center py-56">
      <picture>
        <img src={img.src} alt="loading" loading="lazy" className="w-36" />
      </picture>
    </div>
  );
}
