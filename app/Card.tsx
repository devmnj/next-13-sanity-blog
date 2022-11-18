/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

export const Card=(props: { cover: string | undefined; slug: any; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; summary: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; })=>{
    return(
        <div className="lg:flex">
   
            <img
                className="object-fit w-2/6 h-5/12  rounded-lg lg:w-64 lg:h-74"
                src= {props?.cover}
                alt=""
            />

            <div className="flex flex-col justify-between py-6 lg:mx-6">
                <a
                    href={`/${props?.slug}`}
                    className="text-xl font-semibold text-base-content  hover:underline "
                >
                {props?.title}
                </a>
                <p>{props?.summary}</p>
                <span className="text-sm text-base-content">Published On  <strong>{props.date}</strong> </span>
            </div>
        </div>
    )
}