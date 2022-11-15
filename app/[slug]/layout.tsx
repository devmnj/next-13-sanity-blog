import React, { Suspense } from 'react'
import Loading from "./loading"
"use client";

export default function layout(props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) {
  return (
   <section>
      <Suspense fallback={<Loading />}>
    {props.children}
  </Suspense>
    </section>
  )
}
