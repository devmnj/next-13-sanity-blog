'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import  client  from "../lib/sanity";

export default function CommentBox(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')

    function onchangeName(e: { target: { value: React.SetStateAction<string> } }) {
       setName(e.target.value);
       
    }
       function onchangeEmail(e: { target: { value: React.SetStateAction<string> } }) {
       setEmail(e.target.value);
       
    }
     function onchangeComment(e: { target: { value: React.SetStateAction<string> } }) {
         setComment(e.target.value);
    }

    function onSubmit(event){
       
        try {
            event.preventDefault();
			if (name && comment) {
        const doc ={
          _type: 'comment',
					post: {
						_type: 'reference',
						_ref: props?.post,
					},
					approved:true,
					name:name,
					email:email,
					comment:comment,
        }
        console.log(JSON.stringify(doc));
        
	   		  	  client.create(doc).then((res)=>{
                   console.log('Success:'+res);
                 
                 alert(`Comment Posted`);
                 setName('');
                 setComment('');
                 setEmail('');
      });
				
			}
      else{
        alert("Provide human readable comment, lol")
      }
		} 
    catch (err) {
			console.error(err);
             
			// return res.status(500).json({ message: `Couldn't submit comment`, err });
		}


       
    }
  return (
    <div className="mx-auto max-w-screen-sm px-4">
    <h1 className="mt-6 text-xl font-bold sm:mb-6 sm:text-3xl">Write your comment</h1>

    <form  onSubmit={ onSubmit} className="-ml-20 flex p-4 text-left text-gray-700">
        <img
            className="mr-5 h-12 w-12 rounded-full"
            src={`https://ui-avatars.com/api/?name=Dev+${name}`}
            alt=""
        />

        <div className="w-full space-y-3 text-gray-700">
            <div className="">
                      <input
                          value={name}
                    type="text"
                    onChange={onchangeName}
                    placeholder="name"
                    className="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring"
                />
            </div>
            <div className="">
                      <input
                          value={email}
                    type="text"
                  onChange={onchangeEmail}
                    placeholder="Email"
                    className="h-12 w-full max-w-full rounded-md border bg-white px-5 text-sm outline-none focus:ring"
                />
            </div>
            <div className="">
                      <textarea
                          value={comment}
                    name="comment"
                    onChange={onchangeComment}
                    id=""
                    placeholder="Write your comment here"
                    cols="30"
                    rows="6"
                    className="h-40 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border bg-white p-5 text-sm font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"
                />
            </div>
            <div className="float-right">
                <input
                    type="submit"
                    value="Post Comment"
                    className="relative inline-flex h-10 w-auto max-w-full cursor-pointer items-center justify-center overflow-hidden whitespace-pre rounded-md bg-blue-700 px-4 text-center text-sm font-medium normal-case text-white opacity-100 outline-none focus:ring"
                />
            </div>
        </div>
    </form>
</div>
  );
}
