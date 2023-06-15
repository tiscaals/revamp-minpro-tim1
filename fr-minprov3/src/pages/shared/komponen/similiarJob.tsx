import Image from "next/image";
import {
  EnvironmentOutlined,
  FieldTimeOutlined,
  HistoryOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import Logo from '../../../../public/imageTest/psu-bequiet.jpg'



const SimiliarJob = (props: any) => {

  return (
    <a href="#">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-xl hover:opacity-70 transition ease-in-out pb-4 relative">
          <div className="bg-white border shadow-lg p-3 ">
            <div className="flex ">
              <Image src={Logo} alt="gambar" height={70} width={70} />
              <h1 className="px-2 text-xl font-bold max-w-xs ">Java Script Developer PT Codeid</h1>
            </div>
            <div className="pt-6">
              <div className="flex">
                <EnvironmentOutlined className="pt-1" />
                <h3 className="pl-2 text-base font-semibold">Jakarta</h3>
              </div>
              <div className="flex">
                <FieldTimeOutlined className="pt-1" />
                <h3 className="pl-2 text-base font-semibold">3-5 Tahun</h3>
              </div>
              <div className="flex justify-between pt-2">
                <div className="flex bg-orange-400 rounded-md px-1">
                  <ScheduleOutlined className="pt-1" />
                  <h3 className="pl-2 text-base font-semibold">Actively Hiring</h3>
                </div>
                <div className="flex pr-2">
                  <HistoryOutlined className="pt-1" />
                  <h3 className="pl-2 text-base font-semibold">Dibuat 1 hari lalu</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>

  );
};

export default SimiliarJob
