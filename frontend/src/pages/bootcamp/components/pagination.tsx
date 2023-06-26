import { Button, IconButton, Typography } from '@material-tailwind/react';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export default function MyPaginate({
  setCurrentPage,
  currentPage,
  totalPage,
  variant,
}: any) {
  const getItemProps = (index: number) =>
    ({
      variant: currentPage === index ? 'filled' : 'text',
      color: currentPage === index ? 'blue' : 'blue-gray',
      onClick: () => setCurrentPage(index),
    } as any);

  const next = () => {
    if (currentPage === 5) return;

    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  };

  if (variant === 'simple') {
    return (
      <>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPage}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={() =>
              setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)
            }
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={() =>
              setCurrentPage(
                currentPage === totalPage ? currentPage : currentPage + 1
              )
            }
          >
            Next
          </Button>
        </div>
      </>
    );
  }

  if (variant === 'standard') {
    return (
      <div className="flex justify-center mt-10">
        <div className="flex items-center gap-4">
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={currentPage === 1}
          >
            <AiOutlineArrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-5">
            <IconButton {...getItemProps(1)}>1</IconButton>
            <IconButton {...getItemProps(2)}>2</IconButton>
            <IconButton {...getItemProps(3)}>3</IconButton>
            <IconButton {...getItemProps(4)}>4</IconButton>
            <IconButton {...getItemProps(5)}>5</IconButton>
          </div>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            onClick={next}
            disabled={currentPage === 5}
          >
            Next
            <AiOutlineArrowRight strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
  return <></>;
}
