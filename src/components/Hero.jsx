import heroImg from "../assets/heroImg.png";

export default function Hero() {
  return (
    <div className="container mx-auto px-4 mt-5 md:mt-10 mb-5 md:mb-10">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="flex justify-center md:justify-end md:order-2">
          <img
            src={heroImg}
            width="326"
            height="290"
            alt="hero image"
          />
        </div>
        <div>
          <h1 className="mb-1.5 text-[56px] font-bold leading-none text-[#F5BF42] lg:text-[73px]">
            Master Your Day.
          </h1>
          <p className="text-lg my-2 opacity-60">
            Organize, Prioritize, and Conquer tasks effortlessly. TaskMaster is
            your ultimate productivity ally, designed for seamless goal
            completion and stress-free management of all your to-dos.
          </p>
        </div>
      </div>
    </div>
  );
}
