// @flow strict
import React from "react";
import { useSiteMetadata } from "../hooks";

import SEO from "../components/seo"
import Layout from "../components/layout";

const NotFoundTemplate = ({ location }) => {
  const { title } = useSiteMetadata();

  return (
    <Layout location={location} title={title}>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>I'll tell you a secret...this page does not exist.'</p>
    </Layout>
  )
};

export default NotFoundTemplate;
