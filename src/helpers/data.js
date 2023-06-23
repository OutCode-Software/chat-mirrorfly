import React from "react";

export const useDataUtc = (utcData) => {
  let date = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(utcData);
  return date;
};
