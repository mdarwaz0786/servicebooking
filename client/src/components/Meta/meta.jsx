/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from "react-helmet";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Meta = () => {
  let slug = '';
  const location = useLocation();
  const paths = location.pathname.split('/');
  const pSlug1 = paths[0];
  const pSlug2 = paths[1];
  const pSlug3 = paths[2];
  if (!pSlug2) {
    if (!pSlug1) slug = 'home';
  }
  else {
    if (pSlug3) slug = pSlug3;
    else slug = pSlug2;
  }

  const { Urls, postData, imageCheck } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const response = await postData({}, Urls.metaDetail + '/' + slug, "GET", 1, 1);
      if (response?.data) {
        setData(response?.data);
      }
    } catch (error) {
      console.error("Detail Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [location]);

  if (loading || !data) {
    return (<></>);
  }

  // LOCATION BASED SETTINGS
  const currentUrl = window.location.href;
  const siteUrl = window.location.origin;
  const canonicalUrl = data?.canonicalTag || currentUrl;
  const defaultImage = 'favicon.png';
  const ogImage = imageCheck(data?.image, defaultImage);
  const appName = import.meta.env.VITE_APP_NAME;

  return (
    <>
      <Helmet>
        {/* BASIC SEO TAGS */}
        <title>{data?.metaTitle}</title>
        <meta name="title" content={data?.metaTitle} />
        <meta name="description" content={data?.metaDescription} />
        <meta name="keywords" content={data?.metaKeywords} />
        <meta name="author" content={data?.metaAuthor || data?.metaTitle} />

        {/* Robots */}
        <meta name="robots" content={data?.robots || "index, follow, max-image-preview:large"} />
        <meta name="googlebot" content={data?.robots || "index, follow"} />

        {/* VIEWPORT */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* CANONICAL URL */}
        <link rel="canonical" href={canonicalUrl} />
        <link rel='shortlink' href={currentUrl} />
        <meta name="original-source" content={currentUrl} />

        {/* Meta Tagging */}
        <meta name="audience" content="All" />
        <meta name="distribution" content="Global" />
        <meta httpEquiv="expires" content="never" />
        <meta name="language" content={data?.lang || "English"} />
        <meta name="organization" content={appName} />
        <meta name="rating" content="general" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="application-name" content={appName} />
        <meta name="referrer" content="origin" />

        {/* GEO LOCATION TAGS - Newly Added */}

        {/* ICBM - Interactive Content Behaving Model (Google format) */}
        <meta name="ICBM" content={`${data?.lat}, ${data?.long}`} />

        {/* Geo Tags */}
        <meta name="geo.position" content={`${data?.lat};${data?.long}`} />
        <meta name="geo.region" content={data?.geo_region || data?.country_code || "IN"} />
        <meta name="geo.placename" content={data?.geo_placename || data?.location_name || "India"} />

        {/* Dublin Core Location */}
        <meta name="DC.coverage" content={data?.location_name || "India"} />

        {/* Business Hours & Contact */}
        <meta name="business:hours" content={data?.work_hours || "8:00 AM - 8:00 PM"} />
        <meta name="contact:phone" content={data?.contact_number || "+91-1234567890"} />
        <meta name="contact:email" content={data?.contact_email || "greenindiateam2022@gmail.com"} />
        {data?.address && <meta name="street-address" content={data?.address} />}
        {data?.city && <meta name="city" content={data?.city || "Delhi"} />}
        {data?.state && <meta name="state" content={data?.state || "Delhi"} />}
        {data?.country && <meta name="country" content={data?.country || "India"} />}
        {data?.zipCode && <meta name="postal-code" content={data?.zipCode || "110000"} />}

        {/* OPEN GRAPH (For Facebook, LinkedIn, WhatsApp etc.) */}
        <meta property="og:type" content={data?.og_type || "article"} />
        <meta property="og:title" content={data?.metaTitle} />
        <meta property="og:description" content={data?.metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content={data?.og_image_width || "1200"} />
        <meta property="og:image:height" content={data?.og_image_height || "630"} />
        <meta property="og:image:type" content={data?.og_image_type || "image/jpg"} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content={data?.site_name} />
        <meta property="og:locale" content={data?.og_locale || "en_US"} />

        {/* OG Location Tags - Newly Added */}
        <meta property="place:location:latitude" content={data?.lat} />
        <meta property="place:location:longitude" content={data?.long} />
        {data?.address && <meta property="og:street_address" content={data?.address} />}
        {data?.city && <meta property="og:locality" content={data?.city} />}
        {data?.state && <meta property="og:region" content={data?.state} />}
        {data?.country && <meta property="og:country_name" content={data?.country} />}
        {data?.zipCode && <meta property="og:postal_code" content={data?.zipCode} />}

        {/* TWITTER CARD TAGS */}
        <meta name="twitter:card" content={data?.metaDescription} />
        <meta name="twitter:title" content={data?.metaTitle} />
        <meta name="twitter:description" content={data?.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:src" content={ogImage} />
        <meta name="twitter:site" content={data?.twitter_site || siteUrl} />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:creator" content={appName} />

        {/* THEME COLOR FOR BROWSER */}
        <meta name="theme-color" content={"#ffffff"} />

        {/* LANGUAGE */}
        <meta httpEquiv="Content-Language" content={data?.lang || "en"} />

        {/* CHARSET */}
        <meta charSet="UTF-8" />

        {/* Apple Touch Icons - All Sizes */}
        <link rel="apple-touch-icon" sizes="57x57" href={ogImage} />
        <link rel="apple-touch-icon" sizes="60x60" href={ogImage} />
        <link rel="apple-touch-icon" sizes="72x72" href={ogImage} />
        <link rel="apple-touch-icon" sizes="76x76" href={ogImage} />
        <link rel="apple-touch-icon" sizes="114x114" href={ogImage} />
        <link rel="apple-touch-icon" sizes="120x120" href={ogImage} />
        <link rel="apple-touch-icon" sizes="144x144" href={ogImage} />
        <link rel="apple-touch-icon" sizes="152x152" href={ogImage} />
        <link rel="apple-touch-icon" sizes="180x180" href={ogImage} />

        {/* Icon - Various Sizes */}
        <link rel="icon" type="image/png" sizes="192x192" href={ogImage} />
        <link rel="icon" type="image/png" sizes="32x32" href={ogImage} />
        <link rel="icon" type="image/png" sizes="96x96" href={ogImage} />
        <link rel="icon" type="image/png" sizes="16x16" href={ogImage} />
      </Helmet>
    </>
  );
};

export default Meta;