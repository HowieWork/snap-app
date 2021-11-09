import { useRef, useEffect } from 'react';
import './Map.css';

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    // 1) Create a map
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    // 2) Place a marker
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
