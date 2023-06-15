import Logo from "../../../../public/imageTest/ram-geil.jpg";
import Image from "next/image";
import {
  EnvironmentOutlined,
  FieldTimeOutlined,
  HistoryOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from 'next/link'

const CardJob = (props: any) => {

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 ">
      {(props.dataArray || []).map((data: any) => (
        <Link href={{
          pathname: "jobs/jobdetail",
          query: {
            id: data.id,
            name: data.namaCompany,
            loc: data.loc,
            expe: data.expe,
            freq: data.freq,
            lastmod : data.lastmod
          },
        }}>
          <div className="flex flex-wrap">
            <div className="w-full hover:opacity-70 transition ease-in-out pb-1">
              <div className="bg-white border shadow-lg p-3 block ">
                <div className="flex">
                  <Image src={Logo} alt="gambar" height={70} width={70} />
                  <h1 className="px-2 text-xl font-bold max-w-xs ">
                    {data.namaCompany}
                  </h1>
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
                      <h3 className="pl-2 text-base font-semibold">
                        Actively Hiring
                      </h3>
                    </div>
                    <div className="flex pr-2">
                      <HistoryOutlined className="pt-1" />
                      <h3 className="pl-2 text-base font-semibold">
                        Dibuat 1 hari lalu
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardJob;
