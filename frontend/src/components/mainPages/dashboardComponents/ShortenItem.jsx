import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { MdAnalytics, MdDelete, MdOutlineAdsClick } from "react-icons/md";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useStoredContext } from "../../../contextApi/ContextApi";
import Graph from "../../Graph";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);
  const navigate = useNavigate();
  const { token } = useStoredContext();

  const analyticsHandler = (shortUrl) => {
    if (!analyticToggle) {
      setSelectedUrl(shortUrl);
    }
    setAnalyticToggle(!analyticToggle);
  };

  const deleteHandler = async (urlParam) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this short link? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setLoader(true);
    try {
      const target = urlParam || shortUrl;
      await api.delete(`/api/urls/${encodeURIComponent(target)}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      navigate("/error");
    } finally {
      setLoader(false);
    }
  };

  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(
    /^https?:\/\//,
    ""
  );

  const fetchMyShortUrl = async (urlParam) => {
    setLoader(true);
    try {
      const target = urlParam || selectedUrl;
      if (!target) return;
      const { data } = await api.get(
        `/api/urls/analytics/${encodeURIComponent(
          target
        )}?startDate=2025-01-01T00:00:00&endDate=2025-12-31T23:59:59`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAnalyticsData(data);
      console.log(data);
    } catch (error) {
      navigate("/error");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    let timer;
    if (analyticToggle && selectedUrl) {
      fetchMyShortUrl(selectedUrl);
      timer = setInterval(() => {
        fetchMyShortUrl(selectedUrl);
      }, 5000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [analyticToggle, selectedUrl]);

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 shadow-md px-6 sm:py-4 py-3 rounded-md transition-all duration-100">
      <div className="flex sm:flex-row flex-col sm:justify-between w-full sm:gap-0 gap-5 py-4">
        <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden">
          <div className="text-orange-400 pb-1 sm:pb-0 flex items-center gap-2">
            <a
              href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
              target="_blank"
              className="text-[17px] font-montserrat font-[600] text-orange-400"
            >
              {subDomain + "/" + `${shortUrl}`}
            </a>
            <FaExternalLinkAlt className="text-orange-400" />
          </div>
          <div className="flex items-center gap-1">
            <h3 className="text-neutral-200 font-[400] text-[17px]">
              {originalUrl}
            </h3>
          </div>

          <div className="flex items-center gap-8 pt-6">
            <div className="flex gap-1 items-center font-semibold text-green-400">
              <span>
                <MdOutlineAdsClick className="text-[22px] me-1" />
              </span>
              <span className="text-[16px] text-neutral-100">{clickCount}</span>
              <span className="text-[15px] text-neutral-300">
                {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-lg text-neutral-300">
              <span>
                <FaRegCalendarAlt />
              </span>
              <span className="text-[17px]">
                {dayjs(createdDate).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 sm:justify-end items-center gap-4">
          <div className="flex flex-col gap-2 items-center">
            <div
              onClick={() => deleteHandler(shortUrl)}
              className="flex cursor-pointer gap-1 items-center bg-neutral-800 py-2 font-semibold shadow px-6 rounded-md text-neutral-100"
            >
              <button>Delete</button>
               <MdDelete className="text-md" />
            </div>

            <div
              onClick={() => analyticsHandler(shortUrl)}
              className="flex cursor-pointer gap-1 items-center bg-gradient-to-r from-orange-500 to-orange-800 py-2 font-semibold shadow px-6 rounded-md text-white"
            >
              <button>Analytics</button>
              <MdAnalytics className="text-md" />
            </div>
          </div>
        </div>
      </div>

      <React.Fragment>
        <div
          className={`${analyticToggle ? "flex" : "hidden"} max-h-96 sm:mt-0 mt-5 min-h-96 relative border-t border-neutral-800 w-[100%] overflow-hidden`}
        >
          {loader ? (
            <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
              <div className="flex flex-col items-center gap-1">
                <p className="text-neutral-300">Please Wait...</p>
              </div>
            </div>
          ) : (
            <>
              {analyticsData.length === 0 && (
                <div className="absolute flex flex-col justify-center sm:items-center items-end w-full left-0 top-0 bottom-0 right-0 m-auto">
                  <h1 className="text-neutral-100 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                    No Data For This Time Period
                  </h1>
                  <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-neutral-300">
                    Share your short link to view where your engagements are
                    coming from
                  </h3>
                </div>
              )}
              <Graph graphData={analyticsData} />
            </>
          )}
        </div>
      </React.Fragment>
    </div>
  );
};

export default ShortenItem;
