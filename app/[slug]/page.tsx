 
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { notFound } from 'next/navigation';
import React  from "react";
import { urlFor } from "../../lib/ImageBuilder";
import client from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Code from "../Code";
import RPCard from "../RPCard";
import Image from "next/image";
import CommentBox from "app/CommentBox";

const getAllPosts = async () => {
  const res = await client.fetch(`*[_type == "post"]{ slug }`);
   
  const data = await res;
  return data;
};


export async function generateStaticParams() {
  const res = await getAllPosts();
  return res?.map((post: { slug: { current: any } }) => ({
    slug: post.slug.current,
  }));
}

async function getData(slug: string) {
  const res = await client.fetch(
    `*[_type == "post" && slug.current =='${slug}']{title,_id,content,featured_image,summary,tags,_createdAt,view,references[],recommended[]->{
      title,
      summary,
      tags,
      featured_image,
      _createdAt,
      slug
     },
     'comments':*[_type == "comment" && post._ref == ^._id && approved == true]{
      _id, 
      name, 
      email, 
      comment, 
      _createdAt
     }
    
    }`
  );
 
  const data = await res;
  return data;
}

const myPortableComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl text-secondary-focus font-bold mt-3 mb-3">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h1 className="text-3xl text-secondary-focus font-bold mt-3 mb-3">
        {children}
      </h1>
    ),

    normal: ({ children }) => <p className="my-3 text-2xl">{children}</p>,
  },
  types: {
    code: ({ value }) => <Code>{value.code}</Code>,
    image: ({ value }) => (
      <div className="place-content-center flex w-5/6 h-3/5">
        <img src={`${urlFor(value)}`} alt="media"/>
      </div>
    ),
  },
};

const Comment =(props:{name:String,date:string,comment:string})=>{
  return(
    <div className="space-y-4 mb-2">
								<div className="flex">
									<div className="flex-shrink-0 mr-3">
										<img
											className="hover:ring ring-accent mt-2 rounded-full w-10 h-10 sm:w-10 sm:h-10"
											src="https://source.unsplash.com/random/?face&fit=facearea&facepad=2&w=276&h=280&q=80"
											alt=""
										/>
									</div>
									<div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
										<strong>{props?.name}</strong>
										<span className="pl-2 text-xs  text-base-content"
											>
                        {props?.date}
                        </span>
										<p className="text-sm">
											{props?.comment}
										</p>
									 </div>
								</div>
		</div>
  )
}
const RecommendedPosts=(props: { posts: any[]; })=>{
  if(props?.posts?.length>0)
  return(
    <>
    <h4 className="text-lg  font-semibold">Recommended Posts</h4>
    {props.posts?.map((p)=>(<RPCard title={p?.title} summary={p?.summary} slug={p?.slug?.current} cover={`${urlFor(p?.featured_image)}`} />

    ))}
    </>
  )
}


const Comments =(props: { data: any[]; })=>{
  //  console.log(props.data);
  
if(props?.data.length>0){
  return (
    <div className="antialiased mx-auto max-w-screen-sm">
						<h3 className="mb-4 text-lg font-semibold ">Comments</h3>
         {props?.data?.map((com)=>(
         //  <div>{comment.name}</div>
            <Comment key={com?._id} name={com?.name} comment={com?.comment} date={new Date(com?._createdAt)?.toTimeString()}/>
         ))}
            
    </div>
  )
}
}


export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  
  if (!data[0])
  { notFound(); }

  // console.log(data[0]);
  
    return (
      <div className=" max-w-7xl text-base-content py-16 mx-auto space-y-8">
        <article className="flex ">
          <div>
            <div className="">
              <h1 className="text-4xl text-neutral-content font-bold md:tracking-tight pb-3 md:text-5xl">
                {data && data[0]?.title}
              </h1>
              <div />
              <div className="flex flex-col items-start text-base-content justify-between w-full md:flex-row md:items-center ">
                <div className="flex my-2 items-center md:space-x-2">
                  <img
                    src="https://avatars.githubusercontent.com/u/28762625?v=4/?face&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="f w-12 h-12  border rounded-md "
                  />

                  <p className="  flex justify-items-stretch">
                    <span className="text-lg"> Manoj AP </span>
                  </p>
                </div>
                <p className="flex-shrink-0 mt-3 text-sm md:mt-0" />
              </div>
            </div>
            <div className="place-content-center flex">
              <img
                className="rounded w-9/12 h-1/4"
                src={`${urlFor(data[0]?.featured_image)}`}
                alt=" "
              />
            </div>

            <div className="" id="article">
              <PortableText
                value={data[0].content}
                components={myPortableComponents}
              />
            </div>
          </div>
        </article>

        {/* <!-- Tags --> */}
        <div className="">
       
          {data[0]?.tags?.map(
            (t: string) => (
              <div key={t} className="uppercase mx-2 text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full">
                {t}
              </div>
            )
          )}
        </div>

        {/* Recommended posts */}

        <div className="space-y-2 mt-3 ">
          <RecommendedPosts posts={data[0]?.recommended} />
        </div>

        {/* Comments       */}
        <div className="space-y-2">
          <CommentBox post={data[0]?._id} />
          <Comments data={data[0]?.comments} />
        </div>
      </div>
    );
  }
 
