import React, { useState } from 'react'
import { useStoredContext } from '../../../contextApi/ContextApi';
import TextField from '../../TextField';
import { useForm } from 'react-hook-form';
import Tooltip from '@mui/material/Tooltip';
import { RxCross2 } from 'react-icons/rx';
import api from '../../../api/api';
import toast from 'react-hot-toast';

const CreateNewShortenLinks = ({ setOpen, refetch }) => {
  const { token } = useStoredContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { originalUrl: "" },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const shortenUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN + "/s/" + `${res.shortUrl}`}`;
      try {
        await navigator.clipboard.writeText(shortenUrl);
        toast.success("Short URL copied to clipboard", { position: "bottom-center", className: "mb-5", duration: 3000 });
      } catch (clipErr) {
        console.warn("clipboard write failed", clipErr);
        toast.success("Short URL created (copy failed automatically)", { position: "bottom-center", className: "mb-5", duration: 3000 });
      }

      if (typeof refetch === "function") {
        try {
          await refetch();
        } catch (rfErr) {
          console.warn("refetch failed:", rfErr);
        }
      }

      reset();
      setOpen(false);
    } catch (error) {
      console.error("Create ShortUrl Failed", error);
      toast.error("Create ShortUrl failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[520px] w-[92%] relative bg-[#282624] shadow-md pt-8 pb-6 sm:px-8 px-4 rounded-2xl border border-neutral-800"
      >
        <h1 className="sm:mt-0 mt-3 text-center font-bold sm:text-2xl text-[22px] text-neutral-100">
          Create New Shorten Url
        </h1>

        <hr className="mt-3 sm:mb-5 mb-4 border-neutral-700" />

        <div>
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-orange-500 to-orange-800 transition-colors disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Create"}
          </button>

          <div className="text-sm text-neutral-400">
            Paste any full URL and it will be shortened automatically.
          </div>
        </div>

        {!loading && (
          <Tooltip title="Close">
            <button
              disabled={loading}
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3"
            >
              <RxCross2 className="text-neutral-200 text-3xl" />
            </button>
          </Tooltip>
        )}
      </form>
    </div>
  );
}

export default CreateNewShortenLinks;
