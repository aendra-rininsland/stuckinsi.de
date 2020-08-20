import React, { useEffect, useState } from "react";
import { csv, json } from "d3-fetch";
import { scaleOrdinal } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleOrdinal()
  .domain(["no data", 0, 1, 2, 3])
  .range(["#ccc", "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c"]);

const MapChart = ({
  countryData,
  country,
  lockdownStatus
}) => {
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {countryData && countryData.length > 0 && (
        <Geographies geography={`/geoMap.json`}>
          {({ geographies }) =>
           {//console.log(countryData.find((s) => s.ISO_A3 === "POL"), geographies.find((s) => s.iso === "POL"))
           console.log(countryData, geographies);
             return geographies.map((geo) => {
              const d = countryData.find((s) => s.iso === geo.properties.ISO_A3);
              const latest = d?.latest;
              if(d?.iso==="POL"){console.log(latest)};
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  //fill={colorScale(0.7)}
                  fill={colorScale(!isNaN(latest?.PolicyValue) ? latest?.PolicyValue : "no data")}
                />
              );
            })}
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;
