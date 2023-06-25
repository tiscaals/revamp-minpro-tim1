import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Detail = (props: any) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data: any) => {
    navigate('/placement');
    // console.log(result);
  };

  return (
    <>
      <div>
        <div className="mt-2">
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="max-w-xl bg-white py-6 px-3 m-auto w-full mt-6">
              <div className="grid grid-cols-1 gap-4 max-w-xl m-auto">
                <div className="col-span-1">
                  <label>Talent Detail</label>
                </div>
              </div>
              <div className="flex-row space-x-4 mt-4 text-right">
                <button className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  Submit
                </button>

                {/* <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={props.closeModal}
              >
                Cancel
              </button> */}
                <Link
                  //   to={'/user'}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => navigate(-1)}
                  href={''}
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Detail;
