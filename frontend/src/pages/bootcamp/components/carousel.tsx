import { Carousel, Typography, Button } from "@material-tailwind/react";
 
export default function MyCarousel() {
  return (
    <Carousel className="rounded-xl h-64 overflow-hidden">
      <div className="relative h-full w-full ">
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h4"
              color="white"
            //   className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Bootcamp Regular
            </Typography>
            <Typography
              variant="paragraph"
              color="white"
              className="mb-12 opacity-80"
            >
              Bootcamp regular dilakukan secara offline di Sentul, Bogor. Kamu akan diisolasi disana selama tiga bulan, makan gratis 3x sehari, menginap gratis dan kamu bisa belajar bareng bersama mentor dan teman - teman kamu!
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h4"
              color="white"
            //   className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Bootcamp Corporate
            </Typography>
            <Typography
              variant="paragraph"
              color="white"
              className="mb-12 opacity-80"
            >
              Bootcamp Corporate adalah bootcamp spesial, artinya kamu akan langsung diplacement ketika baru masuk ke bootcamp, tapi filtering testnya sangatlah strict, karena yang melakukan filtering test adalah client corporate
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h4"
              color="white"
            //   className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="paragraph"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that
              quality of air that emanation from old trees, that so
              wonderfully changes and renews a weary spirit.
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
  );
}