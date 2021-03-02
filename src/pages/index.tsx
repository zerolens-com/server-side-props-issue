import React from "react";

import { InferGetServerSidePropsType } from "next";

export async function getServerSideProps() {
  const unityPaths = { test: "this_is_a_test" };

  return {
    props: { data: { unityPaths } }, // will be passed to the page component as props
  };
}

function HomePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{JSON.stringify(data)}</div>;
}

export default HomePage;
