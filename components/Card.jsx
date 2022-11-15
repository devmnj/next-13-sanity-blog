/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link';

export const Card=(props)=>{
    return(
        <div className="lg:flex">
   
            <img
                className="object-fit w-2/6 h-auto  rounded-lg lg:w-64"
                src= {props?.cover}
                alt=""
            />

            <div className="flex flex-col justify-between py-6 lg:mx-6">
                <Link
                    href={`/${props?.slug}`}
                    className="text-xl font-semibold text-base-content  hover:underline "
                >
                {props?.title}
                </Link>
                <p>{props?.summary}</p>
                <span className="text-sm text-base-content">Published On  <strong>{props.date}</strong> </span>
            </div>
        </div>
    )
}