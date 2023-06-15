import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";

function Icon({ id, open }: any) {
  return (
    <UpOutlined
      className={`${
        id === open ? "rotate-180" : ""
      }  h-5 w-5 pt-0.5  transition-transform`}
    ></UpOutlined>
  );
}

const AccordionTemplate = (props: any) => {
  const { desc, Content } = props;
  const [open, setOpen]: any = useState(1);
  const [icon, setIcon]: any = useState(<Icon id={1} open={open} />);
  const [border, setBorder]: any = useState("border-b py-3");

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (desc === "Filter Pencarianmu") {
      setIcon("");
    }
    if (desc === "Remote") {
      setIcon("");
      setOpen(1)
    }
    if (desc === "Terupdate") {
      setBorder("");
    }
  });

  return (
    <div >
      <Fragment>
        <Accordion className={border}  open={open === 1} icon={icon}>
          <AccordionHeader
            className="border-b-0 text-md px-3 pt-2"
            onClick={() => handleOpen(1)}
          >
            {desc}
          </AccordionHeader>
          {open === 1 && <AccordionBody className="px-3">{Content}</AccordionBody>}
        </Accordion>
      </Fragment>
    </div>
  );
};
export default AccordionTemplate;
