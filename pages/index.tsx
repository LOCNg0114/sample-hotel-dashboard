import React, {  } from "react";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";

export default function Home() {
  const {logout, loading} = useAuth()
  if (loading) return null;

  return (
    <>
      <Head>
        <title>Hotel Dashboard</title>
        <meta name="description" content="Hotel Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout />
    </>
  );
}