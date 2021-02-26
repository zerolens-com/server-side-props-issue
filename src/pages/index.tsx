import React from "react";

import { InferGetServerSidePropsType } from "next";

import getUnityPaths from "@api/firebase/features/getUnityPaths";

export async function getServerSideProps() {
  const unityPaths = await getUnityPaths();

  //   const unityPaths = { test: "lel" };

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
