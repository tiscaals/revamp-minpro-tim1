import React, { Fragment, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Avatar,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
} from '@material-tailwind/react';

export default function evaluation2() {
  function Icon({ id, open }: any) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? 'rotate-180' : ''
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  const [open, setOpen] = useState(0);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <section className="h-screen bg-blue-50 dark:bg-gray-900">
      <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
        {/* Start coding here */}
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 md:rounded-lg">
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
            <h1>BATCH #13 BootCamp.Node JS Evaluation</h1>
            <div className="flex justify-end flex-col w-max gap-4">
              <ButtonGroup>
                <Button className="text-black">Back</Button>
                <Button className="text-black">Save</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <br />
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 md:rounded-lg">
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
            <div className="px-4 py-4">
              <Avatar src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg" />
            </div>
            <div className="px-1">
              <p className="text-xl">Abu Zubair</p>
              <p>NodeJS,Batch#13,Running</p>
              <p>March 18,2023 until June 18, 2023</p>
            </div>
            <div className="px-1">
              <p>Universitas Komputer</p>
              <p>Jurusan Informatika</p>
              <p>Ipk : 3.25</p>
            </div>
            <div className="px-1">
              <p className="text-xl">Score : 90</p>
            </div>
          </div>
        </div>
        <div>
          <Fragment>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                Technical (Scale 1 - 4)
              </AccordionHeader>
              <AccordionBody>
                <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 md:rounded-lg">
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <li className="text-lg">Fundamental</li>
                    <div className="flex justify-end flex-col w-max gap-4">
                      <div className="w-72">
                        <Input
                          label="Score Fundamental"
                          type="number"
                          color="black"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <li className="text-lg">Object Oriented Programming (OOP)</li>
                    <div className="flex justify-end flex-col w-max gap-4">
                      <div className="w-72">
                        <Input
                          label="Score OOP"
                          type="number"
                          color="black"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <li className="text-lg">Database</li>
                    <div className="flex justify-end flex-col w-max gap-4">
                      <div className="w-72">
                        <Input
                          label="Score Database"
                          type="number"
                          color="black"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(2)}>
              SoftSkill (Scale 1 - 4)
              </AccordionHeader>
              <AccordionBody>
              <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 md:rounded-lg">
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <li className="text-lg">Communication</li>
                    <div className="flex justify-end flex-col w-max gap-4">
                      <div className="w-72">
                        <Input
                          label="Score Communication"
                          type="number"
                          color="black"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <li className="text-lg">Teamwork</li>
                    <div className="flex justify-end flex-col w-max gap-4">
                      <div className="w-72">
                        <Input
                          label="Score Teamwork"
                          type="number"
                          color="black"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <li className="text-lg">Self-Learning</li>
                    <div className="flex justify-end flex-col w-max gap-4">
                      <div className="w-72">
                        <Input
                          label="Score Self-Learning"
                          type="number"
                          color="black"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(3)}>
              Presentation (Scale 1 - 4)
              </AccordionHeader>
              <AccordionBody>
              <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 md:rounded-lg">
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <li className="text-lg">Communication</li>
                    <div className="flex justify-end flex-col w-max gap-4">
                      <div className="w-72">
                        <Input
                          label="Score Communication"
                          type="number"
                          color="black"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <li className="text-lg">Teamwork</li>
                    <div className="flex justify-end flex-col w-max gap-4">
                      <div className="w-72">
                        <Input
                          label="Score Teamwork"
                          type="number"
                          color="black"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                    <li className="text-lg">Self-Learning</li>
                    <div className="flex justify-end flex-col w-max gap-4">
                      <div className="w-72">
                        <Input
                          label="Score Self-Learning"
                          type="number"
                          color="black"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
