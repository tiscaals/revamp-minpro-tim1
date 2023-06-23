import { useEffect, useState } from "react";
import CardJob from "../komponen/cardjob";
import FilterComp from "../komponen/filterKomponen";
import ImgSlide from "../komponen/imgSlide";
import Pagination from "../komponen/pagination";
import SearchBar from "../komponen/search";
import Header from "../shared/header";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetJobPost, doRequestSearchJobPost } from "../redux/jobhire-schema/action/actionReducer";
import { useRouter } from "next/router";

export default function Home() {
  const { job_post, search_jobpost, refresh } = useSelector((state:any) => state.JobPostReducers,);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(doRequestGetJobPost());
  }, [refresh]);

  /* ---------------FILTER BY SEARCH--------------- */
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData]: any = useState([]);

  const handleChange = (event: any) => {
    setCurrentPage(event);
  };

  const handleSearchChange = () => {
    setIsSearching(true);
    const gabung = {
      search: {
        keyword: searchValue.trim(),
        location: searchLocation.trim(),
        job: selectedValue,
        type: "",
        jobType: [],
        expe : [],
        terupdate : "",
        newest : "",
      },
    };

    console.log("GABUNGG",gabung);

    dispatch({type:"RESET_STATE"})
    dispatch(doRequestSearchJobPost(gabung));
    setIsToggleChecked(false);
    // setCheckboxValues([]);

    console.log("SEARCH RESULT",search_jobpost);   

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });

    const radiobutton = document.querySelectorAll('input[type="radio"]');
    radiobutton.forEach((radio: any) => {
      radio.checked = false;
    });

    // setFilteredData(search_jobpost);
    handleQuery2();
  };

  /* -------FILTER BY WORK TYPE-------- */

  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  let updatedValues: any;
  const handleCheckboxChange = (event: any) => {
    setIsSearching(true);
    const { checked, value } = event.target;

    if (checked) {
      updatedValues = [...checkboxValues, value];
      setCheckboxValues(updatedValues);
    } else {
      updatedValues = checkboxValues.filter((val) => val !== value);
      setCheckboxValues(updatedValues);
    }

    const dataJobType = {
      search: {
        keyword: searchValue.trim(),
        location: searchLocation.trim(),
        job: selectedValue,
        type: isToggleChecked ? 2 : "",
        jobType: updatedValues,
        expe : checkboxValuesExpe,
        terupdate : selectedOption,
        newest : buttonClick ? 1 : 0,
      },
    };
    console.log("JOBTYPE", dataJobType);

    dispatch(doRequestSearchJobPost(dataJobType));
  };

  /* -------FILTER BY JOB TYPE (REMOTE or ONSITE)-------- */

  const [isToggleChecked, setIsToggleChecked] = useState(false);

  const handleToggle = () => {
    setIsSearching(true);
    setIsToggleChecked(!isToggleChecked);
    if (isToggleChecked) {
      const dataOnSite = {
        search: {
          keyword: searchValue.trim(),
          location: searchLocation.trim(),
          job: selectedValue,
          type: "",
          jobType: checkboxValues,
          expe : checkboxValuesExpe,
          terupdate : selectedOption,
          newest : buttonClick ? 1 : 0,
        },
      };
      dispatch(doRequestSearchJobPost(dataOnSite));
      handleQuery1();
    } else {
      const dataRemote = {
        search: {
          keyword: searchValue.trim(),
          location: searchLocation.trim(),
          job: selectedValue,
          type: 2,
          jobType: checkboxValues,
          expe : checkboxValuesExpe,
          terupdate : selectedOption,
          newest : buttonClick ? 1 : 0,
        },
      };
      dispatch(doRequestSearchJobPost(dataRemote));
      // setFilteredData(search_jobpost);
      handleQuery1();
    }
  };

  /* -------FILTER BY WORK EXPE-------- */  

  const [checkboxValuesExpe, setCheckboxValuesExpe] = useState<string[]>([]);
  let updatedValuesExpe: any;
  const handleCheckboxChangeExpe = (event: any) => {
    setIsSearching(true);
    const { checked, value } = event.target;

    if (checked) {
      updatedValuesExpe = [...checkboxValuesExpe, value];
      setCheckboxValuesExpe(updatedValuesExpe);
    } else {
      updatedValuesExpe = checkboxValuesExpe.filter((val) => val !== value);
      setCheckboxValuesExpe(updatedValuesExpe);
    }

    const dataExpe = {
      search: {
        keyword: searchValue.trim(),
        location: searchLocation.trim(),
        job: selectedValue,
        type: isToggleChecked ? 2 : "",
        jobType: checkboxValues,
        expe : updatedValuesExpe,
        terupdate : selectedOption,
        newest : buttonClick ? 1 : 0,
      },
    };
    // console.log("EXPE", dataExpe);

    dispatch(doRequestSearchJobPost(dataExpe));
  };


  /* -------FILTER BY TERUPDATE-------- */  

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e:any) => {
    setIsSearching(true);
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption);
    const dataTerUpdate = {
      search: {
        keyword: searchValue.trim(),
        location: searchLocation.trim(),
        job: selectedValue,
        type: isToggleChecked ? 2 : "",
        jobType: checkboxValues,
        expe : checkboxValuesExpe,
        terupdate : selectedOption,
        newest : buttonClick ? 1 : 0,
      },
    };

    // console.log(dataTerUpdate)
    dispatch(doRequestSearchJobPost(dataTerUpdate));
    console.log("dataTerupdate", dataTerUpdate);
    console.log("hasilSearch",search_jobpost);
    // setFilteredData(search_jobpost);
  };

/* FILTER NEWEST */

const [buttonClick,setButtonClick]  = useState(false)
const handleNewestButton = ()=>{
  setButtonClick(true)
  setIsSearching(true);
    const dataNewest = {
      search: {
        keyword: searchValue.trim(),
        location: searchLocation.trim(),
        job: selectedValue,
        type: isToggleChecked ? 2 : "",
        jobType: checkboxValues,
        expe : checkboxValuesExpe,
        terupdate : selectedOption,
        newest : 1,
      },
    };
    // console.log(dataNewest)
    dispatch(doRequestSearchJobPost(dataNewest));
  }
  // console.log('NILAI BUTTON',buttonClick)
  /* FILTER MATCH */
  
  const handleMatchButton = ()=>{
    setButtonClick(false)
    setIsSearching(true);
    const dataMatch = {
      search: {
        keyword: searchValue.trim(),
        location: searchLocation.trim(),
        job: selectedValue,
        type: isToggleChecked ? 2 : "",
        jobType: checkboxValues,
        expe : checkboxValuesExpe,
        terupdate : selectedOption,
        newest : 0,
      },
    };
    console.log(dataMatch)
    dispatch(doRequestSearchJobPost(dataMatch));
  }

  /* ----------------------------------------------------------- */

  const displayData = isSearching ? filteredData : job_post;

  useEffect(() => {
    setFilteredData(search_jobpost);
  }, [search_jobpost]);

  console.log("DISPLAY DATA", displayData);

  const handleQuery1 = () => {
    let queryParams: Record<string, string> = {};
    if (searchValue.trim() !== "") {
      queryParams.keyword = searchValue.trim();
    }

    if (searchLocation.trim() !== "") {
      queryParams.location = searchLocation.trim();
    }

    if (selectedValue !== "") {
      queryParams.job = selectedValue;
    }

    if (!isToggleChecked) {
      queryParams.type = "remote"; 
    } else {
      delete queryParams.type;
    }

    const query = new URLSearchParams(queryParams).toString();

    router.push(`?${query}`);
  };

  const handleQuery2 = () => {
    let queryParams: Record<string, string> = {};
    if (searchValue.trim() !== "") {
      queryParams.keyword = searchValue.trim();
    }

    if (searchLocation.trim() !== "") {
      queryParams.location = searchLocation.trim();
    }

    if (selectedValue !== "") {
      queryParams.job = selectedValue;
    }

    const query = new URLSearchParams(queryParams).toString();

    router.push(`?${query}`);
  };

  /* UNTUK MERESET ADDRESS */
  useEffect(() => {
    const { query } = router;

    // Memeriksa apakah ada parameter dalam URL
    const hasQueryParams = Object.keys(query).length > 0;

    // Mengganti URL jika tidak ada parameter
    if (!hasQueryParams) {
      router.replace("/jobs");
    }
  }, []);

  /* ----------------------------------------------------------- */
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(displayData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = displayData?.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto w-[100%]">
        <Header/>
      <div>
        <div className="w-full bg-light-blue-50">
          <div className="lg:w-3/4 mx-auto py-2 w-11/12">
            <ImgSlide />
          </div>
        </div>
        <div className="shadow-sm shadow-gray-500">
          <div className="mx-auto lg:w-3/4 w-11/12">
          <SearchBar
            buttonClick={handleSearchChange}
            searchValue={searchValue}
            searchLocation={searchLocation}
            setSearchValue={(e: any) => setSearchValue(e.target.value)}
            setSearchLocation={(e: any) => setSearchLocation(e.target.value)}
            selectedValue={selectedValue}
            handleChange={handleChange}
          />
          </div>
        </div>

        <div className="max-w-screen-2xl xl:w-3/4 w-11/12 mx-auto p-2">
          <h2 className="py-5 text-sm">Lowongan Pekerjaan di Indonesia</h2>
            <div className="lg:flex justify-start md:block mx-auto">
              <FilterComp
                handleToggle={handleToggle}
                valueCheck={isToggleChecked}
                handleCheckboxChange={handleCheckboxChange}
                handleCheckboxChangeExpe = {handleCheckboxChangeExpe}
                handleOptionChange={handleOptionChange}
                handleNewestButton={handleNewestButton}
                handleMatchButton={handleMatchButton}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
                <CardJob currentPage={currentPage} itemsPerPage={itemsPerPage}
                data={displayData}/>
              </div>
            </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
