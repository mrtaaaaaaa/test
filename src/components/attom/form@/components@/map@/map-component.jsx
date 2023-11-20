"use client";
import { icons } from "@/data";
import { ADD_MAP_DATA } from "@/redux/filter/filter-slice";
import { SET_ADDRESS } from "@/redux/map-address/map-address-slice";
import { Edit, Location } from "iconsax-react";
import L from "leaflet";
// import markerIconUrl from "lea";
// import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const MapComponent = ({
  inSearch,
  formik,
  setMarkerPosition,
  markerPosition,
  name,
}) => {
  const dispatch = useAppDispatch();
  const { address } = useAppSelector((state) => state.mapAddress);

  // Marker Icon
  const markerIcon = L.icon({
    iconUrl: icons.markerIcon.src,
    // shadowUrl: markerShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  // Map setting
  const mapSettings = {
    center: markerPosition,
    zoom: 13,
  };

  // Location Marker
  const LocationMarker = () => {
    const map = useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;

        const address = JSON.parse(
          await neshanReverseGeocoding(lat, lng).then((response) => response)
        );
        dispatch(SET_ADDRESS(address.formatted_address));

        setMarkerPosition([lat, lng]);

        if (inSearch) {
          dispatch(
            ADD_MAP_DATA({
              latitude: lat,
              longitude: lng,
            })
          );
        }

        if (formik) {
          let formikValue = formik.values;
          formik.setValues({
            ...formikValue,
            [name.lat]: lat,
            [name.long]: lng,
          });
        }
      },
    });

    return markerPosition === null ? null : (
      <Marker position={markerPosition} icon={markerIcon} />
    );
  };

  const neshanReverseGeocoding = async (lat, lng) => {
    const myHeaders = new Headers();
    myHeaders.append("Api-Key", process.env.NEXT_PUBLIC_APP_NESHAN_API);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await fetch(
      `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        return result;
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="bg-[#F4F7F9] text-blue flex gap-2 rounded-md p-2 my-2">
        <Location size="20" />
        <input
          type="text"
          value={address ? address : "موقعیت مکانی یافت نشد"}
          readOnly
          className="bg-[#F4F7F9] text-blue w-full font-medium text-sm outline-none"
        />
        <Edit size="20" />
      </div>
      <div className="w-full h-[22rem] mt-4">
        <MapContainer
          {...mapSettings}
          style={{ height: "100%", width: "100%", borderRadius: "10px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Oto khodro &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> "
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  );
};

export default MapComponent;
