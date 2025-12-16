import { Helmet } from "react-helmet";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Meta = () => {

  let slug = '';
  const location = useLocation();
  const paths = location.pathname.split('/');
  const pSlug1 = paths[0];
  const pSlug2 = paths[1];  
  const pSlug3 = paths[2];  
  if(!pSlug2)
  {
    if(!pSlug1) slug = 'home';
  }
  else
  {
    if(pSlug3) slug = pSlug3;
    else slug = pSlug2;
  }
  
    const { Urls, postData, imageCheck, formatDate } = useContext(AppContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const fetchDetail = async () => {
      try {
        const response = await postData({}, Urls.metaDetail+'/'+slug, "GET", 1, 1);
        if (response.data) {
          setData(response.data);
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

    if(loading)
    {
      return(<></>);
    }
    

  return (
    <>
      <Helmet>
        {/* BASIC SEO TAGS */}
        <title>{data.metaTitle}</title>
        <meta name="title" content={data.metaTitle} />
        <meta name="description" content={data.metaDescription} />
        <meta name="keywords" content={data.metaKeywords} />
        <meta name="author" content={data.metaAuthor} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* VIEWPORT */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* CANONICAL URL */}
        <link rel="canonical" href={data.url} />

        {/* OPEN GRAPH (For Facebook, LinkedIn, WhatsApp etc.) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:image" content={data.image} />
        <meta property="og:url" content={data.url} />
        <meta property="og:site_name" content={data.site_name} />

        {/* TWITTER CARD TAGS */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content={data.image} />
        <meta name="twitter:site" content={data.twitter_site} />

        {/* THEME COLOR FOR BROWSER */}
        <meta name="theme-color" content={data.theme_color || "#ffffff"} />

        {/* LANGUAGE */}
        <meta httpEquiv="Content-Language" content={data.lang || "en"} />

        {/* CHARSET */}
        <meta charSet="UTF-8" />

        {/* FAVICON (OPTIONAL) */}
        {data.favicon && <link rel="icon" href={data.favicon} />}
      </Helmet>
    </>
  );
};

export default Meta;
