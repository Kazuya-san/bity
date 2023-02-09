import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

type Form = {
  slug: string;
  url: string;
};

const Shortener: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [status, setStatus] = useState<string>("idle");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const input =
    "text-black my-1 p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-500 block w-full rounded-md sm:text-sm focus:ring-1";

  return (
    <div
      style={{
        fontFamily: "Montserrat",
      }}
      className="flex items-center px-4 justify-center text-white flex-col w-full min-h-[85.6vh] bg-[#37517E]"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStatus("fetch");
          fetch("/api/create-url/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            } as any,
            body: JSON.stringify(form),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.code === 404) {
                setStatus("error");
                setError(data.message);
              } else {
                setStatus("success");
                // setShortUrl(`${url}/${form.slug}`);
                setShortUrl(data.data.shortUrl);

                setForm({
                  slug: "",
                  url: "",
                });
              }
              console.log(data);
            })
            .catch((err) => {
              setStatus("error");
              setError(
                "Link already Exists or Network error. Please try again later."
              );
            });
        }}
        className="flex flex-col justify-center w-full mx-4 md:w-1/2 mb-8"
      >
        <div className="flex items-center flex-col md:flex-row">
          {/* <div className="flex items-center justify-center w-full">
            <span className="font-medium mr-2">{url}/</span>
            <input
              type="text"
              onChange={(e) => {
                setForm({
                  ...form,
                  slug: e.target.value,
                });
              }}
              minLength={1}
              placeholder="Alias or Generate one"
              value={form.slug}
              // pattern={"^[-a-zA-Z0-9]+$"}
              // title="Only alphanumeric characters and hypens are allowed. No spaces."
              required
              className="text-black my-1 p-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-pink-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div> */}
          {/* <input
            type="button"
            value="Random"
            className="rounded my-2 bg-orange-600 hover:bg-orange-700 text-white py-1.5 px-3 font-bold cursor-pointer ml-2"
            onClick={() => {
              const slug = nanoid(10);
              setForm({
                ...form,
                slug,
              });

              setStatus("idle");
              setError("");
            }}
          /> */}
        </div>
        {status === "error" && (
          <p className="mt-1 text-xs text-red-500 text-center my-2">{error}</p>
        )}
        <div className="flex items-center">
          <span className="font-medium mr-2">Link</span>
          <input
            type="url"
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://google.com"
            className={input}
            value={form.url}
            required
          />
        </div>
        <button
          type="submit"
          className="rounded bg-orange-600 hover:bg-orange-700 text-white p-1 font-bold cursor-pointer mt-1 w-32 text-center flex items-center justify-center mx-auto"
        >
          Create
          {status === "fetch" && (
            <div className="flex items-center justify-center ml-2">
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            </div>
          )}
        </button>
      </form>

      {status === "success" && (
        <div className="flex justify-center items-center w-full">
          <h1>{shortUrl}</h1>
          <input
            type="button"
            value={copied ? "Copied" : "Copy"}
            className="rounded bg-orange-600 hover:bg-orange-700 text-white py-1.5 px-4 font-bold cursor-pointer ml-2"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 5000);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Shortener;
