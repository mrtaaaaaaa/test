const TabLayout = ({ title, options }) => {
    return (
        <div>
            <h2 className="text-center text-blue  text-xl font-bold border-b border-blue pb-4 md:w-1/2 mx-auto mt-10">
                {title}
            </h2>
            <div className="grid md:grid-cols-2 mt-10 gap-5">
                {options.map((item, index) => {
                    return typeof (item) !== "number" && typeof (item) !== "string" && <div key={index} className="md:grid md:grid-cols-2 flex flex-wrap justify-between md:gap-32 gap-4 border-b border-grey-300 pb-5">
                        <span className="block md:text-left">{item.title}</span>
                        <span className="block text-blue  font-bold">{item.status}</span>
                    </div>
                }
                )}
            </div>
        </div>);
}

export default TabLayout;