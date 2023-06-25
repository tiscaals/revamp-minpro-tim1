import React, { useEffect } from 'react'
import AddressType from './addressType/addressType'
import Country from './country/country'
import Province from './provinces/province'
import City from './city/city'
import BreadcrumbsSlice from '../shared/breadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { reqGetAdressType, reqGetCity, reqGetCountry, reqGetProv } from '@/redux/actions/actionReducer'

const index = () => {
  const { addressType , refreshAddressType} = useSelector((state : any) => state.addressTypeReducer);
  const { country , refreashCountry } = useSelector((state :any) => state.countryReducer);
  const { prov , refreshProv} = useSelector((state : any) => state.provReducer);
  const { city , refreshCity} = useSelector((state :any) => state.cityReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reqGetAdressType());
  }, [refreshAddressType]);

  useEffect(() => {
    dispatch(reqGetCountry());
  }, [refreashCountry]);

  useEffect(() => {
    dispatch(reqGetProv());
  }, [refreshProv]);

  useEffect(() => {
    dispatch(reqGetCity());
  }, [refreshCity]);

  return (
    <><BreadcrumbsSlice />
    <div>
            <div className="rounded bg-blue h-auto shadow-sm py-2">
              <AddressType addressType={addressType}/>
            </div>
            <div className="rounded bg-blue h-auto shadow-sm py-2">
              <Country country={country}/>
            </div>
            <div className="rounded bg-blue h-auto shadow-sm py-2">
              <Province prov={prov} country={country}/>
            </div>
            <div className="rounded bg-blue h-auto shadow-sm py-2">
              <City city={city} prov={prov}/>
            </div>
    </div>
    </>
  )
}

export default index
