// LocationPicker.js
import React, { useEffect, useRef } from "react";

const LocationPicker = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 28.5355, lng: 77.3910 }, // Default Noida
      zoom: 12,
    });

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
    autocomplete.bindTo("bounds", map);

    const marker = new window.google.maps.Marker({
      map,
      draggable: true, // user drag kar ke bhi marker move kar sake
    });

    // jab search box se location choose kare
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      map.setCenter(place.geometry.location);
      map.setZoom(15);
      marker.setPosition(place.geometry.location);

      onLocationSelect(place.formatted_address);
    });

    // jab marker drag kare to naya address le aao
    marker.addListener("dragend", async () => {
      const geocoder = new window.google.maps.Geocoder();
      const pos = marker.getPosition();
      geocoder.geocode({ location: pos }, (results, status) => {
        if (status === "OK" && results[0]) {
          onLocationSelect(results[0].formatted_address);
        }
      });
    });
  }, [onLocationSelect]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search your location..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <div ref={mapRef} style={{ height: "300px", width: "100%" }} />
    </div>
  );
};

export default LocationPicker;
