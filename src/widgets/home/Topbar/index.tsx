const Topbar = () => {
  return (
    <>
      <div className="grid items-center grid-cols-12 bg-slate-800 h-12  md:px-6 lg:px-12 sm:px-12">
        <div className="mx-6 topbar-left-col col-span-12 lg:col-span-6 md:col-span-6 sm:col-span-12 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-center sm:justify-center sm:my-5 md:my-0 lg:my-0 lg:justify-start">
            <div className="item-1 flex gap-1 items-center">
              <i className="fa-regular fa-envelope text-white-500"></i>
              <span className="text-sm">
                <a href="mailto:uzairdeveloper354123@gmail.com">
                  corretor.nunessantos@hotmail.com | CRECI: 8525
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="mx-6 topbar-left-col col-span-12 mt-6 sm:mt-0 md:mt-0 lg:mt-0 lg:col-span-6 md:col-span-6 sm:col-span-12 text-end text-white">
          <span className="flex justify-end items-center gap-3 justify-center md:justify-end lg:justify-end sm:justify-center">
            <div>
              <i className="fa-solid fa-phone mr-1"></i>
              <span>(77) 3612-5707 </span>
            </div>
            <div>
              <i className="fa-brands fa-whatsapp mr-1"></i>
              <span>(77) 99985-7957</span>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default Topbar;
